import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const ConfessionForm = ({onRefresh, ownerToken}) => {
    const [text, setText] = useState('')

    return (
        <>
            <form onSubmit={async (e) => {
                e.preventDefault();
                try{
                
                   await axios.post("http://localhost:5000/confessions",{content:text, ownerToken:ownerToken})
                    setText("");
                    onRefresh();
                }catch(err){
                    console.log(err)
                }
                
            }
            }>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                <button>submit</button>

            </form>
        </>
    )
}

export default ConfessionForm