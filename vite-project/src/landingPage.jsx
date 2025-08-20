import React from 'react'
import { useNavigate } from 'react-router-dom';
const landingPage = () => {
  const navigate = useNavigate();

  

  return (
    <div>
        <button onClick={
            () => navigate('/confessions')
        }>get started</button>

    </div>
  )
}

export default landingPage  