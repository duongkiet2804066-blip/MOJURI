import React, { useState } from "react";

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  payment: string;
  status: "Completed" | "Pending" | "Processing" | "Cancelled";
  total: number;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-8594", customer: "John Doe", email: "john@example.com", date: "June 25, 2026", payment: "Paid via Credit Card", status: "Completed", total: 100.00 },
    { id: "ORD-8593", customer: "Jane Smith", email: "jane@example.com", date: "June 24, 2026", payment: "Unpaid (Bank Transfer)", status: "Pending", total: 200.00 },
    { id: "ORD-8592", customer: "Michael Brown", email: "michael@example.com", date: "June 24, 2026", payment: "Paid via PayPal", status: "Completed", total: 90.00 },
    { id: "ORD-8591", customer: "Emily Davis", email: "emily@example.com", date: "June 23, 2026", payment: "Refunded", status: "Cancelled", total: 180.00 },
    { id: "ORD-8590", customer: "William Wilson", email: "william@example.com", date: "June 22, 2026", payment: "Paid via Stripe", status: "Completed", total: 300.00 },
    { id: "ORD-8589", customer: "Sarah Jenkins", email: "sarah@example.com", date: "June 20, 2026", payment: "Processing", status: "Processing", total: 120.00 }
  ]);

  const [filter, setFilter] = useState<string>("All");

  const updateStatus = (id: string, newStatus: "Completed" | "Pending" | "Processing" | "Cancelled") => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const filteredOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Orders</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {["All", "Completed", "Processing", "Pending", "Cancelled"].map(st => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className="admin-btn admin-btn-secondary admin-btn-sm"
              style={{
                background: filter === st ? "#bfa37a" : "",
                color: filter === st ? "#fff" : ""
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>
      <div className="admin-card-body">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Fulfillment Status</th>
                <th>Total</th>
                <th style={{ textAlign: "right" }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: "#bfa37a" }}>#{order.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    <span style={{ fontSize: "12px", color: "#a1a5b7" }}>{order.email}</span>
                  </td>
                  <td>{order.date}</td>
                  <td style={{ fontSize: "13px", color: "#666" }}>{order.payment}</td>
                  <td>
                    <span className={`admin-badge ${
                      order.status === "Completed" ? "badge-success" : 
                      order.status === "Pending" ? "badge-warning" : 
                      order.status === "Processing" ? "badge-info" : "badge-danger"
                    }`}>{order.status}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>${order.total.toFixed(2)}</td>
                  <td style={{ textAlign: "right" }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as any)}
                      className="admin-form-control"
                      style={{ width: "130px", padding: "5px 10px", fontSize: "12px", display: "inline-block" }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
