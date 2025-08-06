
const categorizeTransaction = (row) => {
  const toFrom = (row["To/From"] || "").toLowerCase();
  const message = (row["Message"] || "").toLowerCase();
  const type = (row["Type"] || "").toLowerCase();

  let direction = type === "credit" ? "Inflow" : "Outflow";
  let category = "Other";

  const keywords = {
    "Food & Dining": ["swiggy", "zomato", "domino", "food", "snack"],
    "Transport": ["uber", "ola", "train", "metro", "travel", "cab","bus"],
    "Shopping": ["amazon", "flipkart", "myntra", "store", "shopping"],
    "Entertainment": ["netflix", "hotstar", "bookmyshow", "movie", "game"],
    "Recharge & Bills": ["electricity", "water", "gas", "recharge", "jio", "airtel", "bill"],
    "Friends & Family": ["mom", "dad", "bhai", "maa", "papa", "cousin", "friend"],
    "Income": ["salary", "stipend", "credited by", "pay", "cashback"],
  };

  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some((word) => toFrom.includes(word) || message.includes(word))) {
      category = cat;
      break;
    }
  }

  return {
    ...row,
    Amount: parseFloat(row["Amount"]) || 0,
    Direction: direction,
    Category: category,
  };
};


export const mapCategories = (data) => data.map(categorizeTransaction);
