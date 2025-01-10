/** @format */

import React, { useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setChoosenProduct, setProducts, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { retriveChoosenProduct, retriveRestaurant } from "./selector";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import Typography from "@mui/joy/Typography";

const actionDispatch = (dispatch: Dispatch) => ({
   setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
   setChoosenProduct: (data: Product) => dispatch(setChoosenProduct(data)),
});

const ChoosenProductRetriver = createSelector(
   retriveChoosenProduct,
   (choosenProduct) => ({
      choosenProduct,
   }),
);
const restaurantRetriver = createSelector(retriveRestaurant, (restaurant) => ({
   restaurant,
}));

interface ChoosenProductProps {
   onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChoosenProductProps) {
   const { onAdd } = props;
   const { productId } = useParams<{ productId: string }>();
   const { setRestaurant, setChoosenProduct } = actionDispatch(useDispatch());
   const { choosenProduct } = useSelector(ChoosenProductRetriver);
   const { restaurant } = useSelector(restaurantRetriver);

   useEffect(() => {
      const product = new ProductService();
      product
         .getProduct(productId)
         .then((data) => {
            setChoosenProduct(data);
         })
         .catch((err) => console.log(err));
      const member = new MemberService();
      member
         .getRestaurant()
         .then((data) => {
            setRestaurant(data);
         })
         .catch((err) => console.log(err));
   }, []);
   if (!choosenProduct) return null;
   return (
      <div className={"chosen-product"}>
         <Box className={"title"}>Product Detail</Box>
         <Container className={"product-container"}>
            <Stack className={"chosen-product-slider"}>
               <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="swiper-area">
                  {choosenProduct?.productImages.map(
                     (ele: string, index: number) => {
                        const imagePath = `${serverApi}/${ele}`;
                        return (
                           <SwiperSlide key={index}>
                              <img
                                 className="slider-image"
                                 src={imagePath}
                              />
                           </SwiperSlide>
                        );
                     },
                  )}
               </Swiper>
            </Stack>
            <Stack className={"chosen-product-info"}>
               <Box className={"info-box"}>
                  <strong className={"product-name"}>
                     {choosenProduct.productName}
                  </strong>
                  <span className={"resto-name"}>{restaurant?.memberNick}</span>
                  <span className={"resto-name"}>
                     {restaurant?.memberPhone}
                  </span>
                  <Box className={"rating-box"}>
                     <Rating
                        name="half-rating"
                        defaultValue={2.5}
                        precision={0.5}
                     />
                     <div className={"evaluation-box"}>
                        <div className={"product-view"}>
                           <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                           <span>{choosenProduct?.productViews}</span>
                        </div>
                     </div>
                  </Box>
                  <p className={"product-desc"}>
                     {choosenProduct?.productDesc
                        ? choosenProduct?.productDesc
                        : "No Description "}
                  </p>

                  <Divider
                     height="1"
                     width="100%"
                     bg="#000000"
                  />
                  <div className={"product-price"}>
                     <span>Price:</span>
                     <span>{choosenProduct?.productPrice}$</span>
                  </div>
               </Box>
            </Stack>
         </Container>
      </div>
   );
}
