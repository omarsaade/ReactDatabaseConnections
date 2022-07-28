import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  // fetch("https:spacex.xom").then((respone) => response.json()).then((data) => console.log(data))

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => response.json())
      //.json() bta3mul translate lal json la javscript object
      //array of object [{},{},{}]
      .then(data => {
        const transformedMovies = data.results.map(movieData => (
          //return la array of objects , li2an hye bta3mul retun la 6 object btheton bi array
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



