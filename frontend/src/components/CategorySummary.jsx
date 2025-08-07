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

// Helper: title case
const toTitleCase = (str) =>
  str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1).toLowerCase());

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0d911", "#d46b08", "#13c2c2",
  "#eb2f96", "#fa8c16", "#36cfc9", "#b37feb"
];

const CategorySummary = ({ transactions }) => {
  const [chartType, setChartType] = useState("pie");

  const { chartData, totalExpense, topCategoriesWithDetails } = useMemo(() => {
    const summary = {};
    const detailsMap = {};
    let total = 0;

    transactions.forEach((txn) => {
      const direction = txn.Direction?.toLowerCase();
      if (direction !== "outflow") return;

      const category = txn.Category || "Uncategorized";
      const amount = parseFloat(txn.Amount) || 0;
      const entity = txn["To/From"] || "Unknown";

      // Sum per category
      if (!summary[category]) summary[category] = 0;
      summary[category] += amount;

      // Track per entity inside category
      if (!detailsMap[category]) detailsMap[category] = {};
      if (!detailsMap[category][entity]) detailsMap[category][entity] = 0;
      detailsMap[category][entity] += amount;

      total += amount;
    });

    const data = Object.entries(summary).map(([category, value]) => ({
      category,
      value,
    }));

    const topCategories = data
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(({ category, value }) => {
        const entities = Object.entries(detailsMap[category])
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5) // Show top 5 contributing entities
          .map(([entity, amt]) => ({ entity, amount: amt }));

        return {
          category,
          value,
          entities,
        };
      });

    return {
      chartData: data,
      totalExpense: total,
      topCategoriesWithDetails: topCategories,
    };
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis dataKey="category" tickFormatter={toTitleCase} stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Top 3 Categories */}
      <div className="p-4">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
    🎯 Top 3 Categories
  </h2>

  <div className="flex flex-col md:flex-row gap-6">
    {topCategoriesWithDetails.map(({ category, value, entities }, index) => {
      const bgColors = [
        "bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300",
        "bg-gradient-to-r from-amber-100 via-yellow-200 to-yellow-300",
        "bg-gradient-to-r from-indigo-100 via-indigo-200 to-indigo-300",
      ];
      const bgColor = bgColors[index % bgColors.length];

      const emojiMap = {
        "food & dining": "🍽️",
        transport: "🚗",
        shopping: "🛍️",
        groceries: "🧺",
        entertainment: "🎮",
        utilities: "💡",
        health: "🩺",
        travel: "✈️",
        education: "🎓",
        personal: "🧍",
        rent: "🏠",
        others: "📦",
      };

      const emoji = emojiMap[category.toLowerCase()] || "📁";

      return (
        <div
          key={category}
          className={`flex-1 p-5 rounded-xl ${bgColor} shadow-md transform transition-transform hover:scale-105`}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            {emoji} {toTitleCase(category)} – ₹{value.toFixed(2)}
          </h3>
          <ul className="ml-4 mt-1 text-sm text-gray-700 dark:text-gray-100 list-disc space-y-1">
            {entities.map((item) => (
              <li key={item.entity}>
                {item.entity}: ₹{item.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      );
    })}
  </div>
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
                  idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : ""
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
