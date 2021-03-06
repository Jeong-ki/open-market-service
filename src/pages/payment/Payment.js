import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import PaymentProductsList from "./PaymentProductsList";
import moneyComma from "../../components/moneyComma";

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
    if (!!location.state) {
      cartTotalPriceAdd();
    }
  });

  function cartTotalPriceAdd() {
    let copyTotalPrice = 0;
    location.state.common.forEach((product, i) => {
      if (location.state.isChecked[i]) {
        copyTotalPrice +=
          product.price * location.state.cartItemQuantity[i] +
          product.shipping_fee;
      }
    });
    setCartTotalPrice(copyTotalPrice);
  }

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
    let copyTotalPrice = 0;
    let copyTotalFee = 0;
    location.state.common.forEach((product, i) => {
      if (location.state.isChecked[i]) {
        copyTotalPrice += product.price * location.state.cartItemQuantity[i];
        copyTotalFee += product.shipping_fee;
      }
    });
    setTotalPrice(copyTotalPrice);
    setTotalFee(copyTotalFee);
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

  function handelSubmit() {
    if (allCheck) {
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
        axios
          .post(
            "http://13.209.150.154:8000/order/",
            {
              total_price: cartTotalPrice,
              order_kind: "cart_order",
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
            navigate("/");
          });
      }
    }
  }

  return (
    <>
      <Header />
      <section className="payment">
        <h2>??????/????????????</h2>
        <PaymentProductsList
          products={products}
          cartItemQuantity={cartItemQuantity}
          isChecked={isChecked}
          orderKind={orderKind}
          productCount={count}
        />
        <section className="deliveryPayment">
          <h3 className="blind">?????? ??? ?????? ??????</h3>
          <form method="post">
            <section className="deliveryInform">
              <h4>?????? ??????</h4>
              <article>
                <h5>????????? ??????</h5>
                <ul>
                  <li>
                    <span>??????</span>
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
                    <span>?????????</span>
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
                    <span>?????????</span>
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
                <h5>????????? ??????</h5>
                <ul>
                  <li>
                    <span>?????????</span>
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
                    <span>?????????</span>
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
                      <span>????????????</span>
                      <div>
                        <input type="text" disabled />
                        <button type="button">???????????? ??????</button>
                      </div>
                    </div>
                    <div className="detailAddress">
                      <label>
                        <input type="text" disabled />
                        <span className="blind">??????????????? ??????????????????.</span>
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
                    <span>?????? ?????????</span>
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
              <h4 className="blind">???????????? ??? ?????? ??????</h4>
              <article className="method">
                <h5>?????? ??????</h5>
                <div>
                  <input
                    type="radio"
                    name="payment"
                    id="card"
                    onChange={() => {
                      setPaymentMethod("CARD");
                    }}
                  />
                  <label htmlFor="card">??????/????????????</label>
                  <input
                    type="radio"
                    name="payment"
                    id="money"
                    onChange={() => {
                      setPaymentMethod("DEPOSIT");
                    }}
                  />
                  <label htmlFor="money">????????? ??????</label>
                  <input
                    type="radio"
                    name="payment"
                    id="phone"
                    onChange={() => {
                      setPaymentMethod("PHONE_PAYMENT");
                    }}
                  />
                  <label htmlFor="phone">????????? ??????</label>
                  <input
                    type="radio"
                    name="payment"
                    id="naver"
                    onChange={() => {
                      setPaymentMethod("NAVERPAY");
                    }}
                  />
                  <label htmlFor="naver">???????????????</label>
                  <input
                    type="radio"
                    name="payment"
                    id="kakao"
                    onChange={() => {
                      setPaymentMethod("KAKAOPAY");
                    }}
                  />
                  <label htmlFor="kakao">???????????????</label>
                </div>
              </article>

              <article className="final">
                <h5>?????? ????????????</h5>
                <div className="borderGreen">
                  <div className="inform">
                    <dl className="paymentList">
                      <dt>????????????</dt>
                      <dd>
                        <strong>{moneyComma(totalPrice)}</strong>???
                      </dd>
                      <dt>????????????</dt>
                      <dd>
                        <strong>0</strong>???
                      </dd>
                      <dt>?????????</dt>
                      <dd>
                        <strong>{moneyComma(totalFee)}</strong>???
                      </dd>
                    </dl>
                    <dl className="finalPay">
                      <dt>????????????</dt>
                      <dd>
                        <strong> {moneyComma(totalPrice + totalFee)}</strong>???
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
                      ?????? ????????? ??????????????????, ?????? ?????? ?????? ???????????????.
                    </label>
                    <br />
                    <button
                      type="button"
                      className={allCheck ? "active" : ""}
                      onClick={() => {
                        handelSubmit();
                      }}
                    >
                      ????????????
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

export default Payment;
