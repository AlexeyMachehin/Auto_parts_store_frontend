import { Product } from "./product";

export type Order = "asc" | "desc";

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Product;
    label: string;
    numeric: boolean;
  }

  export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Product
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    page: string;
  }

  export interface EnhancedTableToolbarProps {
    numSelected: number;
    page: string;
  }