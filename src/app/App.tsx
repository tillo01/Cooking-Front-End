/** @format */

import React, { useState } from "react";

import {
   Box,
   Button,
   ButtonGroup,
   Container,
   Stack,
   Typography,
} from "@mui/material";
import { RippleBadge } from "./components/MaterialTheme/styled";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import HomePage from "./screens/homePage";
import ProductsPage from "./screens/ProductsPage";
import OrdersPage from "./screens/OrdersPage";
import UserPage from "./screens/UserPage";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import HelpPage from "./screens/HelpPage";
import Test from "./screens/Car";
import { CartItem } from "../lib/types/search";
import useBasket from "./hooks/useBasket";
import AuthenticationModal from "./components/auth";
import MemberService from "./services/MemberService";
import { sweetErrorHandling, sweetTopSuccessAlert } from "../lib/sweetAlert";
import { Messages } from "../lib/config";
import { useGlobals } from "./hooks/useGlobals";

function App() {
   const location = useLocation();
   console.log(location);
   // hooks
   const { setAuthMember } = useGlobals();
   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
   const [signupOpen, setSignupOpen] = useState<boolean>(false);
   const [loginOpen, setloginOpen] = useState<boolean>(false);
   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

   // HNADLERS

   const handleSignupClose = () => setSignupOpen(false);
   const handleLoginClose = () => setloginOpen(false);

   const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
   };
   const handleCloseLogout = () => setAnchorEl(null);
   const handleLogoutRequest = async () => {
      try {
         const member = new MemberService();
         await member.logout();
         await sweetTopSuccessAlert("success", 700);
         setAuthMember(null);
      } catch (err) {
         console.log(err);
         sweetErrorHandling(Messages.error1);
      }
   };
   // HNADLERS

   return (
      <>
         {location.pathname === "/" ? (
            <HomeNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
               setSignupOpen={setSignupOpen}
               setloginOpen={setloginOpen}
               // anchor
               anchorEl={anchorEl}
               handleLogoutClick={handleLogoutClick}
               handleCloseLogout={handleCloseLogout}
               handleLogoutRequest={handleLogoutRequest}
               // anchor
            />
         ) : (
            <OtherNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
               setSignupOpen={setSignupOpen}
               setloginOpen={setloginOpen}
               // anchor
               anchorEl={anchorEl}
               handleLogoutClick={handleLogoutClick}
               handleCloseLogout={handleCloseLogout}
               handleLogoutRequest={handleLogoutRequest}
               // anchor
            />
         )}
         <Switch>
            <Route path="/products">
               <ProductsPage onAdd={onAdd} />
            </Route>
            <Route path="/orders">
               <OrdersPage />
            </Route>
            <Route path="/member-page">
               <UserPage />
            </Route>
            <Route path="/help">
               <HelpPage />
            </Route>
            <Route path="/">
               <HomePage />
            </Route>
         </Switch>
         <Footer />
         <AuthenticationModal
            signupOpen={signupOpen}
            loginOpen={loginOpen}
            handleLoginClose={handleLoginClose}
            handleSignupClose={handleSignupClose}
         />
      </>
   );
}

export default App;
function setAuthMember(arg0: null) {
   throw new Error("Function not implemented.");
}
