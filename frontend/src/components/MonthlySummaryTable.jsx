import React from "react";

const MonthlySummaryTable = ({ transactions }) => {
  const getMonthlySummary = (transactions) => {
    const monthlySummary = {};

    transactions.forEach((row) => {
      const date = new Date(row.Date);
      const monthKey = date.getFullYear() + '-' + (date.getMonth() + 1);
      const amount = parseFloat(row.Amount);
      const type = row.Type?.toLowerCase();

      if (!monthlySummary[monthKey]) {
        monthlySummary[monthKey] = { inflow: 0, outflow: 0 };
      }

      if (type === "credit") {
        monthlySummary[monthKey].inflow += amount;
      } else if (type === "debit") {
        monthlySummary[monthKey].outflow += amount;
      }
    });

    const summaryArray = Object.entries(monthlySummary).map(([key, value]) => {
      const [year, monthNum] = key.split("-");
      const monthName = new Date(year, monthNum - 1).toLocaleString("default", { month: "short" });
      const netFlow = value.inflow - value.outflow;

      return {
        month: `${monthName} ${year}`,
        inflow: Math.round(value.inflow),
        outflow: Math.round(value.outflow),
        netFlow: Math.round(netFlow),
      };
    });

    return summaryArray;
  };

  const monthlyData = getMonthlySummary(transactions);

  return (
    <div className="mt-10">
  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
    📆 Monthly Summary
  </h2>

  <div className="overflow-x-auto rounded-lg shadow">
    <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
      <thead className="bg-blue-50">
        <tr>
          <th className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">
            Month
          </th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">
            Inflow
          </th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">
            Outflow
          </th>
          <th className="px-6 py-3 text-left font-semibold text-gray-700 tracking-wider">
            Net Flow
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {monthlyData.map((entry) => (
          <tr
            key={entry.month}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-6 py-3 font-medium text-gray-900">{entry.month}</td>
            <td className="px-6 py-3 text-green-600 font-medium">
              +₹{entry.inflow}
            </td>
            <td className="px-6 py-3 text-red-600 font-medium">
              -₹{entry.outflow}
            </td>
            <td
              className={`px-6 py-3 font-semibold ${
                entry.netFlow >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              {entry.netFlow >= 0 ? "+" : "-"}₹{Math.abs(entry.netFlow)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MonthlySummaryTable;
