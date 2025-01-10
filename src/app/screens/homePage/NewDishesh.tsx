/** @format */

import React from "react";

import { Box, Container, Stack } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import { CardOverflow } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "../../components/divider";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrevialNewDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

// REDUX SLICE & SELECTOR

const NewDishesRetriver = createSelector(retrevialNewDishes, (newDishes) => ({
   newDishes,
}));
export default function NewDishes() {
   const { newDishes } = useSelector(NewDishesRetriver);
   console.log("NewDishesRetriver", NewDishesRetriver);

   const history = useHistory();

   const chooseDishHandler = (id: string) => {
      console.log("productId:", id);
      history.push(`/products/${id}`);
   };
   return (
      <div className="new-product-frame">
         <Container>
            <Stack className="main">
               <Box className="category-title">Popular Recipes</Box>
               <Stack className="cards-frame">
                  <CssVarsProvider>
                     {newDishes.length !== 0 ? (
                        newDishes.map((product) => {
                           const imagePath = `${serverApi}/${product.productImages[0]}`;
                           const sizeVolume =
                              product.productCollection ===
                              ProductCollection.DRINK
                                 ? product.productVolume + "l"
                                 : product.productSize + " size";

                           return (
                              <Card
                                 key={product._id}
                                 variant="outlined"
                                 className="card"
                                 onClick={() => chooseDishHandler(product._id)}>
                                 <CardOverflow>
                                    <div className="product-sale">
                                       {sizeVolume}
                                    </div>
                                    <AspectRatio ratio="1">
                                       <img
                                          src={imagePath}
                                          alt=""
                                       />
                                    </AspectRatio>
                                 </CardOverflow>
                                 <CardOverflow
                                    variant="soft"
                                    className="product-detail">
                                    <Stack className="info">
                                       <Stack flexDirection={"row"}>
                                          <Typography className="price">
                                             ${product.productPrice}
                                          </Typography>
                                       </Stack>

                                       <Stack>
                                          <Typography className="views">
                                             {product.productViews}
                                             <VisibilityIcon
                                                sx={{
                                                   fontSize: 20,
                                                   marginLeft: "5px",
                                                }}
                                             />
                                          </Typography>
                                       </Stack>
                                    </Stack>
                                    <Stack>
                                       <Typography className="title">
                                          {product.productName}
                                       </Typography>
                                    </Stack>
                                 </CardOverflow>
                              </Card>
                           );
                        })
                     ) : (
                        <Box>No data is available</Box>
                     )}
                  </CssVarsProvider>
               </Stack>
            </Stack>
         </Container>
      </div>
   );
}
