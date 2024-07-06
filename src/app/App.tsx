/** @format */

import React from "react";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { Link, Route, Switch } from "react-router-dom";
import { About } from "./screens/About";
import { Users } from "./screens/User";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>

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
  );
}

function Home() {
  return <Container>Home</Container>;
}

export default App;
