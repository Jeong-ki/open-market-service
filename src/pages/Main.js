import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import left from "../images/icon-swiper-1.svg";
import right from "../images/icon-swiper-2.svg";
function Main() {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.209.150.154:8000/products/")
      .then((response) => {
        setProducts(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="main">
        <h2 className="blind">상품이 나열된 상품 목록 페이지</h2>
        <section className="event">
          <h2 className="blind">이벤트 배너</h2>
          <ul className="slide">
            {/* 서버에서 불러와 추가되는 요소 */}
            <li>
              <a href="/">
                <span>설명</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>설명</span>
              </a>
            </li>
            <li>
              <a href="/">
                <span>설명</span>
              </a>
            </li>
          </ul>
          <div className="lrBtn">
            <button className="left">
              <img src={left} alt="좌측 슬라이드" />
            </button>
            <button className="right">
              <img src={right} alt="우측 슬라이드" />
            </button>
          </div>
          <div className="dotBtn">
            <span></span>
            <span className="select"></span>
          </div>
        </section>

        <section className="products">
          <div className="inner">
            <h2 className="blind">상품 진열</h2>
            {!isLoading ? <ProductLi products={products} /> : ""}
          </div>
        </section>
      </section>
      <Footer />
    </>
  );
}

function ProductLi(props) {
  return (
    <ul>
      {props.products.map((product, i) => {
        return (
          <li key={i}>
            <a href="/">
              <div
                style={{
                  background: `url(${product.image}) no-repeat center center/cover`,
                }}
              ></div>
              <p>{product.seller_store}</p>
              <dl>
                <dt>{product.product_name}</dt>
                <dd>
                  <strong>{product.price}</strong>원
                </dd>
              </dl>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Main;
