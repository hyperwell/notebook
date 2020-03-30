import rabbit from 'electron-rabbit'
import {ipcRenderer} from 'electron'

window.middlewareClient = new rabbit.Client()
ipcRenderer.on('set-socket', (event, {socketName}) => {
  window.middlewareClient.connect(socketName)
})
