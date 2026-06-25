import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  status: boolean;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Earrings", slug: "earrings", description: "Beautiful earrings range from hoops to drops", count: 24, status: true },
    { id: 2, name: "Rings", slug: "rings", description: "Elegant classic and modern rings", count: 18, status: true },
    { id: 3, name: "Necklaces", slug: "necklaces", description: "Gold, silver, and gemstone necklaces", count: 15, status: true },
    { id: 4, name: "Bracelets", slug: "bracelets", description: "Chain, cuff, and charm bracelets", count: 12, status: true },
    { id: 5, name: "Charms", slug: "charms", description: "Personalized collectible charms", count: 9, status: true }
  ]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", description: "" });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.name) return;
    const cat: Category = {
      id: categories.length + 1,
      name: newCat.name,
      slug: newCat.name.toLowerCase().replace(/\s+/g, "-"),
      description: newCat.description,
      count: 0,
      status: true
    };
    setCategories([...categories, cat]);
    setIsAddMode(false);
    setNewCat({ name: "", description: "" });
  };

  const toggleStatus = (id: number) => {
    setCategories(categories.map(c => c.id === id ? { ...c, status: !c.status } : c));
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      {isAddMode ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Add New Category</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setIsAddMode(false)}>
              Cancel
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAddSubmit} style={{ maxWidth: "500px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Category Name</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newCat.name}
                  onChange={(e) => setNewCat({ ...newCat, name: e.target.value })}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea 
                  rows={3}
                  className="admin-form-control"
                  value={newCat.description}
                  onChange={(e) => setNewCat({ ...newCat, description: e.target.value })}
                ></textarea>
              </div>
              <button type="submit" className="admin-btn admin-btn-primary">
                Save Category
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Product Categories</h3>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setIsAddMode(true)}>
              + Add Category
            </button>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Description</th>
                    <th>Products Count</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr key={cat.id}>
                      <td>{cat.id}</td>
                      <td style={{ fontWeight: 600, color: "#181c32" }}>{cat.name}</td>
                      <td style={{ fontFamily: "monospace" }}>/{cat.slug}</td>
                      <td style={{ color: "#777", fontSize: "13px" }}>{cat.description || "No description"}</td>
                      <td style={{ fontWeight: "bold" }}>{cat.count}</td>
                      <td>
                        <button 
                          onClick={() => toggleStatus(cat.id)}
                          className={`admin-badge ${cat.status ? "badge-success" : "badge-danger"}`}
                          style={{ border: "none", cursor: "pointer" }}
                        >
                          {cat.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px" }}
                          onClick={() => alert("Edit category modal coming soon!")}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm" 
                          style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                          onClick={() => handleDelete(cat.id)}
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

export default AdminCategories;
