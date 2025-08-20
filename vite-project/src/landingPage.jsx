import React from 'react'



import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();

  

  return (
    <div>
        <img src="logo.jpeg" alt="Logo" height={150}/>
        <button onClick={
            () => navigate('/confessions')
        }>get started</button>

    </div>
  )
}

export default LandingPage;