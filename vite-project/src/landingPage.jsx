import React from 'react'



import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();



  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-6 ">
        <img
          src="logo.png"
          alt="Logo"
          className="w-100 h-100  rounded-full invert"

        />

        <h1 className='text-5xl font-bold mb-3 font-sans '>WHISPR</h1>
        <p className='text-gray-400 uppercase tracking-widest mb-10'>ADMIT. RELEASE. RENEW</p>
        
        <button onClick={
          () => navigate('/confessions')
        } className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-lg font-medium shadow-lg hover:scale-105 transform transition duration-300"
        >Get Started</button>
        

      </div>
    </>
  )
}

export default LandingPage;

