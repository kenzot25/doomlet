const { app, BrowserWindow, screen, ipcMain, Tray, Menu, nativeImage, Notification, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { scan } = require('./watcher');
const { startWindowRects } = require('./winrects');

// ---- cài đặt lưu lại giữa các lần chạy ----
const settingsFile = () => path.join(app.getPath('userData'), 'settings.json');
let settings = { autoStart: true, link: true };
function loadSettings() { try { settings = { ...settings, ...JSON.parse(fs.readFileSync(settingsFile(), 'utf8')) }; } catch { /* lần đầu */ } }
function saveSettings() { try { fs.mkdirSync(path.dirname(settingsFile()), { recursive: true }); fs.writeFileSync(settingsFile(), JSON.stringify(settings, null, 2)); } catch { /* bỏ qua */ } }

// ---- khởi động cùng máy ----
function applyAutoStart() {
  const opts = { openAtLogin: settings.autoStart };
  // Chạy dạng chưa đóng gói (electron.exe + thư mục app) thì phải chỉ rõ đường dẫn
  if (!app.isPackaged) { opts.path = process.execPath; opts.args = [app.getAppPath()]; }
  app.setLoginItemSettings(opts);
}

// ---- log để debug (Works\\doomlet\\doomlet.log) ----
const logFile = () => path.join(app.getAppPath(), 'doomlet.log');
function log(...a) {
  try {
    const line = new Date().toISOString() + ' ' + a.map((x) => (typeof x === 'string' ? x : JSON.stringify(x))).join(' ') + '\n';
    fs.appendFileSync(logFile(), line);
    if (fs.statSync(logFile()).size > 500000) fs.writeFileSync(logFile(), line);
  } catch { /* bỏ qua */ }
}

function notify(body) { try { new Notification({ title: 'Doomlet', body }).show(); } catch { /* bỏ qua */ } }

// ---- cập nhật: git pull + npm install rồi khởi động lại ----
function runUpdate() {
  const dir = app.getAppPath();
  const isGit = fs.existsSync(path.join(dir, '.git'));
  const steps = isGit ? 'git pull --ff-only && npm install --no-audit --no-fund' : 'npm install --no-audit --no-fund';
  notify(isGit ? 'Đang kéo bản mới về…' : 'Thư mục chưa phải git repo, chỉ chạy npm install. Muốn cập nhật thì chép đè file mới vào rồi bấm lại.');
  const p = spawn(steps, { cwd: dir, shell: true, windowsHide: true });
  let log = '';
  p.stdout.on('data', (d) => (log += d)); p.stderr.on('data', (d) => (log += d));
  p.on('close', (code) => {
    if (code === 0) { notify('Cập nhật xong. Thỏ đang khởi động lại.'); setTimeout(() => { app.relaunch(); app.exit(0); }, 800); }
    else { notify('Cập nhật lỗi, xem update.log trong thư mục app.'); fs.writeFileSync(path.join(dir, 'update.log'), log); }
  });
}

// ---- tự nạp lại khi file thay đổi (chép đè bản mới là thấy ngay) ----
function watchForChanges() {
  let t;
  const reloadRenderer = () => { clearTimeout(t); t = setTimeout(() => wins.forEach((w) => !w.win.isDestroyed() && w.win.webContents.reloadIgnoringCache()), 400); };
  const relaunch = () => { clearTimeout(t); t = setTimeout(() => { app.relaunch(); app.exit(0); }, 600); };
  try { fs.watch(path.join(__dirname, 'renderer'), reloadRenderer); } catch { /* bỏ qua */ }
  for (const f of ['main.js', 'watcher.js', 'preload.js']) { try { fs.watch(path.join(__dirname, f), relaunch); } catch { /* bỏ qua */ } }
}

if (process.platform === 'linux') app.commandLine.appendSwitch('enable-transparent-visuals');
if (!app.requestSingleInstanceLock()) app.quit();

// Mỗi màn hình một cửa sổ trong suốt. Thỏ nhảy qua lại bằng cách "chuyển nhà" giữa các cửa sổ.
const wins = new Map();        // displayId -> { win, display, left, right, ready }
const sessionLoc = new Map();  // sessionId -> displayId (thỏ của session đang ở màn nào)
let tray, link = true;

function createWindow(display) {
  const win = new BrowserWindow({
    ...display.workArea,
    transparent: true, backgroundColor: '#00000000', frame: false, hasShadow: false,
    resizable: false, movable: false, minimizable: false, maximizable: false, fullscreenable: false,
    alwaysOnTop: true, skipTaskbar: true, show: false,
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false },
  });
  win.setAlwaysOnTop(true, 'screen-saver');
  if (process.platform === 'darwin') win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  win.setIgnoreMouseEvents(true, { forward: true });
  win.loadFile(path.join(__dirname, 'renderer', 'index.html'));
  win.webContents.on('did-finish-load', () => {
    const w = [...wins.values()].find((x) => x.win === win);
    if (w) { w.ready = true; sendLayout(w); pushAnchors(); }
    win.showInactive();
    push();
  });
  return win;
}

