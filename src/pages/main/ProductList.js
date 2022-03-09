import React from "react";

function ProductLi(props) {
  let products = props.products;

  return (
    <section className="products">
      <div className="inner">
        <h2 className="blind">상품 진열</h2>
        <ul>
          {products.map((product, i) => {
            if (product.stock === 0) return null;
            return (
              <li key={i}>
                <a href={"/productDetail/" + product.product_id}>
                  <div
                    style={{
                      background: `url(${product.image}) no-repeat center center/cover`,
                    }}
                  ></div>
                  <p>{product.seller_store}</p>
                  <dl>
                    <dt>{product.product_name}</dt>
                    <dd>
                      <strong>{product.price}</strong>원
                    </dd>
                  </dl>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ProductLi;
