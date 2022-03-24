import React from "react";
import { useNavigate } from "react-router-dom";

import minus from "../../images/icon-minus-line.svg";
import plus from "../../images/icon-plus-line.svg";
import remove from "../../images/icon-delete.svg";

function CartList(props) {
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
export default CartList;
