/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { HomePageState, OrdersPageState } from "../../../lib/types/screen";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import OrdersPage from ".";

const initialState: OrdersPageState = {
   pausedOrders: [],
   processOrders: [],
   finishedOrders: [],
};

const orderspageSlice = createSlice({
   name: "OrdersPage",
   initialState,
   reducers: {
      setPausedOrders: (state, action) => {
         state.pausedOrders = action.payload;
      },
      setProcessOrders: (state, action) => {
         state.processOrders = action.payload;
      },

      setFinishedOrders: (state, action) => {
         state.finishedOrders = action.payload;
      },
   },
});

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
   orderspageSlice.actions;

const OrdersPageReducer = orderspageSlice.reducer;
export default OrdersPageReducer;
