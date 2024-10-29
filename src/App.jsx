import React, { useState } from "react";
import Counter from "./components/Counter";
import Counters from "./components/Counters";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import { PRODUCTS_DATA } from "./data/Products";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
];

function App(props) {
  const [products, setProducts] = React.useState([PRODUCTS_DATA]);
  console.log(products);

  return (
    <>
      <div>
        <Counters products={products}></Counters>
      </div>
    </>
  );
}

export default App;
