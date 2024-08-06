/** @format */

import {
   Box,
   Button,
   Container,
   Pagination,
   PortalProps,
   Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product, ProductInquery } from "../../../lib/types/product";
import { retriveProducts } from "./selector";
import { ChangeEvent, useEffect, useState } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

const actionDispatch = (dispatch: Dispatch) => ({
   setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productRetriver = createSelector(retriveProducts, (products) => ({
   products,
}));

// onAdd
interface ProductsProps {
   onAdd: (item: CartItem) => void;
}
export default function Products(props: ProductsProps) {
   const { onAdd } = props;
   const { setProducts } = actionDispatch(useDispatch());
   const { products } = useSelector(productRetriver);
   const [productSearch, setProductSearch] = useState<ProductInquery>({
      page: 1,
      limit: 8,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
      search: "",
   });

   const [searchText, setSearchText] = useState<string>("");
   const history = useHistory();

   useEffect(() => {
      const product = new ProductService();
      product
         .getProducts(productSearch)
         .then((data) => setProducts(data))
         .catch((err) => console.log(err));
   }, [productSearch]);

   useEffect(() => {
      if (searchText === "") {
         productSearch.search = "";
         setProductSearch({ ...productSearch });
      }
   }, [searchText]);

   //  handler section
   const searchCollectionHandler = (collection: ProductCollection) => {
      productSearch.page = 1;
      productSearch.productCollection = collection;
      setProductSearch({ ...productSearch });
   };

   const orderHandler = (order: string) => {
      productSearch.page = 1;
      productSearch.order = order;
      setProductSearch({ ...productSearch });
   };

   const searchProductHandler = () => {
      productSearch.search = searchText;
      setProductSearch({ ...productSearch });
   };

   const paginationHandler = (e: ChangeEvent<any>, value: number) => {
      productSearch.page = value;
      setProductSearch({ ...productSearch });
   };

   const chooseDishHandler = (id: string) => {
      console.log("productId:", id);
      history.push(`/products/${id}`);
   };

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
                           type="search"
                           name="search-dishes"
                           id="search-menu"
                           placeholder="Type here"
                           value={searchText}
                           onKeyDown={(e) => {
                              if (e.key === "Enter") searchProductHandler();
                           }}
                           onChange={(e) => {
                              setSearchText(e.target.value);
                           }}
                           className="search-dishes-input"
                        />
                        <Button
                           variant={"contained"}
                           color={"primary"}
                           className="search"
                           onClick={searchProductHandler}>
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
                        color={
                           productSearch.order === "createdAt"
                              ? "primary"
                              : "secondary"
                        }
                        onClick={() => orderHandler("createdAt")}>
                        NEW
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={
                           productSearch.order === "productPrice"
                              ? "primary"
                              : "secondary"
                        }
                        onClick={() => orderHandler("productPrice")}>
                        PRICE
                     </Button>
                     <Button
                        className="v1"
                        variant="contained"
                        color={
                           productSearch.order === "productViews"
                              ? "primary"
                              : "secondary"
                        }
                        onClick={() => orderHandler("productViews")}>
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
                           color={
                              productSearch.productCollection ===
                              ProductCollection.DISH
                                 ? "primary"
                                 : "secondary"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.DISH)
                           }>
                           DISH
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.SALAD
                                 ? "primary"
                                 : "secondary"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.SALAD)
                           }>
                           SALAD
                        </Button>

                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.DRINK
                                 ? "primary"
                                 : "secondary"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.DRINK)
                           }>
                           DRINK
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.DESSERT
                                 ? "primary"
                                 : "secondary"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.DESSERT)
                           }>
                           DESERT
                        </Button>
                        <Button
                           className="dish-btn"
                           variant="contained"
                           color={
                              productSearch.productCollection ===
                              ProductCollection.OTHER
                                 ? "primary"
                                 : "secondary"
                           }
                           onClick={() =>
                              searchCollectionHandler(ProductCollection.OTHER)
                           }>
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
                                 className={"product-cards"}
                                 onClick={() => chooseDishHandler(product._id)}>
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
                                          className={"shop-btn"}
                                          onClick={(e) => {
                                             console.log("x PRESED");
                                             onAdd({
                                                _id: product._id,
                                                quantity: 1,
                                                name: product.productName,
                                                price: product.productPrice,
                                                image: product.productImages[0],
                                             });
                                             e.stopPropagation();
                                          }}
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
                     count={
                        products.length !== 0
                           ? productSearch.page + 1
                           : productSearch.page
                     }
                     page={productSearch.page}
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
                     onChange={paginationHandler}
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
