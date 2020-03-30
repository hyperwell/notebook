let handlers = {}
const ipc = require('electron-rabbit')

handlers['start-first-long-running-process'] = async function() {
  return new Promise((resolve, reject) => {
    resolve('hi')
    ipc.send('something-to-frontend', 'done with first long running process!')
  })
}

handlers['start-second-long-running-process'] = async function() {
  return new Promise((resolve, reject) => {
    resolve()
  })
}

module.exports = handlers
