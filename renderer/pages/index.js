import electron from 'electron'
import React from 'react'

import Head from 'next/head'
import Link from 'next/link'
import ListView from '../components/ListView'
import styles from './Home.module.css'

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

const Home = () => {
  return (
    <>
      <div className={styles.container}>
        <ListView items={mockItems} />
      </div>
    </>
  )
}

export default Home
