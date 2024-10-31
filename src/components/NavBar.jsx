import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import Button from "@mui/material/Button";

const NavBar = ({ cart, navigateToOrderPage }) => {
  const totalItemCount = cart.reduce(
    (total, item) => total + item.itemCount,
    0
  );

  return (
    <>
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{
          height: "60px",
          backgroundColor: "#008080",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        <span style={{ marginLeft: "20px", color: "white" }}>
          E-Commerce App
        </span>
        <Button onClick={navigateToOrderPage}>
          <Badge
            color="secondary"
            badgeContent={totalItemCount}
            style={{ marginRight: "30px" }}
          >
            <ShoppingCartIcon style={{ fontSize: "30px", color: "white" }} />
          </Badge>
        </Button>
      </div>
    </>
  );
};

export default NavBar;
