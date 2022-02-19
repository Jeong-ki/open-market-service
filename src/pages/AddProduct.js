import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import DashHeader from "../components/DashHeader";
import iconImg from "../images/icon-img.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64 - 미리보기
  const [imgFile, setImgFile] = useState(null); // 파일
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [shippingMethod, setShippingMethod] = useState("PARCEL");
  const [shippingFee, setShippingFee] = useState("");
  const [stock, setStock] = useState("");
  const [info, setInfo] = useState("상품 상세정보");
  const [btnOn, setBtnOn] = useState(false);
  let product = null;
  
  useEffect(() => {
    product = location.state ? location.state.product : location.state;
    console.log(product);
    if(product) {
      // setImgBase64(product.image);
      setProductName(product.product_name);
      setPrice(product.price);
      setShippingMethod(product.shipping_method);
      setShippingFee(product.shipping_fee);
      setStock(product.stock);
    }
  }, []);

  useEffect(() => {
    console.log(!!(imgFile && productName && price && shippingFee && stock));
    if(!!(imgFile && productName && price && shippingFee && stock)) {
      setBtnOn(true);
    } else {
      setBtnOn(false);
    }
  }, [imgFile, productName, price, shippingFee, stock])
  
  const handleChangeFile = (event) => {
    setImgFile(event.target.files[0]);
    if (event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = () => {
        const base64 = reader.result;
        if (base64) {
          let base64Sub = base64.toString();
          console.log(base64Sub);
          setImgBase64(base64Sub);
        }
      }
    }
  }

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  }
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  }
  const shippingParcel = (event) => {
    event.preventDefault();
    setShippingMethod("PARCEL");
  }
  const shippingDelivery = (event) => {
    event.preventDefault();
    setShippingMethod("DELIVERY");
  }
  const handleShippingFeeChange = (event) => {
    setShippingFee(event.target.value);
  }
  const handleStockChange = (event) => {
    setStock(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  }

  async function postData() {
    const loginIdKey = localStorage.getItem("loginIdKey");
    const formData = new FormData();
    if(!location.state) {
      formData.append("token", loginIdKey);
    }
    formData.append("product_name", productName);
    formData.append("image", imgFile);
    formData.append("price", parseInt(price));
    formData.append("shipping_method", shippingMethod);
    formData.append("shipping_fee", parseInt(shippingFee));
    formData.append("stock", parseInt(stock));
    formData.append("product_info", info);

    try {
      const response = location.state 
      ? await axios.put(`http://13.209.150.154:8000/products/${location.state.product.product_id}/`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${loginIdKey}`
          }
        }
      )
      : await axios.post(`http://13.209.150.154:8000/products/`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `JWT ${loginIdKey}`
          }
        }
      );
      
      console.log("response: ", response);
      if(response) {
        console.log(response);
        navigate("/productDetail/" + response.data.product_id);
      } else {
        navigate("/error");
      }
      
    } catch(error) {
      console.error("응답 실패", error);
      navigate("/error");
    }
  }

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
                  <label htmlFor="productImg" className="txt-label">
                    상품 이미지
                    {
                      imgBase64 
                      ? <img className="uploadedImg" src={imgBase64} alt="등록한 상품" />

                      : <div className="productImg">
                          <img src={iconImg} alt="등록할 상품" />
                        </div>
                    }
                    
                  </label>
                  <input onChange={handleChangeFile} type="file" accept="image/*" id="productImg" />

                  <div className="inpInfo">
                    <label htmlFor="productName">상품명</label>
                    <input onChange={handleProductNameChange} value={productName} id="productName" type="text" maxLength={20}/>
                    <span className="nameLen">{productName.length}/20</span>
                    
                    <label htmlFor="productPrice">판매가</label>
                    <div className="priceBox">
                      <input onChange={handlePriceChange} value={price} id="productPrice" type="number" />
                      <span>원</span>
                    </div>
                    <div className="delivery">
                      배송방법
                      <div className="deliveryBox">
                        <button className={shippingMethod==="PARCEL" ? "on" : null} onClick={shippingParcel}>택배,소포,등기</button>
                        <button className={shippingMethod==="DELIVERY" ? "on" : null} onClick={shippingDelivery}>직접배송(화물배달)</button>
                      </div>
                    </div>
                    <label htmlFor="deliveryCharge">기본 배송비</label>
                    <div className="priceBox">
                      <input onChange={handleShippingFeeChange} value={shippingFee} id="deliveryCharge" type="number" />
                      <span>원</span>
                    </div>
                    <label htmlFor="stock">재고</label>
                    <div className="priceBox">
                      <input onChange={handleStockChange} value={stock} id="stock" type="number" />
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
                    readOnly
                  />
                  <div className="inpBtn">
                    <button onClick={() => navigate(-1)}>취소</button>
                    <button onClick={handleSubmit} form="addProductInfo" disabled={btnOn ? null : "disabled"}>저장하기</button>
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

export default AddProduct;
