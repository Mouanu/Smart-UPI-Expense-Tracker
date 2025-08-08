// frontend/src/components/MonthlyTrends.jsx

import React, { useState } from "react";
import MonthlyTrendline from "./MonthlyTrendline";

const MonthlyTrends = ({ transactions }) => {
  const [selectedTab, setSelectedTab] = useState("outflow");

  const tabs = [
    { label: "📉 Outflow", value: "outflow" },
    { label: "📈 Inflow", value: "inflow" },
    { label: "💰 Net Flow", value: "both" },
  ];

  return (
    <div className="w-full p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-md">
      {/* Toggle buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              selectedTab === tab.value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <MonthlyTrendline transactions={transactions} type={selectedTab} />
    </div>
  );
};

export default MonthlyTrends;
