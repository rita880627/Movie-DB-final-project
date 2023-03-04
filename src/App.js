import React from "react";
import "./styles.css";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FavoritePage from "./FavoritePage";
import RatedPage from "./RatedPage";
import LoginPage from "./LoginPage";
import MoviesPage from "./MoviesPage";
import MovieDetails from "./MovieDetails";

const AppContainer = styled.div`
  max-width: 1678px;
  margin: 0 auto;
  color: #555;
  padding: 16px;
`;

export default function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/rated" element={<RatedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </AppContainer>
  );
}
