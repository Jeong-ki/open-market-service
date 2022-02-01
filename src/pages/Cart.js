import React from "react";
import Header from "../components/Header";
import test from "../images/test.jpg";
import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";
import remove from "../images/icon-delete.svg";
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
            <div>
              <form action="#" method="get">
                <ul>
                  <li>
                    <input type="checkbox" />
                    <img src={test} alt="상품이미지" />
                    <div>
                      <p className="company">백엔드글로벌</p>
                      <dl>
                        <dt>딥러닝 개발자 무릎 담요</dt>
                        <dd>
                          <strong>17,500</strong>원
                        </dd>
                      </dl>
                      <p className="delivery">택배배송 / 무료배송</p>
                    </div>

                    <div>
                      <button type="button" className="symbol">
                        <img src={minus} alt="minus" />
                      </button>
                      <span className="volume">1</span>
                      <button type="button" className="symbol">
                        <img src={plus} alt="plus" />
                      </button>
                    </div>
                    <p>17,500원</p>
                    <button type="button">주문하기</button>
                    <button>
                      <img src={remove} alt="상품 취소" />
                    </button>
                  </li>
                </ul>
                <div>
                  <dl>
                    <dt>총상품금액</dt>
                    <dd>
                      <strong>46,500</strong>원
                    </dd>
                  </dl>
                  <dl>
                    <dt>상품 할인</dt>
                    <dd>
                      <strong>0</strong>원
                    </dd>
                  </dl>
                  <dl>
                    <dt>배송비</dt>
                    <dd>
                      <strong>0</strong>원
                    </dd>
                  </dl>
                  <dl>
                    <dt>결제 예정 금액</dt>
                    <dd>
                      <strong>46,500</strong>원
                    </dd>
                  </dl>
                </div>
                <button type="submit">주문하기</button>
              </form>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default CartPage;
