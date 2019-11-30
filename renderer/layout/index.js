import React from 'react'
import {Normalize} from 'styled-normalize'
import {createGlobalStyle} from 'styled-components'
import 'inter-ui'

const GlobalStyle = createGlobalStyle`
  body {
  font: 14px/100% 'Inter', sans-serif;
  }
`

export default function Layout() {
  return (
    <>
      <Normalize />
      <GlobalStyle />
    </>
  )
}
