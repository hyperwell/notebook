const server = typeof window === 'undefined'
const ipc = !server && window.middlewareClient

export function sendMessage(name, args) {
  if (server) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    ipc.send(name, args, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export function onMessage(name, handler) {
  if (server) {
    return
  }

  ipc.on(name, handler)
}
