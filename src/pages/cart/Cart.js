import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import CartList from "./CartList";
import CartConfirm from "./CartConfirm";

function CartPage() {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let cartList;
  let products;
  const [common, setCommon] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState([]);
  const [cartItemId, setCartItemId] = useState([]);

  const [modalMethod, setModalMethod] = useState("login");
  const [deleteItemInfo, setDeleteItemInfo] = useState(0);
  const [pickItem, setPickItem] = useState(0);

  //모달 on off
  const [isModal, setIsModal] = useState(false);
  const [isCartItem, SetIsCartItem] = useState(false);
  const [isChecked, setIsChecked] = useState([]);
  const [ischeckedChange, setIscheckedChange] = useState(1);
  const [thisProductId, setThisProductId] = useState(0);

  useEffect(() => {
    isLogin();
    cartInfo();
  }, [isCartItem]);

  function cartInfo() {
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
          setIsLoading(true);
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
  }

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
          {isLoading ? (
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
                    <CartList
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
                    <CartConfirm
                      common={common}
                      isChecked={isChecked}
                      cartItemQuantity={cartItemQuantity}
                    />

                    <button
                      type="submit"
                      className="submit"
                      onClick={() => {
                        navigate("/payment/0/0/2", {
                          state: {
                            common: common,
                            cartItemQuantity: cartItemQuantity,
                            isChecked: isChecked,
                          },
                        });
                      }}
                    >
                      주문하기
                    </button>
                  </form>
                </div>
              )}
            </article>
          ) : null}
        </div>

        {isModal ? (
          <Modal
            setIsModal={setIsModal}
            SetIsCartItem={SetIsCartItem}
            productCountPlusMinus={productCountPlusMinus}
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
export default CartPage;
