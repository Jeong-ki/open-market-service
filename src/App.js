import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Order from "./pages/Order";
import DashBoard from "./pages/DashBoard";
import AddProduct from "./pages/AddProduct";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/productDetail" element={<ProductDetail />} />
      <Route path="/order" element={<Order />} />
      <Route path="/dashBoard" element={<DashBoard />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
  );
}

export default App;
