import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            // https://developer.mozilla.org/en-US/docs/Web/API/Response
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }
            //its better to check it before the await

            const data = await response.json();
            const transformedMovies = data.results.map(movieData => (

                {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                }

            ));
            // console.log(transformedMovies); (6)[{… }, {… }, {… }, {… }, {… }, {… }]

            setMovies(transformedMovies);

        } catch (error) {
            // console.log(error.message); //Something went wrong!
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p>Found no movies.</p>; //fia tkun he by default
    if (movies.length > 0) { content = <MoviesList movies={movies} /> }
    if (error) { content = <p>{error}</p> }
    if (isLoading) { content = <p>Loading...</p> }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;

