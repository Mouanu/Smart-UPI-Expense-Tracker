import React, { useState } from "react";

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilter({ startDate, endDate });
    } else {
      alert("Please select both start and end dates.");
    }
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    onFilter({ startDate: null, endDate: null }); // optional: reset to full data
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <label className="flex flex-col text-sm">
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-2 py-1 mt-1"
        />
      </label>

      <label className="flex flex-col text-sm">
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-2 py-1 mt-1"
        />
      </label>

      <div className="flex gap-2 mt-2 sm:mt-5">
        <button
          onClick={handleFilter}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Apply Filter
        </button>

        <button
          onClick={handleClear}
          className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DateFilter;
