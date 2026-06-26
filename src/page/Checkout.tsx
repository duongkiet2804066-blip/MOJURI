import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const Checkout: React.FC = () => {
  const { cartItems, clearCart, placeOrder } = useShop();

  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "US",
    address: "",
    city: "",
    postcode: "",
    phone: "",
    notes: ""
  });
  
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Coupon States
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = cartTotal >= 400 ? 0 : 15;
  const grandTotal = Math.max(0, cartTotal - couponDiscount + shippingFee);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (code === "MOJURI20") {
      setAppliedCoupon("MOJURI20");
      setCouponDiscount(cartTotal * 0.20);
      setCouponError("");
    } else if (code === "") {
      setCouponError("Please enter a coupon code.");
    } else {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon(null);
      setCouponDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponInput("");
    setCouponError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || !billingInfo.address || !billingInfo.city || !billingInfo.phone) {
      alert("Please fill in all required billing information.");
      return;
    }

    const customerName = `${billingInfo.firstName} ${billingInfo.lastName}`;
    const couponLabel = appliedCoupon ? ` (Applied Coupon: ${appliedCoupon})` : "";
    const paymentLabel = (paymentMethod === "bank" ? "Direct Bank Transfer" : paymentMethod === "paypal" ? "PayPal" : "Cash on Delivery (COD)") + couponLabel;
    
    placeOrder({
      customer: customerName,
      email: billingInfo.email,
      payment: paymentLabel,
      total: grandTotal,
      phone: billingInfo.phone,
      address: billingInfo.address,
      city: billingInfo.city,
      country: billingInfo.country,
      postcode: billingInfo.postcode,
      notes: billingInfo.notes,
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity
      }))
    });

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ fontSize: "70px", color: "#cb8161", marginBottom: "20px" }}>✓</div>
        <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "40px", fontWeight: 700 }}>Thank You for Your Order!</h2>
        <p style={{ color: "#666", marginTop: "15px", fontSize: "16px", lineHeight: "1.6" }}>
          Your order has been placed successfully. We have sent a confirmation email containing details of your order.
        </p>
        <Link 
          to="/shop" 
          className="button"
          style={{ background: "#cb8161", color: "#fff", display: "inline-block", padding: "12px 30px", marginTop: "30px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px" }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div id="primary" className="content-area">
      {/* Title */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Checkout
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>Checkout
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container large">
            
            {cartItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", marginBottom: "20px" }}>No items in Cart</h2>
                <Link to="/shop" className="button btn btn-primary" style={{ padding: "12px 30px", textTransform: "uppercase" }}>Return to Shop</Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row">
                  
                  {/* Billing Details */}
                  <div className="col-lg-7 col-md-12" style={{ marginBottom: "40px" }}>
                    <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "25px" }}>
                      Billing Details
                    </h3>
                    
                    <div className="row">
                      <div className="col-md-6" style={{ marginBottom: "20px" }}>
                        <label className="required" style={{ fontWeight: 600 }}>First Name *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.firstName}
                          onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                        />
                      </div>
                      <div className="col-md-6" style={{ marginBottom: "20px" }}>
                        <label className="required" style={{ fontWeight: 600 }}>Last Name *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.lastName}
                          onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Country / Region *</label>
                      <select
                        value={billingInfo.country}
                        onChange={(e) => setBillingInfo({ ...billingInfo, country: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", background: "#fff", marginTop: "5px" }}
                      >
                        <option value="US">United States (US)</option>
                        <option value="UK">United Kingdom (UK)</option>
                        <option value="VN">Vietnam (VN)</option>
                        <option value="CA">Canada (CA)</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label className="required" style={{ fontWeight: 600 }}>Street address *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="House number and street name"
                        value={billingInfo.address}
                        onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label className="required" style={{ fontWeight: 600 }}>Town / City *</label>
                      <input 
                        type="text" 
                        required
                        value={billingInfo.city}
                        onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Postcode / ZIP</label>
                      <input 
                        type="text" 
                        value={billingInfo.postcode}
                        onChange={(e) => setBillingInfo({ ...billingInfo, postcode: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                      />
                    </div>

                    <div className="row">
                      <div className="col-md-6" style={{ marginBottom: "20px" }}>
                        <label className="required" style={{ fontWeight: 600 }}>Phone *</label>
                        <input 
                          type="text" 
                          required
                          value={billingInfo.phone}
                          onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                        />
                      </div>
                      <div className="col-md-6" style={{ marginBottom: "20px" }}>
                        <label className="required" style={{ fontWeight: 600 }}>Email Address *</label>
                        <input 
                          type="email" 
                          required
                          value={billingInfo.email}
                          onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                          style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }} 
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ fontWeight: 600 }}>Order Notes (optional)</label>
                      <textarea 
                        rows={4}
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={billingInfo.notes}
                        onChange={(e) => setBillingInfo({ ...billingInfo, notes: e.target.value })}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", marginTop: "5px" }}
                      ></textarea>
                    </div>
                  </div>

                  {/* Order Summary & Payment */}
                  <div className="col-lg-5 col-md-12">
                    <div style={{ border: "2px solid #111", padding: "30px", borderRadius: "8px", background: "#fff" }}>
                      <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "25px" }}>
                        Your Order
                      </h3>

                      {/* Products break-down */}
                      <table style={{ width: "100%", marginBottom: "25px", borderBottom: "1px solid #eee" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", textAlign: "left", color: "#666" }}>
                            <th style={{ paddingBottom: "10px" }}>Product</th>
                            <th style={{ textAlign: "right", paddingBottom: "10px" }}>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map(item => (
                            <tr key={item.product.id} style={{ borderBottom: "1px solid #f9f9f9" }}>
                              <td style={{ padding: "12px 0", color: "#555" }}>
                                {item.product.name} <strong style={{ color: "#111" }}>&times; {item.quantity}</strong>
                              </td>
                              <td style={{ textAlign: "right", fontWeight: "bold" }}>
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Coupon input form block */}
                      <div style={{ padding: "15px 0", borderBottom: "1px solid #eee", marginBottom: "15px" }}>
                        <div style={{ display: "flex", gap: "10px" }}>
                          <input 
                            type="text" 
                            placeholder="Coupon code (e.g. MOJURI20)" 
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            style={{ flex: 1, padding: "8px 10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "13px" }}
                          />
                          <button 
                            type="button"
                            onClick={handleApplyCoupon}
                            style={{ background: "#111", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "4px", fontSize: "12px", textTransform: "uppercase", fontWeight: "bold", cursor: "pointer", transition: "background 0.2s" }}
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && <p style={{ color: "#f1416c", fontSize: "12px", margin: "5px 0 0 0" }}>{couponError}</p>}
                        {appliedCoupon && (
                          <p style={{ color: "#50cd89", fontSize: "12px", margin: "5px 0 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Code <strong>{appliedCoupon}</strong> applied (20% Off)!</span>
                            <button 
                              type="button" 
                              onClick={handleRemoveCoupon} 
                              style={{ background: "none", border: "none", color: "#f1416c", cursor: "pointer", textDecoration: "underline", padding: 0 }}
                            >
                              Remove
                            </button>
                          </p>
                        )}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span>Subtotal</span>
                        <span style={{ fontWeight: "bold" }}>${cartTotal.toFixed(2)}</span>
                      </div>

                      {couponDiscount > 0 && (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#50cd89", fontWeight: "bold" }}>
                          <span>Discount (20%)</span>
                          <span>-${couponDiscount.toFixed(2)}</span>
                        </div>
                      )}

                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                        <span>Shipping</span>
                        <span style={{ fontWeight: "bold" }}>{shippingFee === 0 ? "Free Shipping" : `$${shippingFee.toFixed(2)}`}</span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "20px", fontWeight: "bold", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                        <span>Total</span>
                        <span style={{ color: "#cb8161" }}>${grandTotal.toFixed(2)}</span>
                      </div>

                      {/* Payment Methods */}
                      <div style={{ marginBottom: "30px", background: "#f9f9f9", padding: "20px", borderRadius: "6px" }}>
                        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                          <input 
                            type="radio" 
                            id="bank" 
                            name="payment" 
                            value="bank" 
                            checked={paymentMethod === "bank"}
                            onChange={() => setPaymentMethod("bank")}
                          />
                          <label htmlFor="bank" style={{ fontWeight: "bold", cursor: "pointer" }}>Direct Bank Transfer</label>
                        </div>
                        {paymentMethod === "bank" && (
                          <p style={{ fontSize: "13px", color: "#666", paddingLeft: "25px", marginBottom: "20px" }}>
                            Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                          </p>
                        )}

                        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                          <input 
                            type="radio" 
                            id="cod" 
                            name="payment" 
                            value="cod" 
                            checked={paymentMethod === "cod"}
                            onChange={() => setPaymentMethod("cod")}
                          />
                          <label htmlFor="cod" style={{ fontWeight: "bold", cursor: "pointer" }}>Cash on Delivery (COD)</label>
                        </div>
                        {paymentMethod === "cod" && (
                          <p style={{ fontSize: "13px", color: "#666", paddingLeft: "25px", marginBottom: "20px" }}>
                            Pay with cash upon delivery of your products.
                          </p>
                        )}

                        <div style={{ display: "flex", gap: "10px" }}>
                          <input 
                            type="radio" 
                            id="paypal" 
                            name="payment" 
                            value="paypal" 
                            checked={paymentMethod === "paypal"}
                            onChange={() => setPaymentMethod("paypal")}
                          />
                          <label htmlFor="paypal" style={{ fontWeight: "bold", cursor: "pointer" }}>PayPal</label>
                        </div>
                        {paymentMethod === "paypal" && (
                          <p style={{ fontSize: "13px", color: "#666", paddingLeft: "25px", marginTop: "10px" }}>
                            Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.
                          </p>
                        )}
                      </div>

                      <button 
                        type="submit"
                        style={{ width: "100%", background: "#cb8161", color: "#fff", border: "none", padding: "15px", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", letterSpacing: "1px" }}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>

                </div>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
