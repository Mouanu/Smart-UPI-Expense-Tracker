// src>components>SummarySection>SummarySection.jsx

import { useState, useMemo } from "react";
import GlobalSummary from "./GlobalSummary.jsx";
import PersonWiseSummarySection from "./PersonWiseSummarySection";
import DateFilter from "./DateFilter";
import PersonFilter from "./PersonFilter";
import CategorySummary from "../CategorySummary.jsx";
import MonthlyTrends from "../MonthlyTrends.jsx";
import MonthlySummaryTable from '../MonthlySummaryTable.jsx';

function SummarySection({ rows }) {
  const [selectedDateRange, setSelectedDateRange] = useState({ from: "", to: "" });
  const [selectedPerson, setSelectedPerson] = useState("");

  


  // ✅ Filter logic here (centralized)
  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      
      const rowDate = new Date(row.date);
     // console.log(rowDate)
      const fromDate = selectedDateRange.from ? new Date(selectedDateRange.from) : null;
    //  console.log(fromDate)
      const toDate = selectedDateRange.to ? new Date(selectedDateRange.to) : null;

      // Date filter
      const matchesDate =
        (!fromDate || rowDate >= fromDate) && (!toDate || rowDate <= toDate);

       // console.log(matchesDate)

      // Person filter
      const matchesPerson =
        !selectedPerson || row["To/From"]?.toLowerCase() === selectedPerson.toLowerCase();

      return matchesDate && matchesPerson;
    });
  }, [rows, selectedDateRange, selectedPerson]);

  console.log("FilterRows :",filteredRows)

  return (
    <div className="flex flex-col items-center mt-4">
      {/* Filter controls */}
      <div className="flex gap-4 mb-6">
        <DateFilter selectedDateRange={selectedDateRange} onDateChange={setSelectedDateRange} />
        <PersonFilter selectedPerson={selectedPerson} onPersonChange={setSelectedPerson} transactions={filteredRows}/>
      </div>
      
      {/* Now just pass filtered rows to summary components */}
      <GlobalSummary rows={filteredRows} />
      <PersonWiseSummarySection rows={rows} />

      {/*Category wise summary */}
      {filteredRows.length > 0 && (
  <CategorySummary transactions={filteredRows} />
  
)}
    <br/>
     {filteredRows.length > 0 && (
      <>
      <MonthlyTrends transactions={filteredRows} />
      <MonthlySummaryTable transactions={filteredRows} />
      </>
)}

    </div>
  );
}

export default SummarySection;



