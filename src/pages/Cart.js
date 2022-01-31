import React from "react";
import Header from "../components/Header";

function CartPage() {
  return (
    <>
      <Header />
      <section>
        <h2>장바구니</h2>
        <div>
          <ul>
            <li>ㅇ</li>
            <li>상품정보</li>
            <li>수량</li>
            <li>상품금액</li>
          </ul>
          <article>
            <h3 className="blind">장바구니 상품 목록</h3>
            <div>
              <p>장바구니 안에 담긴 상품이 없습니다.</p>
              <p>원하는 상품을 장바구니에 담아보세요</p>
            </div>
            <ul>
              <li></li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

export default CartPage;
