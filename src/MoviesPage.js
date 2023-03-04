import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./actions";
import Pagination from "./components/Pagination";
import MovieContent from "./components/MovieContent";

const MoviesPage = () => {
  const state = useSelector((state) => {
    return state.state;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Actions.loadInitialMoviesAction());
  }, []);

  const totalPage = state.searchedMovies.total_pages;
  const currentPage = state.pageNumber;
  const currentCategory = state.category;

  const handleCategoryChange = (e) => {
    dispatch(Actions.loadTargetMoviesAction(e.target.value));
  };

  const handlePageChange = (e) => {
    const target = e.target.id;

    if (currentPage < totalPage) {
      if (target === "nextBtn") {
        dispatch(
          Actions.increasePageNumberAction(currentCategory, currentPage)
        );
      }
    }

    if (currentPage > 1) {
      if (target === "prevBtn") {
        dispatch(
          Actions.decreasePageNumberAction(currentCategory, currentPage)
        );
      }
    }
  };

  return (
    <div className="movies-page">
      <header className="movies-page-control-bar">
        <Pagination
          currentPage={currentPage}
          totalPage={totalPage}
          onChange={handleCategoryChange}
          onClick={handlePageChange}
        />
      </header>
      <main>
        <MovieContent state={state} />
      </main>
    </div>
  );
};

export default MoviesPage;
