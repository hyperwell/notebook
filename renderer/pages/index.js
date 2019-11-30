import electron from 'electron'
import React from 'react'
import styled from 'styled-components'

import Head from 'next/head'
import Link from 'next/link'
import ListView from '../components/ListView'

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false

const mockItems = [
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
  {
    title: 'My First Notebook',
    docUrl: 'foobar',
  },
]

const Container = styled.div`
  display: flex;
  flex-flow: row;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
`

const Home = () => {
  return (
    <>
      <Container>
        <ListView items={mockItems} />
      </Container>
    </>
  )
}

export default Home
