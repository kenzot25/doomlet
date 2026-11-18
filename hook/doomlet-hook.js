#!/usr/bin/env node
// Claude Code hook: ghi sự kiện vào ~/.doomlet/events.jsonl để thỏ biết chính xác lúc nào đang chờ duyệt.
// Luôn thoát 0 và không in gì, nên không bao giờ chặn Claude Code.
const fs = require('fs');
const path = require('path');
const os = require('os');

let data = '';
process.stdin.on('data', (d) => (data += d));
process.stdin.on('end', () => {
  try {
    const j = JSON.parse(data || '{}');
    const dir = path.join(os.homedir(), '.doomlet');
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, 'events.jsonl');
    const rec = { ts: Date.now(), session_id: j.session_id, event: j.hook_event_name, tool: j.tool_name || null, message: j.message || null };
    fs.appendFileSync(file, JSON.stringify(rec) + '\n');
    if (fs.statSync(file).size > 2_000_000) {
      fs.writeFileSync(file, fs.readFileSync(file, 'utf8').split('\n').slice(-2000).join('\n'));
    }
  } catch { /* bỏ qua */ }
  process.exit(0);
});