function neighbor(d, all, side) {
  // Sắp các màn theo toạ độ x của tâm; màn liền trước/sau là hàng xóm.
  // Không đòi các cạnh khớp nhau, vì Windows hay báo toạ độ lệch khi các màn có mức scale khác nhau.
  const cx = (o) => o.bounds.x + o.bounds.width / 2;
  const sorted = [...all].sort((a, b) => cx(a) - cx(b));
  const i = sorted.findIndex((o) => o.id === d.id);
  const j = side === 'left' ? i - 1 : i + 1;
  if (sorted[j]) return sorted[j].id;
  return null;
}
function neighborStrict(d, all, side) {
  const b = d.bounds;
  let best = null, bestDist = Infinity;
  for (const o of all) {
    if (o.id === d.id) continue;
    const ob = o.bounds;
    const overlap = Math.min(b.y + b.height, ob.y + ob.height) - Math.max(b.y, ob.y);
    if (overlap <= 0) continue;
    const dist = side === 'right' ? ob.x - (b.x + b.width) : b.x - (ob.x + ob.width);
    if (dist >= -10 && dist < 300 && dist < bestDist) { best = o.id; bestDist = dist; }
  }
  return best;
}

function sendLayout(w) {
  if (!w.ready || w.win.isDestroyed()) return;
  const wa = w.display.workArea;
  // Gửi vị trí các màn khác theo toạ độ của chính cửa sổ này, để thỏ biết bay ra phía nào thì sang màn nào
  const others = screen.getAllDisplays().filter((o) => o.id !== w.display.id).map((o) => ({
    id: o.id, x: o.bounds.x - wa.x, y: o.bounds.y - wa.y, w: o.bounds.width, h: o.bounds.height,
  }));
  w.win.webContents.send('layout', {
    id: w.display.id, origin: { x: wa.x, y: wa.y }, others, primary: w.display.id === screen.getPrimaryDisplay().id,
  });
}

function relayout() {
  const all = screen.getAllDisplays();
  for (const [id, w] of wins) {
    if (!all.find((d) => d.id === id)) { if (!w.win.isDestroyed()) w.win.destroy(); wins.delete(id); }
  }
  for (const d of all) {
    let w = wins.get(d.id);
    if (!w) { w = { display: d, ready: false }; wins.set(d.id, w); w.win = createWindow(d); }
    w.display = d;
    if (!w.win.isDestroyed()) w.win.setBounds(d.workArea);
  }
  for (const d of all) {
    const w = wins.get(d.id);
    w.left = neighbor(d, all, 'left');
    w.right = neighbor(d, all, 'right');
    sendLayout(w);
  }
  log('layout', all.map((d) => ({ id: d.id, bounds: d.bounds, workArea: d.workArea, scale: d.scaleFactor })));
}

function push() {
  let sessions = [];
  if (link) { try { sessions = scan(); } catch (e) { console.error(e); } }
  const primary = screen.getPrimaryDisplay().id;
  const ids = new Set(sessions.map((s) => s.id));
  for (const id of sessionLoc.keys()) if (!ids.has(id)) sessionLoc.delete(id);
  for (const s of sessions) if (!wins.has(sessionLoc.get(s.id))) sessionLoc.set(s.id, primary);
  for (const [id, w] of wins) {
    if (!w.ready || w.win.isDestroyed()) continue;
    w.win.webContents.send('sessions', sessions.filter((s) => sessionLoc.get(s.id) === id));
  }
}

