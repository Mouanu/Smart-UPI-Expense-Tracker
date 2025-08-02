// src/components/SummarySection.jsx
import React, { useState,useEffect } from "react";

const SummarySection = ({ rows }) => {
  const uniquePeople = [...new Set(rows.map(row => row["To/From"]).filter(Boolean))];
  const [selectedPerson, setSelectedPerson] = useState("");

    useEffect(() => {
    console.log("SummarySection received rows:", rows);
  }, [rows]);

  return (
    <div className="p-4 rounded-xl shadow-md bg-white max-w-xl mx-auto mt-6">
      <h1 className="text-xl font-semibold mb-4">🔍Summary by UPI Partner</h1>

      <select
        value={selectedPerson}
        onChange={(e) => setSelectedPerson(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select a Person</option>
        {uniquePeople.map((person, idx) => (
          <option key={idx} value={person}>
            {person}
          </option>
        ))}
      </select>

      {/* We'll add the total sent/received section here next */}
    </div>
  );
};

export default SummarySection;