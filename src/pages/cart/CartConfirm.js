import React, { useEffect, useState } from "react";

function CartConfirm(props) {
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
export default CartConfirm;
