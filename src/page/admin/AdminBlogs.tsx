import React, { useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  status: "Published" | "Draft";
}

const AdminBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([
    { id: 1, title: "How to Style Gold Hoop Earrings", author: "Sarah Taylor", category: "Styling Guides", date: "June 20, 2026", status: "Published" },
    { id: 2, title: "The Ultimate Guide to Conflict-Free Gemstones", author: "Kiet Duong", category: "Education", date: "June 15, 2026", status: "Published" },
    { id: 3, title: "Top Summer Jewelry Trends of 2026", author: "Admin", category: "Trends", date: "June 10, 2026", status: "Draft" },
    { id: 4, title: "Caring For Your Pearls: Tips From Our Smiths", author: "Sarah Taylor", category: "Maintenance", date: "May 28, 2026", status: "Published" }
  ]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", author: "Admin", category: "Trends", status: "Draft" as any });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlog.title) return;
    const blog: BlogPost = {
      id: blogs.length + 1,
      title: newBlog.title,
      author: newBlog.author,
      category: newBlog.category,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      status: newBlog.status
    };
    setBlogs([blog, ...blogs]);
    setIsAddMode(false);
    setNewBlog({ title: "", author: "Admin", category: "Trends", status: "Draft" });
  };

  const deleteBlog = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      {isAddMode ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Create Blog Post</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setIsAddMode(false)}>
              Cancel
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAddSubmit} style={{ maxWidth: "600px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Blog Title</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Author Name</label>
                    <input 
                      type="text" 
                      required
                      className="admin-form-control"
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Category</label>
                    <select 
                      className="admin-form-control"
                      value={newBlog.category}
                      onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    >
                      <option value="Trends">Trends</option>
                      <option value="Education">Education</option>
                      <option value="Styling Guides">Styling Guides</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select 
                  className="admin-form-control"
                  value={newBlog.status}
                  onChange={(e) => setNewBlog({ ...newBlog, status: e.target.value as any })}
                >
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              <button type="submit" className="admin-btn admin-btn-primary">
                Save Blog Post
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Manage Blog Articles</h3>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setIsAddMode(true)}>
              + Create Post
            </button>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Publish Date</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td style={{ fontWeight: 600, color: "#181c32" }}>{b.title}</td>
                      <td>{b.author}</td>
                      <td>{b.category}</td>
                      <td>{b.date}</td>
                      <td>
                        <span className={`admin-badge ${b.status === "Published" ? "badge-success" : "badge-warning"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px" }}
                          onClick={() => alert("Edit blog content editor coming soon!")}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm" 
                          style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                          onClick={() => deleteBlog(b.id)}
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

export default AdminBlogs;
