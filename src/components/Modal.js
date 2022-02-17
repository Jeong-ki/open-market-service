import React from "react";
import remove from "../images/icon-delete.svg";
function Modal() {
  return (
    <div className="dimm">
      <div className="modal">
        <p>상품을 삭제하시겠습니까?</p>
        <button className="modalBtn modalX">취소</button>
        <button className="modalBtn modalO">확인</button>
        <button type="button" className="modalCancel">
          <img src={remove} alt="상품 취소" />
        </button>
      </div>
    </div>
  );
}

export default Modal;
