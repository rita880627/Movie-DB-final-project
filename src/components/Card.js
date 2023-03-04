import React from "react";
import CardTemplate from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "../actions";
import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const API_KEY = "13151291c24e84e9637955624a7c4506";

const Card = ({ movie }) => {
  const state = useSelector((state) => {
    return state.state;
  });

  const dispatch = useDispatch();

  const moviePosterURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  let ratingText = movie.vote_average;
  let isLiked = false;

  if (state.isLoggedIn) {
    const currentRating = state.ratedMovies.ratedMovies.find(
      (movieInfo) => movieInfo.id === movie.id
    );

    ratingText = currentRating
      ? `${movie.vote_average} / ${currentRating.rating}`
      : movie.vote_average;

    const likedMovies = state.likedMovies.favoriteMovies;
    isLiked = likedMovies.some((m) => Number(m.id) === movie.id);
  }

  const handleLikedClick = async (e) => {
    if (state.isLoggedIn) {
      const accountId = state.userData.userData.accountId;
      const sessionId = state.userData.userData.sessionId;
      const favValue = !isLiked;
      const movieId = e.target.closest("div").id;

      // post data to MovieDB API
      try {
        axios.post(
          `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
          {
            media_type: "movie",
            media_id: movieId,
            favorite: favValue
          }
        );

        // fetch new data from MovieDB API
        const favoriteData = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}`
        );
        dispatch(Actions.loadFavoriteMoviesAction(favoriteData.data.results));
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <CardTemplate className="movie-card" elevation={3}>
      <img className="movie-poster" src={moviePosterURL} alt="movie poster" />
      <div className="movie-info">
        <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
          <Button variant="text" id="movieTitle">
            {movie.title}
          </Button>
        </Link>
        <div className="rating-favorite">
          <div className="movie-rating">
            <span>
              <StarOutlinedIcon style={{ color: "#edd326" }} />
            </span>
            <span>{ratingText}</span>
          </div>
          <div className="movie-liked" id={movie.id}>
            <span>
              <FavoriteBorderOutlinedIcon
                style={{
                  color: "black",
                  display: isLiked ? "none" : "block"
                }}
                onClick={handleLikedClick}
              />
            </span>

            <span>
              <FavoriteOutlinedIcon
                style={{
                  color: "red",
                  display: isLiked ? "block" : "none"
                }}
                onClick={handleLikedClick}
              />
            </span>
          </div>
        </div>
      </div>
    </CardTemplate>
  );
};

export default Card;
