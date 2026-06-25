import React, { useState } from "react";
import { Link } from "react-router-dom";

const MyAccount: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Dashboard Tabs
  const [activeDashboardTab, setActiveDashboardTab] = useState<"dashboard" | "orders" | "addresses" | "details">("dashboard");

  // Registration state
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all credentials.");
      return;
    }
    setEmail(username + "@example.com");
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regEmail || !regPassword) {
      alert("Please enter a valid email and password.");
      return;
    }
    setUsername(regEmail.split("@")[0]);
    setEmail(regEmail);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setEmail("");
    setPassword("");
    setRegEmail("");
    setRegPassword("");
  };

  return (
    <div id="primary" className="content-area">
      {/* Title */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              My Account
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>My Account
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container large">
            
            {!isLoggedIn ? (
              /* Login and Register Forms */
              <div className="row justify-content-center">
                <div className="col-md-5" style={{ border: "1px solid #eee", padding: "40px", borderRadius: "8px", background: "#fff", margin: "15px" }}>
                  <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", marginBottom: "25px", fontWeight: "bold" }}>Sign In</h2>
                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Username or Email address *</label>
                      <input 
                        type="text" 
                        required 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Password *</label>
                      <input 
                        type="password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
                      <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                        <input type="checkbox" /> Remember me
                      </label>
                      <a href="#" onClick={(e) => e.preventDefault()} style={{ color: "#cb8161", fontSize: "14px" }}>Lost your password?</a>
                    </div>

                    <button 
                      type="submit" 
                      style={{ width: "100%", background: "#111", color: "#fff", border: "none", padding: "12px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div className="col-md-5" style={{ border: "1px solid #eee", padding: "40px", borderRadius: "8px", background: "#fff", margin: "15px" }}>
                  <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", marginBottom: "25px", fontWeight: "bold" }}>Register</h2>
                  <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Email address *</label>
                      <input 
                        type="email" 
                        required 
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>
                    <div style={{ marginBottom: "25px" }}>
                      <label style={{ fontWeight: 600 }}>Password *</label>
                      <input 
                        type="password" 
                        required 
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>

                    <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.6", marginBottom: "25px" }}>
                      Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                    </p>

                    <button 
                      type="submit" 
                      style={{ width: "100%", background: "#cb8161", color: "#fff", border: "none", padding: "12px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Account Dashboard */
              <div className="row">
                {/* Dashboard Nav Tabs */}
                <div className="col-md-3" style={{ marginBottom: "30px" }}>
                  <ul className="account-nav" style={{ listStyle: "none", padding: 0, border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                    {[
                      { key: "dashboard", label: "Dashboard" },
                      { key: "orders", label: "Orders" },
                      { key: "addresses", label: "Addresses" },
                      { key: "details", label: "Account Details" }
                    ].map((tab) => (
                      <li 
                        key={tab.key}
                        onClick={() => setActiveDashboardTab(tab.key as any)}
                        style={{
                          padding: "15px 20px",
                          borderBottom: "1px solid #eee",
                          cursor: "pointer",
                          fontWeight: activeDashboardTab === tab.key ? "bold" : "normal",
                          background: activeDashboardTab === tab.key ? "#f9f9f9" : "#fff",
                          color: activeDashboardTab === tab.key ? "#cb8161" : "#111"
                        }}
                      >
                        {tab.label}
                      </li>
                    ))}
                    <li 
                      onClick={handleLogout}
                      style={{ padding: "15px 20px", cursor: "pointer", color: "red" }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>

                {/* Dashboard Tab Content */}
                <div className="col-md-9" style={{ border: "1px solid #eee", padding: "40px", borderRadius: "8px", background: "#fff" }}>
                  
                  {activeDashboardTab === "dashboard" && (
                    <div>
                      <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "20px" }}>Hello, {username}!</h2>
                      <p style={{ lineHeight: "1.7", color: "#666" }}>
                        From your account dashboard you can easily view your <a href="#" onClick={(e) => { e.preventDefault(); setActiveDashboardTab("orders"); }} style={{ color: "#cb8161" }}>recent orders</a>, manage your <a href="#" onClick={(e) => { e.preventDefault(); setActiveDashboardTab("addresses"); }} style={{ color: "#cb8161" }}>shipping and billing addresses</a>, and <a href="#" onClick={(e) => { e.preventDefault(); setActiveDashboardTab("details"); }} style={{ color: "#cb8161" }}>edit your password and profile details</a>.
                      </p>
                    </div>
                  )}

                  {activeDashboardTab === "orders" && (
                    <div>
                      <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "25px" }}>Orders</h2>
                      <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", textAlign: "left" }}>
                            <th style={{ padding: "10px 0" }}>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "15px 0" }}>#1483</td>
                            <td>June 24, 2026</td>
                            <td style={{ color: "green", fontWeight: "bold" }}>Processing</td>
                            <td>$250.00 for 2 items</td>
                            <td>
                              <button style={{ padding: "5px 15px", background: "#eee", border: "none", borderRadius: "4px" }} onClick={() => alert("Showing details for order #1483")}>View</button>
                            </td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #eee" }}>
                            <td style={{ padding: "15px 0" }}>#1390</td>
                            <td>April 12, 2026</td>
                            <td style={{ color: "gray" }}>Completed</td>
                            <td>$100.00 for 1 item</td>
                            <td>
                              <button style={{ padding: "5px 15px", background: "#eee", border: "none", borderRadius: "4px" }} onClick={() => alert("Showing details for order #1390")}>View</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {activeDashboardTab === "addresses" && (
                    <div>
                      <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "25px" }}>Addresses</h2>
                      <p style={{ color: "#666", marginBottom: "30px" }}>The following addresses will be used on the checkout page by default.</p>
                      <div className="row">
                        <div className="col-md-6" style={{ marginBottom: "20px" }}>
                          <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "24px", fontWeight: "bold" }}>Billing Address</h3>
                          <address style={{ fontStyle: "normal", color: "#666", marginTop: "10px", lineHeight: "1.6" }}>
                            <strong>{username}</strong><br />
                            123 Main Street<br />
                            Apartment 4B<br />
                            New York, NY 10001<br />
                            United States
                          </address>
                        </div>
                        <div className="col-md-6">
                          <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "24px", fontWeight: "bold" }}>Shipping Address</h3>
                          <address style={{ fontStyle: "normal", color: "#666", marginTop: "10px", lineHeight: "1.6" }}>
                            <strong>{username}</strong><br />
                            123 Main Street<br />
                            Apartment 4B<br />
                            New York, NY 10001<br />
                            United States
                          </address>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDashboardTab === "details" && (
                    <div>
                      <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "25px" }}>Account Details</h2>
                      <form onSubmit={(e) => { e.preventDefault(); alert("Profile updated successfully!"); }}>
                        <div className="row" style={{ marginBottom: "20px" }}>
                          <div className="col-md-6">
                            <label style={{ fontWeight: 600 }}>First Name *</label>
                            <input type="text" defaultValue={username} required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                          </div>
                          <div className="col-md-6">
                            <label style={{ fontWeight: 600 }}>Last Name *</label>
                            <input type="text" defaultValue="" required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                          </div>
                        </div>

                        <div style={{ marginBottom: "30px" }}>
                          <label style={{ fontWeight: 600 }}>Email Address *</label>
                          <input type="email" defaultValue={email} required style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                        </div>

                        <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "28px", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Password Change</h3>

                        <div style={{ marginBottom: "20px" }}>
                          <label style={{ fontWeight: 600 }}>Current Password (leave blank to leave unchanged)</label>
                          <input type="password" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                        </div>
                        <div style={{ marginBottom: "20px" }}>
                          <label style={{ fontWeight: 600 }}>New Password (leave blank to leave unchanged)</label>
                          <input type="password" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                        </div>
                        <div style={{ marginBottom: "30px" }}>
                          <label style={{ fontWeight: 600 }}>Confirm New Password</label>
                          <input type="password" style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} />
                        </div>

                        <button type="submit" style={{ background: "#cb8161", color: "#fff", border: "none", padding: "12px 30px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>Save Changes</button>
                      </form>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
