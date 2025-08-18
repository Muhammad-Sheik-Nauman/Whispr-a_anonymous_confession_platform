import { useState } from "react";
import ConfessionForm from "./ConfessionForm";
import ConfessionList from "./ConfessionList";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleConfessionAdded = () => {
    setRefresh((prev) => !prev); // toggle to re-fetch list
  };

  return (
    <div>
      <h1>Anonymous Confessions</h1>
      <ConfessionForm onConfessionAdded={handleConfessionAdded} />
      <ConfessionList refresh={refresh} />
    </div>
  );
}

export default App;
