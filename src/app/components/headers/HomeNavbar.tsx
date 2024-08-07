/** @format */

import {
   Box,
   Button,
   Container,
   ListItemIcon,
   Menu,
   MenuItem,
   Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { Logout } from "@mui/icons-material";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";

interface HomeNavbarProps {
   cartItems: CartItem[];
   onAdd: (item: CartItem) => void;
   onRemove: (item: CartItem) => void;
   onDelete: (item: CartItem) => void;
   onDeleteAll: () => void;
   setSignupOpen: (isOpen: boolean) => void;
   setloginOpen: (isOpen: boolean) => void;
   // anchor

   handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
   anchorEl: HTMLElement | null;
   handleCloseLogout: () => void;
   handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
   const {
      cartItems,
      onAdd,
      onRemove,
      onDelete,
      onDeleteAll,
      setSignupOpen,
      setloginOpen,
      // anchor
      handleLogoutClick,
      anchorEl,
      handleCloseLogout,
      handleLogoutRequest,
   } = props;
   // useGlobal
   const { authMember } = useGlobals();

   return (
      <div className="home-navbar">
         <Container className="navbar-container">
            <Stack className="menu">
               <Box>
                  <NavLink to={"/"}>
                     <img
                        className="brand-logo"
                        src="/icons/burak.svg"
                     />
                  </NavLink>
               </Box>

               <Stack className="links">
                  <Box className={"hover-line"}>
                     <NavLink to={"/"}>Home</NavLink>
                  </Box>
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/products"}
                        activeClassName="underline">
                        Products
                     </NavLink>
                  </Box>
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/orders"}
                           activeClassName="underline">
                           Orders
                        </NavLink>
                     </Box>
                  ) : null}
                  {authMember ? (
                     <Box className={"hover-line"}>
                        <NavLink
                           to={"/member-page"}
                           activeClassName="underline">
                           My Page
                        </NavLink>
                     </Box>
                  ) : null}
                  <Box className={"hover-line"}>
                     <NavLink
                        to={"/help"}
                        activeClassName="underline">
                        Help
                     </NavLink>
                  </Box>

                  {/* BASKET */}
                  <Basket
                     cartItems={cartItems}
                     onAdd={onAdd}
                     onRemove={onRemove}
                     onDelete={onDelete}
                     onDeleteAll={onDeleteAll}
                  />

                  {!authMember ? (
                     <Box>
                        <Button
                           onClick={() => setloginOpen(true)}
                           variant="contained"
                           className="login-button">
                           Login
                        </Button>
                     </Box>
                  ) : (
                     // img
                     <img
                        className="user-avatar"
                        src={
                           authMember?.memberImage
                              ? `${serverApi}/${authMember?.memberImage}`
                              : "/icons/default-user.svg"
                        }
                        aria-haspopup={"true"}
                        onClick={handleLogoutClick}
                        // img
                     />
                  )}
                  {/* menu */}
                  <Menu
                     anchorEl={anchorEl}
                     id="account-menu"
                     open={Boolean(anchorEl)}
                     onClose={handleCloseLogout}
                     onClick={handleCloseLogout}
                     PaperProps={{
                        elevation: 0,
                        sx: {
                           overflow: "visible",
                           filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                           mt: 1.5,
                           "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                           },
                           "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                           },
                        },
                     }}
                     transformOrigin={{ horizontal: "right", vertical: "top" }}
                     anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                     <MenuItem onClick={handleLogoutRequest}>
                        <ListItemIcon>
                           <Logout
                              fontSize="small"
                              style={{ color: "blue" }}
                           />
                        </ListItemIcon>
                        Logout
                     </MenuItem>
                  </Menu>
                  {/* menu */}
               </Stack>
            </Stack>

            <Stack className="header-frame">
               <Stack className="detail">
                  <Box className="head-main-txt">
                     World`s Most Delicous Cousine
                  </Box>
                  <Box className="wel-txt">The Choice, not just a choice</Box>
                  <Box className="service-txt">24 hours service</Box>
                  <Box className="sign-up">
                     {!authMember ? (
                        <Button
                           onClick={() => setSignupOpen(true)}
                           variant={"contained"}
                           className="signup-button">
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
