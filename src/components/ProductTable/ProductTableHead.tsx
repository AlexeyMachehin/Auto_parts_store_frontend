import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import { Product } from "../../interfaces/product";
import { HeadCell, EnhancedTableProps } from "../../interfaces/table";
import { useLocation } from "react-router-dom";

export function ProductTableHead(props: EnhancedTableProps) {
  const location = useLocation();
  const headCells: HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Наименование",
    },
    {
      id: "catalogueNumber",
      numeric: true,
      disablePadding: false,
      label: "Каталожный номер",
    },
    {
      id: "id",
      numeric: true,
      disablePadding: false,
      label: "Код (ID)",
    },
    {
      id: "manufacturer",
      numeric: true,
      disablePadding: false,
      label: "Изготовитель",
    },
    {
      id: "quantity",
      numeric: true,
      disablePadding: false,
      label: "Количество на складе",
    },
    {
      id: "unitOfMeasurement",
      numeric: true,
      disablePadding: false,
      label: "Единица измерения",
    },
    {
      id: "wholesalePrice",
      numeric: true,
      disablePadding: false,
      label: "Оптовая цена",
    },
    {
      id: "retailPrice",
      numeric: true,
      disablePadding: false,
      label: "Цена",
    },
    {
      id: "productsInCart",
      numeric: true,
      disablePadding: false,
      label: "Товары в корзине",
    },
  ];

  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => {
            if((location.pathname === "/AdminPage" && headCell.id !== "productsInCart") ||  (location.pathname !== "/AdminPage" && headCell.id !== "wholesalePrice")){
            return (
              <TableCell
              
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          }
        })}
      </TableRow>
    </TableHead>
  );
}
