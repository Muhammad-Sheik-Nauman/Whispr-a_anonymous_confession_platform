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
        <div>
            <input type="search" placeholder="Search keywords..." value={search} onChange={(e) => setSearch(e.target.value)} />
            <div style={{ overflowY: 'auto', scrollBehavior: 'smooth', maxHeight: '70vh' }} >
                {filteredConfessions.length === 0 ? (
                    <p>No confessions available</p>
                ) : (
                    filteredConfessions.map((confession) => (
                        <div key={confession._id} >
                            <p><Highlighter

                                searchWords={[search]}
                                autoEscape={true}
                                textToHighlight={confession.content}
                            />
                            </p>
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
        </div>
    );
};

export default ConfessionList;
