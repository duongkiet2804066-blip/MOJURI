import React, { useState, useEffect } from "react";
import { useShop } from "../../context/ShopContext";

interface Customer {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  location: string;
  spend: number;
  orders: number;
  status: "Active" | "Blocked";
  joined: string;
}

const STATIC_CUSTOMERS: Customer[] = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234-567-890", location: "New York, US", spend: 100.00, orders: 1, status: "Active", joined: "June 25, 2026" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987-654-321", location: "Los Angeles, US", spend: 200.00, orders: 1, status: "Active", joined: "June 24, 2026" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", phone: "+44 20-7946-0958", location: "London, UK", spend: 90.00, orders: 1, status: "Active", joined: "June 24, 2026" },
  { id: 4, name: "Emily Davis", email: "emily@example.com", phone: "+61 2-9876-5432", location: "Sydney, CA", spend: 180.00, orders: 1, status: "Active", joined: "June 23, 2026" },
  { id: 5, name: "Sarah Jenkins", email: "sarah@example.com", phone: "+33 1-2345-6789", location: "Paris, FR", spend: 120.00, orders: 1, status: "Active", joined: "June 20, 2026" }
];

const AdminCustomers: React.FC = () => {
  const { orders } = useShop();
  const [blockedEmails, setBlockedEmails] = useState<string[]>(() => {
    const saved = localStorage.getItem("mojuri_blocked_emails");
    return saved ? JSON.parse(saved) : ["emily@example.com"]; // Default block Emily Davis to match original page load
  });

  useEffect(() => {
    localStorage.setItem("mojuri_blocked_emails", JSON.stringify(blockedEmails));
  }, [blockedEmails]);

  // Aggregate customer details from all orders in ShopContext
  const getAggregatedCustomers = (): Customer[] => {
    const customerMap = new Map<string, Customer>();

    // Seed with static baseline, but override with any actual orders
    STATIC_CUSTOMERS.forEach((c) => {
      customerMap.set(c.email.toLowerCase(), {
        ...c,
        status: blockedEmails.includes(c.email.toLowerCase()) ? "Blocked" : "Active"
      });
    });

    // Scan real orders from ShopContext
    orders.forEach((order) => {
      const emailKey = order.email.toLowerCase();
      const existing = customerMap.get(emailKey);

      const locationStr = order.city && order.country ? `${order.city}, ${order.country}` : "Unknown";

      if (existing) {
        // If we have an existing customer, we accumulate their orders and spend
        // Only aggregate extra orders if it's not the exact initial ones that we already seeded
        // We can just calculate total spend and order counts directly from all orders to make it fully dynamic
      }
    });

    // Let's rebuild the dynamic aggregation directly from ALL orders:
    const dynamicMap = new Map<string, {
      name: string;
      email: string;
      phone: string;
      location: string;
      spend: number;
      orders: number;
      joined: string;
    }>();

    orders.forEach((order) => {
      const emailKey = order.email.toLowerCase();
      const existing = dynamicMap.get(emailKey);
      const total = order.status === "Cancelled" ? 0 : order.total;
      const count = 1;

      if (existing) {
        dynamicMap.set(emailKey, {
          name: order.customer, // latest name
          email: order.email,
          phone: order.phone || existing.phone,
          location: (order.city && order.country) ? `${order.city}, ${order.country}` : existing.location,
          spend: existing.spend + total,
          orders: existing.orders + count,
          joined: new Date(order.date).getTime() < new Date(existing.joined).getTime() ? order.date : existing.joined
        });
      } else {
        dynamicMap.set(emailKey, {
          name: order.customer,
          email: order.email,
          phone: order.phone || "",
          location: (order.city && order.country) ? `${order.city}, ${order.country}` : "Unknown",
          spend: total,
          orders: count,
          joined: order.date
        });
      }
    });

    // Merge static and dynamic lists
    const mergedList: Customer[] = [];
    let idCounter = 1;

    dynamicMap.forEach((dyn) => {
      mergedList.push({
        id: idCounter++,
        name: dyn.name,
        email: dyn.email,
        phone: dyn.phone,
        location: dyn.location,
        spend: dyn.spend,
        orders: dyn.orders,
        status: blockedEmails.includes(dyn.email.toLowerCase()) ? "Blocked" : "Active",
        joined: dyn.joined
      });
    });

    // For any static customers that don't have orders, add them as baseline
    STATIC_CUSTOMERS.forEach((c) => {
      if (!dynamicMap.has(c.email.toLowerCase())) {
        mergedList.push({
          ...c,
          id: idCounter++,
          status: blockedEmails.includes(c.email.toLowerCase()) ? "Blocked" : "Active"
        });
      }
    });

    return mergedList;
  };

  const customersList = getAggregatedCustomers();

  const toggleStatus = (email: string) => {
    const emailLower = email.toLowerCase();
    if (blockedEmails.includes(emailLower)) {
      setBlockedEmails(blockedEmails.filter((e) => e !== emailLower));
    } else {
      setBlockedEmails([...blockedEmails, emailLower]);
    }
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
              {customersList.map((c) => (
                <tr key={c.email}>
                  <td style={{ fontWeight: 600 }}>#CUST-{c.id.toString().padStart(4, "0")}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                    <span style={{ fontSize: "12px", color: "#a1a5b7" }}>{c.email} {c.phone ? `• ${c.phone}` : ""}</span>
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
                      onClick={() => toggleStatus(c.email)}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ 
                        color: c.status === "Active" ? "#f1416c" : "#50cd89", 
                        backgroundColor: c.status === "Active" ? "#fff5f8" : "#e8fff3",
                        width: "80px",
                        justifyContent: "center"
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
