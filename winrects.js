// Windows: đọc vị trí các cửa sổ app đang mở (chỉ toạ độ, không đọc nội dung) để Thỏ Dây Móc móc dây vào.
// Chạy 1 tiến trình PowerShell ẩn, in JSON mỗi 1.5 giây.
const { spawn } = require('child_process');

const PS = (selfPid) => `
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
try {
Add-Type @"
using System; using System.Text; using System.Runtime.InteropServices;
public class DoomletWin {
  public delegate bool EnumProc(IntPtr h, IntPtr l);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc p, IntPtr l);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
  [DllImport("user32.dll")] public static extern int GetWindowTextLength(IntPtr h);
  [DllImport("user32.dll", CharSet = CharSet.Unicode)] public static extern int GetClassName(IntPtr h, StringBuilder s, int n);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr h, int a, out RECT r, int s);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr h, int a, out int v, int s);
  public struct RECT { public int L, T, R, B; }
  public static string Get(uint self) {
    var sb = new StringBuilder("["); int n = 0;
    EnumWindows((h, l) => {
      if (n >= 8) return false;
      if (!IsWindowVisible(h) || IsIconic(h) || GetWindowTextLength(h) == 0) return true;
      int cloaked = 0; DwmGetWindowAttribute(h, 14, out cloaked, 4); if (cloaked != 0) return true;
      uint pid; GetWindowThreadProcessId(h, out pid); if (pid == self) return true;
      var cls = new StringBuilder(64); GetClassName(h, cls, 64);
      var c = cls.ToString(); if (c == "Progman" || c == "WorkerW" || c == "Shell_TrayWnd") return true;
      RECT r; if (DwmGetWindowAttribute(h, 9, out r, 16) != 0) GetWindowRect(h, out r);
      if (r.R - r.L < 160 || r.B - r.T < 100) return true;
      if (n > 0) sb.Append(","); n++;
      sb.AppendFormat("[{0},{1},{2},{3}]", r.L, r.T, r.R - r.L, r.B - r.T);
      return true; }, IntPtr.Zero);
    return sb.Append("]").ToString();
  }
}
"@
} catch { [Console]::Out.WriteLine("ERR " + ($_ | Out-String).Replace([string][char]13,"").Replace([string][char]10," | ")); [Console]::Out.Flush() }
while ($true) {
  try { [Console]::Out.WriteLine([DoomletWin]::Get(${selfPid})) } catch { [Console]::Out.WriteLine("ERR " + $_.Exception.Message) }
  [Console]::Out.Flush(); Start-Sleep -Milliseconds 1500
}
`;

function startWindowRects(onRects, log = () => {}) {
  if (process.platform !== 'win32') return () => {};
  let proc, stopped = false, buf = '', last = '';
  const run = () => {
    if (stopped) return;
    const script = Buffer.from(PS(process.pid), 'utf16le').toString('base64');
    proc = spawn('powershell.exe', ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', script], { windowsHide: true });
    proc.stdout.on('data', (d) => {
      buf += d.toString();
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const lineStr = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (lineStr.startsWith('ERR')) { if (lineStr !== last) log('winrects', lineStr.slice(0, 900)); last = lineStr; continue; }
        if (!lineStr.startsWith('[') || lineStr === last) continue;
        last = lineStr;
        try { onRects(JSON.parse(lineStr).map(([x, y, w, h]) => ({ x, y, w, h }))); } catch { /* bỏ qua */ }
      }
    });
    proc.stderr.on('data', (d) => log('winrects stderr', d.toString().slice(0, 300)));
    proc.on('exit', (code) => { log('winrects exit', code); if (!stopped) setTimeout(run, 5000); });
  };
  run();
  return () => { stopped = true; try { proc && proc.kill(); } catch { /* bỏ qua */ } };
}

module.exports = { startWindowRects };
