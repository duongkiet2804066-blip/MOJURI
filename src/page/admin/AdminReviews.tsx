import React, { useState } from "react";

interface Review {
  id: number;
  customer: string;
  rating: number;
  product: string;
  comment: string;
  date: string;
  status: "Approved" | "Pending" | "Rejected";
}

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, customer: "John Doe", rating: 5, product: "Medium Flat Hoops", comment: "Absolutely gorgeous earrings! High quality build.", date: "June 25, 2026", status: "Approved" },
    { id: 2, customer: "Jane Smith", rating: 4, product: "Bold Pearl Hoop Earrings", comment: "Very elegant, but slightly heavier than I expected. Love the pearls.", date: "June 24, 2026", status: "Pending" },
    { id: 3, customer: "Michael Brown", rating: 5, product: "Classic Pearl Ring", comment: "Beautiful silver design. Fits perfectly.", date: "June 24, 2026", status: "Approved" },
    { id: 4, customer: "Emily Davis", rating: 2, product: "Gold Chain Necklace", comment: "Chain broke within two days of wearing it.", date: "June 23, 2026", status: "Pending" }
  ]);

  const updateStatus = (id: number, newStatus: "Approved" | "Rejected") => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const deleteReview = (id: number) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Customer Reviews</h3>
      </div>
      <div className="admin-card-body">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Product</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td style={{ fontWeight: 600 }}>{rev.customer}</td>
                  <td style={{ color: "#bfa37a", fontWeight: 600 }}>{rev.product}</td>
                  <td>
                    <div style={{ color: "#ffc700", fontWeight: "bold", display: "flex", gap: "2px" }}>
                      {"★".repeat(rev.rating)}
                      {"☆".repeat(5 - rev.rating)}
                    </div>
                  </td>
                  <td style={{ maxWidth: "250px", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }} title={rev.comment}>
                    "{rev.comment}"
                  </td>
                  <td>{rev.date}</td>
                  <td>
                    <span className={`admin-badge ${
                      rev.status === "Approved" ? "badge-success" : 
                      rev.status === "Pending" ? "badge-warning" : "badge-danger"
                    }`}>{rev.status}</span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    {rev.status === "Pending" && (
                      <>
                        <button 
                          onClick={() => updateStatus(rev.id, "Approved")}
                          className="admin-btn admin-btn-primary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px", backgroundColor: "#50cd89" }}
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateStatus(rev.id, "Rejected")}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          style={{ marginRight: "5px", padding: "4px 8px", color: "#f1416c", backgroundColor: "#fff5f8" }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => deleteReview(rev.id)}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ padding: "4px 8px" }}
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
  );
};

export default AdminReviews;
