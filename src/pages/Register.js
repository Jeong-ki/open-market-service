import React, { useEffect, useState } from "react";
import Logo from "../images/logo.png";
import pwCheck from "../images/icon-check-off.svg";
import pwCheckOn from "../images/icon-check-on.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [firstNum, setFirstNum] = useState("010");
  const [middleNum, setMiddleNum] = useState("");
  const [lastNum, setLastNum] = useState("");
  const [email, setEmail] = useState("");
  const [dotcom, setDotcom] = useState("");
  const [buyerNum, setBuyerNum] = useState("");
  const [storeName, setStoreName] = useState("");

  const [pwCheckImg, setPwCheckImg] = useState(pwCheck);
  const [pwCheckImg2, setPwCheckImg2] = useState(pwCheck);
  const [pwWrong, setPwWrong] = useState(false);
  const [pwCheckWrong, setPwCheckWrong] = useState(false);
  const [firstNumList, setFirstNumList] = useState(false);
  const [middleNumCheck, setMiddleNumCheck] = useState(true);
  const [lastNumCheck, setLastNumCheck] = useState(true);
  const [emailCheck, setEmailCheck] = useState(true);
  const [dotcomCheck, setDotcomCheck] = useState(true);
  const [buyerNumCheck, setBuyerNumCheck] = useState(true);

  const [seller, setSeller] = useState(false);
  const [agree, setAgree] = useState(false);
  const [btnOn, setBtnOn] = useState(false);
  
  useEffect(() => {
    let user = true;
    if(seller) {
      user = buyerNumCheck && storeName ? true : false;
    }

    if(pwCheckImg2===pwCheckOn && agree && !!(id && name && middleNum && lastNum && email && dotcom) &&
      middleNum.length>=3 && lastNum.length===4 && middleNumCheck && lastNumCheck && emailCheck && dotcomCheck
      && user) {
      setBtnOn(true);
    } else {
      setBtnOn(false);
    }
  }, [id, pwCheckImg2, name, middleNum, lastNum, email, dotcom, agree, buyerNum, storeName]);

  const sellerPage = (event) => {
    if(event.target.innerText === "??????????????????") {
      setSeller(false);
    } else {
      setSeller(true);
    }
  }

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    let pwValue = event.target.value;
    setPassword(pwValue);
    if (
      pwValue.length >= 8 &&
      /[0-9]/.test(pwValue) &&
      /[a-zA-Z]/.test(pwValue)
    ) {
      setPwCheckImg(pwCheckOn);
      setPwWrong(false);
    } else {
      setPwCheckImg(pwCheck);
      setPwWrong(true);
    }
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
    if (password === event.target.value && pwWrong === false) {
      setPwCheckWrong(false);
      setPwCheckImg2(pwCheckImg);
    } else {
      setPwCheckWrong(true);
      setPwCheckImg2(pwCheck);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const firstNumBtn = () => {
    let numClick = firstNumList;
    setFirstNumList(!numClick);
  }
  const handleFirstNumChange = (event) => {
    let numClick = firstNumList;
    setFirstNum(event.target.innerText);
    setFirstNumList(!numClick);
  };
  const handlemiddleNumChange = (event) => {
    setMiddleNum(event.target.value);
    if(isNaN(event.target.value)) {
      setMiddleNumCheck(false);
    } else {
      setMiddleNumCheck(true);
    }
  };
  const handlelastNumChange = (event) => {
    setLastNum(event.target.value);
    if(isNaN(event.target.value)) {
      setLastNumCheck(false);
    } else {
      setLastNumCheck(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    const emailRule = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])/i;
    if(emailRule.test(event.target.value)) {
      setEmailCheck(true);
    } else {
      setEmailCheck(false);
    }
  }
  const handleDotcomChange = (event) => {
    setDotcom(event.target.value);
    const dotcomRule = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(dotcomRule.test(event.target.value)) {
      setDotcomCheck(true);
    } else {
      setDotcomCheck(false);
    }
  }

  const handleBuyerNum = (event) => {
    let num = event.target.value;
    setBuyerNum(num);
    if(isNaN(num) || num.length !== 10) {
      setBuyerNumCheck(false);
    } else {
      setBuyerNumCheck(true);
    }
  }

  const handleStoreName = (event) => {
    setStoreName(event.target.value);
  }

  const checkAgree = (event) => {
    setAgree(event.target.checked);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const signUp = seller ? "signup_seller" : "signup";
    const data = seller ? {
      username: id,
      password: password,
      password2: password2,
      phone_number: firstNum + middleNum + lastNum,
      name: name,
      company_registration_number: buyerNum,
      store_name: storeName
    }
    : {
      username: id,
      password: password,
      password2: password2,
      phone_number: firstNum + middleNum + lastNum,
      name: name
    }
    postData(data, signUp);
  };

  async function postData(data, signUp) {
    try {
      const response = await axios.post(`http://13.209.150.154:8000/accounts/${signUp}/`,
        data
      );
      if(response) {
        navigate("/login");
      } else {
        navigate("/error");
      }
      
    } catch(error) {
      // ?????? ??????
      alert("????????? ??????(????????? ?????? ?????? ????????????)");
      console.error("?????? ??????", error);
      navigate("/register");
    }
  }

  return (
    <div className="register">
      <h1>
        <img src={Logo} alt="????????????" />
      </h1>
      <section>
        <h2 className="blind">????????????</h2>
        <button onClick={sellerPage} className={seller ? "changeReg buyer" : "changeReg buyer on"}>??????????????????</button>
        <button onClick={sellerPage} className={seller ? "changeReg seller on" : "changeReg seller"}>??????????????????</button>
        <div className="registerForm">
          <form id="register">
            <fieldset>
              <legend>????????????</legend>

              <div className="inpId">
                <label htmlFor="id" className="id">
                  ?????????
                </label>
                <input onChange={handleIdChange} id="id" type="text" />
                <button type="button">????????????</button>
              </div>

              <label htmlFor="pw">????????????</label>
              <div className="inpPw">
                <input
                  onChange={handlePasswordChange}
                  id="pw"
                  type="password"
                  style={{ borderColor: pwWrong ? "#EB5757" : null }}
                />
                {pwWrong ? (
                  <p className="pwWrong">8??? ??????, ????????? ????????? ???????????????.</p>
                ) : null}
                <img src={pwCheckImg} alt="???????????? ?????? ??????" />
              </div>

              <label htmlFor="checkPw">???????????? ?????????</label>
              <div className="inpPw">
                <input
                  onChange={handlePassword2Change}
                  id="checkPw"
                  type="password"
                  style={{ borderColor: pwCheckWrong ? "#EB5757" : null }}
                />
                {pwCheckWrong ? (
                  <p className="pwWrong">??????????????? ???????????? ????????????.</p>
                ) : null}
                <img src={pwCheckImg2} alt="???????????? ????????? ?????? ??????" />
              </div>

              <label htmlFor="name" className="nameLabel">
                ??????
              </label>
              <input onChange={handleNameChange} id="name" type="text" />

              <label>????????????</label>
              <div className="phoneNumber">
                <button onClick={firstNumBtn} className={firstNumList ? "firstNumBtn on" : "firstNumBtn"} type="button">{firstNum}</button>
                <ul id="firstNumber" style={{ display: firstNumList ? null : "none" }}>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">010</button>
                    </li>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">011</button>
                  </li>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">016</button>
                  </li>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">017</button>
                  </li>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">018</button>
                  </li>
                  <li>
                    <button onClick={handleFirstNumChange} type="button">019</button>
                  </li>
                </ul>
                <label htmlFor="middleNumber" className="blind">
                  ?????? ????????????
                </label>
                <input onChange={handlemiddleNumChange} id="middleNumber" type="text" minLength="3" maxLength="4"/>
                <label htmlFor="lastNumber" className="blind">
                  ??? ????????????
                </label>
                <input onChange={handlelastNumChange} id="lastNumber" type="text" minLength="4" maxLength="4"/>
              </div>
              {
                middleNumCheck && lastNumCheck
                ? null
                : <>
                  <p className="numWrong">????????? ??????????????????.</p>
                </>
              }

              <div className="email">
                <label htmlFor="email">?????????</label>
                <div className="emailInp">
                  <input onChange={handleEmailChange} id="email" type="text" />
                  <span>@</span>
                  <label htmlFor="dotcom" className="blind">
                    ????????????
                  </label>
                  <input onChange={handleDotcomChange} id="dotcom" type="text" />
                </div>
              </div>
              {
                emailCheck && dotcomCheck
                ? null
                : <>
                  <p className="numWrong">????????? ????????? ???????????????.</p>
                </>
              }

              {
                seller
                ? <>
                    <div className="buyerNum">
                      <label htmlFor="bNum">????????? ????????????</label>
                      <input onChange={handleBuyerNum} id="bNum" type="text" />
                      <button type="button">??????</button>
                    </div>
                    {
                      buyerNumCheck
                      ? null
                      : <>
                        <p className="numWrong">10????????? ????????? ??????????????????.</p>
                      </>
                    }
                    <label htmlFor="storeName">????????? ??????</label>
                    <input onChange={handleStoreName} id="storeName" type="text" />
                  </>
                : null
              }
              
            </fieldset>
          </form>
        </div>
        <div className="box-check">
          <div className="check-agree">
            <input onChange={checkAgree} type="checkbox" id="agree" />
            <label htmlFor="agree">
              ???????????? <strong>????????????</strong> ???{" "}
              <strong>????????????????????????</strong>??? ?????? ????????? ???????????????
              ???????????????.
            </label>
          </div>
        </div>
        <button onClick={handleSubmit} className="submitBtn" type="button" form="register" disabled={btnOn ? null : "disabled"}>
          ????????????
        </button>
      </section>
    </div>
  );
}

export default RegisterPage;
