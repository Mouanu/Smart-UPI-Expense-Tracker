// src/components/FileUpload.jsx
import React, { useState } from "react";
import Papa from "papaparse";
import TablePreview from "./TablePreview";
import { mapCategories } from "../utils/mapCategories";

const FileUpload = () => {
  const [parsedData, setParsedData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data;
        const categorizedData = mapCategories(rawData); // 🎯 Add this line
        setParsedData(categorizedData); // ✅ Set updated data
        setHeaders(Object.keys(categorizedData[0])); // ✅ Update headers with new keys
        console.log("Parsed & Categorized Data:", categorizedData);
      },
    });
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
        <TablePreview headers={headers} rows={parsedData} />
      )}
    </div>
  );
};

export default FileUpload;
