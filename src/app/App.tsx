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

function App() {
   const location = useLocation();
   console.log(location);

   const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
   const [signupOpen, setSignupOpen] = useState<boolean>(false);
   const [loginOpen, setloginOpen] = useState<boolean>(false);

   // HNADLERS

   const handleSignupClose = () => setSignupOpen(false);
   const handleLoginClose = () => setloginOpen(false);

   return (
      <>
         {location.pathname === "/" ? (
            <HomeNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
            />
         ) : (
            <OtherNavbar
               cartItems={cartItems}
               onAdd={onAdd}
               onRemove={onRemove}
               onDelete={onDelete}
               onDeleteAll={onDeleteAll}
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
