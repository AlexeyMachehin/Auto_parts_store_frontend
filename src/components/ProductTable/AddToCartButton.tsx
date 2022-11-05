import { useAppDispatch } from "../../app/hooks";
import {
  countSummInCart,
  setCountProductsInCart,
  setProductInCart,
} from "../../redux/productsSlice";
import { localStorageUtil } from "../../utils/localStorageUtils";
import { Product } from "../../interfaces/product";
import { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { InputNumber } from "antd";

export default function AddToCartButton(props: { product: Product }) {
  const dispatch = useAppDispatch();
  let productFromLocalStorage: Product | null = null;
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    productFromLocalStorage = localStorageUtil.getOneProduct(props.product.id);
    setCount(
      productFromLocalStorage ? productFromLocalStorage.quantityInCart : 0
    );
  }, []);

  const onChange = (value: number) => {
    console.log("onChange", value);
    setCount(value);
    dispatch(
      setProductInCart({
        ...props.product,
        quantityInCart: value,
      })
    );
    localStorageUtil.manageProducts({
      ...props.product,
      quantityInCart: value,
    });
    dispatch(setCountProductsInCart());
    dispatch(countSummInCart());
  };

  return (
    <div key={count}>
      <InputNumber
        min={0}
        max={props.product.quantity}
        defaultValue={count}
        onChange={onChange}
      />
    </div>
  );
}
