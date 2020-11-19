import { app, BrowserWindow, screen } from 'electron';

const createWindow = (): void => {
  const size = screen.getPrimaryDisplay().size;
  const win = new BrowserWindow({
    width: size.width,
    height: size.height,
    frame: false,
    show: true,
    transparent: true,
    resizable: false,
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
