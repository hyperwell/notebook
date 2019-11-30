import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import {borderGray} from '../layout/colors'

const List = styled.ul`
  display: flex;
  flex-flow: column;
  width: 200px;
  height: 100vh;
  margin: 0;
  border-right: 1px solid ${borderGray};
  padding: 0;
  overflow-y: scroll;

  list-style: none;
  background: white;
`

const Item = styled.li`
  width: 100%;
  margin: 0;
  padding: 0;
`

const NotebookAnchor = styled.a`
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${borderGray};
  padding: 7px 15px;

  font: 400 12px/100% 'Inter', sans-serif;
  text-decoration: none;
  color: inherit;

  &:hover {
    background-color: #eee;
  }
`

const Title = styled.h5`
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
`

const DocumentURL = styled.em`
  color: ;
`

export default function ListView({items}) {
  return (
    <List>
      {items.map(({title, docUrl}, index) => (
        <Item key={`item=${index}`}>
          <Link href={`/directors/[slug]`} as={`/notebook/${docUrl}`}>
            <NotebookAnchor href={`/notebook/${docUrl}`}>
              <Title>{title}</Title>
              <DocumentURL>{docUrl}</DocumentURL>
            </NotebookAnchor>
          </Link>
        </Item>
      ))}
    </List>
  )
}
