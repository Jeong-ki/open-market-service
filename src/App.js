import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Order from "./pages/Order";
import DashBoard from "./pages/DashBoard/DashBoard";
import AddProduct from "./pages/AddProduct";
import Error from "./pages/Error";
import Cart from "./pages/cart/Cart";
import Payment from "./pages/payment/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/dashBoard" element={<DashBoard />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/Payment" element={<Payment />} />
      <Route path="/Payment/:id/:count/:kind" element={<Payment />} />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default App;
