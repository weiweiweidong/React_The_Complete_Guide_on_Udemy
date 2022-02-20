import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

// const dummyMovies = [
//   {
//     id: 1,
//     title: 'Some Dummy Movie',
//     openingText: 'This is the opening text of the movie',
//     releaseDate: '2021-05-18',
//   },
//   {
//     id: 2,
//     title: 'Some Dummy Movie 2',
//     openingText: 'This is the second opening text of the movie',
//     releaseDate: '2021-05-19',
//   },
// ];

function App () {

  const [ movies, setMovies ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( false );
  const [ error, setError ] = useState( null );

  const fetchMovieHandler = useCallback( async () => {
    setIsLoading( true );
    setError( null );
    try {
      const response = await fetch( 'https://swapi.dev/api/films' );
      if ( !response.ok ) {
        throw new Error( 'Something Went Wrong!' );
      }
      const data = await response.json();
      const transformedMovies = data.results.map( movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      } );
      setMovies( transformedMovies );
    } catch ( error ) {
      setError( error.message );
    }
    setIsLoading( false );
  }, [] );

  useEffect( () => {
    fetchMovieHandler();
  }, [ fetchMovieHandler ] );

  let content = <p>Found No Movies!</p>;
  if ( movies.length > 0 ) {
    content = <MoviesList movies={ movies } />;
  }
  if ( error ) {
    content = <p>{ error }</p>;
  }
  if ( isLoading ) {
    content = <p>Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={ fetchMovieHandler }>Fetch Movies</button>
      </section>
      <section>
        {/* { !isLoading && movies.length > 0 && <MoviesList movies={ movies } /> }
        { !isLoading && movies.length === 0 && !error && <p>Found No Movies!</p> }
        { !isLoading && error && <p>{ error }</p> }
        { isLoading && <p>Loading ...</p> } */}
        { content }
      </section>
    </React.Fragment>
  );
}

export default App;
