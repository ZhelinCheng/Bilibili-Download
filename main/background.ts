import { app, session, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';
// const cookies = new Cookies()

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 800,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/home`);
    mainWindow.webContents.openDevTools();
  }


  ipcMain.on('cookie-message', (event, arg) => {
    console.log(1111)
    // session.defaultSession.cookies.set(arg)
    event.reply('cookie-reply', 'pong')
  })
})();

app.on('window-all-closed', () => {
  app.quit();
});
