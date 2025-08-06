// src/components/SummarySection/PersonWiseSummarySection.jsx

import React, { useState, useMemo } from "react";
import PieChartComponent from "../PieChartComponent.jsx";

const PersonWiseSummarySection = ({ rows = [] }) => {
  const [selectedPerson, setSelectedPerson] = useState("");

  // Memoize unique people list to prevent recomputation
 const uniquePeople = useMemo(() => {
  if (!Array.isArray(rows)) return [];
  return [...new Set(rows.map((row) => row["To/From"]).filter(Boolean))];
}, [rows]);


  // Memoize filtered transactions for selected person
  const filteredTxns = useMemo(() => {
    if (!selectedPerson) return [];
    return rows.filter((row) => row["To/From"] === selectedPerson);
  }, [rows, selectedPerson]);

  const summary = useMemo(() => {
    return filteredTxns.reduce(
      (acc, txn) => {
        const amount = parseFloat(txn["Amount"]) || 0;
        if (txn["Type"] === "Credit") {
          acc.inflow += amount;
          acc.countIn += 1;
        } else if (txn["Type"] === "Debit") {
          acc.outflow += amount;
          acc.countOut += 1;
        }
        return acc;
      },
      { inflow: 0, outflow: 0, countIn: 0, countOut: 0 }
    );
  }, [filteredTxns]);

  return (
    <div className="p-4 rounded-xl shadow-md bg-white max-w-xl mx-auto mt-6">
      <h1 className="text-xl font-semibold mb-4">🔍 Summary by UPI Partner</h1>

      <select
        value={selectedPerson}
        onChange={(e) => setSelectedPerson(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select a Person</option>
        {uniquePeople.map((person, idx) => (
          <option key={idx} value={person}>
            {person}
          </option>
        ))}
      </select>

      {selectedPerson && filteredTxns.length > 0 ? (
        <>
          <div className="bg-gray-50 p-4 rounded shadow text-sm">
            <p className="font-medium text-gray-700">
              You had{" "}
              <span className="text-blue-600">
                {summary.countIn + summary.countOut}
              </span>{" "}
              transaction(s) with{" "}
              <span className="text-blue-600">{selectedPerson}</span>.
            </p>
            <div className="mt-2 space-y-1">
              <p>
                💸 Total Outflow (sent):{" "}
                <span className="font-semibold text-red-600">
                  ₹{summary.outflow.toFixed(2)}
                </span>{" "}
                ({summary.countOut} txns)
              </p>
              <p>
                💰 Total Inflow (received):{" "}
                <span className="font-semibold text-green-600">
                  ₹{summary.inflow.toFixed(2)}
                </span>{" "}
                ({summary.countIn} txns)
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md p-4 rounded-xl mt-4">
            <h2 className="text-md font-semibold mb-3">Inflow vs Outflow</h2>
            <PieChartComponent
              inflow={summary.inflow}
              outflow={summary.outflow}
            />
          </div>
        </>
      ) : selectedPerson ? (
        <p className="text-gray-500 text-sm">No transactions found for {selectedPerson}.</p>
      ) : null}
    </div>
  );
};

export default PersonWiseSummarySection;
