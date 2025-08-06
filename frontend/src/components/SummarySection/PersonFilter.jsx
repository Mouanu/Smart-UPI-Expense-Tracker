// PersonFilter.jsx
import React from 'react';

const PersonFilter = ({ selectedPerson, onPersonChange, transactions }) => {
  const uniquePeople = Array.from(new Set(transactions.map(txn => txn["To/From"])));

  return (
    <div className="flex items-center gap-4">
      <label>
        Person:
        <select value={selectedPerson} onChange={(e) => onPersonChange(e.target.value)}>
          <option value="">All</option>
          {uniquePeople.map((person, idx) => (
            <option key={idx} value={person}>{person}</option>
          ))}
        </select>
      </label>
    </div>
  );
};


export default PersonFilter;
