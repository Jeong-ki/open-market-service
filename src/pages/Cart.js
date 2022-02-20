import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";

import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";
import remove from "../images/icon-delete.svg";

function CartPage() {
  let cartList;
  let products;
  const [common, setCommon] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState([]);
  const [cartItemId, setCartItemId] = useState([]);

  const [modalMethod, setModalMethod] = useState("login");
  const [deleteItemInfo, setDeleteItemInfo] = useState(0);
  const [pickItem, setPickItem] = useState(0);

  const [isModal, setIsModal] = useState(false);
  const [isCartItem, SetIsCartItem] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [ischeckedChange, setIscheckedChange] = useState(1);
  const [thisProductId, setThisProductId] = useState(0);

  useEffect(() => {
    isLogin();
    axios
      .get("http://13.209.150.154:8000/cart/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
        },
      })
      .then((response) => {
        cartList = [...response.data.results];
        let copyQuantity = [];
        let copyId = [];
        cartList.forEach((cartItem) => {
          SetIsCartItem(true);
          copyId.push(cartItem.cart_item_id);
          copyQuantity.push(cartItem.quantity);
        });
        setCartItemQuantity(copyQuantity);
        setCartItemId(copyId);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://13.209.150.154:8000/products/")
      .then((response) => {
        products = [...response.data.results];
        let newArr = [];
        let newCheckArr = [];
        cartList.forEach((cartItem) => {
          products.forEach((product) => {
            if (cartItem.product_id === product.product_id) {
              newArr.push(product);
              newCheckArr.push(false);
            }
          });
        });
        setCommon(newArr);
        setIsChecked(newCheckArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isCartItem]);

  function isLogin() {
    let loginStatus = localStorage.getItem("acessToken") ? true : false;
    if (!loginStatus) {
      setModalMethod("login");
      setIsModal(true);
    }
  }

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
            {!isCartItem ? (
              <div className="noneProduct">
                <p>
                  <strong>장바구니 안에 담긴 상품이 없습니다.</strong>
                </p>
                <p>원하는 상품을 장바구니에 담아보세요</p>
              </div>
            ) : (
              <div className="showProduct">
                <form action="#" method="get">
                  <CartItem
                    common={common}
                    cartItemQuantity={cartItemQuantity}
                    cartItemId={cartItemId}
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    ischeckedChange={ischeckedChange}
                    setIscheckedChange={setIscheckedChange}
                    setIsModal={setIsModal}
                    setPickItem={setPickItem}
                    setThisProductId={setThisProductId}
                    productCountPlusMinus={productCountPlusMinus}
                    setModalMethod={setModalMethod}
                    setDeleteItemInfo={setDeleteItemInfo}
                  />
                  <Confirm
                    common={common}
                    isChecked={isChecked}
                    cartItemQuantity={cartItemQuantity}
                  />
                  <button type="submit" className="submit">
                    주문하기
                  </button>
                </form>
              </div>
            )}
          </article>
        </div>

        {isModal ? (
          <Modal
            setIsModal={setIsModal}
            SetIsCartItem={SetIsCartItem}
            productCountPlusMinus={productCountPlusMinus}
            setIsModal={setIsModal}
            modalMethod={modalMethod}
            pickItem={pickItem}
            deleteItemInfo={deleteItemInfo}
            cartItemQuantity={cartItemQuantity}
            thisProductId={thisProductId}
          />
        ) : (
          ""
        )}
      </section>
    </>
  );
}

function CartItem(props) {
  let navigate = useNavigate();
  const common = props.common;
  const cartItemQuantity = props.cartItemQuantity;
  const cartItemId = props.cartItemId;
  const isChecked = props.isChecked;
  let copyNumber = props.ischeckedChange;
  return (
    <ul>
      {common.map((item, i) => {
        return (
          <li key={i}>
            <label>
              <p className="blind">상품 체크 박스</p>
              <input
                type="checkbox"
                className="hide"
                defaultValue={isChecked[i]}
                onChange={() => {
                  props.setIscheckedChange(++copyNumber);
                  let indexArr = isChecked;
                  indexArr[i] = isChecked[i] ? false : true;
                  props.setIsChecked(indexArr);
                }}
              />
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
                    props.setPickItem(i);
                    props.setThisProductId(item.product_id);
                    props.setDeleteItemInfo(cartItemId[i]);
                    props.setModalMethod("amount");
                    props.setIsModal(true);
                  }}
                >
                  <img src={minus} alt="minus" />
                </button>
                <span className="volume">{cartItemQuantity[i]}</span>
                <button
                  type="button"
                  className="symbol"
                  onClick={() => {
                    props.setPickItem(i);
                    props.setThisProductId(item.product_id);
                    props.setDeleteItemInfo(cartItemId[i]);
                    props.setModalMethod("amount");
                    props.setIsModal(true);
                  }}
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
            </div>

            <div className="orderPrice">
              <p>
                <strong>
                  {(item.price * cartItemQuantity[i] + "").replace(
                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                    ","
                  )}
                </strong>
                원
              </p>
              <button
                type="button"
                className="orderBtn"
                onClick={() => {
                  console.log(item.product_id, cartItemQuantity[i]);
                  navigate(
                    `/payment/${item.product_id}/${cartItemQuantity[i]}/3`
                  );
                }}
              >
                주문하기
              </button>
            </div>
            <button
              type="button"
              className="cancel"
              onClick={() => {
                props.setDeleteItemInfo(cartItemId[i]);
                props.setModalMethod("delete");
                props.setIsModal(true);
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
  const common = props.common;
  const cartItemQuantity = props.cartItemQuantity;
  const isChecked = props.isChecked;
  let [totalAmount, setTotalAmount] = useState(0);
  let [fee, setFee] = useState(0);
  useEffect(() => {
    let copyTotal = 0;
    let copyFee = 0;
    common.forEach((item, i) => {
      if (isChecked[i]) {
        copyTotal += item.price * cartItemQuantity[i];
        copyFee += item.shipping_fee;
      }
    });
    setTotalAmount(copyTotal);
    setFee(copyFee);
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
