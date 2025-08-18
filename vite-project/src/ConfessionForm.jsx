import { useState } from "react";
import axios from "axios";

const ConfessionForm = ({ onConfessionAdded }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post("http://localhost:5000/confessions", { content });
      setContent("");
      onConfessionAdded(); // refresh list after submit
    } catch (err) {
      console.error("Error submitting confession:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="confession-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your confession..."
        rows="4"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConfessionForm;
