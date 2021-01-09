import { app, session, ipcMain, dialog } from 'electron'
import serve from 'electron-serve'
// import path from 'path'
// import child_process from 'child_process'
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
  urls: ['https://*.bilibili.com/*', 'https://*.bilivideo.com/*'],
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
      // console.log(1111)
      details.requestHeaders['Referer'] = 'https://www.bilibili.com/'
      // details.requestHeaders['Cookie'] = 'aaa=12121'
      // details.requestHeaders['Origin'] = 'https://www.bilibili.com/'
      callback({ requestHeaders: details.requestHeaders })
    }
  )
  // 打开文件夹
  const openFileDialog = async (oldPath: string = app.getPath('downloads')) => {
    if (!mainWindow) return oldPath

    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
      title: '选择保存位置',
      properties: ['openDirectory', 'createDirectory'],
      defaultPath: oldPath,
    })

    return !canceled ? filePaths[0] : oldPath
  }
  ipcMain.handle('openFileDialog', (event, oldPath?: string) =>
    openFileDialog(oldPath)
  )

  /* ipcMain.handle('download', (event, url: string) => {
    mainWindow.webContents.downloadURL('https://api.aiiuii.com/v4/device')

    // 监听 will-download
    session.defaultSession.on('will-download', (event, item, webContents) => {
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }) */
})()

app.on('window-all-closed', () => {
  app.quit()
})
