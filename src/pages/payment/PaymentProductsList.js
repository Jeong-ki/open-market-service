import moneyComma from "../../components/moneyComma";
import React from "react";

function PaymentProductsList(props) {
  const products =
    props.orderKind === "direct_order" ? [props.products] : props.products;
  const productCount = props.productCount;
  const cartItemQuantity = props.cartItemQuantity;
  const isChecked =
    props.orderKind === "direct_order" ? [true] : props.isChecked;
  const orderKind = props.orderKind;
  let totalPrice = 0;
  return (
    <>
      <ul className="tableHead">
        <li>상품정보</li>
        <li>할인</li>
        <li>배송비</li>
        <li>주문금액</li>
      </ul>
      <ul className="productList">
        {products.map((product, i) => {
          if (!isChecked[i]) {
            return "";
          } else if (orderKind === "direct_order") {
            totalPrice += product.price * productCount + product.shipping_fee;
          } else if (orderKind === "cart_order") {
            totalPrice +=
              product.price * cartItemQuantity[i] + product.shipping_fee;
          }
          // else if (orderKind === "cart_order") {
          //   totalPrice += product.price * productCount + product.shipping_fee;
          // }

          return (
            <li key={i}>
              <div className="introduce">
                <img src={product.image} alt="상품이미지" />
                <div className="introduceText">
                  <p className="company">{product.seller_store}</p>
                  <dl>
                    <dt>{product.product_name}</dt>
                    <dd>
                      수량:
                      <strong>
                        {orderKind === "direct_order"
                          ? productCount
                          : cartItemQuantity[i]}
                      </strong>
                      개
                    </dd>
                  </dl>
                </div>
              </div>

              <div className="sale">
                <h3 className="blind">할인 금액</h3>
                <p>-</p>
              </div>

              <div className="delivery">
                <p>
                  {product.shipping_fee
                    ? moneyComma(product.shipping_fee) + "원"
                    : "무료배송"}
                </p>
              </div>
              <div className="price">
                <p>
                  <strong>
                    {orderKind === "direct_order"
                      ? moneyComma(product.price * productCount)
                      : moneyComma(product.price * cartItemQuantity[i])}
                  </strong>
                  원
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="total">
        총 주문 금액
        <span>
          <strong>
            {(totalPrice + "").replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
          원
        </span>
      </p>
    </>
  );
}

export default PaymentProductsList;
