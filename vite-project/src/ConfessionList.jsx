import React, { useState, useEffect } from 'react';
import { MoreVertical, ThumbsUp, Trash2 } from "lucide-react";
import axios from 'axios';
import Highlighter from "react-highlight-words";



const ConfessionList = ({ refresh, ownerToken }) => {
    const [confessions, setConfessions] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);

    const handleLike = async (id) => {
        try {
            await axios.post(`https://whispr-a-anonymous-confession-platform.onrender.com/confessions/${id}/like`);
            setConfessions((prev) =>
                prev.map((c) => (c._id === id ? { ...c, likes: (c.likes || 0) + 1 } : c))
            );
        } catch (err) {
            console.log(err);
        }
    };


    const handleReport = async (id) => {
        try {
            await axios.post(`https://whispr-a-anonymous-confession-platform.onrender.com/confessions/${id}/report`);
            alert("Reported! If this confession gets 15+ reports, it will be auto-deleted.");
        } catch (err) {
            console.log(err);
        }
    };


    const handleEdit = async (id, oldContent) => {
        const newText = prompt("Edit your confession:", oldContent);
        if (!newText) return;
        try {
            await axios.put(`https://whispr-a-anonymous-confession-platform.onrender.com/confessions/${id}`, {
                content: newText,
                ownerToken
            });
            setConfessions((prev) =>
                prev.map((c) => (c._id === id ? { ...c, content: newText } : c))
            );
        } catch (err) {
            console.log(err);
        }
    };

    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await axios.get("https://whispr-a-anonymous-confession-platform.onrender.com/confessions");
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
                await axios.delete(`https://whispr-a-anonymous-confession-platform.onrender.com/confessions/${id}`, {
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
        <div className=' mx-auto p-4 bg-gray-800'>
            <input type="search" placeholder="Search keywords..." value={search} onChange={(e) => setSearch(e.target.value)} className='w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-800  placeholder-gray-400' />
            <div className='overflow-y-auto scroll-behavior-smooth max-h-[70vh] space-y-4' >
                {filteredConfessions.length === 0 ? (
                    <p className='text-gray-400 text-center'>Loading...</p>
                ) : (
                    filteredConfessions.map((confession) => (
                        <div key={confession._id}
                            className="bg-white border border-gray-200 shadow rounded-lg p-4 m-2 relative" >
                            {/* 3-dot menu */}
                            <div className="absolute top-2 right-2">
                                <button
                                    onClick={() => setMenuOpen(menuOpen === confession._id ? null : confession._id)}
                                    className="p-1 rounded-full hover:bg-gray-200"
                                >
                                    <MoreVertical className="w-5 h-5 text-gray-600" />
                                </button>
                                {menuOpen === confession._id && (
                                    <div className="absolute right-0 mt-2 bg-gray-100 border border-gray-300 rounded-lg shadow-lg w-28 z-10">
                                        {confession.ownerToken === ownerToken && (
                                            <button
                                                onClick={() => { handleEdit(confession._id, confession.content); setMenuOpen(null); }}
                                                className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => { handleReport(confession._id); setMenuOpen(null); }}
                                            className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200 text-red-500"
                                        >
                                            Report
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* content */}
                            <p className='text-black mb-2 break-words'><Highlighter
                                searchWords={[search]}
                                autoEscape={true}
                                textToHighlight={confession.content}
                            />
                            </p>
                            <small className='text-gray-500 block mb-3'>
                                Posted: {new Date(confession.createdAt).toLocaleString()}
                            </small>

                            {/* Like and Delete button */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleLike(confession._id)}
                                    className="flex items-center gap-1 text-gray-600 hover:text-green-600"
                                >
                                    <ThumbsUp className="w-5 h-5" />
                                    <span>{confession.likes || 0}</span>
                                </button>

                                {confession.ownerToken === ownerToken && (
                                    <button
                                        className="flex items-center gap-1 text-gray-600 hover:text-red-600"
                                        onClick={() => handleDelete(confession._id)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                        <span>Delete</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConfessionList;
