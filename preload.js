const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('doomlet', {
  onSessions: (cb) => ipcRenderer.on('sessions', (_e, d) => cb(d)),
  onCommand: (cb) => ipcRenderer.on('command', (_e, c) => cb(c)),
  onLayout: (cb) => ipcRenderer.on('layout', (_e, l) => cb(l)),
  onArrive: (cb) => ipcRenderer.on('arrive', (_e, a) => cb(a)),
  onAnchors: (cb) => ipcRenderer.on('anchors', (_e, a) => cb(a)),
  migrate: (data) => ipcRenderer.send('migrate', data),
  log: (d) => ipcRenderer.send('log', d),
  setIgnore: (v) => ipcRenderer.send('set-ignore', v),
});
