import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Rating from "@mui/material/Rating";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ConfirmationModal from "./ConfirmationModal";
import { useNavigate } from "react-router-dom";

const ProductListPage = ({ products, onDelete }) => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log("selected: ", selectedProduct);
    navigate(`/product/${selectedProduct.id}`);
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setShowConfirmationModal(true);
    setAnchorEl(null);
  };

  const onRemoveProduct = () => {
    if (selectedProduct) {
      onDelete(selectedProduct.id);
      setShowConfirmationModal(false);
    }
  };

  const onClick = () => {
    navigate("/product");
  };

  useEffect(() => {
    console.log("Updated products:", products);
  }, [products]);

  const columns = [
    { id: "title", label: "Product Name", align: "left", minWidth: 100 },
    {
      id: "category",
      label: "Category",
      minWidth: 80,
      align: "left",
      format: (product) => product.category,
    },
    {
      id: "description",
      label: "Description",
      minWidth: 200,
      align: "left",
      format: (product) =>
        product.description.length > 125
          ? `${product.description.slice(0, 125)}...`
          : product.description,
    },
    {
      id: "rating",
      label: "Rating",
      minWidth: 80,
      align: "left",
      format: (product) => (
        <Rating
          name="half-rating-read"
          value={product.rating ? product.rating.rate : 0}
          precision={0.5}
          readOnly
        />
      ),
    },
    {
      id: "price",
      label: "Price",
      minWidth: 100,
      align: "right",
      format: (product) => `₱ ${parseFloat(product.price).toFixed(2)}`,
    },
    {
      id: "ratingCount",
      label: "Qty",
      minWidth: 100,
      align: "right",
      format: (product) => (product.rating ? product.rating.count : 0),
    },
    {
      id: "action",
      label: "",
      minWidth: 10,
      align: "center",
      format: (product) => (
        <IconButton onClick={(e) => handleClick(e, product)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <div
        className="d-flex justify-content-end align-items-end"
        style={{ padding: "10px" }}
      >
        <Button variant="contained" onClick={onClick}>
          Add Product
        </Button>
      </div>
      <div className="row d-flex flex-row justify-content-center align-items-center">
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            sx={{
              maxHeight: "1200px",
              overflow: "auto",
            }}
          >
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "lightgray",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        fontWeight: "bolder",
                        position: "sticky",
                        zIndex: 1,
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>
          <EditIcon style={{ fontSize: "20px" }} /> Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon style={{ fontSize: "20px" }} /> Delete
        </MenuItem>
      </Menu>

      <ConfirmationModal
        isVisible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onDelete={onRemoveProduct}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductListPage;
