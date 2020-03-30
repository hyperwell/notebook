import conf from '../lib/conf'

const serverHandlers = require('./handlers')
const rabbit = require('electron-rabbit')

const debug = require('debug')('backend')

;(async () => {
  debug('Backend process starting up.')
})()

const handleInit = ({event, dataDir, socketName}) => {
  if (event !== 'init') {
    console.error('Invalid message received, expected `init` event.')
  }

  conf.setData({
    dataDir,
  })
  rabbit.init(socketName, serverHandlers)

  process.removeListener('message', handleInit)
  process.send('ready')
}

process.on('message', handleInit)
process.on('exit', () => {
  debug('Backend process shutting down')
})
