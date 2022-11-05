import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import AdminPage from "./components/AdminPage/AdminPage";
import Cart from "./components/Cart";
import Discount from "./components/Discount";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import LoginModal from "./components/LoginModal";
import ProductTable from "./components/ProductTable/ProductTable";
import { useEffect } from "react";
import { getProducts } from "./redux/thunk";
import { selectorAllProducts, selectorProductsInCart } from "./redux/selectors";

// import { selectorIsLoading } from "./selectors";

// const isLoading = useAppSelector(selectorIsLoading)

function App() {
  const products = useAppSelector(selectorAllProducts);
  const productsInCart = useAppSelector(selectorProductsInCart);

  return (
    <div className="App">
      {/* <LoginModal /> */}
      {/* {isLoading && <Loader />} */}
      <Header />
      <Discount />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<ProductTable />}></Route>
          <Route path="/AdminPage" element={<AdminPage />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
