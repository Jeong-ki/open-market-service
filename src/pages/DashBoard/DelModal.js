import React, { useCallback } from "react";
import remove from "../../images/icon-delete.svg";

function DelModal({ delModal, setDelModal, productDel }) {
  const closeModal = useCallback(() => {
    setDelModal(false);
  }, []);

  const deleteProduct = useCallback(() => {
    productDel(delModal);
  }, []);

  return (
    <div className="modal">
      <div className="modal_overlay"></div>
      <div className="modal_content">
        <p>상품을 삭제하시겠습니까?</p>
        <button onClick={closeModal} className="modalBtn modalX">취소</button>
        <button onClick={deleteProduct} className="modalBtn modalO">확인</button>
        <button onClick={closeModal} type="button" className="modalCancel">
          <img src={remove} alt="상품 취소" />
        </button>
      </div>
    </div>
  );
}

export default DelModal;
