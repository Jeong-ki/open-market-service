import React from "react";

import Footer from "../components/Footer";
import Header from "../components/Header";
function main() {
  return (
    <>
      <div className="App">
        <Header />
        <section className="event">
          <h2 className="blind">이벤트 배너</h2>
          <ul className="slide">
            {/* 서버에서 불러와 추가되는 요소 */}
            <li>
              <a href="/">
                <span>설명</span>
              </a>
            </li>
          </ul>
          <div className="lrBtn">
            <button className="left">
              <img src="./images/icon-swiper-1.svg" alt="좌측 슬라이드" />
            </button>
            <button className="right">
              <img src="./images/icon-swiper-2.svg" alt="우측 슬라이드" />
            </button>
          </div>
          <div className="dotBtn">
            <span></span>
            <span className="select"></span>
          </div>
        </section>

        <section className="product">
          <div className="inner">
            <h2 className="blind">상품 진열</h2>
            <ul>
              <li>
                <a href="/">
                  <div></div>
                  <p>백엔드 글로벌</p>
                  <dl>
                    <dt>딥러닝 개발자 무릎담요</dt>
                    <dd>
                      <strong>29,000</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
              <li>
                <a href="/">
                  <div></div>
                  <p>백엔드 글로벌</p>
                  <dl>
                    <dt>딥러닝 개발자 무릎담요</dt>
                    <dd>
                      <strong>29,000</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
              <li>
                <a href="/">
                  <div></div>
                  <p>백엔드 글로벌</p>
                  <dl>
                    <dt>딥러닝 개발자 무릎담요</dt>
                    <dd>
                      <strong>29,000</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
              <li>
                <a href="/">
                  <div></div>
                  <p>백엔드 글로벌</p>
                  <dl>
                    <dt>딥러닝 개발자 무릎담요</dt>
                    <dd>
                      <strong>29,000</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
              <li>
                <a href="/">
                  <div></div>
                  <p>백엔드 글로벌</p>
                  <dl>
                    <dt>딥러닝 개발자 무릎담요</dt>
                    <dd>
                      <strong>29,000</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
            </ul>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default main;
