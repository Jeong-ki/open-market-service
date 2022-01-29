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
            <legend>회원가입</legend>

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

            <label>전화번호</label>
            <div className='phoneNumber'>
              <button className='firstNumBtn'>010</button>
              <ul id="firstNumber">
                <li><button type="button">010</button></li>
                <li><button type="button">011</button></li>
                <li><button type="button">016</button></li>
                <li><button type="button">017</button></li>
                <li><button type="button">018</button></li>
                <li><button type="button">019</button></li>
              </ul>
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

            <div className='buyerNum'>
              <label htmlFor="bNum">사업자 등록번호</label>
              <input id="bNum" type="text" />
              <button type='button'>인증</button>
            </div>
            <label htmlFor="storeName">스토어 이름</label>
            <input id="storeName" type="text" />
          </fieldset>
        </form>
      </div>
      <div className='box-check'>
        <div className="check-agree">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">호두샵의 <strong>이용약관</strong> 및 <strong>개인정보처리방침</strong>에 대한 내용을 확인하였고 동의합니다.</label>
        </div>
      </div>
      <button className="submitBtn" type="submit" form="register">가입하기</button>
    </section>
  </div>
  );
}

export default RegisterPage;
