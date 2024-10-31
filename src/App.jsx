import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Counters from "./components/Counters";
import OrderPage from "./components/OrderPage";
import { CART_DATA } from "./data/Cart";
import { PRODUCTS_DATA } from "./data/Products";

function App() {
  const [cart, setCart] = useState(CART_DATA);
  const [showOrderPage, setShowOrderPage] = useState(false);

  const handleIncrementItemCount = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                itemCount: item.itemCount + 1,
                totalPrice: (item.itemCount + 1) * item.price,
              }
            : item
        );
      } else {
        return [
          ...prev,
          { ...product, itemCount: 1, totalPrice: product.price },
        ];
      }
    });
  };

  const handleDecrementItemCount = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.itemCount > 1) {
          return prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  itemCount: item.itemCount - 1,
                  totalPrice: (item.itemCount - 1) * item.price,
                }
              : item
          );
        } else {
          return prev.filter((item) => item.id !== product.id);
        }
      }
      return prev;
    });
  };

  const handleUpdateItemCount = (product, newCount) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        if (newCount > 0) {
          return prev.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  itemCount: newCount,
                  totalPrice: newCount * product.price,
                }
              : item
          );
        } else {
          return prev.filter((item) => item.id !== product.id);
        }
      } else if (newCount > 0) {
        return [
          ...prev,
          {
            ...product,
            itemCount: newCount,
            totalPrice: newCount * product.price,
          },
        ];
      }

      return prev;
    });
  };

  const navigateToOrderPage = () => {
    setShowOrderPage(true);
  };

  const navigateToMainPage = () => {
    setShowOrderPage(false);
  };

  return (
    <>
      {showOrderPage ? (
        <OrderPage cart={cart} navigateToMainPage={navigateToMainPage} />
      ) : (
        <>
          <NavBar cart={cart} navigateToOrderPage={navigateToOrderPage} />
          <Counters
            products={PRODUCTS_DATA}
            incrementCount={handleIncrementItemCount}
            decrementCount={handleDecrementItemCount}
            updateCart={handleUpdateItemCount}
            cart={cart}
          />
        </>
      )}
    </>
  );
}

export default App;
