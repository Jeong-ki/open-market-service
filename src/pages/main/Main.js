import React, { useEffect, useState } from "react";
import axios from "axios";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ImgSlide from "./ImgSlide";
import ProductLi from "./ProductList";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    lodingProducts();
  }, []);

  function lodingProducts() {
    axios
      .get("http://13.209.150.154:8000/products/")
      .then((response) => {
        setProducts(response.data.results);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header />
      <section className="main">
        <h2 className="blind">상품이 나열된 상품 목록 페이지</h2>

        {isLoading ? (
          <>
            <ImgSlide inform={products} />
            <ProductLi products={products} />
          </>
        ) : null}
      </section>
      <Footer />
    </>
  );
}

export default Main;
