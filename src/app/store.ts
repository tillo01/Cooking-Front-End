/** @format */

import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ProductsPageReducer from "./screens/productsPage/slice";
import reduxLogger from "redux-logger";

export const store = configureStore({
   // @ts-ignore
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
   reducer: {
      homePage: HomePageReducer /** redux store bn boglandi**/,
      productsPage: ProductsPageReducer,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
