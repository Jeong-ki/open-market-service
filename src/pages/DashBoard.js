import React from 'react';
import logo from "../images/logo.png";

function dashBoard() {
  return (
    <div className="dashBoard">
      <header>
        <h1>
          <a href="/">
            <img src={logo} alt="오픈마켓" />
          </a>
        </h1>
        판매자 센터
      </header>
      <section>
        <h2>대시보드 <strong>백엔드글로벌</strong></h2>
        <button><span></span>상품업로드</button>
        <ul>
          <li>판매중인 상품(3)</li>
          <li>주문/배송</li>
          <li>문의/리뷰</li>
          <li>통계</li>
          <li>스토어 설정</li>
        </ul>
        <article>
          <h3 className=".blind">업로드 상품목록</h3>
          <div>
            <p>상품정보</p>
            <p>판매가격</p>
            <p>수정</p>
            <p>삭제</p>
          </div>
          <ul>
            <li>
              <img src="" alt="상품이미지" />
              <div>
                <p>딥러닝 개발자 무릎 담요</p>
                <p>재고 : 370개</p>
              </div>
              <p>17,500원</p>
              <button>수정</button>
              <button>삭제</button>
            </li>
          </ul>
        </article>
      </section>
    </div>
  );
}

export default dashBoard;
