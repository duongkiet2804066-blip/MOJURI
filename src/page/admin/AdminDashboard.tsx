import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const recentOrders = [
    { id: "#ORD-8594", customer: "John Doe", product: "Medium Flat Hoops", date: "June 25, 2026", status: "Completed", total: "$100.00" },
    { id: "#ORD-8593", customer: "Jane Smith", product: "Bold Pearl Hoop Earrings", date: "June 24, 2026", status: "Pending", total: "$200.00" },
    { id: "#ORD-8592", customer: "Michael Brown", product: "Classic Pearl Ring", date: "June 24, 2026", status: "Completed", total: "$90.00" },
    { id: "#ORD-8591", customer: "Emily Davis", product: "Gold Chain Necklace", date: "June 23, 2026", status: "Cancelled", total: "$180.00" },
    { id: "#ORD-8590", customer: "William Wilson", product: "Twin Hoops", date: "June 22, 2026", status: "Completed", total: "$300.00" }
  ];

  const topProducts = [
    { name: "Gold Chain Necklace", category: "Necklaces", sales: 85, stock: "15 in stock", price: "$180.00" },
    { name: "Medium Flat Hoops", category: "Earrings", sales: 74, stock: "45 in stock", price: "$100.00" },
    { name: "Bold Pearl Hoop Earrings", category: "Earrings", sales: 62, stock: "8 in stock", price: "$200.00" },
    { name: "Classic Pearl Ring", category: "Rings", sales: 49, stock: "23 in stock", price: "$90.00" }
  ];

  return (
    <div>
      {/* Overview Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h4>Total Revenue</h4>
            <p className="admin-stat-value">$24,850.00</p>
          </div>
          <div className="admin-stat-icon-wrap stat-success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h4>Total Orders</h4>
            <p className="admin-stat-value">186</p>
          </div>
          <div className="admin-stat-icon-wrap stat-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h4>Products</h4>
            <p className="admin-stat-value">120</p>
          </div>
          <div className="admin-stat-icon-wrap stat-warning">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
              <polyline points="7.5 19.79 7.5 14.6 3 12" />
              <polyline points="21 12 16.5 14.6 16.5 19.79" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-info">
            <h4>Customers</h4>
            <p className="admin-stat-value">1,420</p>
          </div>
          <div className="admin-stat-icon-wrap stat-danger">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Orders Table */}
        <div className="col-lg-8">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Recent Orders</h3>
              <Link to="/admin/orders" className="admin-btn admin-btn-secondary admin-btn-sm">View All Orders</Link>
            </div>
            <div className="admin-card-body">
              <div className="admin-table-responsive">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td style={{ fontWeight: 600, color: "#bfa37a" }}>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.product}</td>
                        <td>{order.date}</td>
                        <td>
                          <span className={`admin-badge ${
                            order.status === "Completed" ? "badge-success" : 
                            order.status === "Pending" ? "badge-warning" : "badge-danger"
                          }`}>{order.status}</span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="col-lg-4">
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Top Selling Products</h3>
            </div>
            <div className="admin-card-body" style={{ padding: "10px 24px" }}>
              {topProducts.map((prod, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", borderBottom: index < topProducts.length - 1 ? "1px solid #eff2f5" : "none" }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#181c32" }}>{prod.name}</h5>
                    <span style={{ fontSize: "12px", color: "#a1a5b7" }}>{prod.category} • {prod.stock}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: "14px", fontWeight: 700, color: "#181c32" }}>{prod.price}</span>
                    <span style={{ fontSize: "12px", color: "#50cd89", fontWeight: 600 }}>{prod.sales} sales</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
