var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var Menu = electron.Menu;
var globalShortcut = electron.globalShortcut;

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  Menu.setApplicationMenu(null);

  mainWindow = new BrowserWindow({ width: 1280, height: 720 });

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  globalShortcut.register('CommandOrControl+I', () => {
    mainWindow.webContents.toggleDevTools();
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
