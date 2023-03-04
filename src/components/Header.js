import React, { useState } from "react";
import { Link } from "react-router-dom";
import MovieDBLogo from "./MovieDBLogo";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as Actions from "../actions";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 10px;

  .tab-control {
    display: flex;
    gap: 1em;
    justify-content: center;
    align-items: center;
  }
`;

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const state = useSelector((state) => {
    return state.state;
  });

  const dispatch = useDispatch();

  const userData = state.userData;
  const isLoggedIn = state.isLoggedIn;
  const loginText = isLoggedIn ? userData.userData.username : "Login";

  const handleLogout = () => {
    dispatch(Actions.clearUserDataAction());
    setAnchorEl(null);
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper elevation={3} square style={{ backgroundColor: "#335CFF" }}>
      <HeaderContainer>
        <div className="tab-control">
          <MovieDBLogo />
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="text" id="home">
              HOME
            </Button>
          </Link>

          <Link to="/favorite" style={{ textDecoration: "none" }}>
            <Button variant="text" id="favorite">
              FAVORITE
            </Button>
          </Link>

          <Link to="/rated" style={{ textDecoration: "none" }}>
            <Button variant="text" id="rated">
              RATED
            </Button>
          </Link>
        </div>
        <div>
          {isLoggedIn ? (
            <div>
              <Button
                variant="text"
                id="usernameBtn"
                onClick={handleMenuOpen}
                style={{ color: "white" }}
              >
                {userData.userData.username}
              </Button>
              <Menu
                id="usernameMenu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="text" id="login">
                {loginText}
              </Button>
            </Link>
          )}
        </div>
      </HeaderContainer>
    </Paper>
  );
};

export default Header;
