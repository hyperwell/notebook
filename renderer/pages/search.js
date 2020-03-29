import React from 'react'
import {useRouter} from 'next/router'

const Search = () => {
  const router = useRouter()
  const query = router.query.url

  return (
    <>
      <p>Search!</p>
      <p>{query}</p>
    </>
  )
}

export default Search
