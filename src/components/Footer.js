import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="topBar">
        <ul className="list">
          <li>
            <a href="/">호두샵 소개</a>
          </li>
          <li>
            <a href="/">이용약관</a>
          </li>
          <li>
            <a href="/">개인정보처리방침</a>
          </li>
          <li>
            <a href="/">전자금융거래약관</a>
          </li>
          <li>
            <a href="/">청소년보호정책</a>
          </li>
          <li>
            <a href="/">제휴문의</a>
          </li>
        </ul>
        <ul className="sns">
          <li className="instagram">
            <a href="/">
              <span>instagram</span>
            </a>
          </li>
          <li className="facebook">
            <a href="/">
              <span>facebook</span>
            </a>
          </li>
          <li className="youtube">
            <a href="/">
              <span>youtube</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="information">
        <p>(주)HODU SHOP</p>
        <p>제주특별자치도 제주시 동광고 137 제주코딩베이스캠프</p>
        <dl>
          <dt>사업자 번호</dt>
          <dd>: 000-0000-0000 | 통신판매업</dd> <br />
          <dt>대표 : </dt>
          <dd>윤동현</dd>
        </dl>
      </div>
    </footer>
  );
}

export default Footer;
