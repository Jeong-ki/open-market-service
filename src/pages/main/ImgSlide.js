import React, { useState } from "react";
import left from "../../images/icon-swiper-1.svg";
import right from "../../images/icon-swiper-2.svg";

function ImgSlide(props) {
  const [currentImg, setCurrentImg] = useState(1);

  let addClassCurrentImg = "one";
  switch (currentImg) {
    case 1:
      addClassCurrentImg = "one";
      break;
    case 2:
      addClassCurrentImg = "two";
      break;
    default:
      addClassCurrentImg = "three";
  }

  const slideInform = props.inform
    .filter((data) => {
      if (data.stock !== 0) return data;
    })
    .slice(0, 3);

  function imgSlideBtnClick(btnName) {
    setCurrentImg(() => {
      if (btnName === "leftBtn") return currentImg - 1;
      else if (btnName === "rightBtn") return currentImg + 1;
      else if (btnName === "firstBtn") return 1;
      else if (btnName === "secondBtn") return 2;
      else if (btnName === "thirdBtn") return 3;
    });
  }

  return (
    <section className="event">
      <h2 className="blind">이벤트 배너</h2>
      <div className="slideBox">
        <ul className={"slide " + addClassCurrentImg}>
          {slideInform.map((slide, i) => {
            return (
              <li
                key={i}
                style={{
                  background: `url(${slide.image}) #f9f9f9 no-repeat center center/contain`,
                }}
              >
                <a href={"/productDetail/" + slide.product_id}>
                  <span className="blind">{slide.product_name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="lrBtn">
        {currentImg === 1 ? (
          <div></div>
        ) : (
          <button
            className="left"
            onClick={() => {
              imgSlideBtnClick("leftBtn");
            }}
          >
            <img src={left} alt="좌측 슬라이드" />
          </button>
        )}
        {currentImg === 3 ? (
          <div></div>
        ) : (
          <button className="right">
            <img
              src={right}
              alt="우측 슬라이드"
              onClick={() => {
                imgSlideBtnClick("rightBtn");
              }}
            />
          </button>
        )}
      </div>
      <div className="dotBtn">
        <span
          className={currentImg === 1 ? "select" : ""}
          onClick={() => {
            imgSlideBtnClick("firstBtn");
          }}
        ></span>
        <span
          className={currentImg === 2 ? "select" : ""}
          onClick={() => {
            imgSlideBtnClick("secondBtn");
          }}
        ></span>
        <span
          className={currentImg === 3 ? "select" : ""}
          onClick={() => {
            imgSlideBtnClick("thirdBtn");
          }}
        ></span>
      </div>
    </section>
  );
}

export default ImgSlide;
