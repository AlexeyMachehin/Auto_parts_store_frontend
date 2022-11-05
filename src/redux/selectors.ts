import { RootState } from "./store";
import { createSelector } from "@reduxjs/toolkit";

const select = (state: RootState) => state;

export const selectorAllProducts = createSelector(
  [select],
  (store) => store.products.products
);

export const selectorProductsInCart = createSelector(
  [select],
  (store) => store.products.productsInCart
);

export const selectorCountProductsInCart = createSelector(
  [select],
  (store) => store.products.countProductsInCart
);

export const selectorCountSummInCart = createSelector(
  [select],
  (store) => store.products.countSummInCart
);
