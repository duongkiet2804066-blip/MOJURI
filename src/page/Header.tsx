import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const Header: React.FC = () => {
  const {
    cartItems,
    wishlistItems,
    setIsCartOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen
  } = useShop();
  
  const location = useLocation();

  // Calculate cart total and count
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isHome = location.pathname === "/";

  return (
    <header 
      id="site-header" 
      className={`site-header header-v1 ${isHome ? "color-white" : ""}`}
    >
      {/* Mobile Header */}
      <div className="header-mobile">
        <div className="section-padding">
          <div className="section-container">
            <div className="row">
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-left">
                <div className="navbar-header">
                  <button 
                    type="button" 
                    id="show-megamenu" 
                    className="navbar-toggle"
                    onClick={() => setIsMobileMenuOpen(true)}
                  ></button>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6 header-center">
                <div className="site-logo">
                  <Link to="/">
                    <img 
                      width="400" 
                      height="79" 
                      src={isHome ? "/media/logo-white.png" : "/media/logo.png"} 
                      alt="Mojuri" 
                    />
                  </Link>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 header-right">
                <div className="mojuri-topcart dropdown">
                  <div className="dropdown mini-cart top-cart">
                    <a 
                      className="dropdown-toggle cart-icon" 
                      href="#" 
                      role="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsCartOpen(true);
                      }}
                    >
                      <div className="icons-cart">
                        <i className="icon-large-paper-bag"></i>
                        <span className="cart-count">{cartCount}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header-mobile-fixed">
          {/* Shop */}
          <div className="shop-page">
            <Link to="/shop"><i className="wpb-icon-shop"></i></Link>
          </div>

          {/* Login */}
          <div className="my-account">
            <div className="login-header">
              <Link to="/my-account"><i className="wpb-icon-user"></i></Link>
            </div>
          </div>

          {/* Search */}
          <div className="search-box">
            <div className="search-toggle" onClick={() => setIsSearchOpen(true)}>
              <i className="wpb-icon-magnifying-glass"></i>
            </div>
          </div>

          {/* Wishlist */}
          <div className="wishlist-box">
            <Link to="/wishlist">
              <i className="wpb-icon-heart"></i>
              {wishlistItems.length > 0 && (
                <span className="count-wishlist" style={{ top: "-5px", right: "-5px", background: "#bfa37a", color: "#fff", borderRadius: "50%", padding: "2px 6px", fontSize: "10px", position: "absolute" }}>
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="header-desktop">
        <div className="header-wrapper">
          <div className="section-padding">
            <div className="section-container large p-l-r">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-left">
                  <div className="site-logo">
                    <Link to="/">
                      <img 
                        width="400" 
                        height="140" 
                        src={isHome ? "/media/logo-white.png" : "/media/logo.png"} 
                        alt="Mojuri" 
                      />
                    </Link>
                  </div>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center header-center">
                  <div className="site-navigation">
                    <nav id="main-navigation">
                      <ul id="menu-main-menu" className="menu">
                        <li className={`level-0 menu-item ${location.pathname === "/" ? "current-menu-item" : ""}`}>
                          <Link to="/"><span className="menu-item-text">Home</span></Link>
                        </li>
                        <li className={`level-0 menu-item ${location.pathname === "/shop" ? "current-menu-item" : ""}`}>
                          <Link to="/shop"><span className="menu-item-text">Shop</span></Link>
                        </li>
                        <li className="level-0 menu-item menu-item-has-children">
                          <a href="#" onClick={(e) => e.preventDefault()}><span className="menu-item-text">Pages</span></a>
                          <ul className="sub-menu">
                            <li><Link to="/my-account"><span className="menu-item-text">Login / Register</span></Link></li>
                            <li><Link to="/my-account"><span className="menu-item-text">My Account</span></Link></li>
                            <li><Link to="/about"><span className="menu-item-text">About Us</span></Link></li>
                            <li><Link to="/contact"><span className="menu-item-text">Contact</span></Link></li>
                            <li><Link to="/faq"><span className="menu-item-text">FAQ</span></Link></li>
                          </ul>
                        </li>
                        <li className={`level-0 menu-item ${location.pathname === "/about" ? "current-menu-item" : ""}`}>
                          <Link to="/about"><span className="menu-item-text">About Us</span></Link>
                        </li>
                        <li className={`level-0 menu-item ${location.pathname === "/contact" ? "current-menu-item" : ""}`}>
                          <Link to="/contact"><span className="menu-item-text">Contact</span></Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 header-right">
                  <div className="header-page-link">
                    {/* Search */}
                    <div className="search-box">
                      <div className="search-toggle" onClick={() => setIsSearchOpen(true)}>
                        <i className="icon-search"></i>
                      </div>
                    </div>

                    {/* Login */}
                    <div className="login-header icon">
                      <Link to="/my-account">
                        <i className="icon-user"></i>
                      </Link>
                    </div>

                    {/* Wishlist */}
                    <div className="wishlist-box">
                      <Link to="/wishlist">
                        <i className="icon-heart"></i>
                        <span className="count-wishlist">{wishlistItems.length}</span>
                      </Link>
                    </div>

                    {/* Cart */}
                    <div className="mojuri-topcart dropdown light">
                      <div className="dropdown mini-cart top-cart">
                        <a 
                          className="dropdown-toggle cart-icon" 
                          href="#" 
                          role="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsCartOpen(true);
                          }}
                        >
                          <div className="icons-cart">
                            <i className="icon-large-paper-bag"></i>
                            <span className="cart-count">{cartCount}</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
