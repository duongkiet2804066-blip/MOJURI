import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const GlobalOverlays: React.FC = () => {
  const {
    cartItems,
    compareItems,
    removeFromCart,
    updateCartQty,
    removeFromCompare,
    addToCart,

    isCartOpen,
    setIsCartOpen,
    isSearchOpen,
    setIsSearchOpen,
    isQuickviewOpen,
    setIsQuickviewOpen,
    quickviewProduct,
    isCompareOpen,
    setIsCompareOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,

    setSearchQuery,
  } = useShop();

  const navigate = useNavigate();
  const [localSearch, setLocalSearch] = useState("");
  const [quickviewQty, setQuickviewQty] = useState(1);

  // Newsletter Popup States
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    const hasSeen = localStorage.getItem("mojuri_newsletter_subscribed") || localStorage.getItem("mojuri_newsletter_closed");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setCouponCode("MOJURI20");
    localStorage.setItem("mojuri_newsletter_subscribed", "true");
  };

  const handleClose = () => {
    setShowNewsletter(false);
    localStorage.setItem("mojuri_newsletter_closed", "true");
  };

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("MOJURI20");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 2000);
  };

  // Cart calculations
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingLimit = 400;
  const progressPercent = Math.min((cartTotal / freeShippingLimit) * 100, 100);
  const leftForFreeShipping = freeShippingLimit - cartTotal;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(localSearch)}`);
  };

  const handleQuickviewAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickviewProduct) {
      addToCart(quickviewProduct, quickviewQty);
      setIsQuickviewOpen(false);
      setQuickviewQty(1);
    }
  };

  return (
    <>
      {/* 1. Search Overlay */}
      <div className={`search-overlay ${isSearchOpen ? "search-active" : ""}`} style={{ display: isSearchOpen ? "block" : "none" }}>
        <div className="close-search" onClick={() => setIsSearchOpen(false)}></div>
        <div className="wrapper-search">
          <form role="search" onSubmit={handleSearchSubmit} className="search-from ajax-search">
            <a href="#" className="search-close" onClick={(e) => { e.preventDefault(); setIsSearchOpen(false); }}></a>
            <div className="search-box">
              <button id="searchsubmit" className="btn" type="submit">
                <i className="icon-search"></i>
              </button>
              <input
                type="text"
                autoComplete="off"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="input-search s"
                placeholder="Search products..."
              />
              <div className="content-menu_search">
                <label>Suggested Categories</label>
                <ul id="menu_search" className="menu">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setLocalSearch("Earrings"); }}>Earrings</a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setLocalSearch("Necklaces"); }}>Necklaces</a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setLocalSearch("Rings"); }}>Rings</a>
                  </li>
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); setLocalSearch("Bracelets"); }}>Bracelets</a>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 2. Cart Side Drawer Overlay */}
      {isCartOpen && (
        <div className="cart-popup-wrap-custom" style={{ position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 999999, pointerEvents: "auto" }}>
          {/* Shadow Overlay */}
          <div 
            className="popup-shadow-custom" 
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0, background: "rgba(0,0,0,0.6)", zIndex: 1, cursor: "pointer", pointerEvents: "auto" }}
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          {/* Side Drawer Content */}
          <div 
            className="cart-popup-content-custom" 
            style={{ 
              position: "absolute", 
              top: 0, 
              right: 0, 
              bottom: 0, 
              width: "400px", 
              maxWidth: "100%", 
              background: "#fff", 
              boxShadow: "-5px 0 15px rgba(0,0,0,0.2)",
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              zIndex: 2,
              pointerEvents: "auto"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
              <h3 style={{ margin: 0, fontFamily: "Cormorant Garamond", fontSize: "28px", fontWeight: 700 }}>Your Cart ({cartCount})</h3>
              <button 
                onClick={() => setIsCartOpen(false)} 
                style={{ background: "none", border: "none", fontSize: "36px", cursor: "pointer", color: "#000", padding: "5px 10px", lineHeight: 1, pointerEvents: "auto" }}
              >
                &times;
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="cart-empty-wrap" style={{ textAlign: "center", margin: "auto" }}>
                <p>No products in the cart.</p>
                <Link 
                  to="/shop" 
                  className="go-shop button btn btn-primary"
                  onClick={() => setIsCartOpen(false)}
                >
                  GO TO SHOP
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", overflowY: "auto" }}>
                <ul className="cart-list" style={{ listStyle: "none", padding: 0, overflowY: "auto", flexGrow: 1 }}>
                  {cartItems.map((item) => (
                    <li 
                      key={item.product.id} 
                      className="mini-cart-item" 
                      style={{ display: "flex", padding: "15px 0", borderBottom: "1px solid #f9f9f9", position: "relative" }}
                    >
                      <a 
                        href="#" 
                        className="remove" 
                        onClick={(e) => { e.preventDefault(); removeFromCart(item.product.id); }}
                        style={{ position: "absolute", right: 0, top: "15px" }}
                      >
                        <i className="icon_close"></i>
                      </a>
                      <Link 
                        to={`/product/${item.product.id}`} 
                        className="product-image"
                        onClick={() => setIsCartOpen(false)}
                        style={{ width: "80px", marginRight: "15px" }}
                      >
                        <img width="80" height="80" src={item.product.image} alt={item.product.name} />
                      </Link>
                      <div>
                        <Link 
                          to={`/product/${item.product.id}`} 
                          className="product-name"
                          onClick={() => setIsCartOpen(false)}
                          style={{ fontWeight: 600, color: "#111", display: "block" }}
                        >
                          {item.product.name}
                        </Link>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                            style={{ width: "25px", height: "25px", border: "1px solid #ccc", background: "#fff" }}
                          >-</button>
                          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                            style={{ width: "25px", height: "25px", border: "1px solid #ccc", background: "#fff" }}
                          >+</button>
                        </div>
                        <div className="price" style={{ marginTop: "5px", color: "#cb8161" }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div style={{ borderTop: "1px solid #eee", paddingTop: "20px", background: "#fff" }}>
                  <div className="total-cart" style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", fontWeight: "bold" }}>
                    <div className="title-total">Total:</div>
                    <div className="total-price">${cartTotal.toFixed(2)}</div>
                  </div>
                  
                  <div className="free-ship" style={{ marginBottom: "20px" }}>
                    {leftForFreeShipping > 0 ? (
                      <div className="title-ship">Buy <strong>${leftForFreeShipping.toFixed(2)}</strong> more to enjoy <strong>FREE Shipping</strong></div>
                    ) : (
                      <div className="title-ship">Congratulations! You've earned <strong>FREE Shipping</strong></div>
                    )}
                    <div className="total-percent" style={{ background: "#eee", borderRadius: "10px", height: "6px", overflow: "hidden", marginTop: "5px" }}>
                      <div className="percent" style={{ width: `${progressPercent}%`, background: "#cb8161", height: "100%" }}></div>
                    </div>
                  </div>

                  <div className="buttons" style={{ display: "flex", gap: "10px" }}>
                    <Link 
                      to="/cart" 
                      className="button btn view-cart btn-primary" 
                      style={{ flex: 1, textAlign: "center", background: "#111", color: "#fff", padding: "12px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}
                      onClick={() => setIsCartOpen(false)}
                    >
                      View Cart
                    </Link>
                    <Link 
                      to="/checkout" 
                      className="button btn checkout btn-default" 
                      style={{ flex: 1, textAlign: "center", background: "#cb8161", color: "#fff", padding: "12px", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}
                      onClick={() => setIsCartOpen(false)}
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Compare popup overlay */}
      {isCompareOpen && (
        <div className="compare-popup open" style={{ display: "block" }}>
          <div className="compare-popup-inner">
            <div className="compare-table">
              <div className="compare-table-inner">
                <a 
                  href="#" 
                  id="compare-table-close" 
                  className="compare-table-close"
                  onClick={(e) => { e.preventDefault(); setIsCompareOpen(false); }}
                >
                  <span className="compare-table-close-icon"></span>
                </a>
                <div className="compare-table-items">
                  {compareItems.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center" }}>No products added to compare.</div>
                  ) : (
                    <table id="product-table" className="product-table">
                      <thead>
                        <tr>
                          <th>Settings</th>
                          {compareItems.map(item => (
                            <th key={item.id}>
                              <Link to={`/product/${item.id}`} onClick={() => setIsCompareOpen(false)}>
                                {item.name}
                              </Link>
                              <span className="remove" onClick={() => removeFromCompare(item.id)}>remove</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr-image">
                          <td className="td-label">Image</td>
                          {compareItems.map(item => (
                            <td key={item.id}>
                              <Link to={`/product/${item.id}`} onClick={() => setIsCompareOpen(false)}>
                                <img width="150" height="150" src={item.image} alt={item.name} />
                              </Link>
                            </td>
                          ))}
                        </tr>
                        <tr className="tr-sku">
                          <td className="td-label">SKU</td>
                          {compareItems.map(item => (
                            <td key={item.id}>{item.sku}</td>
                          ))}
                        </tr>
                        <tr className="tr-rating">
                          <td className="td-label">Rating</td>
                          {compareItems.map(item => (
                            <td key={item.id}>
                              <div className="star-rating">
                                <span style={{ width: `${(item.rating / 5) * 100}%` }}></span>
                              </div>
                            </td>
                          ))}
                        </tr>
                        <tr className="tr-price">
                          <td className="td-label">Price</td>
                          {compareItems.map(item => (
                            <td key={item.id}>
                              {item.oldPrice && <del><span className="amount">${item.oldPrice}</span></del>}
                              {" "}<span className="amount">${item.price}</span>
                            </td>
                          ))}
                        </tr>
                        <tr className="tr-add-to-cart">
                          <td className="td-label">Add to cart</td>
                          {compareItems.map(item => (
                            <td key={item.id}>
                              <button 
                                className="button"
                                onClick={() => {
                                  addToCart(item, 1);
                                  setIsCompareOpen(false);
                                }}
                              >
                                Add to cart
                              </button>
                            </td>
                          ))}
                        </tr>
                        <tr className="tr-description">
                          <td className="td-label">Description</td>
                          {compareItems.map(item => (
                            <td key={item.id}>{item.description}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Quickview Popup Overlay */}
      {isQuickviewOpen && quickviewProduct && (
        <div className="quickview-popup open" style={{ display: "block" }}>
          <div id="quickview-container">
            <div className="quickview-container">
              <a 
                href="#" 
                className="quickview-close"
                onClick={(e) => { e.preventDefault(); setIsQuickviewOpen(false); }}
              ></a>
              <div className="quickview-notices-wrapper"></div>
              <div className="product single-product">
                <div className="product-detail">
                  <div className="row">
                    <div className="col-md-6" style={{ padding: "10px" }}>
                      <div className="product-images-slider">
                        <img 
                          width="100%" 
                          src={quickviewProduct.image} 
                          alt={quickviewProduct.name} 
                          style={{ borderRadius: "5px" }} 
                        />
                      </div>
                    </div>
                    <div className="col-md-6" style={{ padding: "20px 30px" }}>
                      <div className="quickview-single-info">
                        <div className="product-content-detail entry-summary">
                          <h1 className="product-title entry-title">{quickviewProduct.name}</h1>
                          
                          <div className="price-single" style={{ margin: "15px 0" }}>
                            <div className="price" style={{ fontSize: "24px" }}>
                              {quickviewProduct.oldPrice && (
                                <del style={{ marginRight: "10px", color: "#aaa" }}>
                                  <span>${quickviewProduct.oldPrice}</span>
                                </del>
                              )}
                              <span style={{ color: "#cb8161", fontWeight: "bold" }}>${quickviewProduct.price}</span>
                            </div>
                          </div>

                          <div className="product-rating" style={{ marginBottom: "15px" }}>
                            <div className="star-rating" role="img">
                              <span style={{ width: `${(quickviewProduct.rating / 5) * 100}%` }}></span>
                            </div>
                            <span className="review-link" style={{ marginLeft: "10px" }}>( {quickviewProduct.reviewsCount} customer review )</span>
                          </div>

                          <div className="description" style={{ marginBottom: "25px", color: "#666" }}>
                            <p>{quickviewProduct.description}</p>
                          </div>

                          <form className="cart" onSubmit={handleQuickviewAddToCart}>
                            <div className="quantity-button" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                              <div className="quantity" style={{ display: "flex", alignItems: "center" }}>
                                <button type="button" className="minus" onClick={() => setQuickviewQty(prev => Math.max(1, prev - 1))}>-</button>
                                <input
                                  type="number"
                                  className="input-text qty text"
                                  value={quickviewQty}
                                  onChange={(e) => setQuickviewQty(Math.max(1, parseInt(e.target.value) || 1))}
                                  style={{ width: "50px", textAlign: "center", border: "1px solid #ccc", height: "40px" }}
                                />
                                <button type="button" className="plus" onClick={() => setQuickviewQty(prev => prev + 1)}>+</button>
                              </div>
                              <button 
                                type="submit" 
                                className="single-add-to-cart-button button alt"
                                style={{ background: "#cb8161", color: "#fff", height: "40px", padding: "0 30px", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                              >
                                Add to cart
                              </button>
                            </div>
                          </form>

                          <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px", fontSize: "13px", color: "#888" }}>
                            <div>SKU: <strong style={{ color: "#111" }}>{quickviewProduct.sku}</strong></div>
                            <div>Category: <strong style={{ color: "#111" }}>{quickviewProduct.category}</strong></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Mobile Navigation Sidebar Drawer */}
      {isMobileMenuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, right: 0, zIndex: 99999 }}>
          {/* Shadow Overlay */}
          <div 
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)" }}
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          {/* Sidebar Menu */}
          <div 
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              bottom: 0, 
              width: "300px", 
              background: "#fff", 
              boxShadow: "5px 0 15px rgba(0,0,0,0.1)",
              padding: "30px 20px" 
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
              <h3 style={{ margin: 0, fontFamily: "Cormorant Garamond", fontSize: "28px" }}>Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>
            
            <nav>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "16px", lineHeight: "2.5" }}>
                <li>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>Home</Link>
                </li>
                <li>
                  <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#cb8161", fontWeight: 700 }}>Admin Dashboard</Link>
                </li>
                <li>
                  <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>Shop</Link>
                </li>
                <li>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>About Us</Link>
                </li>
                <li>
                  <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>Contact</Link>
                </li>
                <li>
                  <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>FAQ</Link>
                </li>
                <li>
                  <Link to="/my-account" onClick={() => setIsMobileMenuOpen(false)} style={{ color: "#111", fontWeight: 600 }}>My Account</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* 6. Newsletter Discount Coupon Popup */}
      {showNewsletter && (
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
          zIndex: 9999999,
          padding: "20px"
        }}>
          <style>{`
            @keyframes popupFadeIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            @media (min-width: 768px) {
              .newsletter-img-desktop {
                display: block !important;
              }
            }
          `}</style>
          
          {/* Click outside to close */}
          <div 
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            onClick={handleClose}
          ></div>

          <div style={{
            position: "relative",
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "750px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
            display: "flex",
            overflow: "hidden",
            animation: "popupFadeIn 0.4s ease-out",
            zIndex: 10
          }}>
            {/* Close button inside modal card */}
            <button 
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "rgba(255,255,255,0.8)",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#111",
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#cb8161"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.color = "#111"; }}
            >
              &times;
            </button>

            {/* Left side Image - using public newsletter image */}
            <div 
              className="newsletter-img-desktop"
              style={{
                flex: "1",
                backgroundImage: "url('/media/banner/newsletter-popup.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "380px",
                display: "none"
              }}
            ></div>

            {/* Right side Content */}
            <div style={{
              flex: "1.2",
              padding: "45px 35px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              background: "#fff"
            }}>
              {!couponCode ? (
                <>
                  <h4 style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#cb8161",
                    margin: "0 0 10px 0",
                    fontWeight: 700
                  }}>
                    Special Offer
                  </h4>
                  <h3 style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "32px",
                    lineHeight: "1.2",
                    margin: "0 0 15px 0",
                    fontWeight: 600,
                    color: "#111"
                  }}>
                    Get 20% Off Your Purchase
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    margin: "0 0 25px 0"
                  }}>
                    Subscribe to the MoJuri mailing list to receive exclusive coupons, new collections launch updates, and get <strong>20% off</strong> your next order.
                  </p>

                  <form onSubmit={handleSubscribe}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <input 
                        type="email" 
                        required
                        placeholder="Your email address..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          padding: "12px 15px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "14px",
                          outline: "none"
                        }}
                      />
                      <button 
                        type="submit"
                        style={{
                          background: "#111",
                          color: "#fff",
                          border: "none",
                          padding: "12px 20px",
                          textTransform: "uppercase",
                          fontWeight: "bold",
                          fontSize: "13px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          letterSpacing: "1px",
                          transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#cb8161"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "#111"; }}
                      >
                        Subscribe & Get Discount
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "50px", color: "#cb8161", marginBottom: "15px" }}>🎁</div>
                  <h3 style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "28px",
                    lineHeight: "1.2",
                    margin: "0 0 10px 0",
                    fontWeight: 600,
                    color: "#111"
                  }}>
                    Thank You for Subscribing!
                  </h3>
                  <p style={{
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.6",
                    margin: "0 0 20px 0"
                  }}>
                    Use the coupon code below at checkout to receive <strong>20% discount</strong> on your order total:
                  </p>

                  <div style={{
                    background: "#fdf3ec",
                    border: "2px dashed #cb8161",
                    padding: "12px",
                    borderRadius: "6px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    color: "#cb8161",
                    fontFamily: "monospace",
                    marginBottom: "15px"
                  }}>
                    {couponCode}
                  </div>

                  <button 
                    onClick={handleCopyCoupon}
                    style={{
                      background: copySuccess ? "#50cd89" : "#111",
                      color: "#fff",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      width: "100%",
                      marginBottom: "15px",
                      transition: "background 0.2s"
                    }}
                  >
                    {copySuccess ? "Copied Successfully!" : "Copy Code"}
                  </button>

                  <button 
                    onClick={handleClose}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#666",
                      cursor: "pointer",
                      fontSize: "13px",
                      textDecoration: "underline"
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalOverlays;
