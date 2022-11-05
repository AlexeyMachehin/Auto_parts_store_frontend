import { createAsyncThunk } from "@reduxjs/toolkit";
import productsService from "./services/productService";

export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    return await productsService.getProducts();
  }
);
