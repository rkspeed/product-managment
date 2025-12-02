import { useState, useMemo, useEffect } from "react";
import type { Product } from "../../data/schema";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import api from "./../../../../api/apiClient";
import EditProductModal from "./edit-product-modal";

type ProductsTableProps = {
  data: Product[];
};

export function ProductsTable({ data: initialData }: ProductsTableProps) {

  const [data, setData] = useState<Product[]>(initialData);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);


  const categories = useMemo(
    () => Array.from(new Set(data.map((d) => d.category))),
    [data]
  );


  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = row.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesCategory = categoryFilter
        ? row.category === categoryFilter
        : true;
      const matchesPrice =
        row.price >= priceRange[0] && row.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [data, searchText, categoryFilter, priceRange]);


  const handleEditClick = (product: Product) => {
    setEditProduct(product);
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setEditProduct(null);
  };

  const handleSave = async (updated: Product) => {
    try {
      const res = await api.patch(`/products/${updated.id}`, updated);
      setData((prev) =>
        prev.map((p) => (p.id === res.data.id ? res.data : p))
      );

      handleClose();
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };


  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/${id}`);
      setData((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };


  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "price", headerName: "Price", width: 120, type: "number" },
    { field: "stock", headerName: "Stock", width: 100, type: "number" },
    { field: "status", headerName: "Status", width: 120 },
    { field: "supplier", headerName: "Supplier", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEditClick(params.row as Product)}>
            <Edit fontSize="small" />
          </IconButton>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search product..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded-md px-2 py-1"
        />

        <select
          value={categoryFilter || ""}
          onChange={(e) => setCategoryFilter(e.target.value || null)}
          className="border rounded-md px-2 py-1"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <span>Price Range:</span>
          <input
            type="range"
            min={0}
            max={10000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
          />
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>
      </div>


      <div className="responsive-table border rounded-md" >
        <DataGrid
          rows={filteredData}
          columns={columns}
          pagination
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.id}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </div>


      {editProduct && (
        <EditProductModal
          open={openModal}
          product={editProduct}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
