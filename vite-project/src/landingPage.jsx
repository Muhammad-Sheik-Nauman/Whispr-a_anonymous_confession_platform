import React from 'react'
import { useState } from 'react'
import { Info } from 'lucide-react'


import { useNavigate } from 'react-router-dom';
const LandingPage = () => {
  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);



  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center justify-center px-6 ">

        <button
          onClick={() => setshowModal(true)}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
        >
          <Info className="w-6 h-6 text-white" />
        </button>

        <img
          src="logo.png"
          alt="Logo"
          className="w-100 h-100  rounded-full invert"

        />

        <h1 className='text-5xl font-bold mb-3 font-sans '>WHISPR</h1>
        <p className='text-gray-400 uppercase tracking-widest mb-10'>ADMIT. RELEASE. RENEW</p>

        <button onClick={
          () => navigate('/confessions')
        } className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-lg font-medium shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
        >Get Started</button>


      </div>



      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative">

            <button
              onClick={() => setshowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">About WHISPR</h2>
            <p className="text-gray-300 leading-relaxed">
              WHISPR, developed by Nauman, is a safe and anonymous space to share your confessions without fear of judgment. Here, you can admit your thoughts, release your emotions, and renew your mind in a supportive environment. Respect the community—spamming and misuse are highly discouraged.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex gap-5">
                
                <a
                  href="https://www.linkedin.com/in/muhammad-sheik-nauman-811238293"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
                >
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 
        5-2.239 5-5V5c0-2.761-2.239-5-5-5zM8 19H5V9h3v10zm-1.5-11.268A1.75 
        1.75 0 1 1 8.25 6a1.75 1.75 0 0 1-1.75 1.732zM20 19h-3v-5.604c0-1.337
        -.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967V19h-3V9h2.881v1.367h.041c.401-.761
        1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601V19z"/>
                  </svg>
                </a>

                
                <a
                  href="https://x.com/SheikNauman"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter/X"
                  className="text-gray-300 hover:text-gray-400 transition cursor-pointer"
                >
                  <svg
  className="w-7 h-7"
  viewBox="0 0 1200 1227"
  fill="currentColor"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M714.163 519.284L1160.89 0H1056.84L667.137 450.887L356.58 0H0L468.106 681.821L0 1226.96H104.055L515.385 746.646L843.42 1226.96H1200L714.137 519.284H714.163ZM569.213 686.602L521.7 617.153L141.869 79.667H306.082L611.412 517.043L658.925 586.492L1056.87 1150.56H892.661L569.213 686.628V686.602Z"/>
</svg>
                </a>
              </div>

             
              <a
                href="mailto:noumansheik07@gmail.com"
                className="text-white-400 hover:underline cursor-pointer"
              >
                noumansheik07@gmail.com
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  )

}

export default LandingPage; 

