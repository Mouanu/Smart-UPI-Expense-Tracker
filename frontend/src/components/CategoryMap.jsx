const categorizeTransaction = (row) => {
  const toFrom = row["To/From"]?.toLowerCase() || "";
  const message = row["Message"]?.toLowerCase() || "";
  const type = row["Type"]?.toLowerCase() || "";

  let direction = "Outflow";
  if (type === "credit") direction = "Inflow";

  let category = "Other";

  if (toFrom.includes("swiggy") || toFrom.includes("zomato") || message.includes("food") || message.includes("snack")) {
    category = "Food & Dining";
  } else if (toFrom.includes("uber") || message.includes("travel")) {
    category = "Transport";
  } else if (toFrom.includes("netflix") || message.includes("entertainment")) {
    category = "Entertainment";
  } else if (type === "credit" && (message.includes("salary") || message.includes("work"))) {
    category = "Income";
  }

  return {
    ...row,
    Amount: parseFloat(row["Amount"]) || 0,
    Direction: direction,
    Category: category,
  };
};

export const mapCategories = (data) => {
  return data.map(categorizeTransaction);
};
