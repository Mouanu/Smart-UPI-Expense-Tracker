import React, { useState, useEffect } from "react";

const DateFilter = ({ onDateChange }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [quickFilter, setQuickFilter] = useState("custom");

  useEffect(() => {
    const today = new Date();
    let from = "", to = today.toISOString().split("T")[0];

    switch (quickFilter) {
      case "last7":
        from = new Date(today.setDate(today.getDate() - 6)).toISOString().split("T")[0];
        break;
      case "last30":
        from = new Date(today.setDate(today.getDate() - 29)).toISOString().split("T")[0];
        break;
      case "thisMonth":
        const start = new Date();
        start.setDate(1);
        from = start.toISOString().split("T")[0];
        break;
      case "all":
        from = "";
        to = "";
        break;
      case "custom":
      default:
        from = fromDate;
        to = toDate;
    }

    onDateChange({ from, to });

  }, [quickFilter, fromDate, toDate]);

  return (
    <div className="space-y-2 p-4 bg-white rounded-xl shadow">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Quick Filter:</label>
        <select
          value={quickFilter}
          onChange={(e) => setQuickFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="custom">Custom</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
          <option value="thisMonth">This Month</option>
          <option value="all">All Time</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          disabled={quickFilter !== "custom"}
          className="border rounded px-2 py-1"
        />
        <label className="text-sm font-medium">To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          disabled={quickFilter !== "custom"}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
};

export default DateFilter;
