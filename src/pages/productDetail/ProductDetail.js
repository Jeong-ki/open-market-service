import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Amount from "../../components/Amount";
import BtnList from "./BtnList";
import moneyComma from "../../components/moneyComma";

function ProductDetailPage() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let [productCount, setProductCount] = useState(1);

  let { id } = useParams();
  let navigate = useNavigate();

  const userType = localStorage.getItem("userType") === "BUYER" ? true : false;

  useEffect(() => {
    detailProductInfo();
  }, []);

  function detailProductInfo() {
    axios
      .get("http://13.209.150.154:8000/products/" + id)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function cartProductAdd(e) {
    e.preventDefault();
    axios
      .post(
        "http://13.209.150.154:8000/cart/",
        {
          product_id: id,
          quantity: productCount,
          check: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
          },
        }
      )
      .then((response) => {
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <section className="product">
        <h2 className="blind">상품 상세 페이지</h2>
        {isLoading ? (
          <>
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
                      <strong>{moneyComma(product.price)}</strong>원
                    </dd>
                  </dl>
                  <p className="delivery">
                    {product.shipping_method === "DELIVERY"
                      ? "택배배송 "
                      : "소포배송 "}
                    /
                    {product.shipping_fee === 0
                      ? " 무료배송"
                      : " " + product.shipping_fee + "원"}
                  </p>
                </div>

                <Amount
                  product={product}
                  productCount={productCount}
                  setProductCount={setProductCount}
                />

                <div className="price">
                  <p className="maximum">총 상품 금액</p>
                  <div>
                    <p className="maximumAmount">
                      총 수량 <strong>{productCount}</strong>개
                    </p>
                    <p className="maximumPrice">
                      <strong>
                        {moneyComma(product.price * productCount)}
                      </strong>
                      원
                    </p>
                  </div>
                </div>
                <div className="purchase">
                  <a
                    href={
                      userType ? "/payment/" + id + "/" + productCount : null
                    }
                    className={userType ? "rightAway" : "rightAway disabled"}
                  >
                    바로 구매
                  </a>
                  <a
                    href={userType ? "/cart" : null}
                    className={userType ? "basket" : "basket disabled"}
                    onClick={cartProductAdd}
                  >
                    장바구니
                  </a>
                </div>
              </div>
            </article>
            <BtnList />
          </>
        ) : null}
      </section>
    </>
  );
}

export default ProductDetailPage;
