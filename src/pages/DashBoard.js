import React, { useEffect } from "react";
import DashHeader from "../components/DashHeader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import remove from "../images/icon-delete.svg";

function DashBoard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [productCheck, setProductCheck] = useState(true);
  const [delModal, setDelModal] = useState(false);

  useEffect(() => {
    postData();
  },[productCheck]);

  async function postData() {
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
  };

  async function productDel(product_id) {
    console.log("삭제", product_id);
    try {
      const response = await axios.delete(`http://13.209.150.154:8000/products/${product_id}`, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `JWT ${localStorage.getItem("loginIdKey")}`,
        }
      });
      if(response) {
        console.log("del response: ", response);
        setProductCheck(!productCheck);
        setDelModal(false);
      } else {
        navigate("/error");
      }
      
    } catch(error) {
      // 응답 실패
      console.error("응답 실패", error);
      navigate("/error");
    }
  };

  function ProductList(props) {
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
                  <Link to="/addProduct" state={{product: product}} className="update">수정</Link>
                </div>
                <div className="box-delete">
                  <button onClick={() => { setDelModal(product.product_id) }} className="delete">삭제</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    );
  }

  function DelModal() {
    return (
      <div className="modal">
        <div className="modal_overlay"></div>
        <div className="modal_content">
          <p>상품을 삭제하시겠습니까?</p>
          <button onClick={() => { setDelModal(false) }} className="modalBtn modalX">취소</button>
          <button onClick={() => { productDel(delModal) }} className="modalBtn modalO">확인</button>
          <button onClick={() => { setDelModal(false) }} type="button" className="modalCancel">
            <img src={remove} alt="상품 취소" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <DashHeader />
      <section className="dashBoard">
        <h2>
          대시보드<strong>백엔드글로벌</strong>
        </h2>
        <Link to="/addProduct" className="uploadBtn">상품 업로드</Link>
        <div className="wrap">
          <ul className="menu">
            <li>판매중인 상품({products.length})</li>
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
          </article>
        </div>
        {
          delModal
          ? <DelModal />
          : null
        }
      </section>
    </>
  );
}

export default DashBoard;
