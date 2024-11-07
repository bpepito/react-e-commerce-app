import React, { useState } from "react";
import NavBar from "./components/NavBar";
import Counters from "./components/Counters";
import OrderPage from "./components/OrderPage";
import ProductListPage from "./components/ProductListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CART_DATA } from "./data/Cart";
import { PRODUCTS_DATA } from "./data/Products";
import ProductForm from "./components/ProductForm";

function App() {
  const [cart, setCart] = useState(CART_DATA);
  const [products, setProducts] = useState(PRODUCTS_DATA);

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

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== parseInt(id)));
    setCart((prev) => prev.filter((item) => item.id !== parseInt(id)));
  };

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [
      ...prev,
      { ...newProduct, id: products.length * 999 + 1 },
    ]);
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === parseInt(id)
          ? { ...product, ...updatedProduct }
          : product
      )
    );
  };

  return (
    <Router>
      <NavBar cart={cart} products={products} />
      <Routes>
        <Route
          path="/"
          element={
            <Counters
              products={products}
              incrementCount={handleIncrementItemCount}
              decrementCount={handleDecrementItemCount}
              updateCart={handleUpdateItemCount}
              cart={cart}
            />
          }
        />
        <Route
          path="/product-page"
          element={
            <ProductListPage
              products={products}
              onDelete={handleDeleteProduct}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductForm
              products={products}
              updateProduct={handleUpdateProduct}
            />
          }
        />
        <Route
          path="/product"
          element={<ProductForm addProduct={handleAddProduct} />}
        />
        <Route path="/order-page" element={<OrderPage cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
