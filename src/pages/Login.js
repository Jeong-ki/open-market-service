import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import axios from "axios";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("BUYER");
  const [warningText, setWarningText] = useState("");

  //포커스 이동하기 Ref
  const idDom = React.useRef(null);
  const passwordDom = React.useRef(null);
  //이전 페이지로 이동을 위해 사용
  let navigate = useNavigate();

  //로그인 버튼 클릭시
  function handleSubmit(event) {
    event.preventDefault();
    //아이디 또는 비밀번호 미기입 시
    if (!id || !password) {
      setWarningText("아이디 또는 비밀번호가 일치하지 않습니다.");
      if (!id) {
        idDom.current.focus();
      } else if (!password) {
        passwordDom.current.focus();
      }
      //아이디와 비밀번호 모두 기입 시
    } else if (id && password) {
      const data = {
        username: id,
        password: password,
        login_type: loginType,
      };
      postData(data);
    }
  }

  function postData(data) {
    axios
      .post("http://13.209.150.154:8000/accounts/login/", data)
      .then((response) => {
        localStorage.setItem("acessToken", response.data.token);
        localStorage.setItem("userType", response.data.user_type);
        navigate(-1);
      })
      .catch(() => {
        setPassword("");
        setWarningText("아이디 또는 비밀번호가 일치하지 않습니다.");
        passwordDom.current.focus();
      });
  }

  return (
    <div className="loginContainer">
      <h1>
        <img src={logo} alt="오픈마켓" />
      </h1>
      <section>
        <h2 className="blind">로그인</h2>
        <div className="loginTypeBtn">
          <button
            className={
              "loginChange " + "purchase " + (loginType === "BUYER" ? "on" : "")
            }
            onClick={() => {
              setLoginType("BUYER");
            }}
          >
            구매회원 로그인
          </button>
          <button
            className={
              "loginChange " + "sale " + (loginType === "SELLER" ? "on" : "")
            }
            onClick={() => {
              setLoginType("SELLER");
            }}
          >
            판매회원 로그인
          </button>
        </div>
        <div className="loginForm">
          <form action="/" method="post">
            <fieldset>
              <legend>구매회원 로그인</legend>
              <label>
                <input
                  type="text"
                  placeholder="아이디"
                  autoComplete="off"
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  value={id}
                  ref={idDom}
                />
              </label>
              <label>
                <input
                  type="password"
                  placeholder="비밀번호"
                  autocomplete="off"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  ref={passwordDom}
                />
              </label>
              <p className={warningText ? "" : "hide"}>{warningText}</p>
              <button type="submit" onClick={handleSubmit}>
                로그인
              </button>
            </fieldset>
          </form>
        </div>
      </section>
      <div className="join">
        <span>
          <a href="/register">회원가입</a>
        </span>
        <span>
          <a href="/login">비밀번호 찾기</a>
        </span>
      </div>
    </div>
  );
}

export default Login;
