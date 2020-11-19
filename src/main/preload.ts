import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  getBounds: () => ipcRenderer.invoke('getBounds'),
});
