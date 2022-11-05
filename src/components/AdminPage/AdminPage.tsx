import ProductTable from "../ProductTable/ProductTable";
import TextField from "@mui/material/TextField";
import DiscountDatePicker from "./DiscountDatePicker";
import Button from "@mui/material/Button";

export default function AdminPage() {
  return (
    <div>
      <form
        style={{
          padding: "10px",
          margin: "30px 0",
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "850px",
          boxShadow:
            "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        }}
        action=""
      >
        <TextField
          id="outlined-basic"
          label="Введите текст акции"
          variant="outlined"
        />
        <DiscountDatePicker />
        <Button onClick={() => {}} variant="outlined">
          ОК
        </Button>
      </form>

      <ProductTable />
    </div>
  );
}
