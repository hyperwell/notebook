import React from 'react'
import {sendMessage, onMessage} from '../lib/ipc'

sendMessage('start-first-long-running-process', 'my-argument')
  .then(data => console.log(data))
  .catch(err => console.error(err))

onMessage('something-to-frontend', function(arg) {
  console.log('got thing!', arg)
})

const Home = () => {
  return (
    <>
      <p>Dummy</p>
    </>
  )
}

export default Home
