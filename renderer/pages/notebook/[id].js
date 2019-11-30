import electron from 'electron'
import React from 'react'

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`

  const Notebook = () => {
    return (
      <>
        <Container>
          <ListView items={mockItems} />
        </Container>
      </>
    )
}

export default Home
