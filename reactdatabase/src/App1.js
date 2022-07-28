import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([]);


    function fetchMoviesHandler() {
        fetch('https://swapi.dev/api/films/')
            .then((response) => response.json())
            //.json() bta3mul translate lal json la javscript object
            // response.json() hye promise reje3et
            //array of object [{},{},{}]
            //()=>{} //arrow function
            .then((data) => {
                const transformedMovies = data.results.map(movieData => (
                    //return la array of objects , li2an hye bta3mul retun la 6 object btheton bi array
                    //nehna ken fina nheta 3ade setMovies(data.results)
                    //bas li2an mabadna ngayer shi bel Movies.js text , fa 3melna i3adet tasmye men hon degre
                    {
                        id: movieData.episode_id,
                        title: movieData.title,
                        openingText: movieData.opening_crawl,
                        releaseDate: movieData.release_date
                    }

                ));
                // console.log(transformedMovies); (6)[{… }, {… }, {… }, {… }, {… }, {… }]

                setMovies(transformedMovies);
            });
    }
    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies} />
            </section>
        </React.Fragment>
    );
}

export default App;
