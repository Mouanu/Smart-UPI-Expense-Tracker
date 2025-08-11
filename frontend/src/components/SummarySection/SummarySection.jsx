import { useState, useMemo } from "react";
import GlobalSummary from "./GlobalSummary.jsx";
import PersonWiseSummarySection from "./PersonWiseSummarySection";
import DateFilter from "./DateFilter";
import PersonFilter from "./PersonFilter";
import CategorySummary from "../CategorySummary.jsx";
import MonthlyTrends from "../MonthlyTrends.jsx";
import MonthlySummaryTable from "../MonthlySummaryTable.jsx";

function SummarySection({ rows }) {
  const [selectedDateRange, setSelectedDateRange] = useState({ from: "", to: "" });
  const [selectedPerson, setSelectedPerson] = useState("");
  const [activeTab, setActiveTab] = useState("summary");

  // ✅ Filter logic
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const rowDate = new Date(row.date);
      const fromDate = selectedDateRange.from ? new Date(selectedDateRange.from) : null;
      const toDate = selectedDateRange.to ? new Date(selectedDateRange.to) : null;

      const matchesDate =
        (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);

      const matchesPerson =
        !selectedPerson || row["To/From"]?.toLowerCase() === selectedPerson.toLowerCase();

      return matchesDate && matchesPerson;
    });
  }, [rows, selectedDateRange, selectedPerson]);

  // 📌 Tabs
  const tabs = [
    { id: "summary", label: "📊 Global Summary" },
    { id: "category", label: "📂 Category Summary" },
    { id: "trends", label: "📈 Monthly Trends" },
    { id: "table", label: "📅 Monthly Table" },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 p-8 flex flex-col items-center">
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center w-full">
        <DateFilter selectedDateRange={selectedDateRange} onDateChange={setSelectedDateRange} />
        <PersonFilter
          selectedPerson={selectedPerson}
          onPersonChange={setSelectedPerson}
          transactions={filteredRows}
        />
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        
        {/* LEFT COLUMN: Tabs + Content */}
        <div className="lg:col-span-2">
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6 border-b border-gray-300">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 rounded-t-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-white border border-b-0 border-gray-300 text-blue-600"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/40">
            {activeTab === "summary" && <GlobalSummary rows={filteredRows} />}
            {activeTab === "category" && filteredRows.length > 0 && (
              <CategorySummary transactions={filteredRows} />
            )}
            {activeTab === "trends" && filteredRows.length > 0 && (
              <MonthlyTrends transactions={filteredRows} />
            )}
            {activeTab === "table" && filteredRows.length > 0 && (
              <MonthlySummaryTable transactions={filteredRows} />
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Person-wise Summary */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-xl shadow-xl border border-white/40">
          <PersonWiseSummarySection rows={rows} />
        </div>
      </div>
    </div>
  );
}

export default SummarySection;
