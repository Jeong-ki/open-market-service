import React from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";

function Header() {
  // 페이지로 이동을 위해 사용
  let navigate = useNavigate();
  let logiStatus = localStorage.getItem("acessToken") ? localStorage.getItem("userType") : false;

  function loginLogout(e) {
    e.preventDefault();
    if (logiStatus) {
      localStorage.removeItem("acessToken");
      localStorage.removeItem("userType");
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="header">
      <h1>
        <a href="/">
          <img src={logo} alt="오픈마켓" />
        </a>
      </h1>
      <nav>
        <form action="#" method="get">
          <fieldset>
            <legend className="blind">검색</legend>
            <input type="search" placeholder="상품을 검색해보세요!" />
            <button type="submit"></button>
          </fieldset>
        </form>
        <ul>
          {/* <li className="basket">
            <a href="/cart">
              <p>장바구니</p>
            </a>
          </li> */}
          {
            logiStatus === "SELLER" 
            ? 
            <ul>
              <li className="login">
                <a href="/login" onClick={loginLogout}>
                  <p>로그아웃</p>
                </a>
              </li>
              <li className="seller">
                <Link to="/dashBoard" className="sellerCenter">판매자 센터</Link>
              </li>
            </ul>
            : 
            <ul>
              <li className="basket">
                <a href="/cart">
                  <p>장바구니</p>
                </a>
              </li>
              <li className="login">
                <a href="/login" onClick={loginLogout}>
                  <p>{logiStatus ? "로그아웃" : "로그인"}</p>
                </a>
              </li>
            </ul>
          }
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
