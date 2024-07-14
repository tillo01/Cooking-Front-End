/** @format */
import React from "react";
import { Container } from "@mui/material";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChoosenProduct from "./ChoosenProduct";
import Products from "./Products";

export default function ProductsPage() {
  const products = useRouteMatch();
  console.log("products,", products);

  return (
    <div className="produucts-page">
      <Switch>
        <Route path={`${products.path}/:productId`}>
          <ChoosenProduct />
        </Route>
        <Route path={`${products.path}`}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
