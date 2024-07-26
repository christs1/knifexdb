import React, { useState } from 'react';
import './Filters.css';

export const Filters = ({ onFilterChange }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [knifeType, setKnifeType] = useState('');

  const knifeTypes = [
    'Bayonet', 'Bowie', 'Butterfly', 'Classic', 'Falchion', 'Flip', 'Gut', 'Huntsman',
    'Karambit', 'Kukri', 'M9 bayonet', 'Navaja', 'Nomad', 'Paracord', 'Shadow', 'Skeleton',
    'Stiletto', 'Survival', 'Talon', 'Ursus'
  ];

  const handleFilterChange = () => {
    onFilterChange({ minPrice, maxPrice, knifeType });
  };

  return (
    <div className="filters">
      <div className="filter-item">
        <label>Min Price:</label>
        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Max Price:</label>
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>
      <div className="filter-item">
        <label>Knife Type:</label>
        <select value={knifeType} onChange={e => setKnifeType(e.target.value)}>
          <option value="">All</option>
          {knifeTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default Filters;
