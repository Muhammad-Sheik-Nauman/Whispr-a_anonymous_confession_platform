import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const ConfessionForm = ({onRefresh, ownerToken}) => {
    const [text, setText] = useState('')
    
    return (
        <>
            <form className='fixed bottom-0   w-full bg-gray-900 p-4 flex items-center  gap-2 border-t border-gray-700'
             onSubmit={async (e) => {
                e.preventDefault();
                try{

                   await axios.post("https://whispr-a-anonymous-confession-platform.onrender.com/",{content:text, ownerToken:ownerToken})
                    setText("");
                    onRefresh();
                }catch(err){
                    console.log(err)
                }
                
            }
            }>

                <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='write your confession...'className='rounded-full bg-gray-800 text-white  placeholder-gray-400 border border-gray-300 flex-1 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-green-500'  />
                <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-medium hover:scale-105 transform transition duration-300">submit</button>

            </form>
        </>
    )
}

export default ConfessionForm