import { app, session, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

const loadURLOptions = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  httpReferrer: 'https://www.bilibili.com/',
}

// Modify the user agent for all requests to the following urls.
const filter = {
  urls: ['https://*.bilibili.com/*'],
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 800,
    height: 600,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html', loadURLOptions)
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`, loadURLOptions)
    mainWindow.webContents.openDevTools()
  }

  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      details.requestHeaders['Referer'] = 'https://www.bilibili.com/'
      details.requestHeaders['Cookie'] = 'aaa=12121'
      details.requestHeaders['Origin'] = 'https://www.bilibili.com/'
      callback({ requestHeaders: details.requestHeaders })
    }
  )

  /* session.defaultSession.webRequest.onResponseStarted(filter, (details, callback) => {
    details.responseHeaders['access-control-allow-origin'] = '*'
    callback({ responseHeaders: details.responseHeaders })
  }) */

  ipcMain.on('cookie-message', (event) => {
    // console.log(1111)
    // session.defaultSession.cookies.set(arg)
    event.reply('cookie-reply', 'pong')
  })
})()

app.on('window-all-closed', () => {
  app.quit()
})
