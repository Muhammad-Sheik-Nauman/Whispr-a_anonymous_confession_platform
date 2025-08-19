import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfessionList = ({ refresh, ownerToken }) => {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/confessions");
        setConfessions(response.data);
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
        setConfessions(confessions.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {confessions.length === 0 ? (
        <p>No confessions available</p>
      ) : (
        confessions.map((confession) => (
          <div key={confession._id}>
            <p>{confession.content}</p>

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
