import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import left from "../images/icon-swiper-1.svg";
import right from "../images/icon-swiper-2.svg";
function Main() {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [currentImg, setCurrentImg] = useState(1);
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

  function imgSlideBtnClick(btnName) {
    setCurrentImg(() => {
      if (btnName === "leftBtn") return currentImg - 1;
      else if (btnName === "rightBtn") return currentImg + 1;
      else if (btnName === "firstBtn") return 1;
      else if (btnName === "secondBtn") return 2;
      else if (btnName === "thirdBtn") return 3;
    });
  }

  return (
    <>
      <Header />
      <section className="main">
        <h2 className="blind">상품이 나열된 상품 목록 페이지</h2>
        <section className="event">
          <h2 className="blind">이벤트 배너</h2>
          <div className="slideBox">
            {!isLoading ? (
              <Imgslide inform={products} currentImg={currentImg} />
            ) : (
              ""
            )}
          </div>

          <div className="lrBtn">
            {currentImg === 1 ? (
              <div></div>
            ) : (
              <button
                className="left"
                onClick={() => {
                  imgSlideBtnClick("leftBtn");
                }}
              >
                <img src={left} alt="좌측 슬라이드" />
              </button>
            )}
            {currentImg === 3 ? (
              <div></div>
            ) : (
              <button className="right">
                <img
                  src={right}
                  alt="우측 슬라이드"
                  onClick={() => {
                    imgSlideBtnClick("rightBtn");
                  }}
                />
              </button>
            )}
          </div>
          <div className="dotBtn">
            <span
              className={currentImg === 1 ? "select" : ""}
              onClick={() => {
                imgSlideBtnClick("firstBtn");
              }}
            ></span>
            <span
              className={currentImg === 2 ? "select" : ""}
              onClick={() => {
                imgSlideBtnClick("secondBtn");
              }}
            ></span>
            <span
              className={currentImg === 3 ? "select" : ""}
              onClick={() => {
                imgSlideBtnClick("thirdBtn");
              }}
            ></span>
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
            <a href={"/productDetail/" + product.product_id}>
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

function Imgslide(props) {
  let slideInform = props.inform.slice(0, 3);
  let currentImg;
  switch (props.currentImg) {
    case 1:
      currentImg = "one";
      break;
    case 2:
      currentImg = "two";
      break;
    default:
      currentImg = "three"; // eslint-disable-line no-unused-vars
  }
  return (
    <ul className={"slide " + currentImg}>
      {slideInform.map((slide, i) => {
        return (
          <li
            key={i}
            style={{
              background: `url(${slide.image}) #f9f9f9 no-repeat center center/contain`,
            }}
          >
            <a href={"/productDetail/" + slide.product_id}>
              <span className="blind">{slide.product_name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Main;
