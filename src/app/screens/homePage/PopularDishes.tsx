/** @format */

import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import CardOverflow from "@mui/joy/CardOverflow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Visibility } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrevialPopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

// REDUX SLICE & SELECTOR

const PopularDishesRetriever = createSelector(
   retrevialPopularDishes,
   (popularDishes) => ({ popularDishes }),
);

export default function PopularDishesh() {
   const { popularDishes } = useSelector(PopularDishesRetriever);
   console.log("popularDiihses", popularDishes);

   return (
      <div className="popular-dishes-frame">
         <Container>
            <Stack className="popular-section">
               {/* this is the category title */}
               <Box className="category-title">Popular Dishes</Box>

               <Stack className="cards-frame">
                  {popularDishes.length !== 0 ? (
                     popularDishes.map((ele: Product) => {
                        const imagePath = `${serverApi}/${ele.productImages[0]}`;
                        return (
                           <CssVarsProvider key={ele._id}>
                              <Card className="card">
                                 <CardCover>
                                    <img
                                       src={imagePath}
                                       alt=""
                                    />
                                 </CardCover>
                                 <CardCover className="card-cover" />
                                 <CardContent
                                    sx={{ justifyContent: "flex-end" }}>
                                    <Stack
                                       flexDirection={"row"}
                                       justifyContent={"space-between"}>
                                       <Typography
                                          fontSize="16px"
                                          textColor="#fff"
                                          mb={1}>
                                          {ele.productName}
                                       </Typography>
                                       <Typography
                                          sx={{
                                             fontWeight: "sm",
                                             color: "neutral.300",
                                             alignItems: "center",
                                             display: "flex",
                                          }}>
                                          {ele.productViews}
                                          <VisibilityIcon
                                             sx={{
                                                fontSize: 25,
                                                marginLeft: "5px",
                                             }}
                                          />
                                       </Typography>
                                    </Stack>
                                 </CardContent>
                                 <CardOverflow
                                    sx={{
                                       display: "flex",
                                       gap: 1.5,
                                       py: 1.5,
                                       px: "var(--Card-padding)",
                                       borderTop: "1px solid",
                                       height: "60px",
                                    }}>
                                    <Typography
                                       startDecorator={
                                          <DescriptionOutlinedIcon />
                                       }
                                       textColor="neutral.300">
                                       {ele.productDesc}
                                    </Typography>
                                 </CardOverflow>
                              </Card>
                           </CssVarsProvider>
                        );
                     })
                  ) : (
                     <Box className="no-data">
                        Popular products are not available !
                     </Box>
                  )}
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
