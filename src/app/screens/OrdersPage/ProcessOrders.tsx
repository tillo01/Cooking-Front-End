/** @format */
import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import moment from "moment";

import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/orders";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";

const pausedOrdersRetriver = createSelector(
   retrieveProcessOrders,
   (processOrders) => ({ processOrders }),
);
export default function ProcessOrders() {
   const { processOrders } = useSelector(pausedOrdersRetriver);

   return (
      <TabPanel value="2">
         <Stack gap={4}>
            {processOrders?.map((order: Order) => {
               return (
                  <Box
                     key={order._id}
                     className="order-main-box">
                     {order?.orderItems?.map((item: OrderItem) => {
                        const product: Product = order.productData.filter(
                           (ele: Product) => item.productId === ele._id,
                        )[0];
                        const imagePath = `${serverApi}/${product.productImages}`;

                        return (
                           <Box
                              key={order._id}
                              className="order-name-price">
                              <Box className="order-first-box">
                                 <img
                                    src={imagePath}
                                    className="orders-dish-img"
                                    alt="Dish"
                                 />
                                 <p className="title-dish">
                                    {product.productName}
                                 </p>
                              </Box>

                              <Box className="price-box">
                                 <p>${item.itemPrice}</p>
                                 <img
                                    src="/icons/close.svg"
                                    alt="Close"
                                 />
                                 <p>{item.itemQuantity}</p>
                                 <img
                                    src="/icons/pause.svg"
                                    alt="Pause"
                                 />
                                 <p style={{ marginLeft: "15px" }}>
                                    ${item.itemQuantity * item.itemPrice}
                                 </p>
                              </Box>
                           </Box>
                        );
                     })}
                     <Box className="total-price-box">
                        <Box
                           className="box-total"
                           display="flex"
                           alignItems="center">
                           <p>Product Price</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderTotal - order.orderDelivery}
                           </p>
                           <img
                              src="/icons/plus.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Plus"
                           />
                           <p>Delivery cost</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderDelivery}
                           </p>
                           <img
                              src="/icons/pause.svg"
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}
                              alt="Pause"
                           />
                           <p>Total</p>
                           <p
                              style={{
                                 marginLeft: "10px",
                                 marginRight: "10px",
                              }}>
                              ${order.orderTotal}
                           </p>
                           <p className="data-moment">
                              {moment().format("YY-MM-DD HH:mm")}
                           </p>
                        </Box>

                        <Button
                           variant="contained"
                           style={{ background: "#3A87CB", color: "#fff" }}
                           className="cancel-button">
                           VERIFY TO FULFILL
                        </Button>
                     </Box>
                  </Box>
               );
            })}

            {!processOrders ||
               (processOrders.length === 0 && (
                  <Box
                     display={"flex"}
                     flexDirection={"row"}
                     justifyContent={"center"}>
                     <img
                        src={"/icons/noimage-list.svg"}
                        style={{ width: "300px", height: "300px" }}
                     />
                  </Box>
               ))}
         </Stack>
      </TabPanel>
   );
}
