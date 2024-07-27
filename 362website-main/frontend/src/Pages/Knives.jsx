import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CSS/Knives.css';
import all_knives from '../Components/Assets/all_knifes';
import Item from '../Components/Knife/Knife';

const ITEMS_PER_PAGE = 30;

export const Knives = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromURL = searchParams.get('category') || '';

  useEffect(() => {
    setFilterCategory(categoryFromURL);
  }, [categoryFromURL]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const filteredItems = all_knives.filter(knife =>
    (!searchQuery || knife.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (!filterCategory || knife.category.toLowerCase() === filterCategory.toLowerCase()) &&
    (!minPrice || knife.knife_price >= parseFloat(minPrice)) &&
    (!maxPrice || knife.knife_price <= parseFloat(maxPrice))
  );

  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setFilterCategory('');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className='knives'>
      <h1>All Knives</h1>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Search for Knives..."
          className="search-bar"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <select
          onChange={e => setFilterCategory(e.target.value)}
          value={filterCategory}
          className="filter-category"
        >
          <option value="">All Categories</option>
          {Array.from(new Set(all_knives.map(knife => knife.category))).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Price"
          className="price-filter"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="price-filter"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <button onClick={handleClearFilters} className="clear-filters">Clear Filters</button>
      </div>
      <div className='knife-grid'>
        <div className='all-knives'>
          {currentItems.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} knife_price={item.knife_price} />
          ))}
        </div>
      </div>
      <div className='pagination'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default Knives;
