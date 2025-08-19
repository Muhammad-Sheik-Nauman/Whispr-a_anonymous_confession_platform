import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';

const ConfessionList = ({refresh, ownerToken}) => {
    const [confessions, setConfessions] = useState([]);

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/confessions")
                setConfessions(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchConfessions();
    }, [refresh])



    return (
        <div>
            {confessions.length === 0 ? (
                <p>No confessions available</p>
            ) : (
                confessions.map((confession) => (
                    <div key={confession._id}>
                        <p>{confession.content}</p>
                    </div>
                ))
            )}

        </div>
    );

};
export default ConfessionList