import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Input } from "@mui/material";

const Counter = ({ product }) => {
  return (
    <Card
      sx={{ maxWidth: 350, marginTop: "10px", backgroundColor: "white" }}
      className="shadow p-1 mb-2 bg-body-tertiary rounded"
    >
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {product.title.length > 40
            ? `${product.title.slice(0, 40)}...`
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
          height="300"
          image={product.image}
        />
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            paddingTop: "5px",
            textAlign: "justify",
          }}
        >
          {product.description.length > 150
            ? `${product.description.slice(0, 131)}...`
            : product.description}
        </Typography>
      </CardContent>
      <CardActions
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ paddingTop: "0", paddingBottom: "15px" }}
      >
        {product.itemCount > 0 ? (
          <>
            <Button size="small" variant="contained" style={{ width: "50px" }}>
              -
            </Button>
            <Input
              style={{
                borderColor: "lightgray",
                width: "100px",
              }}
              inputProps={{
                style: { textAlign: "center" },
                step: 1,
                min: 0,
                max: product.rating.count,
              }}
            />
            <Button size="small" variant="contained" style={{ width: "50px" }}>
              +
            </Button>
          </>
        ) : (
          <Button size="small" variant="outlined" style={{ width: "150px" }}>
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
