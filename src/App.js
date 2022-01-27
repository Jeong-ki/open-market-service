// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductListPage from './pages/ProductListPage/ProductListPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProductDetail from './pages/ProductDetailPage/ProductDetailPage';
import OrderPage from './pages/OrderPage/OrderPage';
import DashBoard from './pages/DashBoard/DashBoard';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductListPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/productDetail' element={<ProductDetail />} />
      <Route path='/orderPage' element={<OrderPage />} />
      <Route path='/dashBoard' element={<DashBoard />} />
      <Route path='/addProduct' element={<AddProduct />} />
    </Routes>
  );
}

export default App;