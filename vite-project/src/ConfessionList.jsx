import { useEffect, useState } from "react";
import axios from "axios";

const ConfessionList = ({ refresh }) => {
  const [confessions, setConfessions] = useState([]);

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/confessions");
        setConfessions(res.data);
      } catch (err) {
        console.error("Error fetching confessions:", err);
      }
    };
    fetchConfessions();
  }, [refresh]); // refetch whenever refresh changes

  return (
    <div>
      <h2>Confessions</h2>
      {confessions.length === 0 ? (
        <p>No confessions yet...</p>
      ) : (
        <ul>
          {confessions.map((c) => (
            <li key={c._id}>{c.content}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConfessionList;
