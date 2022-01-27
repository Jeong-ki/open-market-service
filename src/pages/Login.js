import React from "react";
import logo from "../images/logo.png";
function login() {
  return (
    <div className="login">
      <h1>
        <img src={logo} alt="오픈마켓" />
      </h1>
      <section>
        <h2 className="blind">로그인</h2>
        <button className="loginChange purchase on">구매회원 로그인</button>
        <button className="loginChange sale">판매회원 로그인</button>
        <div class="loginForm">
          <form action="/" method="post">
            <fieldset>
              <legend>구매회원 로그인</legend>
              <label>
                <input type="text" placeholder="아이디" />
              </label>
              <label>
                <input type="password" placeholder="비밀번호" />
              </label>
              <p class="hide">아이디와 비밀번호가 일치하지 않습니다.</p>
              <button type="submit">로그인</button>
            </fieldset>
          </form>
        </div>
      </section>
      <div className="join">
        <span>
          <a href="/">회원가입</a>
        </span>
        <span>
          <a href="/">비밀번호 찾기</a>
        </span>
      </div>
    </div>
  );
}

export default login;
