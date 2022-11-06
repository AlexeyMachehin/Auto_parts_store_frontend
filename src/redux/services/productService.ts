import { ProductDto } from './../../interfaces/product';
import axios from "../../axios";
import { fromDto } from "../../mapper/product-mapper";

const getProducts = async () => {
  console.log(axios)
  const products = await axios.get<ProductDto[]>("/api/products"); // GET http://localhost:8000/api/products
  return products.data.map(product =>  fromDto(product));
};

const productsService = {
  getProducts,
};

export default productsService;
