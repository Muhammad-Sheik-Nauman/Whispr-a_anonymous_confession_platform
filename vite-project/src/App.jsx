import React from 'react'
import { useState,useEffect } from 'react'
import ConfessionForm from './ConfessionForm'
import ConfessionList from './ConfessionList'
import { v4 as uuidv4 } from 'uuid';






function App() {
  const [ownerToken, setOwnerToken] = useState(localStorage.getItem("ownerToken"));
useEffect(() => {
  if (!localStorage.getItem("ownerToken")) {
    const id = uuidv4();
    localStorage.setItem("ownerToken", id);
    setOwnerToken(id);
  }
}, []); 

  const [refresh, setRefresh] = useState(false)
  const triggerRefresh = () => {
    setRefresh(!refresh)
  }

  return (
  <>
    {ownerToken && <ConfessionForm ownerToken={ownerToken} onRefresh={triggerRefresh} />}
    <ConfessionList ownerToken={ownerToken} refresh={refresh} />
  </>
)

}

export default App
