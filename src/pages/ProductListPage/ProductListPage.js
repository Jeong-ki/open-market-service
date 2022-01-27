import React from 'react';
import Header from "../../components/Header";

function ProductListPage() {
  return (
    <>
      <Header />
      <main>
        <section>
          <h2 className="sr-only">대표 이미지 슬라이드</h2>
          <button><span className='sr-only'>왼쪽 슬라이드 버튼</span></button>
          <button><span className='sr-only'>오른쪽 슬라이드 버튼</span></button>
          <ul>
            <li>이미지</li>
            <li>이미지</li>
            <li>이미지</li>
          </ul>
          <ul>
            <li>점</li>
            <li>빈점</li>
          </ul>
        </section>
        <section>
          <h2 className="sr-only">상품 리스트</h2>
          <ul>
            <li>
              <a href="#" className="link-product">
                <img src="" alt="노트북 파우치" />
                <p><small>우당탕탕 라이캣의 실험실</small></p>
                <p>Hack Your Life 개발자 노트북 파우치</p>
                <p><strong>29,000</strong>원</p>
              </a>
            </li>
            <li>
              <a href="#" className="link-product">
                <img src="" alt="노트북 파우치" />
              </a>
              <p><small>우당탕탕 라이캣의 실험실</small></p>
              <p>Hack Your Life 개발자 노트북 파우치</p>
              <p><strong>29,000</strong>원</p>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default ProductListPage;