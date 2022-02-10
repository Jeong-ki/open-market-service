import React from "react";
import Header from "../components/Header";
import test from "../images/test.jpg";
function Payment() {
  return (
    <>
      <Header />
      <section className="payment">
        <h2>주문/결제하기</h2>
        <ul className="tableHead">
          <li>상품정보</li>
          <li>할인</li>
          <li>배송비</li>
          <li>주문금액</li>
        </ul>

        <ul className="productList">
          <li>
            <div className="introduce">
              <img src={test} alt="상품이미지" />
              <div className="introduceText">
                <p className="company">백엔드글로벌</p>
                <dl>
                  <dt>딥러닝 개발자 무릎 담요</dt>
                  <dd>
                    수량: <strong>1</strong>개
                  </dd>
                </dl>
              </div>
            </div>

            <div className="sale">
              <h3 className="blind">할인 금액</h3>
              <p>-</p>
            </div>

            <div class="delivery">
              <p>무료배송</p>
            </div>
            <div class="price">
              <p>
                <strong>17,500</strong>원
              </p>
            </div>
          </li>
          <li>
            <div className="introduce">
              <img src={test} alt="상품이미지" />
              <div className="introduceText">
                <p className="company">백엔드글로벌</p>
                <dl>
                  <dt>딥러닝 개발자 무릎 담요</dt>
                  <dd>
                    수량: <strong>1</strong>개
                  </dd>
                </dl>
              </div>
            </div>

            <div className="sale">
              <h3 className="blind">할인 금액</h3>
              <p>-</p>
            </div>

            <div class="delivery">
              <p>무료배송</p>
            </div>
            <div class="price">
              <p>
                <strong>17,500</strong>원
              </p>
            </div>
          </li>
        </ul>
        <p className="total">
          총 주문 금액
          <span>
            <strong>46,500</strong>원
          </span>
        </p>

        <section className="deliveryPayment">
          <h3 className="hide">배송 및 결제 정보</h3>
          <form method="post">
            <section className="deliveryInform">
              <h4>배송 정보</h4>
              <article>
                <h5>주문자 정보</h5>
                <ul>
                  <li>
                    <span>이름</span>
                    <label>
                      <input type="text" />
                    </label>
                  </li>
                  <li>
                    <span>휴대폰</span>
                    <div className="phone">
                      <label>
                        <input type="number" />
                      </label>

                      <label>
                        <input type="number" />
                      </label>

                      <label>
                        <input type="number" />
                      </label>
                    </div>
                  </li>
                  <li>
                    <span>이메일</span>
                    <label>
                      <input type="email" />
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
                      <input type="text" />
                    </label>
                  </li>
                  <li>
                    <span>휴대폰</span>
                    <div className="phone">
                      <label>
                        <input type="number" />
                      </label>

                      <label>
                        <input type="number" />
                      </label>

                      <label>
                        <input type="number" />
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
                        <span className="hide">상세주소를 입력해주세요.</span>
                        <input type="text" />
                      </label>
                    </div>
                  </li>
                  <li className="deliveryMessage">
                    <span>배송 메시지</span>
                    <label>
                      <input type="text" />
                    </label>
                  </li>
                </ul>
              </article>
            </section>

            <section className="paymentInform">
              <h4 className="hide">결제수단 및 결제 정보</h4>
              <article className="method">
                <h5>결제 수단</h5>
                <div>
                  <input type="radio" name="payment" id="card" />
                  <label htmlFor="card">신용/체크카드</label>
                  <input type="radio" name="payment" id="money" />
                  <label htmlFor="money">무통장 입금</label>
                  <input type="radio" name="payment" id="phone" />
                  <label htmlFor="phone">휴대폰 결제</label>
                  <input type="radio" name="payment" id="naver" />
                  <label htmlFor="naver">네이버페이</label>
                  <input type="radio" name="payment" id="kakao" />
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
                        <strong>46,500</strong>원
                      </dd>
                      <dt>할인금액</dt>
                      <dd>
                        <strong>0</strong>원
                      </dd>
                      <dt>배송비</dt>
                      <dd>
                        <strong>0</strong>원
                      </dd>
                    </dl>
                    <dl className="finalPay">
                      <dt>결제금액</dt>
                      <dd>
                        <strong>46,500</strong>원
                      </dd>
                    </dl>
                  </div>
                  <div className="check">
                    <label>
                      <input type="checkbox" />
                      주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                    </label>
                    <br />
                    <button type="submit">결제하기</button>
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
