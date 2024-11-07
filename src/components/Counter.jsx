import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Input,
  CardMedia,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const Counter = ({
  product,
  cart,
  incrementCount,
  decrementCount,
  updateCart,
}) => {
  const itemCount = cart.find((item) => item.id === product.id)?.itemCount || 0;
  const [errorMessage, setErrorMessage] = useState("");

  const [inputValue, setInputValue] = useState(itemCount.toString());

  useEffect(() => {
    setInputValue(itemCount.toString());
  }, [itemCount]);


  const handleChange = (event) => {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setInputValue(value);
      const newCount = value === "" ? 0 : parseInt(value, 10);

      if (newCount >= 1 && newCount <= product.rating.count) {
        setErrorMessage("");
        updateCart(product, newCount);
      } else if (newCount > product.rating.count) {
        setErrorMessage(
          `Please enter a number between 1 - ${product.rating.count}.`
        );
      } else {
        setErrorMessage("");
      }
    } else {
      setErrorMessage("Please enter digits only.");
    }
  };

  return (
    <Card
      sx={{ maxWidth: "250px", marginTop: "10px" }}
      className="shadow p-1 mb-2 bg-body-tertiary rounded"
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="body1"
          component="div"
          style={{ height: "46px", fontSize: "13px" }}
        >
          {product.title.length > 43
            ? `${product.title.slice(0, 43)}...`
            : product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          style={{ color: "lightgray", fontSize: "11px", marginTop: "-10px" }}
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
            fontSize: "10px",
          }}
        >
          {product.description.length > 125
            ? `${product.description.slice(0, 125)}...`
            : product.description}
        </Typography>
      </CardContent>
      <CardActions
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ marginTop: "-30px", paddingBottom: "20px" }}
      >
        {itemCount > 0 ? (
          <>
            <Button
              size="small"
              variant="contained"
              onClick={() =>
                decrementCount({
                  ...product,
                })
              }
              style={{ width: "20px" }}
            >
              -
            </Button>
            <Input
              type="text"
              value={inputValue}
              onChange={handleChange}
              style={{
                borderColor: "lightgray",
                width: "70px",
                fontSize: "12px",
              }}
              inputProps={{
                style: { textAlign: "center" },
              }}
            />
            <Button
              size="small"
              variant="contained"
              onClick={() =>
                incrementCount({
                  ...product,
                })
              }
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
            onClick={() =>
              incrementCount({
                ...product,
              })
            }
          >
            <AddShoppingCartIcon
              style={{ fontSize: "10px", marginRight: "5px" }}
            />
            Add to Cart
          </Button>
        )}
      </CardActions>
      {errorMessage && (
        <p
          style={{
            color: "red",
            fontSize: "12px",
            textAlign: "center",
            marginTop: "1px",
          }}
        >
          {errorMessage}
        </p>
      )}
    </Card>
  );
};

export default Counter;
