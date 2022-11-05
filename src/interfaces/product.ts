export interface ProductDto {
  name: string;
  catalogueNumber: string;
  _id: string;
  manufacturer: string;
  quantity: number;
  unitOfMeasurement: string;
  wholesalePrice: number;
  retailPrice?: number;
}

export interface Product {
  name: string;
  catalogueNumber: string;
  id: string;
  manufacturer: string;
  quantity: number;
  unitOfMeasurement: string;
  wholesalePrice: number;
  retailPrice?: number;
  productsInCart?: [];
  quantityInCart: number;
}

export interface ProductsState {
  products: Product[] | null;
  isError: boolean;
  isLoading: boolean;
  message?: string;
  productsInCart: Product[];
  discountDates: [] | null;
  countProductsInCart: number | null;
  countSummInCart: number;
}

export type CreateProduct = Omit<Product, "id" | "quantityInCart">;
