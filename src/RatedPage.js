import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./components/MovieList";

const RatedPage = () => {
  const state = useSelector((state) => {
    return state.state;
  });

  const ratedMovies = state.ratedMovies.ratedMovies;

  return (
    <div className="rated-page">
      <header>
        <h1 id="ratedTitle">Rated movies</h1>
      </header>
      <main>
        <MovieList movies={ratedMovies} />
      </main>
    </div>
  );
};

export default RatedPage;
