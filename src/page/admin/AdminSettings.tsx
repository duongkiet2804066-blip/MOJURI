import React, { useState } from "react";

const AdminSettings: React.FC = () => {
  const [storeName, setStoreName] = useState("MoJuri Premium Jewelry Store");
  const [storeEmail, setStoreEmail] = useState("support@mojuri.com");
  const [currency, setCurrency] = useState("USD");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(400);
  const [seoTitle, setSeoTitle] = useState("MoJuri - Handcrafted Artisan Fine Jewelry");
  const [seoDescription, setSeoDescription] = useState("Discover a world of ethically-sourced fine jewelry. Elegant necklaces, hoops, rings, and charms.");
  
  const [paymentSettings, setPaymentSettings] = useState({
    creditCard: true,
    paypal: true,
    bankTransfer: false
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Settings saved successfully!");
  };

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h3 className="admin-card-title">Global Shop Settings</h3>
      </div>
      <div className="admin-card-body">
        <form onSubmit={handleSave}>
          <div className="row">
            {/* General Settings */}
            <div className="col-md-6" style={{ borderRight: "1px solid #eff2f5", paddingRight: "30px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#181c32", marginBottom: "20px" }}>General Store Information</h4>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Store Name</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Support Email Address</label>
                <input 
                  type="email" 
                  className="admin-form-control" 
                  value={storeEmail}
                  onChange={(e) => setStoreEmail(e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Store Currency</label>
                    <select 
                      className="admin-form-control"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="VND">VND (đ)</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="admin-form-group">
                    <label className="admin-form-label">Free Shipping Limit ($)</label>
                    <input 
                      type="number" 
                      className="admin-form-control"
                      value={freeShippingThreshold}
                      onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Settings */}
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#181c32", marginTop: "30px", marginBottom: "20px" }}>Active Payment Methods</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={paymentSettings.creditCard}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, creditCard: e.target.checked })}
                  />
                  Credit / Debit Card (Stripe)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={paymentSettings.paypal}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, paypal: e.target.checked })}
                  />
                  PayPal Checkout Express
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", cursor: "pointer" }}>
                  <input 
                    type="checkbox" 
                    checked={paymentSettings.bankTransfer}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, bankTransfer: e.target.checked })}
                  />
                  Manual Bank Transfer (Offline)
                </label>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="col-md-6" style={{ paddingLeft: "30px" }}>
              <h4 style={{ fontSize: "16px", fontWeight: 600, color: "#181c32", marginBottom: "20px" }}>SEO & Metatags Configuration</h4>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Homepage Title Tag</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Homepage Meta Description</label>
                <textarea 
                  rows={4}
                  className="admin-form-control" 
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="admin-form-group" style={{ marginTop: "30px" }}>
                <div style={{ backgroundColor: "#f5f8fa", border: "1px solid #e4e6ef", borderRadius: "8px", padding: "15px" }}>
                  <h5 style={{ margin: "0 0 10px 0", color: "#5e6278", fontSize: "13px", fontWeight: 600 }}>Google Search Preview</h5>
                  <div style={{ color: "#1a0dab", fontSize: "18px", textDecoration: "underline", cursor: "pointer", wordBreak: "break-all" }}>{seoTitle}</div>
                  <div style={{ color: "#006621", fontSize: "13px", margin: "2px 0" }}>https://mojuri-seven.vercel.app</div>
                  <p style={{ color: "#545454", fontSize: "13px", margin: 0, lineHeight: "1.4" }}>{seoDescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #eff2f5", marginTop: "30px", paddingTop: "20px", textAlign: "right" }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              Save All Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
