// Đọc transcript Claude Code (~/.claude/projects/*/*.jsonl) + sự kiện hook (~/.doomlet/events.jsonl)
// để biết mỗi session đang làm gì. Không gửi gì ra ngoài, chỉ đọc file local.
const fs = require('fs');
const path = require('path');
const os = require('os');

const PROJECTS = path.join(os.homedir(), '.claude', 'projects');
const EVENTS = path.join(os.homedir(), '.doomlet', 'events.jsonl');
const ACTIVE_MS = 10 * 60 * 1000; // session im lặng quá 10 phút = coi như đã nghỉ
const cache = new Map(); // file -> { mtime, entries }

function tail(file, bytes = 256 * 1024) {
  const { size } = fs.statSync(file);
  const start = Math.max(0, size - bytes);
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(size - start);
  fs.readSync(fd, buf, 0, buf.length, start);
  fs.closeSync(fd);
  let s = buf.toString('utf8');
  if (start > 0) s = s.slice(s.indexOf('\n') + 1);
  return s;
}

function parseLines(s) {
  const out = [];
  for (const l of s.split('\n')) {
    if (!l.trim()) continue;
    try { out.push(JSON.parse(l)); } catch { /* dòng dở dang */ }
  }
  return out;
}

function contentOf(e) {
  const c = e?.message?.content;
  if (Array.isArray(c)) return c;
  if (typeof c === 'string') return [{ type: 'text', text: c }];
  return [];
}

function projectName(entries, dir) {
  for (let i = entries.length - 1; i >= 0; i--) if (entries[i].cwd) return path.basename(entries[i].cwd);
  const parts = path.basename(dir).split('-').filter(Boolean);
  return parts[parts.length - 1] || 'claude';
}

function derive(entries, mtimeMs, now) {
  const age = now - mtimeMs;
  // subagent đang chạy = tool_use Task/Agent chưa có tool_result
  const agents = new Set(), resulted = new Set();
  for (const e of entries) {
    if (e.isSidechain) continue;
    for (const c of contentOf(e)) {
      if (c.type === 'tool_use' && (c.name === 'Task' || c.name === 'Agent')) agents.add(c.id);
      if (c.type === 'tool_result') resulted.add(c.tool_use_id);
    }
  }
  let subagents = 0;
  for (const id of agents) if (!resulted.has(id)) subagents++;
  if (age > 15 * 60 * 1000) subagents = 0;

  let state = 'idle', tool = null;
  for (let i = entries.length - 1; i >= 0; i--) {
    const e = entries[i];
    if (e.isSidechain || (e.type !== 'assistant' && e.type !== 'user')) continue;
    const cs = contentOf(e);
    if (e.type === 'assistant') {
      const tu = [...cs].reverse().find((c) => c.type === 'tool_use');
      if (tu) { tool = tu.name; state = age > 25000 && !subagents ? 'waiting' : 'working'; }
      else state = 'done';
    } else {
      const tr = cs.find((c) => c.type === 'tool_result');
      const text = cs.filter((c) => c.type === 'text').map((c) => c.text).join(' ');
      if (/Request interrupted/i.test(text)) state = 'idle';
      else if (tr) state = tr.is_error ? 'error' : 'thinking';
      else state = 'thinking';
    }
    break;
  }
  if (state === 'done' && age > 90 * 1000) state = 'idle';
  if (state === 'thinking' && age > 5 * 60 * 1000) state = 'idle';
  if (state === 'error' && age > 8000) state = 'thinking';
  return { state, tool, subagents };
}

function readHooks(now) {
  const latest = new Map();
  try {
    const { mtimeMs } = fs.statSync(EVENTS);
    if (now - mtimeMs > ACTIVE_MS) return latest;
    for (const ev of parseLines(tail(EVENTS, 128 * 1024))) {
      if (ev.session_id && now - ev.ts < ACTIVE_MS) latest.set(ev.session_id, ev);
    }
  } catch { /* chưa cài hook */ }
  return latest;
}

function applyHook(info, ev, mtimeMs, now) {
  if (!ev || ev.ts < mtimeMs - 1500) return info;
  const msg = String(ev.message || '');
  switch (ev.event) {
    case 'PreToolUse': return { ...info, state: 'working', tool: ev.tool || info.tool };
    case 'PostToolUse': return { ...info, state: 'thinking' };
    case 'UserPromptSubmit': return { ...info, state: 'thinking' };
    case 'Stop': return { ...info, state: now - ev.ts > 90000 ? 'idle' : 'done' };
    case 'Notification':
      if (/permission|approve|allow/i.test(msg)) return { ...info, state: 'waiting' };
      if (/waiting for your input/i.test(msg)) return { ...info, state: 'idle' };
      return info;
    default: return info;
  }
}

function scan() {
  const now = Date.now();
  const out = [];
  let dirs = [];
  try { dirs = fs.readdirSync(PROJECTS, { withFileTypes: true }); } catch { return out; }
  const hooks = readHooks(now);
  for (const d of dirs) {
    if (!d.isDirectory()) continue;
    const dp = path.join(PROJECTS, d.name);
    let files = [];
    try { files = fs.readdirSync(dp); } catch { continue; }
    for (const f of files) {
      if (!f.endsWith('.jsonl')) continue;
      const fp = path.join(dp, f);
      let st;
      try { st = fs.statSync(fp); } catch { continue; }
      const ev = hooks.get(f.slice(0, -6));
      const lastTouch = Math.max(st.mtimeMs, ev?.ts || 0);
      if (now - lastTouch > ACTIVE_MS) continue;
      let c = cache.get(fp);
      if (!c || c.mtime !== st.mtimeMs) {
        try { c = { mtime: st.mtimeMs, entries: parseLines(tail(fp)) }; } catch { continue; }
        cache.set(fp, c);
      }
      const id = f.slice(0, -6);
      let info = derive(c.entries, st.mtimeMs, now);
      info = applyHook(info, ev, st.mtimeMs, now);
      out.push({ id, project: projectName(c.entries, dp), ...info, updatedAt: lastTouch });
    }
  }
  out.sort((a, b) => b.updatedAt - a.updatedAt);
  return out.slice(0, 8);
}

module.exports = { scan, derive, PROJECTS, EVENTS };
