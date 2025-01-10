/** @format */

import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrevialNewDishes = createSelector(
   selectHomePage,
   (HomePage) => HomePage.newDishes,
);
