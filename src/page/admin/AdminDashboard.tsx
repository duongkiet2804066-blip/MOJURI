import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";

const AdminDashboard: React.FC = () => {
  const { orders, products } = useShop();

  // Calculate dynamic stats
  const totalOrdersCount = orders.length;

  const completedOrProcessing = orders.filter(
    (o) => o.status === "Completed" || o.status === "Processing"
  );
  
  // Base revenue of $24,250 + actual orders total
  const calculatedRevenue = 24250 + completedOrProcessing.reduce((acc, o) => acc + o.total, 0);

  // Unique customers based on emails + a realistic base
  const uniqueEmails = new Set(orders.map((o) => o.email.toLowerCase()));
  const calculatedCustomers = 1414 + uniqueEmails.size;

  const recentOrders = orders.slice(0, 5);

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
            <p className="admin-stat-value">${calculatedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
            <p className="admin-stat-value">{totalOrdersCount}</p>
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
            <p className="admin-stat-value">{products.length}</p>
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
            <p className="admin-stat-value">{calculatedCustomers.toLocaleString()}</p>
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
                      <th>Products</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.length > 0 ? (
                      recentOrders.map((order, index) => {
                        // Describe items
                        let itemsSummary = "";
                        if (order.items && order.items.length > 0) {
                          if (order.items.length === 1) {
                            itemsSummary = `${order.items[0].product.name} x${order.items[0].quantity}`;
                          } else {
                            itemsSummary = `${order.items[0].product.name} x${order.items[0].quantity} (+ ${order.items.length - 1} more)`;
                          }
                        } else {
                          itemsSummary = "No items";
                        }
                        
                        return (
                          <tr key={index}>
                            <td style={{ fontWeight: 600, color: "#cb8161" }}>
                              <Link to="/admin/orders" style={{ textDecoration: "none", color: "#cb8161" }}>
                                #{order.id}
                              </Link>
                            </td>
                            <td>{order.customer}</td>
                            <td>{itemsSummary}</td>
                            <td>{order.date}</td>
                            <td>
                              <span className={`admin-badge ${
                                order.status === "Completed" ? "badge-success" : 
                                order.status === "Pending" ? "badge-warning" : 
                                order.status === "Processing" ? "badge-info" : "badge-danger"
                              }`}>{order.status}</span>
                            </td>
                            <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#8a857c" }}>
                          No orders recorded yet.
                        </td>
                      </tr>
                    )}
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
