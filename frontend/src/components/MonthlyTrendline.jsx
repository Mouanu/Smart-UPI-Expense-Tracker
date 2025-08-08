// frontend/src/components/MonthlyTrendline.jsx

import React, { useMemo, useState } from "react";
import {
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const MonthlyTrendline = ({ transactions, type = "outflow" }) => {
  const [chartType, setChartType] = useState("line");

  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const monthlyData = useMemo(() => {
    const map = new Map();

    transactions.forEach((txn) => {
      const isDebit = txn.Type?.toLowerCase() === "debit";
      const isCredit = txn.Type?.toLowerCase() === "credit";

      const shouldInclude =
        (type === "outflow" && isDebit) ||
        (type === "inflow" && isCredit) ||
        (type === "both");

      if (shouldInclude) {
        const key = formatMonthYear(txn.Date);
        const prev = map.get(key) || 0;
        const amt = (isDebit ? -txn.Amount : txn.Amount); // debit = negative if both
        map.set(key, prev + (type === "both" ? amt : txn.Amount));
      }
    });

    const result = Array.from(map.entries()).map(([month, amount]) => ({
      month,
      amount: parseFloat(amount.toFixed(2)),
    }));

    result.sort((a, b) => {
      const da = new Date("1 " + a.month);
      const db = new Date("1 " + b.month);
      return da - db;
    });

    return result;
  }, [transactions, type]);

  const titleMap = {
    inflow: "📈 Monthly Inflow Trend",
    outflow: "📉 Monthly Outflow Trend",
    both: "🔄 Monthly Net Flow (Inflow - Outflow)",
  };

  const emptyMsg = {
    inflow: "No credit transactions available to show trend.",
    outflow: "No debit transactions available to show trend.",
    both: "No transactions available to show net flow trend.",
  };

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md border dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {titleMap[type] || "📊 Monthly Trend"}
      </h2>

      <div className="mb-6">
        <label htmlFor="chartType" className="mr-2 font-medium text-gray-800 dark:text-gray-300">
          Chart Type:
        </label>
        <select
          id="chartType"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {monthlyData.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">{emptyMsg[type]}</p>
      ) : (
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            ) : (
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#82ca9d" />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default MonthlyTrendline;
