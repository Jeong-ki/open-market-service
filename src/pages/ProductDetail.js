import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";
function ProductDetailPage() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [isInventoryFull, setIsInventoryFull] = useState(false);
  let [productCount, setProductCount] = useState(1);

  useEffect(() => {
    axios
      .get("http://13.209.150.154:8000/products/" + id)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function productCountPlusMinus(calculate) {
    let number = productCount;
    if (calculate === "plus") {
      if (product.stock > productCount) {
        setProductCount(++number);
      } else {
        setIsInventoryFull(true);
        setTimeout(() => {
          setIsInventoryFull(false);
        }, 2000);
      }
    } else if (calculate === "minus") {
      if (productCount >= 2) setProductCount(--number);
    }
  }

  return (
    <>
      <Header />
      <section className="product">
        <h2 className="blind">상품 상세 페이지</h2>
        <article>
          <h2 className="blind">상품 정보</h2>
          <div
            className="imgBox"
            style={{
              background: `url(${product.image}) no-repeat center center/cover`,
            }}
          ></div>
          <div className="explanation">
            <div className="productIntro">
              <p className="company">{product.seller_store}</p>
              <dl>
                <dt>{product.product_name}</dt>
                <dd>
                  <strong>
                    {(product.price + "").replace(
                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
                  </strong>
                  원
                </dd>
              </dl>
              <p className="delivery">
                {product.shipping_method === "DELIVERY"
                  ? "택배배송 "
                  : "소포배송 "}{" "}
                /
                {product.shipping_fee === 0
                  ? " 무료배송"
                  : " " + product.shipping_fee + "원"}
              </p>
            </div>
            <div className="amount">
              <h3 className="blind">상품 수량 설정</h3>
              <div>
                <button
                  type="button"
                  className="symbol"
                  onClick={() => {
                    productCountPlusMinus("minus");
                  }}
                >
                  <img src={minus} alt="minus" />
                </button>
                <span className="volume">{productCount}</span>
                <button
                  type="button"
                  className="symbol"
                  onClick={() => {
                    productCountPlusMinus("plus");
                  }}
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
              {isInventoryFull ? <p>더 이상 재고가 없습니다.</p> : ""}
            </div>
            <div className="price">
              <p className="maximum">총 상품 금액</p>
              <div>
                <p className="maximumAmount">
                  총 수량 <strong>{productCount}</strong>개
                </p>
                <p className="maximumPrice">
                  <strong>
                    {product.price * productCount +
                      "".replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                  </strong>
                  원
                </p>
              </div>
            </div>
            <div className="purchase">
              <a
                href={"/payment/" + id + "/" + productCount}
                className="rightAway"
              >
                바로 구매
              </a>
              <a href={"/cart"} className="basket">
                장바구니
              </a>
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
