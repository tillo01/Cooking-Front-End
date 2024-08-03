/** @format */

import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import {
   CardContent,
   CardCover,
   CssVarsProvider,
   Divider,
   Typography,
} from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrevialTopUsers } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import PopularDishesh from "./PopularDishes";
import { Member } from "../../../lib/types/member";

const TopUsersRetriver = createSelector(retrevialTopUsers, (topUsers) => ({
   topUsers,
}));

export default function ActiveUsers() {
   const { topUsers } = useSelector(TopUsersRetriver);
   console.log("topSuers", topUsers);

   return (
      <div className="active-users-frame">
         <Container>
            <Stack className="main">
               <Box className="category-title">Active Users</Box>
               <Stack className="cards-frame">
                  {topUsers.length !== 0 ? (
                     topUsers.map((member: Member) => {
                        const imagePath = `${serverApi}/${member.memberImage}`;
                        return (
                           <CssVarsProvider key={member._id}>
                              <Card className="card">
                                 <CardOverflow className="card-body">
                                    <AspectRatio ratio="1">
                                       <img
                                          src={imagePath}
                                          alt=""
                                       />
                                    </AspectRatio>
                                 </CardOverflow>

                                 <CardOverflow>
                                    <CardContent>
                                       <Typography
                                          className="users-detail"
                                          level="body-md"
                                          fontWeight="md"
                                          textColor="text.secondary">
                                          {member.memberNick}
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
