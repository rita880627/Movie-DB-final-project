const DEFAULT_CATEGORY = "now_playing";

const API_KEY = "13151291c24e84e9637955624a7c4506";

const DEFAULT_PAGE = 1;

export const LOAD_MOVIES = "LOAD_MOVIES";
export const LOAD_MOVIE_DETAILS = "LOAD_MOVIE_DETAILS";
export const TOGGLE_LOGIN_STATUS = "TOGGLE_LOGIN_STATUS";
export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export const LOAD_RATED_MOVIES = "LOAD_RATED_MOVIES";
export const LOAD_FAVORITE_MOVIES = "LOAD_FAVORITE_MOVIES";

export const loadMoviesAction = (category, pageNumber, movies) => {
  return {
    type: LOAD_MOVIES,
    payload: { category, pageNumber, movies }
  };
};

export const loadSingleMovieAction = (movieDetails) => {
  return {
    type: LOAD_MOVIE_DETAILS,
    payload: { movieDetails }
  };
};

export const toggleLoginAction = () => {
  return {
    type: TOGGLE_LOGIN_STATUS
  };
};

export const setUserDataAction = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: { userData }
  };
};

export const clearUserDataAction = () => {
  return {
    type: CLEAR_USER_DATA
  };
};

export const loadRatedMoviesAction = (ratedMovies) => {
  return {
    type: LOAD_RATED_MOVIES,
    payload: { ratedMovies }
  };
};

export const loadFavoriteMoviesAction = (favoriteMovies) => {
  return {
    type: LOAD_FAVORITE_MOVIES,
    payload: { favoriteMovies }
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch(toggleLoginAction());
    dispatch(clearUserDataAction());
  };
};

export const loadMoveDetailsAction = (movieId) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadSingleMovieAction(data));
      });
  };
};

export const loadInitialMoviesAction = () => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${DEFAULT_CATEGORY}?api_key=${API_KEY}&language=en-US&page=${DEFAULT_PAGE}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadMoviesAction(DEFAULT_CATEGORY, DEFAULT_PAGE, data));
      });
  };
};

export const loadTargetMoviesAction = (category) => {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${DEFAULT_PAGE}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadMoviesAction(category, DEFAULT_PAGE, data));
      });
  };
};

export const increasePageNumberAction = (currentCategory, currentPage) => {
  const newPage = Number(currentPage) + 1;
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${currentCategory}?api_key=${API_KEY}&language=en-US&page=${newPage}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadMoviesAction(currentCategory, newPage, data));
      });
  };
};

export const decreasePageNumberAction = (currentCategory, currentPage) => {
  const newPage = Number(currentPage) - 1;
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${currentCategory}?api_key=${API_KEY}&language=en-US&page=${newPage}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(loadMoviesAction(currentCategory, newPage, data));
      });
  };
};
