import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ConfessionList = ({ refresh, ownerToken }) => {
    const [confessions, setConfessions] = useState([]);


    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/confessions");
                setConfessions(response.data.reverse());
            } catch (err) {
                console.log(err);
            }
        };
        fetchConfessions();
    }, [refresh]);


    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this confession?")) {
                await axios.delete(`http://localhost:5000/confessions/${id}`, {
                    data: { ownerToken }
                });
                setConfessions((prev) =>
                    prev.filter((c) => c._id.toString() !== id.toString())
                );


            }


        } catch (err) {
            console.log(err);
        }
    };
   

    
    return (
        <div style={{ overflowY: 'auto', scrollBehavior: 'smooth', maxHeight: '70vh' }} >
            {confessions.length === 0 ? (
                <p>No confessions available</p>
            ) : (
                confessions.map((confession) => (
                    <div key={confession._id} >
                        <p>{confession.content}</p>
                        <small>
                            Posted: {new Date(confession.createdAt).toLocaleString()}
                        </small>

                        {confession.ownerToken === ownerToken && (
                            <button onClick={() => handleDelete(confession._id)}>
                                delete
                            </button>


                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ConfessionList;
