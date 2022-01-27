// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductListPage from './pages/ProductListPage/ProductListPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProductListPage />} />
      <Route path='/login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;