import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./components/MovieList";

const FavoritePage = () => {
  const state = useSelector((state) => {
    return state.state;
  });
  const favoriteMovies = state.likedMovies.favoriteMovies;

  return (
    <div className="favorite-page">
      <header>
        <h1 id="favoriteTitle">Favorite movies</h1>
      </header>
      <main>
        <MovieList movies={favoriteMovies} />
      </main>
    </div>
  );
};

export default FavoritePage;
