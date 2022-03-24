import React, { useState } from "react";
function BtnList() {
  let [buttonClickChage, setButtonClickChage] = useState(1);
  return (
    <ul className="btnList">
      <li>
        <button
          className={buttonClickChage === 1 ? "on" : ""}
          onClick={() => {
            setButtonClickChage(1);
          }}
        >
          버튼
        </button>
      </li>
      <li>
        <button
          className={buttonClickChage === 2 ? "on" : ""}
          onClick={() => {
            setButtonClickChage(2);
          }}
        >
          리뷰
        </button>
      </li>
      <li>
        <button
          className={buttonClickChage === 3 ? "on" : ""}
          onClick={() => {
            setButtonClickChage(3);
          }}
        >
          Q&A
        </button>
      </li>
      <li>
        <button
          className={buttonClickChage === 4 ? "on" : ""}
          onClick={() => {
            setButtonClickChage(4);
          }}
        >
          반품/교환정보
        </button>
      </li>
    </ul>
  );
}

export default BtnList;
