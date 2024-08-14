/** @format */
import React from "react";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import { createSelector } from "reselect";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/orders";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import OrderService from "../../services/OrderService";

const PausedOrdersRetriver = createSelector(
   retrievePausedOrders,
   (pausedOrders) => ({ pausedOrders }),
);

const { authMember, setOrderBuilder } = useGlobals();

const deleteOrderHandler = async (e: T) => {
   try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
         orderId: orderId,
         orderStatus: OrderStatus.DELETE,
      };
      const confirmation = window.confirm("Do you want to delete order");
      if (confirmation) {
         const order = new OrderService();
         setOrderBuilder(new Date());
      }
   } catch (err) {
      console.log("Error on cancelling orders");
      sweetErrorHandling(err).then();
      throw err;
   }
};

export default function PausedOrders() {
   const { pausedOrders } = useSelector(PausedOrdersRetriver);
   return (
      <TabPanel value="1">
         <Stack gap={4}>
            {pausedOrders?.map((order: Order) => {
               return (
                  <Box
                     key={order._id}
                     className="order-main-box">
                     {order?.orderItems?.map((item: OrderItem) => {
                        const product: Product = order.productData.filter(
                           (ele: Product) => item.productId === ele._id,
                        )[0];
                        const imagePath = `${serverApi}/${product.productImages[0]}`;

                        return (
                           <Box
                              key={item._id}
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
                        </Box>

                        <Button
                           value={order._id}
                           variant="contained"
                           color="secondary"
                           className="cancel-button"
                           onClick={deleteOrderHandler}>
                           Cancel
                        </Button>
                        <Button
                           variant="contained"
                           color="success"
                           className="pay-button">
                           Payment
                        </Button>
                     </Box>
                  </Box>
               );
            })}

            {!pausedOrders ||
               (pausedOrders.length === 0 && (
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
