function DateFilter({ selectedDateRange, onDateChange }) {
  const handleFromDateChange = (e) => {
    onDateChange({ ...selectedDateRange, from: e.target.value });
  };

  const handleToDateChange = (e) => {
    onDateChange({ ...selectedDateRange, to: e.target.value });
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold">Filter by Date</label>
      <div className="flex gap-2">
        <input
          type="date"
          value={selectedDateRange.from}
          onChange={handleFromDateChange}
          className="border rounded px-2 py-1"
        />
        <input
          type="date"
          value={selectedDateRange.to}
          onChange={handleToDateChange}
          className="border rounded px-2 py-1"
        />
      </div>
    </div>
  );
}

export default DateFilter;
