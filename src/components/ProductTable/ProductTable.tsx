import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Product } from "../../interfaces/product";
import { Order } from "../../interfaces/table";
import { getComparator, stableSort } from "./ProductTableUtils";
import { ProductTableHead } from "./ProductTableHead";
import { ProductTableToolbar } from "./ProductTableToolbar";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectorAllProducts,
  selectorCountSummInCart,
  selectorProductsInCart,
} from "../../redux/selectors";
import { getProducts } from "../../redux/thunk";
import AddToCartButton from "./AddToCartButton";
import { localStorageUtil } from "../../utils/localStorageUtils";
import {
  countSummInCart,
  setCountProductsInCart,
  setProductsInCart,
} from "../../redux/productsSlice";

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const products = useAppSelector(selectorAllProducts);
  const productsInCart = useAppSelector(selectorProductsInCart);
  const summInCart = useAppSelector(selectorCountSummInCart);

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("name");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isCart, setIsCart] = useState<boolean>(false);

  useEffect(() => {
    if (productsInCart.length > 0) {
      dispatch(setProductsInCart(productsInCart));
    }

    if (location.pathname === "/Cart") {
      setIsCart(true);
      dispatch(getProducts());
    }
    if (
      (!products && location.pathname === "/") ||
      location.pathname === "/AdminPage"
    ) {
      dispatch(getProducts());
      setIsCart(false);
    }
    dispatch(setCountProductsInCart());
    dispatch(setProductsInCart(localStorageUtil.getProducts()));
    dispatch(countSummInCart())
  }, []);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = (isCart ? productsInCart : products)?.map(
        (n: Product) => n.id.toString()
      );
      if (newSelected) {
        setSelected(newSelected);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    name: string | number
  ) => {
    const selectedIndex = selected.indexOf(name.toString());
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name.toString());
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;



  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            ((isCart ? productsInCart : products)?.length ?? 0)
        )
      : 0;

  return (
    <Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ProductTableToolbar
          page={location.pathname}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <ProductTableHead
              page={location.pathname}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={(isCart ? productsInCart : products)?.length ?? 0}
            />
            <TableBody>
              {stableSort(
                (isCart ? productsInCart : products) ?? [],
                getComparator(order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const isItemSelected = isSelected(product.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={product.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, product.id)}
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>

                      <TableCell align="left">{product.name}</TableCell>
                      <TableCell align="center">
                        {product.catalogueNumber}
                      </TableCell>
                      <TableCell align="center">{product.id}</TableCell>
                      <TableCell align="center">
                        {product.manufacturer}
                      </TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell align="center">
                        {product.unitOfMeasurement}
                      </TableCell>
                      {location.pathname === "/AdminPage" && (
                        <TableCell align="center">
                          {product.wholesalePrice}
                        </TableCell>
                      )}

                      <TableCell align="center">
                        {product.retailPrice}
                      </TableCell>
                      {location.pathname !== "/AdminPage" && (
                        <TableCell align="center">
                          <AddToCartButton product={product} />
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
            
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={(isCart ? productsInCart : products)?.length ?? 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Мелкий отступ"
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {location.pathname === "/Cart" &&
          `Общая стоимость: ${new Intl.NumberFormat('ru-RU').format(summInCart)} р.`}
      </div>
    </Box>
  );
}
