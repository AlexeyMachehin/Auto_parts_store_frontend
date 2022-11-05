import { ProductsState } from "../interfaces/product";

export const initialState: ProductsState = {
  products: null,
  isError: false,
  isLoading: false,
  message: "",
  productsInCart: [],
  discountDates: null,
  countProductsInCart: null,
  countSummInCart: 0,
};
