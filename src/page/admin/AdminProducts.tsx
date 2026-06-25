import React, { useState } from "react";
import { useShop } from "../../context/ShopContext";
import { type Product } from "../../data/products";

const AdminProducts: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddMode, setIsAddMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Form State for Adding
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    oldPrice: 0,
    category: "Earrings",
    sku: "",
    description: "",
    image: "/media/product/1.jpg"
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: newProduct.name,
      price: Number(newProduct.price),
      oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : undefined,
      category: newProduct.category,
      sku: newProduct.sku || `PROD-${Date.now().toString().slice(-4)}`,
      description: newProduct.description,
      image: newProduct.image,
      hoverImage: newProduct.image,
      rating: 5,
      reviewsCount: 0,
      inStock: true
    };

    addProduct(product);
    setIsAddMode(false);
    // Reset form
    setNewProduct({
      name: "",
      price: 0,
      oldPrice: 0,
      category: "Earrings",
      sku: "",
      description: "",
      image: "/media/product/1.jpg"
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  return (
    <div>
      {isAddMode ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Add New Product</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setIsAddMode(false)}>
              Back to List
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAddSubmit} style={{ maxWidth: "600px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      className="admin-form-control"
                      value={newProduct.price || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Old Price ($) - Optional</label>
                    <input 
                      type="number" 
                      className="admin-form-control"
                      value={newProduct.oldPrice || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, oldPrice: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select 
                      className="admin-form-control"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    >
                      <option value="Earrings">Earrings</option>
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Charms">Charms</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">SKU</label>
                    <input 
                      type="text" 
                      className="admin-form-control"
                      placeholder="e.g. RING-005"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea 
                  required
                  rows={4}
                  className="admin-form-control"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Image Path</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                />
              </div>

              <button type="submit" className="admin-btn admin-btn-primary">
                Save Product
              </button>
            </form>
          </div>
        </div>
      ) : editingProduct ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Edit Product: {editingProduct.name}</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setEditingProduct(null)}>
              Back to List
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleEditSubmit} style={{ maxWidth: "600px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Price ($)</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      className="admin-form-control"
                      value={editingProduct.price || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Old Price ($) - Optional</label>
                    <input 
                      type="number" 
                      className="admin-form-control"
                      value={editingProduct.oldPrice || ""}
                      onChange={(e) => setEditingProduct({ ...editingProduct, oldPrice: e.target.value ? Number(e.target.value) : undefined })}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select 
                      className="admin-form-control"
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    >
                      <option value="Earrings">Earrings</option>
                      <option value="Rings">Rings</option>
                      <option value="Necklaces">Necklaces</option>
                      <option value="Bracelets">Bracelets</option>
                      <option value="Charms">Charms</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">SKU</label>
                    <input 
                      type="text" 
                      className="admin-form-control"
                      value={editingProduct.sku}
                      onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Stock Status</label>
                <select 
                  className="admin-form-control"
                  value={editingProduct.inStock ? "true" : "false"}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.value === "true" })}
                >
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea 
                  required
                  rows={4}
                  className="admin-form-control"
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Image Path</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value, hoverImage: e.target.value })}
                />
              </div>

              <button type="submit" className="admin-btn admin-btn-primary">
                Update Product
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Manage Products</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input 
                type="text" 
                placeholder="Search products..." 
                className="admin-form-control"
                style={{ width: "200px", padding: "6px 12px", fontSize: "13px" }}
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setIsAddMode(true)}>
                + Add Product
              </button>
            </div>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px", border: "1px solid #eee" }}
                          onError={(e) => {
                            e.currentTarget.src = "/media/product/cat-1.jpg";
                          }}
                        />
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: "#181c32" }}>{product.name}</div>
                        <span style={{ fontSize: "12px", color: "#a1a5b7" }}>Rating: {product.rating} ★</span>
                      </td>
                      <td style={{ fontFamily: "monospace", fontWeight: 600 }}>{product.sku}</td>
                      <td>{product.category}</td>
                      <td style={{ fontWeight: 600 }}>
                        {product.oldPrice && <del style={{ color: "#aaa", marginRight: "5px", fontSize: "12px" }}>${product.oldPrice}</del>}
                        ${product.price}
                      </td>
                      <td>
                        <span className={`admin-badge ${product.inStock ? "badge-success" : "badge-danger"}`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px" }}
                          onClick={() => setEditingProduct(product)}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm" 
                          style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
