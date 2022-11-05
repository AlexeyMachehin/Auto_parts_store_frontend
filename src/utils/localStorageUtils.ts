import { Product } from "../interfaces/product";

export class LocalStorageUtil {
  keyName: string;
  products: Product[];
  constructor() {
    this.keyName = "products";
    this.products = this.getProducts();
  }
  getProducts(): Product[] | [] {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage != null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
  getOneProduct(id: string): Product | null {
    const product = this.products.find((el: Product) => el.id === id);
    if (product) {
      return product;
    }
    return null;
  }

  manageProducts(product: Product) {
    const index = this.products.findIndex(
      (el: Product) => el.id === product.id
    );
    if (index !== -1) {
      if (product.quantityInCart === 0) {
        this.products.splice(index, 1);
        localStorage.setItem(this.keyName, JSON.stringify(this.products));
        return;
      }

      this.products.splice(index, 1, product);

      localStorage.setItem(this.keyName, JSON.stringify(this.products));
    } else {
      this.products.push(product);
      localStorage.setItem(this.keyName, JSON.stringify(this.products));
    }
  }

  deleteProduct(id: string) {
    const index = this.products.findIndex((el: Product) => el.id === id);
    if (index !== -1) {
      const newProduct = this.getOneProduct(id);

      if (newProduct) {
        if (newProduct.quantityInCart === 1) {
          this.products.splice(index, 1);
          localStorage.setItem(this.keyName, JSON.stringify(this.products));
          return;
        }

        const count = (newProduct.quantityInCart ?? 0) - 1;
        this.products[index].quantityInCart = count;
        localStorage.setItem(this.keyName, JSON.stringify(this.products));
        return;
      }
    }
  }
}

export const localStorageUtil = new LocalStorageUtil();

let product = {
  id: "631f6dfd8332fbe8c971ef0c",
  name: "двигатель 21083",
  catalogueNumber: "222",
  manufacturer: "Скиф",
  quantity: 2,
  unitOfMeasurement: "шт",
  wholesalePrice: 1000,
  retailPrice: 1500,
  quantityInCart: 1500,
} as Product;

// localStorageUtil.putProducts(product);
// localStorageUtil.deleteProduct(product);
