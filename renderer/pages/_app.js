import React from 'react'
import Head from 'next/head'
import App from 'next/app'
import ListView from '../components/ListView'
import Toolbar from '../components/Toolbar'
import {mockItems} from '../mocks'

import 'normalize.css'
import 'typeface-ibm-plex-sans'
import '../layout/index.css'
import styles from './App.module.css'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props

    return (
      <>
        <Head>
          <title>Hyperwell Notebook</title>
        </Head>

        <div className={styles.layout}>
          <div className={styles.container}>
            <ListView items={mockItems} />
            <Component {...pageProps} />
          </div>
        </div>
      </>
    )
  }
}
