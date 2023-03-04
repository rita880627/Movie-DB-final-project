import React from "react";
import Card from "./Card";

const MovieList = ({ movies, isLoggedIn }) => {
  return (
    <div className="movies">
      {movies?.map((movie) => (
        <Card key={movie.id} movie={movie} isLoggedIn={isLoggedIn} />
      ))}
    </div>
  );
};

export default MovieList;
