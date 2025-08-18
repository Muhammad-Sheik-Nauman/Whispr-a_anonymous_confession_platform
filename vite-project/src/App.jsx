import React from 'react'
import { useState } from 'react'
import ConfessionForm from './ConfessionForm'
import ConfessionList from './ConfessionList'


function App() {
  const [refresh, setRefresh] = useState(false)
  const triggerRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <ConfessionForm onRefresh={triggerRefresh} />
      <ConfessionList refresh={refresh} />

    </>
  )
}

export default App
