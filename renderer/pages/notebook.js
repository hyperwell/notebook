import React from 'react'
import {useRouter} from 'next/router'

const Notebook = () => {
  const router = useRouter()
  const docUrl = router.query.url

  return (
    <>
      <p>Notebook!</p>
      <code>{docUrl}</code>
    </>
  )
}

export default Notebook
