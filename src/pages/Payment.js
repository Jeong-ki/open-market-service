import React from "react";
import Header from "../components/Header";
import test from "../images/test.jpg";
function Payment() {
  return (
    <>
      <Header />
      <section className="payment">
        <h2>주문/결제하기</h2>
        <div className="contProduct">
          <ul className="tableHead">
            <li>상품정보</li>
            <li>할인</li>
            <li>배송비</li>
            <li>주문금액</li>
          </ul>
        </div>
        <ul>
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
        <p>
          총 주문 금액
          <span>
            <strong>46,500</strong>원
          </span>
        </p>

        <section>
          <h3>배송 및 결제 정보</h3>
          <form method="post">
            <section>
              <h4>배송 정보</h4>
              <article>
                <h5>주문자 정보</h5>
                <ul>
                  <li>
                    <label>
                      이름
                      <input type="text" />
                    </label>
                  </li>
                  <li>
                    <label>
                      휴대폰
                      <input type="number" /> -
                      <input type="number" /> -
                      <input type="number" />
                    </label>
                  </li>
                  <li>
                    <label>
                      이메일
                      <input type="email" />
                    </label>
                  </li>
                </ul>
              </article>

              <article>
                <h4>배송지 정보</h4>
                <ul>
                  <li>
                    <label>
                      수령인
                      <input type="text" />
                    </label>
                  </li>
                  <li>
                    <label>
                      휴대폰
                      <input type="number" /> -
                      <input type="number" /> -
                      <input type="number" />
                    </label>
                  </li>
                  <li>
                    <label>
                      배송주소
                      <input type="text" disabled />
                      <button type="button">우편번호 조회</button>
                      <br />
                      <input type="text" disabled /> <br />
                      <input type="text" />
                    </label>
                  </li>
                  <li>
                    <label>
                      배송 메시지
                      <input type="text" />
                    </label>
                  </li>
                </ul>
              </article>
            </section>

            <section>
              <h4>결제 수단</h4>
              <label>
                <input type="radio" name="payment" />
                신용/체크카드
              </label>
              <label>
                <input type="radio" name="payment" />
                무통장 입금
              </label>
              <label>
                <input type="radio" name="payment" />
                휴대폰 결제
              </label>
              <label>
                <input type="radio" name="payment" />
                네이버페이
              </label>
              <label>
                <input type="radio" name="payment" />
                카카오페이
              </label>
            </section>

            <section>
              <h3>최종 결제정보</h3>
              <div>
                <dl>
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
                  <dt>결제금액</dt>
                  <dd>
                    <strong>46,500</strong>원
                  </dd>
                </dl>
                <label>
                  <input type="checkbox" />
                  주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                </label>{" "}
                <br />
                <button type="submit">결제하기</button>
              </div>
            </section>
          </form>
        </section>
      </section>
    </>
  );
}

export default Payment;
