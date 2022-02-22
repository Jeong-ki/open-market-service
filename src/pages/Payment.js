import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";

function Payment() {
  let { id, count, kind } = useParams();
  const [orderKind, setOrderKind] = useState("direct_order");
  const [products, setProducts] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState([]);
  const [isChecked, setIsChecked] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const [ordererName, setOrdererName] = useState("");
  const [ordererPhoneNumber, setOrdererPhoneNumber] = useState(["", "", ""]);
  const [email, setEmail] = useState();
  const [deleveryName, setDeleveryName] = useState("");
  const [deleveryPhoneNumber, setDeleveryPhoneNumber] = useState(["", "", ""]);
  const [deleveryAddress, setDeleveryAddress] = useState("");
  const [deleveryMessage, setDeleveryMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [checkAgree, setCheckAgree] = useState(false);

  const [allCheck, setAllCheck] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (kind === "1" || kind === "3") {
      directOrder();
    } else if (kind === "2") {
      setOrderKind("cart_order");
      cartOrder();
    }
  }, []);
  useEffect(() => {
    isSetAllCheck();
  });

  function directOrder() {
    axios
      .get("http://13.209.150.154:8000/products/" + id + "/")
      .then((response) => {
        setProducts(response.data);
        setTotalPrice(response.data.price * count);
        setTotalFee(response.data.shipping_fee);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function cartOrder() {
    setProducts(location.state.common);
    setCartItemQuantity(location.state.cartItemQuantity);
    setIsChecked(location.state.isChecked);
    let copyTotalPrice = cartTotalPrice;
    location.state.common.forEach((product, i) => {
      if (location.state.isChecked[i]) {
        copyTotalPrice +=
          product.price * location.state.cartItemQuantity[i] +
          product.shipping_fee;
        setCartTotalPrice(copyTotalPrice);
      }
    });
  }

  function isSetAllCheck() {
    if (
      ordererName &&
      ordererPhoneNumber &&
      email &&
      deleveryName &&
      deleveryPhoneNumber &&
      deleveryAddress &&
      deleveryMessage &&
      paymentMethod &&
      checkAgree
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }

  function handelSubmit(e) {
    console.log(cartTotalPrice);
    if (allCheck) {
      console.log(kind);
      if (kind === "1" || kind === "3") {
        axios
          .post(
            "http://13.209.150.154:8000/order/",
            {
              product_id: id,
              quantity: count,
              order_kind: orderKind,
              receiver: deleveryName,
              receiver_phone_number: deleveryPhoneNumber.join(""),
              address: deleveryAddress,
              address_message: deleveryMessage,
              payment_method: paymentMethod,
              total_price: totalPrice + totalFee,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
              },
            }
          )
          .then((response) => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (kind === "2") {
        console.log(cartTotalPrice);
        axios
          .post(
            "http://13.209.150.154:8000/order/",
            {
              total_price: cartTotalPrice,
              order_kind: orderKind,
              receiver: deleveryName,
              receiver_phone_number: deleveryPhoneNumber.join(""),
              address: deleveryAddress,
              address_message: deleveryMessage,
              payment_method: paymentMethod,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `JWT ${localStorage.getItem("acessToken")}`,
              },
            }
          )
          .then((response) => {
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <>
      <Header />
      <section className="payment">
        <h2>주문/결제하기</h2>
        <PaymentProductsList
          products={products}
          cartItemQuantity={cartItemQuantity}
          isChecked={isChecked}
          orderKind={orderKind}
          productCount={count}
        />
        <section className="deliveryPayment">
          <h3 className="blind">배송 및 결제 정보</h3>
          <form method="post">
            <section className="deliveryInform">
              <h4>배송 정보</h4>
              <article>
                <h5>주문자 정보</h5>
                <ul>
                  <li>
                    <span>이름</span>
                    <label>
                      <input
                        type="text"
                        autoComplete="off"
                        onChange={(e) => {
                          setOrdererName(e.target.value);
                        }}
                        value={ordererName}
                      />
                    </label>
                  </li>
                  <li>
                    <span>휴대폰</span>
                    <div className="phone">
                      <label>
                        <input
                          type="text"
                          maxLength="3"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[0] = e.target.value;
                            setOrdererPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>

                      <label>
                        <input
                          type="text"
                          minLength="3"
                          maxLength="4"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[1] = e.target.value;
                            setOrdererPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>

                      <label>
                        <input
                          type="text"
                          minLength="3"
                          maxLength="4"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[2] = e.target.value;
                            setOrdererPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>
                    </div>
                  </li>
                  <li>
                    <span>이메일</span>
                    <label>
                      <input
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </label>
                  </li>
                </ul>
              </article>

              <article>
                <h5>배송지 정보</h5>
                <ul>
                  <li>
                    <span>수령인</span>
                    <label>
                      <input
                        type="text"
                        autoComplete="off"
                        onChange={(e) => {
                          setDeleveryName(e.target.value);
                        }}
                        value={deleveryName}
                      />
                    </label>
                  </li>
                  <li>
                    <span>휴대폰</span>
                    <div className="phone">
                      <label>
                        <input
                          type="text"
                          maxLength="3"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[0] = e.target.value;
                            setDeleveryPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>

                      <label>
                        <input
                          type="text"
                          minLength="3"
                          maxLength="4"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[1] = e.target.value;
                            setDeleveryPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>

                      <label>
                        <input
                          type="text"
                          minLength="3"
                          maxLength="4"
                          autoComplete="off"
                          onChange={(e) => {
                            let copyPhoneNumber = ordererPhoneNumber;
                            copyPhoneNumber[2] = e.target.value;
                            setDeleveryPhoneNumber(copyPhoneNumber);
                          }}
                        />
                      </label>
                    </div>
                  </li>
                  <li className="address">
                    <div className="addressBtn">
                      <span>배송주소</span>
                      <div>
                        <input type="text" disabled />
                        <button type="button">우편번호 조회</button>
                      </div>
                    </div>
                    <div className="detailAddress">
                      <label>
                        <input type="text" disabled />
                        <span className="blind">상세주소를 입력해주세요.</span>
                        <input
                          type="text"
                          onChange={(e) => {
                            setDeleveryAddress(e.target.value);
                          }}
                        />
                      </label>
                    </div>
                  </li>
                  <li className="deliveryMessage">
                    <span>배송 메시지</span>
                    <label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setDeleveryMessage(e.target.value);
                        }}
                      />
                    </label>
                  </li>
                </ul>
              </article>
            </section>

            <section className="paymentInform">
              <h4 className="blind">결제수단 및 결제 정보</h4>
              <article className="method">
                <h5>결제 수단</h5>
                <div>
                  <input
                    type="radio"
                    name="payment"
                    id="card"
                    onChange={() => {
                      setPaymentMethod("CARD");
                    }}
                  />
                  <label htmlFor="card">신용/체크카드</label>
                  <input
                    type="radio"
                    name="payment"
                    id="money"
                    onChange={() => {
                      setPaymentMethod("DEPOSIT");
                    }}
                  />
                  <label htmlFor="money">무통장 입금</label>
                  <input
                    type="radio"
                    name="payment"
                    id="phone"
                    onChange={() => {
                      setPaymentMethod("PHONE_PAYMENT");
                    }}
                  />
                  <label htmlFor="phone">휴대폰 결제</label>
                  <input
                    type="radio"
                    name="payment"
                    id="naver"
                    onChange={() => {
                      setPaymentMethod("NAVERPAY");
                    }}
                  />
                  <label htmlFor="naver">네이버페이</label>
                  <input
                    type="radio"
                    name="payment"
                    id="kakao"
                    onChange={() => {
                      setPaymentMethod("KAKAOPAY");
                    }}
                  />
                  <label htmlFor="kakao">카카오페이</label>
                </div>
              </article>

              <article className="final">
                <h5>최종 결제정보</h5>
                <div className="borderGreen">
                  <div className="inform">
                    <dl className="paymentList">
                      <dt>상품금액</dt>
                      <dd>
                        <strong>{totalPrice}</strong>원
                      </dd>
                      <dt>할인금액</dt>
                      <dd>
                        <strong>0</strong>원
                      </dd>
                      <dt>배송비</dt>
                      <dd>
                        <strong>{totalFee}</strong>원
                      </dd>
                    </dl>
                    <dl className="finalPay">
                      <dt>결제금액</dt>
                      <dd>
                        <strong>{totalPrice + totalFee}</strong>원
                      </dd>
                    </dl>
                  </div>
                  <div className="check">
                    <label>
                      <input
                        type="checkbox"
                        onChange={() => {
                          checkAgree
                            ? setCheckAgree(false)
                            : setCheckAgree(true);
                        }}
                      />
                      주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                    </label>
                    <br />
                    <button
                      type="button"
                      className={allCheck ? "active" : ""}
                      onClick={() => {
                        handelSubmit();
                      }}
                    >
                      결제하기
                    </button>
                  </div>
                </div>
              </article>
            </section>
          </form>
        </section>
      </section>
    </>
  );
}

function PaymentProductsList(props) {
  const products =
    props.orderKind === "direct_order" ? [props.products] : props.products;
  const productCount = props.productCount;
  const cartItemQuantity = props.cartItemQuantity;
  const isChecked = props.isChecked;
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
          console.log(totalPrice, product);
          if (!isChecked[i]) {
            return "";
          }
          if (isChecked[i] && orderKind === "cart_order") {
            totalPrice +=
              product.price * cartItemQuantity[i] + product.shipping_fee;
          } else if (orderKind === "cart_order") {
            totalPrice += product.price * productCount + product.shipping_fee;
          }

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
                    ? (product.shipping_fee + "").replace(
                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                        ","
                      ) + "원"
                    : "무료배송"}
                </p>
              </div>
              <div className="price">
                <p>
                  <strong>
                    {(orderKind === "direct_order"
                      ? product.price * productCount + ""
                      : product.price * cartItemQuantity[i] + ""
                    ).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
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
export default Payment;
