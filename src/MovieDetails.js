import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./actions";
import RatingSelector from "./components/RatingSelector";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Button from "@mui/material/Button";
import axios from "axios";
import { getImgFullUrl } from "./helpers";

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Release = styled.div`
  max-height: 100px;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const API_KEY = "13151291c24e84e9637955624a7c4506";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const movieId = Number(params.id);
  const [score, setScore] = useState(1);

  const state = useSelector((state) => {
    return state.state;
  });

  useEffect(() => {
    dispatch(Actions.loadMoveDetailsAction(movieId));
  }, []);

  if (state.movieDetails.length === 0) {
    return <div>loading...</div>;
  }

  const movieInfo = state.movieDetails.movieDetails;
  const posterURL = `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`;
  const title = movieInfo.title;
  const releaseDate = movieInfo.release_date;
  const overview = movieInfo.overview;
  const rating = movieInfo.vote_average;
  const isLoggedIn = state.isLoggedIn;
  let username, sessionId;
  let yourRating = "Not yet";
  if (isLoggedIn) {
    username = state.userData.userData.username;
    sessionId = state.userData.userData.sessionId;
    const ratedMovie = state.ratedMovies.ratedMovies.filter(
      (m) => m.id === movieId
    );
    if (ratedMovie.length !== 0) {
      yourRating = ratedMovie[0].rating;
    }
  }
  
   function waitLoad() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("resolved");
      }, 500);
    });
  }

  const handleRating = async () => {
    if (isLoggedIn) {
      try {
        await axios.post(
          `https://api.themoviedb.org/3/movie/${movieId}/rating?api_key=${API_KEY}`,
          {
            value: score
          }
        );
        await waitLoad();
        const ratedData = await axios.get(
          `https://api.themoviedb.org/3/account/${username}/rated/movies?api_key=${API_KEY}&session_id=${sessionId}`
        );
        dispatch(Actions.loadRatedMoviesAction(ratedData.data.results));
      } catch (e) {
        throw e;
      }
    }

    alert("Rating updated!");
  };

  const handleRatingSelect = (e) => {
    setScore(e.target.value);
  };

  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={posterURL} alt="movie poster" />
      </ImgContainer>
      <DetailsContainer>
        <h2>{title}</h2>
        <br />
        <SectionTitle>Release date</SectionTitle>
        <Release>{releaseDate}</Release>
        <SectionTitle>Overview</SectionTitle>
        <Overview>{overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movieInfo.genres.map((genre) => {
            return <GenreItem key={genre.id}>{genre.name}</GenreItem>;
          })}
        </Container>
        <SectionTitle>Rating</SectionTitle>
        <span>
          <StarOutlinedIcon style={{ color: "#edd326" }} />
        </span>
        <span>{rating}</span>
        <div className="movie-details-your-rating-container">
          <span className="movie-details-rating-info">
            <SectionTitle>Your Rating</SectionTitle>
            <div>{yourRating}</div>
            <RatingSelector onChange={handleRatingSelect} />
          </span>
          <span>
            <Button
              id="ratingSubmitBtn"
              variant="contained"
              onClick={handleRating}
            >
              Rate it!
            </Button>
          </span>
        </div>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          {movieInfo.production_companies.map((company) => {
            return (
              <ProductionItem key={company.id}>
                <img
                  src={getImgFullUrl(company.logo_path)}
                  alt="company logo"
                />
              </ProductionItem>
            );
          })}
        </Container>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
};

export default MovieDetails;
