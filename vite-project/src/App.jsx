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
    
    <ConfessionList ownerToken={ownerToken} refresh={refresh} />
     {ownerToken && <ConfessionForm ownerToken={ownerToken} onRefresh={triggerRefresh} />}
  </>
)

}

export default App
