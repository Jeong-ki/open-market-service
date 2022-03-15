import React, { useCallback } from "react";
import { Link } from "react-router-dom";

function ProductList({ products, setDelModal }) {
  const openModal = useCallback((productId) => {
    setDelModal(productId);
  }, []);

  return (
    <ul className="products">
      {
        products.map((product) => {
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
                <button onClick={() => {openModal(product.product_id)}} className="delete">삭제</button>
              </div>
            </li>
          )
        })
      }
    </ul>
  );
}

export default ProductList;
