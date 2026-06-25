import React, { useState } from "react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  spend: number;
  orders: number;
  status: "Active" | "Blocked";
  joined: string;
}

const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234-567-890", location: "New York, USA", spend: 350.00, orders: 4, status: "Active", joined: "Jan 12, 2026" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987-654-321", location: "Los Angeles, USA", spend: 780.00, orders: 7, status: "Active", joined: "Feb 05, 2026" },
    { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "+44 20-7946-0958", location: "London, UK", spend: 90.00, orders: 1, status: "Active", joined: "Mar 19, 2026" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "+61 2-9876-5432", location: "Sydney, Australia", spend: 180.00, orders: 2, status: "Blocked", joined: "Apr 22, 2026" },
    { id: 5, name: "Sarah Jenkins", email: "sarah@example.com", phone: "+33 1-2345-6789", location: "Paris, France", spend: 540.00, orders: 5, status: "Active", joined: "May 14, 2026" }
  ]);

  const toggleStatus = (id: number) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...c, status: c.status === "Active" ? "Blocked" : "Active" } : c
    ));
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Manage Customers</h3>
      </div>
      <div className="admin-card-body">
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name / Contact</th>
                <th>Location</th>
                <th>Orders</th>
                <th>Total Spend</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>#CUST-{c.id.toString().padStart(4, "0")}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <span style={{ fontSize: "12px", color: "#a1a5b7" }}>{c.email} • {c.phone}</span>
                  </td>
                  <td>{c.location}</td>
                  <td style={{ fontWeight: "bold" }}>{c.orders}</td>
                  <td style={{ fontWeight: 600 }}>${c.spend.toFixed(2)}</td>
                  <td>{c.joined}</td>
                  <td>
                    <span className={`admin-badge ${c.status === "Active" ? "badge-success" : "badge-danger"}`}>
                      {c.status}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button 
                      onClick={() => toggleStatus(c.id)}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ 
                        color: c.status === "Active" ? "#f1416c" : "#50cd89", 
                        backgroundColor: c.status === "Active" ? "#fff5f8" : "#e8fff3" 
                      }}
                    >
                      {c.status === "Active" ? "Block" : "Activate"}
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

export default AdminCustomers;
