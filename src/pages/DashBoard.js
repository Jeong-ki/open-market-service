import React from "react";
import DashHeader from "../components/DashHeader";
import test from "../images/icon-user.svg";
import { Link } from "react-router-dom";

function dashBoard() {
  return (
    <>
      <DashHeader />
      <section className="dashBoard">
        <h2>
          대시보드<strong>백엔드글로벌</strong>
        </h2>
        <Link to="/addProduct" className="uploadBtn">상품 업로드</Link>
        {/* <button className="uploadBtn">상품 업로드</button> */}
        <div className="wrap">
          <ul className="menu">
            <li>판매중인 상품(3)</li>
            <li>
              주문/배송 <span>2</span>
            </li>
            <li>
              문의/리뷰<span>1</span>
            </li>
            <li>통계</li>
            <li>스토어 설정</li>
          </ul>
          <article>
            <h3 className="blind">업로드 상품목록</h3>
            <ul className="productInfo">
              <li>상품정보</li>
              <li>판매가격</li>
              <li>수정</li>
              <li>삭제</li>
            </ul>
            <ul className="products">
              <li>
                <div>
                  <img src={test} alt="상품이미지" />
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>재고 : 370개</p>
                </div>
                <div className="price">17,500원</div>
                <div className="box-update">
                  <button className="update">수정</button>
                </div>
                <div className="box-delete">
                  <button className="delete">삭제</button>
                </div>
              </li>
              <li>
                <div>
                  <img src={test} alt="상품이미지" />
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>재고 : 370개</p>
                </div>
                <div className="price">17,500원</div>
                <div className="box-update">
                  <button className="update">수정</button>
                </div>
                <div className="box-delete">
                  <button className="delete">삭제</button>
                </div>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}

export default dashBoard;