// Vị trí cửa sổ các app khác → gửi cho từng màn theo toạ độ của màn đó (để Thỏ Dây Móc móc dây)
let appRects = [];
function pushAnchors() {
  for (const w of wins.values()) {
    if (!w.ready || w.win.isDestroyed()) continue;
    const wa = w.display.workArea, b = w.display.bounds;
    const local = appRects
      .filter((r) => r.x < b.x + b.width && r.x + r.w > b.x && r.y < b.y + b.height && r.y + r.h > b.y)
      .map((r) => ({ x: r.x - wa.x, y: r.y - wa.y, w: r.w, h: r.h }));
    w.win.webContents.send('anchors', local);
  }
}
let lastRectCount = -1;
function onWindowRects(raw) {
  if (raw.length !== lastRectCount) { lastRectCount = raw.length; log('winrects', raw.length, 'cửa sổ', raw.slice(0, 3)); }
  appRects = raw.map((r) => {
    try { const d = screen.screenToDipRect(null, { x: r.x, y: r.y, width: r.w, height: r.h }); return { x: d.x, y: d.y, w: d.width, h: d.height }; }
    catch { return r; }
  });
  pushAnchors();
}

const winOf = (sender) => [...wins.values()].find((w) => !w.win.isDestroyed() && w.win.webContents === sender);
const cursorWin = () => wins.get(screen.getDisplayNearestPoint(screen.getCursorScreenPoint()).id);
const cmd = (w, c) => w && w.ready && !w.win.isDestroyed() && w.win.webContents.send('command', c);

ipcMain.on('log', (e, data) => log('renderer', winOf(e.sender)?.display.id, data));
ipcMain.on('set-ignore', (e, ignore) => {
  const w = winOf(e.sender);
  if (w) w.win.setIgnoreMouseEvents(!!ignore, { forward: true });
});

// Thỏ bay ra khỏi mép màn hình → chuyển sang cửa sổ của màn bên cạnh, giữ nguyên vận tốc
ipcMain.on('migrate', (e, { to, pet }) => {
  const src = winOf(e.sender);
  if (!src) return log('migrate: không rõ cửa sổ nguồn');
  const t = wins.get(to);
  log('migrate', { from: src.display.id, to, found: !!t, ready: !!t?.ready, gx: Math.round(pet.gx), gy: Math.round(pet.gy) });
  if (!t || !t.ready) return;
  const wa = t.display.workArea;
  if (pet.sessionId) sessionLoc.set(pet.sessionId, t.display.id);
  t.win.webContents.send('arrive', { pet, x: pet.gx - wa.x, y: pet.gy - wa.y });
});

function buildTray() {
  const img = nativeImage.createFromPath(path.join(__dirname, 'assets', 'tray.png')).resize({ width: 18, height: 18 });
  tray = new Tray(img);
  tray.setToolTip('Doomlet – team thỏ mất ngủ');
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: 'Gọi thêm 1 đứa (màn đang trỏ chuột)', click: () => cmd(cursorWin(), 'spawn') },
    { label: 'Gọi cả team (màn đang trỏ chuột)', click: () => cmd(cursorWin(), 'team') },
    { label: 'Gọi 3 siêu anh hùng', click: () => cmd(cursorWin(), 'heroes') },
    { label: 'Rải team ra mọi màn hình', click: () => wins.forEach((w) => cmd(w, 'team2')) },
    { label: 'Cả team nhảy sang màn khác', click: () => wins.forEach((w) => cmd(w, 'travel')) },
    { label: 'Giải tán team', click: () => wins.forEach((w) => cmd(w, 'dismiss')) },
    { type: 'separator' },
    { label: 'Theo dõi Claude Code', type: 'checkbox', checked: link, click: (i) => { link = settings.link = i.checked; saveSettings(); push(); } },
    { label: 'Khởi động cùng máy', type: 'checkbox', checked: settings.autoStart, click: (i) => { settings.autoStart = i.checked; saveSettings(); applyAutoStart(); } },
    { type: 'separator' },
    { label: 'Cập nhật & khởi động lại', click: runUpdate },
    { label: 'Mở thư mục app', click: () => shell.openPath(app.getAppPath()) },
    { label: `Phiên bản ${app.getVersion()}`, enabled: false },
    { type: 'separator' },
    { label: 'Thoát', click: () => app.quit() },
  ]));
}

app.whenReady().then(() => {
  if (process.platform === 'darwin' && app.dock) app.dock.hide();
  loadSettings();
  link = settings.link;
  applyAutoStart();
  watchForChanges();
  relayout();
  buildTray();
  const stopRects = startWindowRects(onWindowRects, log);
  app.on('before-quit', stopRects);
  setInterval(push, 2000);
  for (const ev of ['display-added', 'display-removed', 'display-metrics-changed']) screen.on(ev, () => setTimeout(relayout, 300));
});
app.on('window-all-closed', () => {});
