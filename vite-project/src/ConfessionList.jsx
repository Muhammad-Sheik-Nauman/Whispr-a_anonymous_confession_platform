import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Highlighter from "react-highlight-words";



const ConfessionList = ({ refresh, ownerToken }) => {
    const [confessions, setConfessions] = useState([]);

    const [search, setSearch] = useState("");


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
    const filteredConfessions = confessions.filter((confession) =>
        confession.content.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='max-w-2xl mx-auto p-4 bg-gray-900'>
            <input type="search" placeholder="Search keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className='w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800  placeholder-gray-400' />
            <div className='overflow-y-auto scroll-behavior-smooth max-h-[70vh] space-y-4' >
                {filteredConfessions.length === 0 ? (
                    <p className='text-black text-center'>No confessions available</p>
                ) : (
                    filteredConfessions.map((confession) => (
                        <div key={confession._id}
                        className="bg-white border border-gray-200 shadow rounded-lg p-4 " >
                            <p className='text-black mb-2'><Highlighter

                                searchWords={[search]}
                                autoEscape={true}
                                textToHighlight={confession.content}
                            />
                            </p>
                            <small className='text-gray-500 block mb-3'>
                                Posted: {new Date(confession.createdAt).toLocaleString()}
                            </small>

                            {confession.ownerToken === ownerToken && (
                                <button className='px-3 py-1 bg-red-500 text-sm text-white rounded-md shadow hover:bg-red-600 transition cursor-pointer'
                                 onClick={() => handleDelete(confession._id)}>
                                    delete
                                </button>


                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConfessionList;
