// src>pages>Home.jsx
import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import SummarySection from "../components/SummarySection/SummarySection.jsx"; // ✅ import


const Home = () => {
  const [rows, setRows] = useState([]); // ⬅️ shared state

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-xl font-bold mb-4">📂 Upload your UPI CSV</h1>

      {/* Pass setter to FileUpload */}
      <FileUpload setRows={setRows} />

     { /*<GlobalSummary rows={rows}/> */}

      {/* Show summary only after CSV is parsed */}
      {rows.length > 0 && <SummarySection rows={rows} />}

    </div>
  );
};

export default Home;
