/** @format */

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
import HomePage from ".";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrevialPopularDishes = createSelector(
   selectHomePage,
   (HomePage) => HomePage.popularDishes,
);

export const retrevialNewDishes = createSelector(
   selectHomePage,
   (HomePage) => HomePage.newDishes,
);

export const retrevialTopUsers = createSelector(
   selectHomePage,
   (HomePage) => HomePage.topUsers,
);
