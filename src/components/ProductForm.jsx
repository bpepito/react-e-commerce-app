import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Joi from "joi";

const ProductForm = ({ addProduct, initialValue, products, updateProduct }) => {
  const { id } = useParams();
  console.log("id", id);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(
    initialValue ?? {
      title: "",
      category: "",
      description: "",
      price: "",
    }
  );

  const schema = Joi.object({
    id: Joi.number().optional(),
    image: Joi.string().optional(),
    rating: Joi.object({
      rate: Joi.number().min(1).max(5).optional(),
      count: Joi.number().min(0).optional(),
    }).optional(),
    title: Joi.string().min(2).max(100).required(),
    category: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(1000).required(),
    price: Joi.number().min(1).required(),
  });

  const handleInputChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const result = schema.extract(name).label(name).validate(value);

    if (result.error) {
      setErrors({
        ...errors,
        [name]: result.error.details[0].message,
      });
    } else {
      delete errors[name];
      setErrors(errors);
    }
  };

  const isFormInvalid = () => {
    const result = schema.validate(form);
    console.log("Form validation result:", result);
    return !!result.error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateProduct(id, form);
    } else {
      addProduct(form);
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const existingProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      if (existingProduct) {
        setForm(existingProduct);
      } else {
        console.log("Product not found");
      }
    }
  }, [id, products]);

  return (
    <div className="row d-flex flex-row justify-content-center align-items-center mt-4 ">
      <Card sx={{ width: "70%" }}>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "text.secondary" }}
          >
            {id ? "Update Product" : "Add New Product"}
          </Typography>

          <form onSubmit={handleSubmit} id="product-form">
            <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
              Title
            </Typography>
            <TextField
              label="Product Title"
              name="title"
              value={form.title}
              error={!!errors.title}
              helperText={errors.title}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
              Description
            </Typography>
            <TextField
              label="Product Description"
              name="description"
              value={form.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={errors.description}
              fullWidth
              multiline
              rows={2}
              required
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                Category
              </Typography>
              <TextField
                label="Product Category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
                error={!!errors.category}
                helperText={errors.category}
                required
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
                Price
              </Typography>
              <TextField
                label="Product Price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleInputChange}
                error={!!errors.price}
                helperText={errors.price}
                required
                sx={{ mb: 2 }}
              />
            </Box>

            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                type="submit"
                size="small"
                sx={{ mb: 2 }}
                disabled={isFormInvalid()}
              >
                {id ? "Update" : "Add Product"}
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;
