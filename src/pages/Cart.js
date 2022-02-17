import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";
import remove from "../images/icon-delete.svg";
function CartPage() {
  let cartList;
  // let [cartList, setCartList] = useState([]);
  let products;
  let [common, setCommon] = useState([]);
  let [cartItemQuantity, setCartItemQuantity] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.209.150.154:8000/cart/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
        },
      })
      .then((response) => {
        cartList = [...response.data.results];
        let copyArr = [];
        cartList.forEach((cartItem) => {
          copyArr.push(cartItem.quantity);
        });
        setCartItemQuantity(copyArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://13.209.150.154:8000/products/")
      .then((response) => {
        products = [...response.data.results];
        let newArr = [];
        cartList.forEach((cartItem) => {
          products.forEach((product) => {
            if (cartItem.product_id === product.product_id) {
              newArr.push(product);
            }
          });
        });
        setCommon(newArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function productCountPlusMinus(calculate, i) {
    let copyArr = [...cartItemQuantity];
    if (calculate === "plus") {
      if (common[i].stock > cartItemQuantity[i]) {
        ++copyArr[i];
        setCartItemQuantity(copyArr);
      }
    } else if (calculate === "minus") {
      if (cartItemQuantity[i] >= 2) {
        --copyArr[i];
        setCartItemQuantity(copyArr);
      }
    }
  }

  function cartItemDelete(cartId) {
    console.log(cartId);
  }

  return (
    <>
      <Header />
      <section className="cart">
        <h2>장바구니</h2>
        <div className="contProduct">
          <ul className="tableHead">
            <li>
              <span></span>
            </li>
            <li>상품정보</li>
            <li>수량</li>
            <li>상품금액</li>
          </ul>

          <article className="tableBody">
            <h3 className="blind">장바구니 상품 목록</h3>
            <div className="noneProduct hide">
              <p>
                <strong>장바구니 안에 담긴 상품이 없습니다.</strong>
              </p>
              <p>원하는 상품을 장바구니에 담아보세요</p>
            </div>

            <div className="showProduct">
              <form action="#" method="get">
                <CartItem
                  common={common}
                  cartItemQuantity={cartItemQuantity}
                  productCountPlusMinus={productCountPlusMinus}
                  cartItemDelete={cartItemDelete}
                />
                <Confirm common={common} cartItemQuantity={cartItemQuantity} />
                <button type="submit" className="submit">
                  주문하기
                </button>
              </form>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

function CartItem(props) {
  let common = props.common;
  let cartItemQuantity = props.cartItemQuantity;
  return (
    <ul>
      {common.map((item, i) => {
        return (
          <li key={i}>
            <label>
              <p className="blind">상품 체크 박스</p>
              <input type="checkbox" className="hide" />
              <div>
                <span></span>
              </div>
            </label>

            <div className="introduce">
              <img src={item.image} alt={item.product_name} />
              <div className="introduceText">
                <p className="company">{item.seller_store}</p>
                <dl>
                  <dt>{item.product_name}</dt>
                  <dd>
                    <strong>
                      {(item.price + "").replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </strong>
                    원
                  </dd>
                </dl>
                <p className="delivery">
                  {item.shipping_method === "DELIVERY"
                    ? "택배배송 "
                    : "소포배송 "}
                  /
                  {item.shipping_fee === 0
                    ? " 무료배송"
                    : " " + item.shipping_fee + "원"}
                </p>
              </div>
            </div>

            <div className="quantity">
              <h3 className="blind">상품 수량 설정</h3>
              <div>
                <button
                  type="button"
                  className="symbol"
                  onClick={() => {
                    props.productCountPlusMinus("minus", i);
                  }}
                >
                  <img src={minus} alt="minus" />
                </button>
                <span className="volume">{cartItemQuantity[i]}</span>
                <button
                  type="button"
                  className="symbol"
                  onClick={() => {
                    props.productCountPlusMinus("plus", i);
                  }}
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
            </div>

            <div className="orderPrice">
              <p>
                <strong>{item.price * cartItemQuantity[i]}</strong>원
              </p>
              <button type="button" className="orderBtn">
                주문하기
              </button>
            </div>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                console.log(common);
                props.cartItemDelete(item.cart_item_id);
              }}
            >
              <img src={remove} alt="상품 취소" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Confirm(props) {
  let common = props.common;
  let cartItemQuantity = props.cartItemQuantity;
  let totalAmount = 0;
  let fee = 0;
  common.forEach((item, i) => {
    totalAmount += item.price * cartItemQuantity[i];
    fee += item.shipping_fee;
  });
  return (
    <div className="confirm">
      <dl className="total">
        <dt>총상품금액</dt>
        <dd>
          <strong>
            {(totalAmount + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
          원
        </dd>
      </dl>
      <div className="calculate minus">
        <span className="blind">-</span>
      </div>
      <dl className="cale">
        <dt>상품 할인</dt>
        <dd>
          <strong>0</strong>원
        </dd>
      </dl>
      <div className="calculate plus">
        <span className="blind">+</span>
      </div>
      <dl className="deliveryFee">
        <dt>배송비</dt>
        <dd>
          <strong>
            {(fee + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
          원
        </dd>
      </dl>
      <dl className="paymentDl">
        <dt>결제 예정 금액</dt>
        <dd>
          <strong>
            {(fee + totalAmount + "").replace(
              /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
              ","
            )}
          </strong>
          원
        </dd>
      </dl>
    </div>
  );
}
export default CartPage;
