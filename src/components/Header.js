import Logo from '../../images/Logo-hodu.png';

function Header() {
  return (
    // 16.66 vw  - 좌우 패딩(320/1920*100)
    // 20(원하는픽셀) / 18(부모픽셀) em
    <header> 
      <h1><img src={Logo} alt="오픈 마켓" /></h1>
      <nav>
        <div>
          <form>
            <label htmlFor="txt-search">상품 검색</label>
            <input id="txt-search" type="search" placeholder='상품을 검색해보세요!' required />
            <button type="submit" className="inp-btn">돋보기</button>
          </form>
        </div>
        <ul>
          <li>
            <a href="">
              장바구니 before
            </a>
          </li>
          <li>로그인</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;