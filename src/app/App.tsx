/** @format */

import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch } from "react-router-dom";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/ProductsPage";
import { OrdersPage } from "./screens/OrdersPage";
import { UserPage } from "./screens/UserPage";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">HomePage</Link>
          </li>
          <li>
            <Link to="/products">ProductsPage</Link>
          </li>
          <li>
            <Link to="/orders">OrdersPage</Link>
          </li>
          <li>
            <Link to="/member-page">UserPage</Link>
          </li>
        </ul>
      </nav>

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
    </div>
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
