// import { Action } from "history";
import * as Actions from "./actions";

const initialState = {
  searchedMovies: [],
  likedMovies: [],
  ratedMovies: [],
  movieDetails: [],
  userData: [],
  category: "now_playing",
  pageNumber: 1,
  isLoggedIn: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LOAD_MOVIES: {
      return {
        ...state,
        searchedMovies: action.payload.movies,
        category: action.payload.category,
        pageNumber: action.payload.pageNumber
      };
    }

    case Actions.LOAD_MOVIE_DETAILS: {
      return {
        ...state,
        movieDetails: action.payload
      };
    }

    case Actions.TOGGLE_LOGIN_STATUS: {
      const status = state.isLoggedIn === false ? true : false;
      return {
        ...state,
        isLoggedIn: status
      };
    }

    case Actions.SET_USER_DATA: {
      return {
        ...state,
        userData: action.payload
      };
    }

    case Actions.CLEAR_USER_DATA: {
      return {
        ...state,
        isLoggedIn: false,
        userData: [],
        likedMovies: [],
        ratedMovies: []
      };
    }

    case Actions.LOAD_FAVORITE_MOVIES: {
      return {
        ...state,
        likedMovies: action.payload
      };
    }

    case Actions.LOAD_RATED_MOVIES: {
      return {
        ...state,
        ratedMovies: action.payload
      };
    }

    default:
      return state;
  }
};

export default reducer;
