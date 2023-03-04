import React from "react";
import MovieList from "./MovieList";

const MovieContent = ({ state }) => {
  const { searchedMovies } = state;
  const { results: movies } = searchedMovies;

  return (
    <main>
      <div className="movie-container">
        {movies && <MovieList movies={movies} />}
      </div>
    </main>
  );
};

export default MovieContent;
