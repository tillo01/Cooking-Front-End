/** @format */
import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishesh from "./PopularDishes";
import NewDishes from "./NewDishesh";
import Advertisiment from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrevialPopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import { log } from "console";
// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const PopularDishesRetriever = createSelector(retrevialPopularDishes, (popularDishes) => ({ popularDishes }));

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(PopularDishesRetriever);

  useEffect(() => {
    // Backend server data request => Data
    // Slice:Data => Store
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishesh />
      <NewDishes />
      <Advertisiment />
      <ActiveUsers />
      <Events />
    </div>
  );
}
