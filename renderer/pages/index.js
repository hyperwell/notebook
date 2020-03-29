import electron from 'electron'
import React from 'react'

const ipcRenderer = electron.ipcRenderer || false

const Home = () => {
  return (
    <>
      <p>Dummy</p>
    </>
  )
}

export default Home
