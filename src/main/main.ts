import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';

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
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../icons/png/1024x1024.png'),
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:4000');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
};

app.whenReady().then(createWindow);
app.commandLine.appendSwitch('disable-pinch');

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

ipcMain.handle(
  'getBounds',
  (): Electron.Rectangle => {
    return screen.getPrimaryDisplay().bounds;
  }
);

ipcMain.handle('closeWindow', (): void => {
  app.exit(0);
});
