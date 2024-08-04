/** @format */

import React from "react";

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
import ProductsPage from "./screens/productsPage";
import OrdersPage from "./screens/OrdersPage";
import UserPage from "./screens/UserPage";
import { orange } from "@mui/material/colors";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import HelpPage from "./screens/HelpPage";
import Test from "./screens/Car";

function App() {
   const location = useLocation();
   console.log(location);

   return (
      <>
         {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
         <Switch>
            <Route path="/products">
               <ProductsPage />
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
      </>
   );
}

export default App;
