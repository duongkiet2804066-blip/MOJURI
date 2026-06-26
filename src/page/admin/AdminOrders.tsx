import React, { useState } from "react";
import { useShop, type Order } from "../../context/ShopContext";

const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder } = useShop();
  const [filter, setFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === "All" || o.status === filter;
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id: string) => {
    if (window.confirm(`Are you sure you want to delete order #${id}?`)) {
      deleteOrder(id);
      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Orders</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <input 
            type="text" 
            placeholder="Search ID, customer..." 
            className="admin-form-control"
            style={{ width: "200px", padding: "6px 12px", fontSize: "13px" }}
            value={searchTerm}
            onChange={handleSearch}
          />
          <div style={{ display: "flex", gap: "5px" }}>
            {["All", "Completed", "Processing", "Pending", "Cancelled"].map(st => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className="admin-btn admin-btn-secondary admin-btn-sm"
                style={{
                  background: filter === st ? "#cb8161" : "",
                  color: filter === st ? "#fff" : ""
                }}
              >
                {st}
              </button>
            ))}
          </div>
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
                <th>Payment Method</th>
                <th>Fulfillment Status</th>
                <th>Total</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 600, color: "#cb8161", cursor: "pointer" }} onClick={() => setSelectedOrder(order)}>
                      #{order.id}
                    </td>
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
                      <button 
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        style={{ marginRight: "5px", padding: "4px 8px" }}
                        onClick={() => setSelectedOrder(order)}
                      >
                        Details
                      </button>
                      <button 
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        style={{ padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "30px", color: "#8a857c" }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Order Modal */}
      {selectedOrder && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "20px"
        }}>
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            border: "1px solid #f3eee7"
          }}>
            {/* Modal Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #f3eee7",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fcfbfa"
            }}>
              <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "24px", margin: 0, fontWeight: 700 }}>
                Order Details: <span style={{ color: "#cb8161" }}>#{selectedOrder.id}</span>
              </h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#8a857c",
                  padding: "5px"
                }}
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "24px" }}>
              {/* Order Status & Actions Row */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "25px",
                paddingBottom: "20px",
                borderBottom: "1px solid #eff2f5"
              }}>
                <div>
                  <span style={{ fontSize: "12px", color: "#8a857c", display: "block", textTransform: "uppercase" }}>Date Placed</span>
                  <strong style={{ fontSize: "14px" }}>{selectedOrder.date}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#8a857c", display: "block", textTransform: "uppercase" }}>Payment Method</span>
                  <strong style={{ fontSize: "14px" }}>{selectedOrder.payment}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#8a857c", display: "block", textTransform: "uppercase" }}>Status</span>
                  <span className={`admin-badge ${
                    selectedOrder.status === "Completed" ? "badge-success" : 
                    selectedOrder.status === "Pending" ? "badge-warning" : 
                    selectedOrder.status === "Processing" ? "badge-info" : "badge-danger"
                  }`}>{selectedOrder.status}</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", fontWeight: "bold", color: "#8a857c" }}>Fulfillment:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as any);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value as any });
                    }}
                    className="admin-form-control"
                    style={{ width: "130px", padding: "5px 10px", fontSize: "13px" }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Customer & Address Details Grid */}
              <div className="row" style={{ marginBottom: "25px" }}>
                <div className="col-md-6" style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#fbf9f6", padding: "15px", borderRadius: "6px", height: "100%", border: "1px solid #f3eee7" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", color: "#cb8161", margin: "0 0 10px 0", borderBottom: "1px solid #e2d9cd", paddingBottom: "5px" }}>
                      Customer Information
                    </h4>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>Name:</strong> {selectedOrder.customer}</p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>Email:</strong> {selectedOrder.email}</p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>Phone:</strong> {selectedOrder.phone || "N/A"}</p>
                    {selectedOrder.notes && (
                      <div style={{ margin: "12px 0 0 0", fontSize: "13px", color: "#666", fontStyle: "italic", background: "#fff", padding: "8px", borderLeft: "3px solid #cb8161", borderRadius: "2px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
                        <strong>Notes:</strong> {selectedOrder.notes}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6" style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#fbf9f6", padding: "15px", borderRadius: "6px", height: "100%", border: "1px solid #f3eee7" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 700, textTransform: "uppercase", color: "#cb8161", margin: "0 0 10px 0", borderBottom: "1px solid #e2d9cd", paddingBottom: "5px" }}>
                      Shipping Address
                    </h4>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>Street:</strong> {selectedOrder.address || "N/A"}</p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>City/State:</strong> {selectedOrder.city || "N/A"}</p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>Country:</strong> {selectedOrder.country || "N/A"}</p>
                    <p style={{ margin: "6px 0", fontSize: "14px" }}><strong>ZIP Code:</strong> {selectedOrder.postcode || "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Ordered Items Table */}
              <h4 style={{ fontSize: "15px", fontWeight: 700, margin: "20px 0 10px 0", textTransform: "uppercase", letterSpacing: "0.5px", color: "#222" }}>Items Summary</h4>
              <div className="admin-table-responsive" style={{ border: "1px solid #f3eee7", borderRadius: "6px", marginBottom: "20px" }}>
                <table className="admin-table" style={{ marginBottom: 0 }}>
                  <thead>
                    <tr style={{ background: "#fcfbfa" }}>
                      <th style={{ width: "60px" }}>Image</th>
                      <th>Product</th>
                      <th>SKU</th>
                      <th style={{ textAlign: "right" }}>Price</th>
                      <th style={{ textAlign: "center" }}>Qty</th>
                      <th style={{ textAlign: "right" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              style={{ width: "45px", height: "45px", objectFit: "cover", borderRadius: "4px", border: "1px solid #eee" }}
                              onError={(e) => { e.currentTarget.src = "/media/product/cat-1.jpg"; }}
                            />
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: "#111" }}>{item.product.name}</div>
                            <span style={{ fontSize: "11px", color: "#a1a5b7" }}>{item.product.category}</span>
                          </td>
                          <td style={{ fontFamily: "monospace", fontSize: "13px" }}>{item.product.sku}</td>
                          <td style={{ textAlign: "right" }}>${item.product.price.toFixed(2)}</td>
                          <td style={{ textAlign: "center", fontWeight: "bold" }}>{item.quantity}</td>
                          <td style={{ textAlign: "right", fontWeight: 600 }}>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} style={{ textAlign: "center", padding: "20px", color: "#8a857c" }}>
                          No items listed for this order.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "8px",
                paddingTop: "15px",
                borderTop: "1px solid #eff2f5"
              }}>
                <div style={{ display: "flex", gap: "50px", fontSize: "14px" }}>
                  <span style={{ color: "#8a857c" }}>Subtotal:</span>
                  <span style={{ fontWeight: 600 }}>
                    ${(selectedOrder.total >= 400 ? selectedOrder.total : Math.max(0, selectedOrder.total - 15)).toFixed(2)}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "50px", fontSize: "14px" }}>
                  <span style={{ color: "#8a857c" }}>Shipping:</span>
                  <span style={{ fontWeight: 600 }}>
                    {selectedOrder.total >= 400 ? "Free Shipping" : "$15.00"}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "50px", fontSize: "18px", fontWeight: "bold", marginTop: "5px", color: "#cb8161" }}>
                  <span>Total:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: "15px 24px",
              borderTop: "1px solid #f3eee7",
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#fcfbfa",
              borderRadius: "0 0 8px 8px"
            }}>
              <button 
                onClick={() => handleDelete(selectedOrder.id)}
                className="admin-btn"
                style={{ backgroundColor: "#fff5f8", color: "#f1416c" }}
              >
                Delete Order
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="admin-btn admin-btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
