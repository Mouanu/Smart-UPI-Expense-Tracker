// src/components/SummarySection/GlobalSummary.jsx

import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GlobalSummary = ({ rows }) => {
  // Guard clause for empty or undefined data
  if (!rows || rows.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md text-center text-gray-500">
        <h2 className="text-lg font-semibold mb-2">📊 Global Summary</h2>
        <p>No transactions available.</p>
      </div>
    );
  }
    
  // Calculate metrics
  const totalTransactions = rows.length;
  let totalInflow = 0;
  let totalOutflow = 0;

  rows.forEach((txn) => {
    const amount = parseFloat(txn["Amount"]) || 0;
    if (txn["Type"] === "Credit") {
      totalInflow += amount;
    } else if (txn["Type"] === "Debit") {
      totalOutflow += amount;
    }
  });

    console.log("global summary ",rows)
  // Chart data
  const pieData = {
    labels: ["Inflow", "Outflow"],
    datasets: [
      {
        data: [totalInflow, totalOutflow],
        backgroundColor: ["#22c55e", "#ef4444"], // green / red
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">📊 Global Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SummaryBox title="Total Transactions" value={totalTransactions} />
        <SummaryBox
          title="Total Inflow"
          value={`₹${totalInflow.toFixed(2)}`}
          color="text-green-600"
        />
        <SummaryBox
          title="Total Outflow"
          value={`₹${totalOutflow.toFixed(2)}`}
          color="text-red-600"
        />
      </div>

      <div className="w-64 mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

// 🔁 Reusable summary card
const SummaryBox = ({ title, value, color = "text-gray-800" }) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
  </div>
);

export default GlobalSummary;
