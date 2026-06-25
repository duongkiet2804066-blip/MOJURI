import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const Cart: React.FC = () => {
  const { cartItems, updateCartQty, removeFromCart, clearCart } = useShop();

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingLimit = 400;
  const progressPercent = Math.min((cartTotal / freeShippingLimit) * 100, 100);
  const leftForFreeShipping = freeShippingLimit - cartTotal;

  return (
    <div id="primary" className="content-area">
      {/* Title */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Shopping Cart
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>Shopping Cart
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container large">
            
            {cartItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "20px" }}>Your Cart is Empty</h2>
                <p style={{ color: "#666" }}>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop" className="button btn btn-primary" style={{ marginTop: "20px", display: "inline-block", background: "#111", color: "#fff", padding: "12px 35px", textTransform: "uppercase" }}>
                  Go to Shop
                </Link>
              </div>
            ) : (
              <div className="row">
                {/* Cart Items List */}
                <div className="col-lg-8 col-md-12" style={{ marginBottom: "40px" }}>
                  <table className="shop-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #eee", paddingBottom: "15px", textAlign: "left" }}>
                        <th style={{ padding: "15px 0" }}>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.product.id} style={{ borderBottom: "1px solid #eee" }}>
                          <td style={{ padding: "20px 0", display: "flex", alignItems: "center" }}>
                            <Link to={`/product/${item.product.id}`}>
                              <img src={item.product.image} alt={item.product.name} style={{ width: "80px", borderRadius: "5px", border: "1px solid #eee", marginRight: "20px" }} />
                            </Link>
                            <div>
                              <Link to={`/product/${item.product.id}`} style={{ fontWeight: "bold", color: "#111", fontSize: "16px" }}>
                                {item.product.name}
                              </Link>
                              <div style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>SKU: {item.product.sku}</div>
                            </div>
                          </td>
                          <td>${item.product.price.toFixed(2)}</td>
                          <td>
                            <div className="quantity" style={{ display: "inline-flex", alignItems: "center" }}>
                              <button onClick={() => updateCartQty(item.product.id, item.quantity - 1)} style={{ padding: "5px 10px", border: "1px solid #ccc", background: "#fff" }}>-</button>
                              <input 
                                type="text" 
                                readOnly 
                                value={item.quantity} 
                                style={{ width: "40px", textAlign: "center", borderTop: "1px solid #ccc", borderBottom: "1px solid #ccc", borderLeft: "none", borderRight: "none", height: "30px" }} 
                              />
                              <button onClick={() => updateCartQty(item.product.id, item.quantity + 1)} style={{ padding: "5px 10px", border: "1px solid #ccc", background: "#fff" }}>+</button>
                            </div>
                          </td>
                          <td style={{ fontWeight: "bold", color: "#cb8161" }}>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </td>
                          <td>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              style={{ background: "none", border: "none", color: "#cc0000", fontSize: "18px", cursor: "pointer" }}
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ marginTop: "30px", display: "flex", justifyContent: "space-between" }}>
                    <button 
                      onClick={clearCart}
                      style={{ background: "#eee", border: "none", padding: "10px 25px", cursor: "pointer", textTransform: "uppercase", fontSize: "12px", borderRadius: "4px" }}
                    >
                      Clear Cart
                    </button>
                    <Link 
                      to="/shop" 
                      style={{ background: "#eee", color: "#111", padding: "10px 25px", cursor: "pointer", textTransform: "uppercase", fontSize: "12px", borderRadius: "4px" }}
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </div>

                {/* Cart Totals Summary */}
                <div className="col-lg-4 col-md-12">
                  <div style={{ border: "1px solid #eee", padding: "30px", borderRadius: "8px", background: "#f9f9f9" }}>
                    <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}>
                      Cart Totals
                    </h2>

                    {/* Free shipping bar */}
                    <div style={{ marginBottom: "25px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
                      {leftForFreeShipping > 0 ? (
                        <div style={{ fontSize: "14px", color: "#555" }}>
                          Buy <strong>${leftForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Shipping!</strong>
                        </div>
                      ) : (
                        <div style={{ fontSize: "14px", color: "green", fontWeight: "bold" }}>
                          You have qualified for FREE Shipping!
                        </div>
                      )}
                      <div style={{ background: "#e0e0e0", height: "8px", borderRadius: "10px", overflow: "hidden", marginTop: "10px" }}>
                        <div style={{ width: `${progressPercent}%`, background: "#cb8161", height: "100%", transition: "width 0.3s ease" }}></div>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontSize: "16px" }}>
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "25px", fontSize: "16px" }}>
                      <span>Shipping</span>
                      <span>{leftForFreeShipping <= 0 ? "Free Shipping" : "$15.00"}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px", fontSize: "20px", fontWeight: "bold", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                      <span>Total</span>
                      <span style={{ color: "#cb8161" }}>
                        ${(cartTotal + (leftForFreeShipping <= 0 ? 0 : 15)).toFixed(2)}
                      </span>
                    </div>

                    <Link 
                      to="/checkout"
                      className="button btn checkout btn-default"
                      style={{ display: "block", textAlign: "center", background: "#cb8161", color: "#fff", padding: "15px", textTransform: "uppercase", fontWeight: "bold", fontSize: "14px", borderRadius: "4px", letterSpacing: "1px" }}
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
