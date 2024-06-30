import React, { useState } from 'react';
import './CardFilter.css';

// CardFilter component
const CardFilter = ({
    sortBy,
    handleSortChange,
    genres,
    selectedGenre,
    handleGenreChange,
    handleBudgetFilterChange,
    handlePopularityFilterChange
}) => {
    // State declarations
    const [budget, setBudget] = useState(0); // Budget filter state
    const [popularity, setPopularity] = useState(0); // Popularity filter state

    // Handle change in budget filter
    const handleBudgetChange = (e) => {
        const value = parseInt(e.target.value);
        setBudget(value);
        handleBudgetFilterChange(value);
    };

    // Handle change in popularity filter
    const handlePopularityChange = (e) => {
        const value = parseInt(e.target.value);
        setPopularity(value);
        handlePopularityFilterChange(value);
    };

    // Return JSX
    return (
        <div className="filters">
            {/* Sort by filter */}
            <div className="filter-item">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortBy} onChange={handleSortChange}>
                    <option className='sort-value' value="">Select</option>
                    <option className='sort-value' value="popularity">Popularity</option>
                    <option className='sort-value' value="watchtime">Watch Time</option>
                </select>
            </div>

            {/* Budget range filter */}
            <div className="filter-item">
                <label htmlFor="budget">Budget Range: {budget}</label>
                <input type="range" id="budget" min="0" max="10000000" value={budget} onChange={handleBudgetChange} />
            </div>

            {/* Popularity filter */}
            <div className="filter-item">
                <label htmlFor="popularity"> Vote Average: {popularity}</label>
                <input type="range" id="popularity" min="0" max="10" value={popularity} onChange={handlePopularityChange} />
            </div>
        </div>
    );
};

export default CardFilter;
