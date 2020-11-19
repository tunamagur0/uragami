import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = (): void => {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === 'production') {
    win.loadFile('../renderer/index.html');
  } else {
    win.loadURL('http://localhost:4000');
    win.webContents.openDevTools();
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
