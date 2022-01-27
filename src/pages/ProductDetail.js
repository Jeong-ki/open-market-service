import React from "react";
import Header from "../components/Header";
import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";
function ProductDetailPage() {
  return (
    <>
      <Header />
      <section className="product">
        <h2 className="blind">상품 상세 페이지</h2>
        <article>
          <h2 className="blind">상품 정보</h2>
          <div className="imgBox"></div>
          <div className="explanation">
            <div className="productIntro">
              <p className="company">백엔드글로벌</p>
              <dl>
                <dt>딥러닝 개발자 무릎 담요</dt>
                <dd>
                  <strong>17,500</strong>원
                </dd>
              </dl>
              <p className="delivery">택배배송 / 무료배송</p>
            </div>
            <div className="amount">
              <h3 className="blind">상품 수량 설정</h3>
              <div>
                <button type="button" className="symbol">
                  <img src={minus} alt="minus" />
                </button>
                <span className="volume">1</span>
                <button type="button" className="symbol">
                  <img src={plus} alt="plus" />
                </button>
              </div>
            </div>
            <div className="price">
              <p className="maximum">총 상품 금액</p>
              <div>
                <p className="maximumAmount">
                  총 수량 <strong>1</strong>개
                </p>
                <p className="maximumPrice">
                  <strong>17,500</strong>원
                </p>
              </div>
            </div>
            <div className="purchase">
              <button className="rightAway">바로 구매</button>
              <button className="basket">장바구니</button>
            </div>
          </div>
        </article>

        <ul className="btnList">
          <li>
            <button className="on">버튼</button>
          </li>
          <li>
            <button>리뷰</button>
          </li>
          <li>
            <button>Q&A</button>
          </li>
          <li>
            <button>반품/교환정보</button>
          </li>
        </ul>
      </section>
    </>
  );
}

export default ProductDetailPage;
