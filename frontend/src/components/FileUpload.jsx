// src/components/FileUpload.jsx
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import TablePreview from "./TablePreview";
import { mapCategories } from "../utils/mapCategories";

const FileUpload = ({ setRows }) => {
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data.map((row) => ({
      date: row["Date"],
      person: row["To/From"],
      amount: parseFloat(row["Amount"]),
      ...row, // optional, if you want to keep the original keys too
    }));
        const categorizedData = mapCategories(rawData);
        setParsedData(categorizedData);
        setHeaders(Object.keys(categorizedData[0]));

          setRows(categorizedData);

        // 🧠 Save to localStorage
        localStorage.setItem("csvData", JSON.stringify(categorizedData));
        console.log("Parsed & Categorized Data:", categorizedData);
      },
    });
  };

  // 🔁 On mount, check for saved data
  useEffect(() => {
    const saved = localStorage.getItem("csvData");
    if (saved) {
      const data = JSON.parse(saved);
      setParsedData(data);
      setHeaders(Object.keys(data[0]));
    }
  }, []);

  // ❌ Optional: Clear saved CSV
  const handleClear = () => {
    localStorage.removeItem("csvData");
    setParsedData([]);
    setHeaders([]);
  };

  return (
    <div className="p-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4"
      />

      {parsedData.length > 0 && (
        <>
          <TablePreview headers={headers} rows={parsedData} />
          <button
            onClick={handleClear}
            className="mt-4 bg-red-500 text-white px-3 py-1 rounded"
          >
            Clear CSV
          </button>
        </>
      )}
    </div>
  );
};

export default FileUpload;
