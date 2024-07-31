/** @format */
import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishesh from "./PopularDishes";
import NewDishes from "./NewDishesh";
import Advertisiment from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

export default function HomePage() {
  useEffect(() => {
    // Backend server data request => Data
    // Slice:Data => Store
  });
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
