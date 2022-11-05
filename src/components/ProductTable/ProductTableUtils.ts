import { Product } from "../../interfaces/product";
import { Order } from "../../interfaces/table";


export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof Product>(
  order: Order,
  orderBy: Key
): (a: Product, b: Product) => number {
  return order === "desc"
    ? (a: Product, b: Product) => descendingComparator<Product>(a, b, orderBy)
    : (a: Product, b: Product) => -descendingComparator<Product>(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

