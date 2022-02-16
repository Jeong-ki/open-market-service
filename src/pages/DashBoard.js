import React, { useEffect } from "react";
import DashHeader from "../components/DashHeader";
import test from "../images/icon-user.svg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";

function DashBoard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async function postData() {
      try {
        const response = await axios.get(`http://13.209.150.154:8000/seller/`, {
          headers: {
            'Content-Type': 'application/json',
             Authorization: `JWT ${localStorage.getItem("loginIdKey")}`,
          }
        });
        if(response) {
          console.log("response: ", response.data.results);
          setProducts(response.data.results);
        } else {
          navigate("/error");
        }
        
      } catch(error) {
        // 응답 실패
        alert("로그인 실패(중복된 암호 또는 전화번호)");
        console.error("응답 실패", error);
        navigate("/error");
      }
    })();
  }, []);

  return (
    <>
      <DashHeader />
      <section className="dashBoard">
        <h2>
          대시보드<strong>백엔드글로벌</strong>
        </h2>
        <Link to="/addProduct" className="uploadBtn">상품 업로드</Link>
        {/* <button className="uploadBtn">상품 업로드</button> */}
        <div className="wrap">
          <ul className="menu">
            <li>판매중인 상품(3)</li>
            <li>
              주문/배송 <span>2</span>
            </li>
            <li>
              문의/리뷰<span>1</span>
            </li>
            <li>통계</li>
            <li>스토어 설정</li>
          </ul>
          <article>
            <h3 className="blind">업로드 상품목록</h3>
            <ul className="productInfo">
              <li>상품정보</li>
              <li>판매가격</li>
              <li>수정</li>
              <li>삭제</li>
            </ul>
            <ProductList products={products} />
            {/* <ul className="products">
              
              <li>
                <div>
                  <img src={test} alt="상품이미지" />
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>재고 : 370개</p>
                </div>
                <div className="price">17,500원</div>
                <div className="box-update">
                  <button className="update">수정</button>
                </div>
                <div className="box-delete">
                  <button className="delete">삭제</button>
                </div>
              </li>
              <li>
                <div>
                  <img src={test} alt="상품이미지" />
                  <p>딥러닝 개발자 무릎 담요</p>
                  <p>재고 : 370개</p>
                </div>
                <div className="price">17,500원</div>
                <div className="box-update">
                  <button className="update">수정</button>
                </div>
                <div className="box-delete">
                  <button className="delete">삭제</button>
                </div>
              </li>
            </ul> */}
          </article>
        </div>
      </section>
    </>
  );
}

function ProductList(props) {
  console.log(props.products);
  return (
    <ul className="products">
      {
        props.products.map((product) => {
          return (
            <li key={product.product_id}>
              <div>
                <img src={product.image} alt={product.product_name + "이미지"} />
                <p>{product.product_name}</p>
                <p>재고 : {product.stock}개</p>
              </div>
              <div className="price">{product.price}원</div>
              <div className="box-update">
                <button className="update">수정</button>
              </div>
              <div className="box-delete">
                <button className="delete">삭제</button>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default DashBoard;
