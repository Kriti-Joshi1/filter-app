// SearchFilter.jsx
import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="search-filter">
            <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
};

export default SearchFilter;
