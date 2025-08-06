// src/components/SummarySection/SummarySection.jsx
import React, { useState, useEffect } from "react";
import PieChartComponent from '../PieChartComponent.jsx'


const PersonWiseSummarySection = ({ rows }) => {
  const uniquePeople = [...new Set(rows.map(row => row["To/From"]).filter(Boolean))];
  const [selectedPerson, setSelectedPerson] = useState("");

  useEffect(() => {
    console.log("SummarySection received rows:", rows);
  }, [rows]);

  return (
    <>
    
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

      {selectedPerson && (() => {
        const filteredTxns = rows.filter(row => row["To/From"] === selectedPerson);

        const { inflow, outflow, countIn, countOut } = filteredTxns.reduce((acc, txn) => {
          const amount = parseFloat(txn["Amount"]) || 0;
          if (txn["Type"] === "Credit") {
            acc.inflow += amount;
            acc.countIn += 1;
          } else if (txn["Type"] === "Debit") {
            acc.outflow += amount;
            acc.countOut += 1;
          }
          return acc;
        }, { inflow: 0, outflow: 0, countIn: 0, countOut: 0 });

        return (
          <>
          
          <div className="bg-gray-50 p-4 rounded shadow text-sm">
            <p className="font-medium text-gray-700">
              You had <span className="text-blue-600">{countIn + countOut}</span> transaction(s) with <span className="text-blue-600">{selectedPerson}</span>.
            </p>
            <div className="mt-2 space-y-1">
              <p>💸 Total Outflow (sent): <span className="font-semibold text-red-600">₹{outflow.toFixed(2)}</span> ({countOut} txns)</p>
              <p>💰 Total Inflow (received): <span className="font-semibold text-green-600">₹{inflow.toFixed(2)}</span> ({countIn} txns)</p>
              
            </div>
          </div>
          <div className="bg-white shadow-md p-4 rounded-xl">
            <h2 className="text-md font-semibold mb-3">Inflow vs Outflow</h2>
            <PieChartComponent inflow={inflow} outflow={outflow} />
          </div>

          </>
        );
      })()}
    </div>
    </>
  );
};

export default PersonWiseSummarySection;
