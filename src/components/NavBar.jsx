import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = ({ cart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalItemCount = cart.reduce(
    (total, item) => total + item.itemCount,
    0
  );

  const navigateToOrderPage = () => {
    navigate("/order-page");
  };

  const navigateToHomePage = () => {
    navigate("/");
  };

  const navigateToProductPage = () => {
    navigate("/product-page");
  };

  const isMainPage = location.pathname === "/";

  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{
          height: "60px",
          backgroundColor: "#008080",
          fontWeight: "bolder",
          top: 0,
          zIndex: 1000,
          fontSize: "30px",
          position: "sticky",
        }}
      >
        <span
          style={{ marginLeft: "20px", color: "white", paddingRight: "10px" }}
        >
          E-Commerce App
          <Button
            onClick={navigateToProductPage}
            size="small"
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              color: "lightgray",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Products
          </Button>
        </span>
        {!isMainPage ? (
          <IconButton
            onClick={navigateToHomePage}
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <HomeIcon style={{ fontSize: "20px", color: "white" }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={navigateToOrderPage}
            style={{ marginRight: "30px", marginLeft: "30px" }}
          >
            <Badge color="secondary" badgeContent={totalItemCount}>
              <ShoppingCartIcon style={{ fontSize: "20px", color: "white" }} />
            </Badge>
          </IconButton>
        )}
      </div>
    </>
  );
};

export default NavBar;
