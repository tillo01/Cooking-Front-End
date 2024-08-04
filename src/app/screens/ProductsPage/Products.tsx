/** @format */

import { Box, Button, Container, Pagination, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { transform } from "typescript";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { retriveProducts } from "./selector";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { error } from "console";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";

const actionDispatch = (dispatch: Dispatch) => ({
   setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriver = createSelector(retriveProducts, (products) => ({
   products,
}));

export default function Products() {
   const { setProducts } = actionDispatch(useDispatch());
   const { products } = useSelector(productRetriver);

   useEffect(() => {
      const product = new ProductService();
      product
         .getProducts({
            page: 1,
            limit: 8,
            order: "createdAt",
            productCollection: ProductCollection.DISH,
            search: "",
         })
         .then((data) => setProducts(data))
         .catch((err) => console.log(err));
   }, []);
   return (
      <div className="products">
         <Container>
            <Stack
               className="main-big"
               flexDirection={"column"}>
               <Stack className="avatar-big-box">
                  <Stack
                     flexDirection={"row"}
                     alignItems={"center"}>
                     <Box>
                        <p
                           style={{ display: "inline-block" }}
                           className="product-category-title">
                           Burak Restaurant
                        </p>
                     </Box>
                     <Box className="search-div">
                        <input
                           type="text"
                           name="search-dishes"
                           id="search-menu"
                           placeholder="Type here"
                           className="search-dishes-input"
                        />
                        <Button
                           variant={"contained"}
                           color={"primary"}
                           className="search">
                           SEARCH <SearchIcon className="search-icon" />
                        </Button>
                     </Box>
                  </Stack>
               </Stack>

               <Stack className="list-category-section">
                  <Stack
                     className="list-category-section-btns"
                     gap={2}
                     justifyContent={"flex-end"}>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"primary"}>
                        NEW
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"secondary"}>
                        PRICE
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={"secondary"}>
                        VIEWS
                     </Button>
                  </Stack>
               </Stack>

               <Stack className="filter-and-cards">
                  <Stack className="dishes-filter-section">
                     <Stack
                        className="dish-category"
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"primary"}>
                           DISH
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"secondary"}>
                           SALAD
                        </Button>

                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"secondary"}>
                           DRINK
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"secondary"}>
                           DESERT
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={"secondary"}>
                           OTHER
                        </Button>
                     </Stack>
                  </Stack>

                  <Stack className="product-wrapper">
                     {products.length !== 0 ? (
                        products.map((product: Product) => {
                           const imagePath = `${serverApi}/${product.productImages[0]}
                           `;
                           const sizeVolume =
                              product.productCollection ===
                              ProductCollection.DRINK
                                 ? product.productVolume + "litre"
                                 : product.productSize + " size";
                           return (
                              <Stack
                                 key={product._id}
                                 className="product-cards">
                                 <Stack
                                    className="product-img"
                                    sx={{
                                       backgroundImage: `url(${imagePath})`,
                                    }}>
                                    <div className="product-sale">
                                       {sizeVolume}
                                    </div>

                                    <Stack className="view-and-shop">
                                       <Button
                                          className="shop-btn"
                                          sx={{ left: "30px" }}>
                                          <img
                                             src="/icons/shopping-cart.svg"
                                             alt=""
                                             style={{ display: "flex" }}
                                          />
                                       </Button>
                                       <Button
                                          className="view-btn"
                                          sx={{ left: "35px" }}>
                                          <Badge
                                             badgeContent={product.productViews}
                                             color="secondary">
                                             <RemoveRedEyeIcon
                                                sx={{
                                                   color:
                                                      product.productViews === 0
                                                         ? "white"
                                                         : "black",
                                                }}
                                             />
                                          </Badge>
                                       </Button>
                                    </Stack>
                                 </Stack>

                                 <Box className="products-desc">
                                    <span className="product-title">
                                       {product.productName}
                                    </span>
                                    <div
                                       className="product-description"
                                       style={{ color: "#d7b586" }}>
                                       <MonetizationOnIcon />
                                       {product.productPrice}
                                    </div>
                                 </Box>
                              </Stack>
                           );
                        })
                     ) : (
                        <Box className="no-data">
                           Products are not available
                        </Box>
                     )}
                  </Stack>
               </Stack>

               <Stack className={"pagination-section"}>
                  <Pagination
                     count={3}
                     page={1}
                     renderItem={(item) => (
                        <PaginationItem
                           components={{
                              previous: ArrowBackIcon,
                              next: ArrowForwardIcon,
                           }}
                           {...item}
                           color="secondary"
                        />
                     )}
                  />
               </Stack>
            </Stack>
         </Container>

         <div className={"brands-logo"}>
            <Container>
               <Stack
                  flexDirection={"column"}
                  alignItems={"center"}>
                  <Stack className={"main-logo-frame"}>
                     <p className={"brand-logo"}>Our Family Brands</p>
                     <Stack className={"main-four"}>
                        <Box className={"image"}>
                           <img
                              src="/img/gurme.webp"
                              alt=""
                           />
                        </Box>
                        <Box className={"image"}>
                           <img
                              src="/img/sweets.webp"
                              alt=""
                           />
                        </Box>
                        <Box className={"image"}>
                           <img
                              src="/img/doner.webp"
                              alt=""
                           />
                        </Box>
                        <Box className={"image"}>
                           <img
                              src="/img/seafood.webp"
                              alt=""
                           />
                        </Box>
                     </Stack>
                  </Stack>
               </Stack>
            </Container>
         </div>

         <div className={"address"}>
            <Container>
               <Stack className="address-area">
                  <Box className="title">Our address</Box>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.358377995709!2d144.9630583153163!3d-37.81362797975133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5775a46d9c0c3d0!2sFederation%20Square!5e0!3m2!1sen!2sus!4v1636203122104!5m2!1sen!2sus"></iframe>
               </Stack>
            </Container>
         </div>
      </div>
   );
}
