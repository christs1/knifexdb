import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './CSS/Knives.css';
import all_knives from '../Components/Assets/all_knifes';
import Item from '../Components/Knife/Knife';

const ITEMS_PER_PAGE = 30;

export const Knives = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const filteredItems = all_knives.filter(knife =>
    knife.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className='knives'>
      <h1>All Knives</h1>
      <input
        type="text"
        placeholder="Search for Knives..."
        className="search-bar"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
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
