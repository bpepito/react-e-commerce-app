import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Input } from "@mui/material";

const Counter = ({
  product,
  cart,
  incrementCount,
  decrementCount,
  updateCart,
}) => {
  const itemCount = cart.find((item) => item.id === product.id)?.itemCount || 0;

  const handleIncrement = () => {
    incrementCount({
      ...product,
      itemCount: itemCount + 1,
      totalPrice: (itemCount + 1) * product.price,
    });
  };

  const handleDecrement = () => {
    if (itemCount > 0) {
      decrementCount({
        ...product,
        itemCount: itemCount - 1,
        totalPrice: (itemCount - 1) * product.price,
      });
    }
  };

  // Handle input changes
  const handleChange = (event) => {
    const value = event.target.value;

    // Allow empty input
    if (value === "") {
      updateCart(product, 0);
      return;
    }

    const newCount = parseInt(value, 10);
    if (!isNaN(newCount) && newCount >= 0) {
      updateCart(product, newCount);
    }
  };

  return (
    <Card
      sx={{ maxWidth: "250px", marginTop: "10px" }}
      className="shadow p-1 mb-2 bg-body-tertiary rounded mui-card"
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          style={{ height: "46px" }}
        >
          {product.title.length > 43
            ? `${product.title.slice(0, 43)}...`
            : product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          style={{ color: "lightgray" }}
        >
          ₱ {product.price}
        </Typography>
        <CardMedia
          component="img"
          alt={product.title}
          height="200px"
          image={product.image}
          style={{ objectFit: "contain", backgroundColor: "transparent" }}
        />
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            paddingTop: "5px",
            height: "72px",
          }}
        >
          {product.description.length > 125
            ? `${product.description.slice(0, 125)}...`
            : product.description}
        </Typography>
      </CardContent>
      <CardActions
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ paddingTop: "35px", paddingBottom: "18px" }}
      >
        {itemCount > 0 ? (
          <>
            <Button
              size="small"
              variant="contained"
              onClick={handleDecrement}
              style={{ width: "20px" }}
            >
              -
            </Button>
            <Input
              value={itemCount}
              onChange={handleChange}
              style={{
                borderColor: "lightgray",
                width: "70px",
              }}
              inputProps={{
                style: { textAlign: "center" },
                step: 1,
                min: 0,
                max: product.rating.count,
              }}
            ></Input>
            <Button
              size="small"
              variant="contained"
              onClick={handleIncrement}
              style={{ width: "20px" }}
            >
              +
            </Button>
          </>
        ) : (
          <Button
            size="small"
            variant="outlined"
            style={{ width: "150px" }}
            onClick={() => {
              incrementCount({
                ...product,
                itemCount: 1,
                totalPrice: 1 * product.price,
              });
            }}
          >
            <AddShoppingCartIcon
              style={{ fontSize: "15px", marginRight: "5px" }}
            />
            Add to Cart
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Counter;
