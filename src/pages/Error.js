import React from "react";
import { useNavigate } from "react-router-dom";
import error from "../images/icon-404.png";

function Error() {
  const navigate = useNavigate();

  return (
    <section className="error">
      <h1>
        <img src={error} alt="에러페이지" />
      </h1>
      <div className="introduce">
        <p className="strong">페이지를 찾을 수 없습니다.</p>
        <p className="small">
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
        </p>
        <p className="small">웹 주소가 올바른지 확인해 주세요.</p>
        <div className="button">
          <button onClick={() => navigate("/")}>메인으로</button>
          <button onClick={() => navigate(-1)}>이전 페이지</button>
        </div>
      </div>
    </section>
  );
}

export default Error;
