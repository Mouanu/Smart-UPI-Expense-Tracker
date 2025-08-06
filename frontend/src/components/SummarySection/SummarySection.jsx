import React, { useState } from "react";
import GlobalSummary from "./GlobalSummary.jsx";
import PersonWiseSummarySection from "./PersonWiseSummarySection";
import DateFilter from "./DateFilter"; // ✅ import your new DateFilter

const SummarySection = ({ rows }) => {
  const [filteredRows, setFilteredRows] = useState(rows);

  const handleDateFilter = ({ startDate, endDate }) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const filtered = rows.filter((txn) => {
      const txnDate = new Date(txn["Date"]); // 👈 make sure the key is "Date"
      return txnDate >= start && txnDate <= end;
    });

    setFilteredRows(filtered);
  };

  return (
    <div className="space-y-6">
      {/* ✅ Global date filter */}
      <DateFilter onFilter={handleDateFilter} />

      {/* ✅ Filtered data is passed down */}
      <GlobalSummary rows={rows} />
      <PersonWiseSummarySection rows={filteredRows} />
    </div>
  );
};

export default SummarySection;
