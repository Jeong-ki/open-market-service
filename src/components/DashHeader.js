import React from "react";
import logo from "../images/logo.png";

function dashHeader() {
  return (
    <header className="dashHeader">
      <h1>
        <a href="/">
          <img src={logo} alt="오픈마켓" />
        </a>
      </h1>
      판매자 센터
    </header>
  );
}

export default dashHeader;
