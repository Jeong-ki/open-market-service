import React, { useState } from "react";

import minus from "../images/icon-minus-line.svg";
import plus from "../images/icon-plus-line.svg";

function Amount(props) {
  const [isInventoryFull, setIsInventoryFull] = useState(false);
  const product = props.product;
  const productCount = props.productCount;
  const setProductCount = props.setProductCount;

  function productCountPlusMinus(calculate) {
    let number = productCount;
    if (calculate === "plus") {
      if (product.stock > productCount) {
        setProductCount(++number);
      } else {
        setIsInventoryFull(true);
        setTimeout(() => {
          setIsInventoryFull(false);
        }, 2000);
      }
    } else if (calculate === "minus") {
      if (productCount >= 2) setProductCount(--number);
    }
  }
  return (
    <div className="amount">
      <h3 className="blind">상품 수량 설정</h3>
      <div>
        <button
          type="button"
          className="symbol"
          onClick={() => {
            productCountPlusMinus("minus");
          }}
        >
          <img src={minus} alt="minus" />
        </button>
        <span className="volume">{product.stock > 0 ? productCount : 0}</span>
        <button
          type="button"
          className="symbol"
          onClick={() => {
            productCountPlusMinus("plus");
          }}
        >
          <img src={plus} alt="plus" />
        </button>
      </div>
      {isInventoryFull ? <p>더 이상 재고가 없습니다.</p> : ""}
    </div>
  );
}
export default Amount;
