/** @format */

import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import { CardContent, CardCover, CssVarsProvider, Divider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const activeUsers = [
  { productName: "Martin", imagePath: "/img/martin.webp" },
  { productName: "Justin", imagePath: "/img/justin.webp" },
  { productName: "Rose", imagePath: "/img/rose.webp" },
  { productName: "Nusret", imagePath: "/img/nusret.webp" },
];

export default function ActiveUsers() {
  return (
    <div className="active-users-frame">
      <Container>
        <Stack className="main">
          <Box className="category-title">Active Users</Box>
          <Stack className="cards-frame">
            {activeUsers.length !== 0 ? (
              activeUsers.map((ele, index) => {
                return (
                  <CssVarsProvider key={index}>
                    <Card className="card">
                      <CardOverflow className="card-body">
                        <AspectRatio ratio="1">
                          <img src={ele.imagePath} alt="" />
                        </AspectRatio>
                      </CardOverflow>

                      <CardOverflow>
                        <CardContent>
                          <Typography className="users-detail" level="body-md" fontWeight="md" textColor="text.secondary">
                            {ele.productName}
                          </Typography>
                        </CardContent>
                      </CardOverflow>
                    </Card>
                  </CssVarsProvider>
                );
              })
            ) : (
              <Box className="no-data">No Active Users</Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
