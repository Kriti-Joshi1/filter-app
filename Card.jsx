import React, { useEffect, useState } from 'react';
import CardFilter from './CardFilter';
import SearchFilter from './SearchFilter';
import './Card.css';

const Card = ({ movies }) => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [sortBy, setSortBy] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [budgetFilter, setBudgetFilter] = useState(0);
    const [popularityFilter, setPopularityFilter] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 54;
    const [filteredMovies, setFilteredMovies] = useState(movies)
    const handleCardClick = (movieId) => {
        setSelectedMovie(movieId === selectedMovie ? null : movieId);
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        sortMovies()
    }, [sortBy])
    useEffect(() => {
        setFilteredMovies(movies.filter(movie => movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery])

    const handleBudgetFilterChange = (value) => {
        setBudgetFilter(value);
        setFilteredMovies(movies.filter(movie => parseInt(movie.budget) >= budgetFilter));
    };

    const handlePopularityFilterChange = (value) => {
        setPopularityFilter(value);
        setFilteredMovies(movies.filter(movie => parseFloat(movie.popularity) >= popularityFilter));
    };

    const sortMovies = () => {
        switch (sortBy) {
            case 'popularity':
                setFilteredMovies([...movies].sort((a, b) => b.popularity - a.popularity));
                break;
            case 'watchtime':
                setFilteredMovies([...movies].sort((a, b) => a.watchtime - b.watchtime));
                break;
            default:
                break;
        }
    };

    // Pagination logic
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredMovies.length / moviesPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <h1 className="text-center">Movie Filter App</h1>
            <SearchFilter
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
            />
            <CardFilter
                sortBy={sortBy}
                handleSortChange={handleSortChange}
                handleBudgetFilterChange={handleBudgetFilterChange}
                handlePopularityFilterChange={handlePopularityFilterChange}
            />
            <div className="card">
                {currentMovies.map(mov => (
                    <div
                        className={`container ${selectedMovie === mov.id ? 'active' : ''}`}
                        key={mov.id}
                        onClick={() => handleCardClick(mov.id)}
                    >
                        <p><strong>Original Title:</strong> {mov.original_title}</p>
                        {selectedMovie === mov.id && <p><strong>Overview:</strong> {mov.overview}</p>}
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredMovies.length / moviesPerPage)}>Next</button>
            </div>
        </div>
    );
};

export { Card };
