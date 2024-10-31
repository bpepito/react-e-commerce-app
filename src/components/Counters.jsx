import React from "react";
import Counter from "./Counter";

const Counters = ({
  products,
  cart,
  incrementCount,
  decrementCount,
  updateCart,
}) => {
  return (
    <div className="row d-flex flex-row justify-content-start align-items-center ms-1 mt-1">
      {products.map((product) => (
        <div
          className="col-sm-4 col-md-4 col-lg-3 col-xxl-2 pb-3"
          key={product.id}
        >
          <Counter
            product={product}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            updateCart={updateCart}
            cart={cart}
          ></Counter>
        </div>
      ))}
    </div>
  );
};

export default Counters;
