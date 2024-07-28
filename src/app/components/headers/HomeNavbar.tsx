/** @format */

import { Box, Button, Container, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState } from "react";

export default function HomeNavbar() {
  const authMember = null;
  const [count, setCount] = useState(0);
  const buttonHandler = () => {
    setCount(count + 1);
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to={"/"}>
              <img className="brand-logo" src="/icons/burak.svg" />
            </NavLink>
          </Box>

          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to={"/"}>Home</NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to={"/products"} activeClassName="underline">
                Products
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to={"/member-page"} activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to={"/help"} activeClassName="underline">
                Help
              </NavLink>
            </Box>

            {/* BASKET */}
            <Basket />

            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">
                  Login
                </Button>
              </Box>
            ) : (
              <img className="user-avatar" src="/icons/default-user.svg" aria-haspopup={true} />
            )}
          </Stack>
        </Stack>

        <Stack className="header-frame">
          <Stack className="detail">
            <Box className="head-main-txt">World`s Most Delicous Cousine</Box>
            <Box className="wel-txt">The Choice, not just a choice</Box>
            <Box className="service-txt">{count} hours service</Box>
            <Box className="sign-up">
              {!authMember ? (
                <Button variant={"contained"} className="signup-button" onClick={buttonHandler}>
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>

          <Box className="logo-frame">
            <div className="logo-img"></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
