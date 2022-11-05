import { EnhancedTableToolbarProps } from "../../interfaces/table";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

export const ProductTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ marginRight: "50px" }}>
              {props.page === "/AdminPage" && (
                <div>
                  Товары на складе{" "}
                  <Tooltip title="add">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.page === "/Cart" && "Корзина"}
            </div>
            <div>
              {props.page === "/AdminPage" && (
                <div>
                  Изменить наценку на весь товар{" "}
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {props.page === "/Cart" && (
                <div>
                  применить скидку{" "}
                  <Tooltip title="add">
                    <IconButton>
                      <AddIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </Typography>
      )}
      {props.page === "/AdminPage" && numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <Tooltip title="Edit">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
