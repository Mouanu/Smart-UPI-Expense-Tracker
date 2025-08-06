// src/components/FilterBar.jsx
import { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [selected, setSelected] = useState("last30");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onFilterChange(value); // send to parent
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <label className="font-medium">Filter by:</label>
      <select
        className="border rounded p-2"
        value={selected}
        onChange={handleChange}
      >
        <option value="last30">Last 30 Days</option>
        <option value="thisMonth">This Month</option>
        <option value="all">All Time</option>
      </select>
    </div>
  );
};

export default FilterBar;
