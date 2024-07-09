/** @format */

import React from "react";
import "../css/app.css";
import { Box, Button, ButtonGroup, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./components/MaterialTheme/styled";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/ProductsPage";
import { OrdersPage } from "./screens/OrdersPage";
import { UserPage } from "./screens/UserPage";
import { orange } from "@mui/material/colors";
import { HomeNavbar } from "./components/headers/HomeNavbar";
import { OtherNavbar } from "./components/headers/OtherNavbar";
import { Footer } from "./components/footer";

function App() {
  const location  = useLocation();
  console.log(location);
  

  return (

    
   <>

   {location.pathname === "/" ? <HomeNavbar/> : <OtherNavbar/> }
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
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer/>
      </>
  );
}

export default App;

// <Container sx={{ background: "orange" }}>
//   <Stack flexDirection={"column"}>
//     <Box sx={{ my: 4 }}>
//       <Typography variant="h4" component={"h4"}>
//         Create Raeact App on Typescript with Redux
//       </Typography>
//     </Box>
//     <Box>
//       <RippleBadge badgeContent={4}>
//         <Button variant="contained" color="secondary">
//           Contained
//         </Button>
//       </RippleBadge>
//     </Box>
//   </Stack>
// </Container>
