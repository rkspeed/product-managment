import { Modal, Box, TextField, Button, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import type { Product } from "../../data/schema";

import "./product-model.css";

type ProductModalProps = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onSave: (updated: Product) => void;
};

export default function ProductModal({
  open,
  product,
  onClose,
  onSave,
}: ProductModalProps) {
  
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      setEditedProduct(product);
    }
  }, [product]);

  if (!editedProduct) return null;

  const handleChange = (field: keyof Product, value: any) => {
    setEditedProduct({ ...editedProduct, [field]: value });
  };

  const handleSave = () => {
    if (editedProduct) {
      onSave(editedProduct);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="product-modal-container">
        <h2 className="product-modal-title">Edit Product</h2>

        <TextField
          label="Name"
          value={editedProduct.name}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Category"
          value={editedProduct.category}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("category", e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={editedProduct.price}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("price", Number(e.target.value))}
        />

        <TextField
          label="Stock"
          type="number"
          value={editedProduct.stock}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("stock", Number(e.target.value))}
        />

        <TextField
          label="Status"
          select
          value={editedProduct.status}
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("status", e.target.value)}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
