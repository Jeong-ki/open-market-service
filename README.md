# HODU

HODU는 상품을 사고 파는 오픈마켓 서비스입니다.  
오픈마켓 서비스는 판매자와 구매자를 구별하여 판매자가 상품을 등록, 판매하며 구매자는 상품을 구매하는 서비스입니다.  
상품을 판매하려고 한다면 판매자로 로그인하여 상품 정보를 등록 및 수정할 수 있습니다. 오픈마켓에 등록되어 있는 상품을 구매하고자 한다면 상품의 세부사항을 확인한 뒤, 장바구니에 넣어 상품을 구매할 수 있습니다. (판매자가 상품을 구매하는 것은 불가능합니다.)

## 멤버

-   유순상 / 정기수

## 1. 목표와 기능

### 1.1 목표

React를 사용하여 상품 등록, 결제, 상품에 대한 CRUD를 구현

### 1.2 기능

-   로그인
-   회원가입
-   상품 목록
-   상품 상세
-   장바구니
-   주문/결제
-   판매자 센터
-   상품 등록
-   에러페이지

## 2. 개발 환경 및 배포 URL

### 2.1 개발 환경

React, SASS, Git, GitHub

### 2.2 배포 URL

<!-- [https://lion-time.netlify.app/](https://lion-time.netlify.app/) -->

## 3. 프로젝트 구조와 개발 일정

### 3.1 프로젝트 폴더 구조

```
│
├─public
│  │  favicon.ico
│  │  index.html
│  │  manifest.json
│  │  robots.txt
│      
├─src
│  ├─components
│  │  │  DashHeader.js
│  │  │  Footer.js
│  │  │  Header.js
│  │  │  Modal.js
│  │
│  ├─css
│  │  │  common.css
│  │  │  common.css.map
│  │  
│  ├─images
│  │  │  ...
│  │
│  ├─pages
│  │  AddProduct.js
│  │  Cart.js
│  │  DashBoard.js
│  │  Error.js
│  │  Login.js
│  │  Main.js
│  │  NoLogin.js
│  │  Order.js
│  │  Payment.js
│  │  ProductDetail.js
│  │  ProductList.js
│  │  Register.js
│  │
│  ├─scss
│  │  _addproduct.scss
│  │  _cart.scss
│  │  _dashboard.scss
│  │  ...
│  │  common.scss
│  │
│  ├─App.css
│  ├─App.js
│  └─index.js
│
│  .gitignore
│  package-lock.json
│  package.json
└  README.md
```

### 3.2 개발일정

2022.01.26 ~ 2022.02.22

## 4. 역할분담
-   유순상 - 로그인, 상품 목록, 상품 상세, 장바구니, 주문/결제
-   정기수 - 회원가입, 판매자 센터, 상품 등록, 404에러

## 5. UI

[Figma](https://www.figma.com/file/Gn6gQJdYwImYsEYSzBXhud/%EB%A9%8B%EC%82%AC_%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%8A%A4%EC%BF%A8?node-id=49%3A1747)  

## 6. 메인 기능

## 7. 추가 기능

## 8. 개발하며 느낌점

-   ### 유순상
-   ### 정기수 