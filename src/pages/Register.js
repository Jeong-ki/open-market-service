import React from 'react';
import Logo from '../images/logo.png';
import pwCheck from '../images/icon-check-off.svg';

function RegisterPage() {
  return (
  <div className='register'>
    <h1>
      <img src={Logo} alt="오픈마켓" />
    </h1>
    <section>
      <h2 className='blind'>회원가입</h2>
      <button className="changeReg buyer">구매회원가입</button>
      <button className="changeReg seller">판매회원가입</button>
      <div className="registerForm">
        <form id="register">
          <fieldset>
            <legend>구매회원가입</legend>

            <div className='inpId'>
              <label htmlFor="id" className="id">아이디</label>
              <input id="id" type="text" />
              <button type='button'>중복확인</button>
            </div>

            <label htmlFor="pw">비밀번호</label>
            <div className='inpPw'>
              <input id="pw" type="password" />
              <img src={pwCheck} alt="" />
            </div>

            <label htmlFor="checkPw">비밀번호 재확인</label>
            <div className='inpPw'>
              <input id="checkPw" type="password" />
              <img src={pwCheck} alt="" />
            </div>

            <label htmlFor="name">이름</label>
            <input id="name" type="text" />

            <div className='phoneNumber'>  
              <label htmlFor="firstNumber">전화번호</label>
              <select id="firstNumber">
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
              <label htmlFor="middleNumber" className="blind">중간 전화번호</label>
              <input id="middleNumber" type="text" />
              <label htmlFor="lastNumber" className="blind">뒷 전화번호</label>
              <input id="lastNumber" type="text" />
            </div>

            <div className="email">
              <label htmlFor="email">이메일</label>
              <input id="email" type="text" />
              <span>@</span>
              <label htmlFor="dotcom" className="blind">메일닷컴</label>
              <input id="dotcom" type="text" />
            </div>

          </fieldset>
        </form>
      </div>
      <div>
        <input type="checkbox" id="agree" />
        <label htmlFor="agree">호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.</label>
      </div>
      <button type="submit" form="register">가입하기</button>
    </section>
  </div>
  );
}

export default RegisterPage;
