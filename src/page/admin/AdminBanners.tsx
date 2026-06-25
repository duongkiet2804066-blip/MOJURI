import React, { useState } from "react";

interface Banner {
  id: number;
  title: string;
  image: string;
  link: string;
  position: "Hero Slider" | "Promo Banner 1" | "Promo Banner 2" | "Promo Banner 3";
  status: boolean;
}

const AdminBanners: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([
    { id: 1, title: "Discover a world of jewelry", image: "/media/slider/1-1.jpg", link: "/shop", position: "Hero Slider", status: true },
    { id: 2, title: "Discover the Best of the Best", image: "/media/slider/1-2.jpg", link: "/shop", position: "Hero Slider", status: true },
    { id: 3, title: "New Arrivals", image: "/media/banner/banner-1-1.jpg", link: "/shop", position: "Promo Banner 1", status: true },
    { id: 4, title: "Best Seller", image: "/media/banner/banner-1-2.jpg", link: "/shop", position: "Promo Banner 2", status: true },
    { id: 5, title: "Clearance Sale", image: "/media/banner/banner-1-3.jpg", link: "/shop", position: "Promo Banner 3", status: true }
  ]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [newBanner, setNewBanner] = useState({ title: "", image: "/media/slider/1-3.jpg", link: "/shop", position: "Hero Slider" as any });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBanner.title) return;
    const banner: Banner = {
      id: banners.length + 1,
      title: newBanner.title,
      image: newBanner.image,
      link: newBanner.link,
      position: newBanner.position,
      status: true
    };
    setBanners([...banners, banner]);
    setIsAddMode(false);
    setNewBanner({ title: "", image: "/media/slider/1-3.jpg", link: "/shop", position: "Hero Slider" });
  };

  const toggleStatus = (id: number) => {
    setBanners(banners.map(b => b.id === id ? { ...b, status: !b.status } : b));
  };

  const deleteBanner = (id: number) => {
    if (window.confirm("Are you sure you want to remove this banner?")) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      {isAddMode ? (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Add New Banner / Slide</h3>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setIsAddMode(false)}>
              Cancel
            </button>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleAddSubmit} style={{ maxWidth: "500px" }}>
              <div className="admin-form-group">
                <label className="admin-form-label">Banner Title</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Image Path</label>
                <input 
                  type="text" 
                  required
                  className="admin-form-control"
                  value={newBanner.image}
                  onChange={(e) => setNewBanner({ ...newBanner, image: e.target.value })}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Link Path</label>
                    <input 
                      type="text" 
                      required
                      className="admin-form-control"
                      value={newBanner.link}
                      onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Banner Position</label>
                    <select 
                      className="admin-form-control"
                      value={newBanner.position}
                      onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value })}
                    >
                      <option value="Hero Slider">Hero Slider</option>
                      <option value="Promo Banner 1">Promo Banner 1</option>
                      <option value="Promo Banner 2">Promo Banner 2</option>
                      <option value="Promo Banner 3">Promo Banner 3</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="admin-btn admin-btn-primary">
                Save Banner
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Manage Banners & Carousel Slides</h3>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => setIsAddMode(true)}>
              + Add Banner
            </button>
          </div>
          <div className="admin-card-body">
            <div className="admin-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Position</th>
                    <th>Redirect Target</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {banners.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <img 
                          src={b.image} 
                          alt={b.title} 
                          style={{ width: "90px", height: "45px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ddd" }}
                          onError={(e) => {
                            e.currentTarget.src = "/media/slider/1-1.jpg";
                          }}
                        />
                      </td>
                      <td style={{ fontWeight: 600, color: "#181c32" }}>{b.title}</td>
                      <td>
                        <span className="admin-badge badge-info" style={{ backgroundColor: "#eae6e8", color: "#bfa37a" }}>{b.position}</span>
                      </td>
                      <td style={{ fontFamily: "monospace" }}>{b.link}</td>
                      <td>
                        <button 
                          onClick={() => toggleStatus(b.id)}
                          className={`admin-badge ${b.status ? "badge-success" : "badge-danger"}`}
                          style={{ border: "none", cursor: "pointer" }}
                        >
                          {b.status ? "Active" : "Hidden"}
                        </button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px" }}
                          onClick={() => alert("Edit banner info coming soon!")}
                        >
                          Edit
                        </button>
                        <button 
                          className="admin-btn admin-btn-secondary admin-btn-sm" 
                          style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                          onClick={() => deleteBanner(b.id)}
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

export default AdminBanners;
