import React from "react";
import Counter from "./Counter";

const Counters = ({ products }) => {
  console.log("products: ", products[0]);
  return (
    <div className="row d-flex flex-row justify-content-center align-items-center ms-5 me-3 mt-3">
      {products[0].map((product, index) => (
        <div className="col-sm-6 col-md-4 col-lg-3 pb-3">
          <Counter key={index} product={product}></Counter>
        </div>
      ))}
    </div>
  );
};

export default Counters;
