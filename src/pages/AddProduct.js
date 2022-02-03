import React from "react";
import DashHeader from "../components/DashHeader";
import iconImg from "../images/icon-img.png";

function addProduct() {
  return (
    <>
      <DashHeader />
      <section className="addProduct">
        <h2>상품 등록</h2>
        <article className="precautions">
          <h3>*상품 등록 주의사항</h3>
          <div>
            <p>- 너무 귀여운 사진은 심장이 아파올 수 있습니다.</p>
            <br />
            <p>
              - 유소년에게서 천자만홍이 피고 이상이 온갖 들어 약동하다. 이상의
              가지에 사랑의 있는가? 주며, 끓는 힘차게 얼음이 얼음 가치를
              황금시대의 있음으로써 사라지지 것이다. 이 뜨거운지라, 이상의
              속에서 이것은 피가 보배를 황금시대의 싹이 사막이다.
            </p>
            <br />
            <p>
              - 자신과 우는 옷을 지혜는 아니다. 더운지라 설레는 기쁘며,
              위하여서, 평화스러운 광야에서 그리하였는가? 소담스러운 위하여
              인도하겠다는 어디 무엇을 이상을 같지 따뜻한 청춘 칼이다.
            </p>
            <br />
            <p>
              - 가치를 그들을 예수는 찬미를 가슴이 과실이 이것이다. 희망의
              것이다.보라, 풍부하게 이것은 황금시대를 얼마나 인간에 돋고,
              이것이다.
            </p>
          </div>
        </article>
        <article className="product">
          <h3 className="blind">상품 정보 기입</h3>
          <div className="productForm">
            <form id="addProductInfo">
              <fieldset>
                <legend>상품 등록</legend>

                <div className="mainInfo">
                  <label for="productImg" class="txt-label">
                    상품 이미지
                    <div class="productImg">
                      <img src={iconImg} alt="상품 이미지" />
                    </div>
                  </label>
                  <input type="file" accept="image/*" id="productImg" />

                  <div className="inpInfo">
                    <label htmlFor="productName">상품명</label>
                    <input id="productName" type="text" placeholder="13/20" />
                    <label htmlFor="productPrice">판매가</label>
                    <div className="priceBox">
                      <input id="productPrice" type="text" />
                      <span>원</span>
                    </div>
                    <div className="delivery">
                      배송방법
                      <div className="deliveryBox">
                        <button>택배,소포,등기</button>
                        <button>직접배송(화물배달)</button>
                      </div>
                    </div>
                    <label htmlFor="deliveryCharge">기본 배송비</label>
                    <div className="priceBox">
                      <input id="deliveryCharge" type="text" />
                      <span>원</span>
                    </div>
                    <label htmlFor="stock">재고</label>
                    <div className="priceBox">
                      <input id="stock" type="text" />
                      <span>개</span>
                    </div>
                  </div>
                </div>

                <div className="detailInfo">
                  <label htmlFor="productInfo">상품 상세 정보</label>
                  <input
                    id="productInfo"
                    type="text"
                    value="에디터 영역"
                    readonly
                  />
                  <div className="inpBtn">
                    <button>취소</button>
                    <button form="addProductInfo">저장하기</button>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </article>
      </section>
    </>
  );
}

export default addProduct;
