#!/usr/bin/env node
// Thêm (hoặc gỡ với --uninstall) hook Doomlet vào ~/.claude/settings.json. Có tạo bản backup trước khi sửa.
const fs = require('fs');
const path = require('path');
const os = require('os');

const settingsPath = path.join(os.homedir(), '.claude', 'settings.json');
const hookScript = path.join(__dirname, 'doomlet-hook.js');
const command = `node "${hookScript}"`;
const EVENTS = ['PreToolUse', 'PostToolUse', 'Notification', 'Stop', 'UserPromptSubmit'];
const uninstall = process.argv.includes('--uninstall');

let settings = {};
if (fs.existsSync(settingsPath)) {
  const raw = fs.readFileSync(settingsPath, 'utf8');
  try { settings = JSON.parse(raw); } catch { console.error('settings.json không phải JSON hợp lệ, dừng lại.'); process.exit(1); }
  fs.writeFileSync(settingsPath + '.doomlet-backup', raw);
} else fs.mkdirSync(path.dirname(settingsPath), { recursive: true });

settings.hooks = settings.hooks || {};
for (const ev of EVENTS) {
  const groups = (settings.hooks[ev] || [])
    .map((g) => ({ ...g, hooks: (g.hooks || []).filter((h) => !String(h.command || '').includes('doomlet-hook')) }))
    .filter((g) => g.hooks.length);
  if (!uninstall) {
    const group = { hooks: [{ type: 'command', command }] };
    if (ev === 'PreToolUse' || ev === 'PostToolUse') group.matcher = '*';
    groups.push(group);
  }
  if (groups.length) settings.hooks[ev] = groups; else delete settings.hooks[ev];
}
if (!Object.keys(settings.hooks).length) delete settings.hooks;

fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
console.log(uninstall ? 'Đã gỡ hook Doomlet.' : 'Đã cài hook Doomlet. Mở lại các phiên Claude Code để áp dụng.');
console.log('Backup: ' + settingsPath + '.doomlet-backup');
