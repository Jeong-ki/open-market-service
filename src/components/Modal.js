import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import remove from "../images/icon-delete.svg";
import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";

function Modal(props) {
  const modalMethod = props.modalMethod;
  const deleteItemInfo = props.deleteItemInfo;

  function cartItemDelete() {
    axios
      .delete("http://13.209.150.154:8000/cart/" + deleteItemInfo + "/", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
        },
      })
      .then((response) => {
        props.setIsModal(false);
        props.SetIsCartItem(false);
        window.location.replace("/cart");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loginModal() {
    props.setIsModal(false);
    window.location.replace("/login");
  }
  function cartItemQuantityFix() {
    axios
      .put(
        "http://13.209.150.154:8000/cart/" + deleteItemInfo + "/",
        {
          product_id: props.thisProductId,
          quantity: props.cartItemQuantity[props.pickItem],
          is_active: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
          },
        }
      )
      .then((response) => {
        props.setIsModal(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function modalFunction() {
    switch (modalMethod) {
      case "delete":
        cartItemDelete();
        break;
      case "login":
        loginModal();
        break;
      case "amount":
        cartItemQuantityFix();
        break;
    }
  }
  console.log(props.pickItem);
  return (
    <div className="dimm">
      <div className="modal">
        {modalMethod === "delete" ? (
          <p>상품을 삭제하시겠습니까?</p>
        ) : modalMethod === "login" ? (
          <p>
            로그인이 필요한 서비스입니다. <br /> 로그인 하시겠습니까?
          </p>
        ) : (
          <div className="quantity">
            <h3 className="blind">상품 수량 설정</h3>
            <div>
              <button
                type="button"
                className="symbol"
                onClick={() => {
                  props.productCountPlusMinus("minus", props.pickItem);
                }}
              >
                <img src={minus} alt="minus" />
              </button>
              <span className="volume">
                {props.cartItemQuantity[props.pickItem]}
              </span>
              <button
                type="button"
                className="symbol"
                onClick={() => {
                  props.productCountPlusMinus("plus", props.pickItem);
                }}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          </div>
        )}
        <button
          className="modalBtn modalX"
          onClick={() => {
            props.setIsModal(false);
            if (modalMethod === "login") {
              window.location.replace("/");
            } else if (modalMethod === "amount") {
              window.location.replace("/cart");
            }
          }}
        >
          {modalMethod === "login" ? "아니오" : "취소"}
        </button>
        <button className="modalBtn modalO" onClick={modalFunction}>
          {modalMethod === "login"
            ? "예"
            : modalMethod === "delete"
            ? "확인"
            : "수정"}
        </button>
        <button
          type="button"
          className="modalCancel"
          onClick={() => {
            props.setIsModal(false);
          }}
        >
          <img src={remove} alt="상품 취소" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
