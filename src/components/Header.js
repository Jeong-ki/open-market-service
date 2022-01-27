import React from "react";

function Header() {
  return (
    <header className="header">
      <h1>
        <a href="#">
          <img src="./images/logo.png" alt="오픈마켓" />
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
          <li className="basket">
            <a href="/">장바구니</a>
          </li>
          <li className="login">
            <a href="/">로그인</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
