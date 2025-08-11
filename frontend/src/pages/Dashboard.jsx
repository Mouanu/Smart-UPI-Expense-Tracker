import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import GlobalSummary from "../components/SummarySection/GlobalSummary.jsx";
import CategorySummary from "../components/CategorySummary.jsx";
import MonthlyTrends from "../components/MonthlyTrends.jsx";
import MonthlySummaryTable from "../components/MonthlySummaryTable.jsx";
import PersonWiseSummarySection from "../components/SummarySection/PersonWiseSummarySection.jsx";
import DateFilter from "../components/SummarySection/DateFilter.jsx";
import PersonFilter from "../components/SummarySection/PersonFilter.jsx";

const Dashboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({ from: "", to: "" });
  const [selectedPerson, setSelectedPerson] = useState("");

  // Filtered data
  const filteredRows = rows.filter(row => {
    const rowDate = new Date(row.date);
    const fromDate = selectedDateRange.from ? new Date(selectedDateRange.from) : null;
    const toDate = selectedDateRange.to ? new Date(selectedDateRange.to) : null;

    const matchesDate = (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);
    const matchesPerson = !selectedPerson || row["To/From"]?.toLowerCase() === selectedPerson.toLowerCase();

    return matchesDate && matchesPerson;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Upload + Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h1 className="text-2xl font-bold mb-4">📊 Expense Dashboard</h1>
        <FileUpload setRows={setRows} />

        {rows.length > 0 && (
          <div className="flex gap-4 mt-4">
            <DateFilter selectedDateRange={selectedDateRange} onDateChange={setSelectedDateRange} />
            <PersonFilter selectedPerson={selectedPerson} onPersonChange={setSelectedPerson} transactions={filteredRows} />
          </div>
        )}
      </div>

      {rows.length > 0 && (
        <>
          {/* KPI Summary */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <GlobalSummary rows={filteredRows} />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <CategorySummary transactions={filteredRows} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <MonthlyTrends transactions={filteredRows} />
            </div>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <PersonWiseSummarySection rows={filteredRows} />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <MonthlySummaryTable transactions={filteredRows} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
