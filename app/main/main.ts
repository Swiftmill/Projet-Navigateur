import path from 'path';
import { app, BrowserWindow, ipcMain, Menu, nativeTheme, session } from 'electron';
import { pathToFileURL } from 'url';
import { autoUpdater } from 'electron-updater';
import { createGXControlManager } from './modules/gx-control';
import { createAdBlocker } from './modules/ad-blocker';
import { registerExtensionProtocol } from './modules/extensions';
import { createSystemMonitor } from './modules/system-monitor';

const isDev = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow | null = null;

async function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 720,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#05060d' : '#f1f5f9',
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 12, y: 12 },
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: true,
      devTools: isDev
    }
  });

  const rendererUrl = isDev
    ? 'http://localhost:5173'
    : pathToFileURL(path.join(__dirname, '../renderer/index.html')).toString();

  await mainWindow.loadURL(rendererUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function setupSecurityPolicies() {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.openweathermap.org https://*.hypergx.dev; img-src 'self' data: blob: https:; font-src 'self'; media-src 'self' data: blob: https:; frame-src 'self';"
        ]
      }
    });
  });
}

async function bootstrap() {
  await app.whenReady();

  setupSecurityPolicies();
  registerExtensionProtocol();

  const adBlocker = await createAdBlocker();
  adBlocker.attach(session.defaultSession);

  const systemMonitor = createSystemMonitor();
  const gxControl = createGXControlManager(systemMonitor);
  gxControl.updateTrafficThrottling(session.defaultSession);

  ipcMain.handle('gx-control:getState', () => gxControl.getState());
  ipcMain.on('gx-control:updateLimits', (event, limits) => {
    gxControl.updateLimits(limits);
    event.sender.send('gx-control:state-changed', gxControl.getState());
  });
  ipcMain.on('gx-control:toggle', (event) => {
    gxControl.toggle();
    event.sender.send('gx-control:state-changed', gxControl.getState());
  });

  ipcMain.handle('system:metrics', () => systemMonitor.snapshot());

  await createMainWindow();

  if (!isDev) {
    autoUpdater.autoDownload = true;
    autoUpdater.checkForUpdatesAndNotify().catch((error) => {
      console.error('Auto update failed', error);
    });
  }

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('browser-window-created', (_event, window) => {
  window.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      // Open links within the browser shell
      return { action: 'allow' };
    }

    return { action: 'deny' };
  });
});

app.whenReady()
  .then(bootstrap)
  .catch((error) => {
    console.error('Failed to bootstrap application', error);
  });

if (isDev) {
  const template: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'HyperGX',
      submenu: [{ role: 'quit' }]
    },
    {
      label: 'View',
      submenu: [{ role: 'toggleDevTools' }, { role: 'reload' }]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
} else {
  Menu.setApplicationMenu(null);
}
