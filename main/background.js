import path from 'path'
import {app, ipcMain} from 'electron'
import serve from 'electron-serve'
import * as Store from 'electron-store'
import {createWindow} from './util'
import forkBackend from './util/fork-backend'

const socketName = 'hyperwell-notebook'
const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({directory: 'app'})
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

let mainWindow, backendProcess
;(async () => {
  backendProcess = await forkBackend(path.join(__dirname, 'backend.js'), {
    socketName,
  })
  await app.whenReady()

  mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    preload: path.resolve(__dirname, 'preload.js'),
  })

  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/`)

    mainWindow.webContents.openDevTools()
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.send('set-socket', {
        socketName,
      })
    })
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

app.on('will-quit', () => {
  if (backendProcess) {
    backendProcess.kill('SIGHUP')
  }
})

const store = new Store({name: 'messages'})

ipcMain.on('get-messages', (event, arg) => {
  event.returnValue = store.get('messages') || []
})

ipcMain.on('add-message', (event, arg) => {
  const messages = store.get('messages') || []
  messages.push(arg)
  store.set('messages', messages)
})
