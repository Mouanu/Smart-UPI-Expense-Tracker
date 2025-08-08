// Input: Array of transaction rows (filtered or all)
// Output: Array of objects like:
// [
//   { month: "Jan", inflow: 3200, outflow: 2800, netFlow: 400 },
//   ...
// ]
function getMonthlySummary(transactions) {
    const monthlySummary = {};
  
    transactions.forEach((row) => {
      const date = new Date(row.Date);
      const monthKey = date.getFullYear() + '-' + (date.getMonth() + 1); // e.g., "2025-1"
      const amount = parseFloat(row.Amount);
      const type = row.Type?.toLowerCase(); // "inflow" or "outflow"
  
      if (!monthlySummary[monthKey]) {
        monthlySummary[monthKey] = { inflow: 0, outflow: 0 };
      }
  
      if (type === "inflow") {
        monthlySummary[monthKey].inflow += amount;
      } else if (type === "outflow") {
        monthlySummary[monthKey].outflow += amount;
      }
    });
  
    // Convert to array and format month name
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
  }
  