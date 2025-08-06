// GlobalSummary.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(ArcElement, Tooltip, Legend);

const GlobalSummary = ({ rows }) => {
  const totalTransactions = rows.length;
let inflow = 0;
let outflow = 0;

rows.forEach((row) => {
  const amount = parseFloat(row["Amount"]) || 0;

  if (row["Type"] === "Credit") {
    inflow += amount;
  } else if (row["Type"] === "Debit") {
    outflow += amount;
  }
});

const pieData = {
  labels: ["Inflow", "Outflow"],
  datasets: [
    {
      data: [inflow, outflow],
      backgroundColor: ["#22c55e", "#ef4444"], // green and red
      borderWidth: 1,
    },
  ],
};


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">📊 Global Summary</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-xl font-bold">{totalTransactions}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Total Inflow</p>
          <p className="text-xl font-bold text-green-600">₹{inflow.toFixed(2)}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-500">Total Outflow</p>
          <p className="text-xl font-bold text-red-600">₹{outflow.toFixed(2)}</p>
        </div>
      </div>

      <div className="w-64 mx-auto">
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default GlobalSummary;
