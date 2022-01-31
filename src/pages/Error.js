import React from 'react';
import error from '../images/icon-404.png';

function Error() {
  return (
    <section className='error'>
      <h1><img src={error} alt="에러페이지" /></h1>
      <div>
        <p>페이지를 찾을 수 없습니다.</p>
        <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.</p>
        <p>웹 주소가 올바른지 확인해 주세요.</p>
        <div>
          <a href="/">메인으로</a>
          <a href="/">이전 페이지</a>
        </div>
      </div>
    </section>
  );
}

export default Error;
