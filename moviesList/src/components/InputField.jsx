import React, { useState, useEffect } from 'react';
import Loader from './LoaderComponent';

function MovieDetails() {
  const [movieTitle, setMovieTitle] = useState('friends');
  const [movieData, setMovieData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setMovieTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (!import.meta.env.VITE_OMDB_API_KEY) {
        throw new Error('API key not found');
      }

      const response = await fetch(
        `http://www.omdbapi.com/?t=${movieTitle}&apikey=${import.meta.env.VITE_OMDB_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Error) {
        throw new Error(data.Error);
      }

      setMovieData(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <Loader />}
      <h1 className="text-2xl font-bold mb-4">Search Movie</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="movieTitle" className="block text-sm font-medium text-gray-700">
            {/* Movie Title: */}
          </label>
          <input
            type="text"
            id="movieTitle"
            name="movieTitle"
            value={movieTitle}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 text-red-500">Error: {errorMessage}</div>
      )}

      {movieData && (
        <div className="mt-4 flex">
          <img src={movieData.Poster} alt={movieData.Title} className="w-48 mr-4 rounded-md" />
          <div className="mt-10">
            <h2 className="text-4xl font-bold mb-2">{movieData.Title}</h2>
            <p>Year: {movieData.Year}</p>
            <p>imdb Rating: {movieData.imdbRating}</p>
            <p>Actors: {movieData.Actors}</p>
            <p>Genre: {movieData.Genre}</p>
            <p>Language: {movieData.Language}</p>
            <p>Rated: {movieData.Rated}</p>
            <p>Released: {movieData.Released}</p>
            <p>Plot: {movieData.Plot}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;