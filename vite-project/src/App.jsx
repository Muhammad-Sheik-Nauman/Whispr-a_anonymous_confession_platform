import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import LandingPage from './landingPage'
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
    <Router>
      <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/confessions' element={
        <>
          <ConfessionList ownerToken={ownerToken} refresh={refresh} />
          {ownerToken && <ConfessionForm ownerToken={ownerToken} onRefresh={triggerRefresh} />}
        </>
      }/>
      </Routes>
      </Router>
    </>
  )

}

export default App
