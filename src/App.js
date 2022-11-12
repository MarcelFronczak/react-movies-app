import React from 'react';
import {useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'https://www.omdbapi.com?apikey=7c273bce';

const MovieComp = ({movie}) => {
    return(
        <div className='movie'>
            <div>
                <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
                    alt={movie.Title}
                />
            </div>
            <div>
                <span>{movie.Type}</span>
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
            </div>
        </div>
    );
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchPhrase, setSearchPhrase] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Movie');
    }, []);

    return (
        <div className='app'>
            <h1>Movie<span className='title-span'>Seeker</span></h1>
            <div className='search'>
                <input 
                    placeholder="Search for movies"
                    value={searchPhrase}
                    onChange={(e) => setSearchPhrase(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search icon"
                    onClick={() => searchMovies(searchPhrase)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieComp movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
};

export default App;