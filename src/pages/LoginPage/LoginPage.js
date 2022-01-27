import React, { useState } from 'react';
import Logo from '../../images/Logo-hodu.png';

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e) => {
    setId(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  return (
    <>
      <main>
        <h1><img src={Logo} alt="로그인 페이지" /></h1>
        <article>
          <h2>로그인 폼</h2>
          <div>
            <button>구매회원 로그인</button>
            <button>판매회원 로그인</button>
          </div>
          <div>
            <form>
              <label htmlFor="id-input">아이디</label>
              <input 
                onChange={handleIdChange}
                placeholder="아이디"
                type="text"
                value={id}
                id="id-input"
              />
              <label htmlFor="pw-input">비밀번호</label>
              <input 
                onChange={handlePasswordChange}
                placeholder="비밀번호"
                type="password"
                value={password}
                id="pw-input"
              />
            </form>
          </div>
          <a href="">회원가입</a>
          <a href="">비밀번호 찾기</a>
        </article>
      </main>
    </>
  );
}

export default LoginPage;
