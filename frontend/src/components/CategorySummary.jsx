import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Helper: title case formatter
const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());

// Helper: normalize object keys to lowercase
const normalizeKeys = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  );

// Chart colors
const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0d911", "#d46b08", "#13c2c2",
  "#eb2f96", "#fa8c16", "#36cfc9", "#b37feb"
];

const CategorySummary = ({ transactions }) => {
  const [chartType, setChartType] = useState("pie");

  const { chartData, totalExpense } = useMemo(() => {
    const summary = {};
    let total = 0;

    transactions.forEach((txn) => {
      const normalizedTxn = normalizeKeys(txn);
      const rawCategory = normalizedTxn["category"] || "Uncategorized";
      const category = rawCategory.toLowerCase();
      const amount = Number(normalizedTxn["amount"]) || 0;

      summary[category] = (summary[category] || 0) + amount;
      total += amount;
    });

    const data = Object.entries(summary).map(([category, value]) => ({
      category,
      value,
    }));

    return { chartData: data, totalExpense: total };
  }, [transactions]);

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 w-full max-w-4xl mx-auto mt-8 border dark:border-gray-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          📊 Category-wise Spending Summary
        </h2>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        >
          <option value="pie">Pie Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-72 mb-6">
        <ResponsiveContainer>
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category }) => toTitleCase(category)}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis
                dataKey="category"
                tickFormatter={toTitleCase}
                stroke="#888"
              />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="overflow-x-auto">
  <table className="min-w-full text-sm text-left border-separate border-spacing-y-2">
    <thead>
      <tr className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg">
        <th className="p-3 rounded-l-lg">Category</th>
        <th className="p-3">Total Spent (₹)</th>
        <th className="p-3 rounded-r-lg">% of Spending</th>
      </tr>
    </thead>
    <tbody>
      {chartData.map((item, idx) => (
        <tr
          key={item.category}
          className={`bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition duration-200 ${
            idx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''
          }`}
        >
          <td className="p-3 rounded-l-lg font-medium text-gray-800 dark:text-white">
            {toTitleCase(item.category)}
          </td>
          <td className="p-3 text-blue-700 dark:text-blue-300 font-semibold">
            ₹{item.value.toFixed(2)}
          </td>
          <td className="p-3 rounded-r-lg text-green-600 dark:text-green-300">
            {((item.value / totalExpense) * 100).toFixed(2)}%
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default CategorySummary;
