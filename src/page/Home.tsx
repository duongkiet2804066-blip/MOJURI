import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { PRODUCTS, type Product } from "../data/products";

const Home: React.FC = () => {
  const { addToCart, toggleWishlist, isInWishlist, addToCompare, setQuickviewProduct, setIsQuickviewOpen } = useShop();

  // Pure React Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "/media/slider/1-1.jpg",
      title: "Discover a\nworld of jewelry",
      btnText: "Explore Bestseller"
    },
    {
      image: "/media/slider/1-2.jpg",
      title: "Discover the\nBest of the Best",
      btnText: "Explore Bestseller"
    },
    {
      image: "/media/slider/1-3.jpg",
      title: "Oh,\nHello Newness!",
      btnText: "Explore Bestseller"
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    const autoPlay = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(autoPlay);
  }, [slides.length]);


  const trendingProducts = PRODUCTS.slice(0, 4);

  const handleQuickView = (product: Product) => {
    setQuickviewProduct(product);
    setIsQuickviewOpen(true);
  };

  return (
    <div id="primary" className="content-area">
      <div id="content" className="site-content" role="main">
        
        {/* Slider Section */}
        <section className="section m-b-70">
          <div className="hero-slider-wrap" style={{ position: "relative", overflow: "hidden" }}>
            <div
              className="hero-slider-viewport"
              style={{ height: "100vh", minHeight: "550px", position: "relative", overflow: "hidden" }}
            >
              <div
                className="hero-slider-track"
                style={{
                  display: "flex",
                  height: "100%",
                  width: `${slides.length * 100}%`,
                  transform: `translateX(-${currentSlide * (100 / slides.length)}%)`,
                  transition: "transform 0.7s cubic-bezier(0.65, 0, 0.35, 1)"
                }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="hero-slide"
                    style={{
                      position: "relative",
                      width: `${100 / slides.length}%`,
                      height: "100%",
                      flexShrink: 0
                    }}
                  >
                    <div className="item-content" style={{ height: "100%", position: "relative" }}>
                      <div className="content-image" style={{ width: "100%", height: "100%" }}>
                        <img
                          src={slide.image}
                          alt="Slider Image"
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          onError={(e) => {
                            // Fallback màu nền nếu ảnh không load được, để tránh hero trắng trống
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                            const parent = e.currentTarget.parentElement;
                            if (parent) parent.style.background = "#222";
                          }}
                        />
                      </div>
                      <div
                        className="item-info"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          zIndex: 10
                        }}
                      >
                        <div className="content" style={{ paddingLeft: "8%" }}>
                          <h2
                            className="title-slider"
                            style={{
                              whiteSpace: "pre-line",
                              fontFamily: "Cormorant Garamond, serif",
                              lineHeight: "1.1",
                              fontSize: "65px",
                              textTransform: "none",
                              fontWeight: 500,
                              color: "#fff",
                              margin: 0
                            }}
                          >
                            {slide.title}
                          </h2>
                          <Link
                            className="button-slider"
                            to="/shop"
                            style={{
                              marginTop: "25px",
                              display: "inline-block",
                              border: "1px solid #fff",
                              color: "#fff",
                              padding: "13px 30px",
                              textDecoration: "none",
                              letterSpacing: "1px",
                              fontSize: "13px",
                              textTransform: "uppercase",
                              background: "transparent",
                              transition: "background 0.3s ease, border-color 0.3s ease"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#cb8161";
                              e.currentTarget.style.borderColor = "#cb8161";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.borderColor = "#fff";
                            }}
                          >
                            {slide.btnText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider arrows */}
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              style={{
                position: "absolute",
                left: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#fff",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                borderRadius: "50%",
                transition: "background 0.3s, border-color 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.6)",
                color: "#fff",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                borderRadius: "50%",
                transition: "background 0.3s, border-color 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.borderColor = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        {/* Banners Section */}
        <section className="section section-padding m-b-70">
          <div className="section-container large">
            <div className="block block-banners layout-1 banners-effect">
              <div className="block-widget-wrap small-space">
                <div className="row">
                  <div className="col-md-4 section-column left sm-m-b">
                    <div className="block-widget-banner">
                      <div className="bg-banner">
                        <div className="banner-wrapper banners">
                          <div className="banner-image">
                            <Link to="/shop">
                              <img width="630" height="457" src="/media/banner/banner-1-1.jpg" alt="New Arrivals" />
                            </Link>
                          </div>
                          <div className="banner-wrapper-infor">
                            <div className="info">
                              <div className="content">
                                <h3 className="title-banner" style={{ fontFamily: "Cormorant Garamond", fontWeight: 700 }}>New Arrivals</h3>
                                <Link className="button" to="/shop">Shop Now</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 section-column center sm-m-b">
                    <div className="block-widget-banner">
                      <div className="bg-banner">
                        <div className="banner-wrapper banners">
                          <div className="banner-image">
                            <Link to="/shop">
                              <img width="450" height="457" src="/media/banner/banner-1-2.jpg" alt="Best Seller" />
                            </Link>
                          </div>
                          <div className="banner-wrapper-infor text-center">
                            <div className="info">
                              <div className="content">
                                <h3 className="title-banner" style={{ fontFamily: "Cormorant Garamond", fontWeight: 700 }}>Best Seller</h3>
                                <Link className="button center" to="/shop">Shop Now</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 section-column right">
                    <div className="block-widget-banner">
                      <div className="bg-banner">
                        <div className="banner-wrapper banners">
                          <div className="banner-image">
                            <Link to="/shop">
                              <img width="630" height="457" src="/media/banner/banner-1-3.jpg" alt="Clearance Sale" />
                            </Link>
                          </div>
                          <div className="banner-wrapper-infor">
                            <div className="info">
                              <div className="content">
                                <h3 className="title-banner" style={{ fontFamily: "Cormorant Garamond", fontWeight: 700 }}>Clearance Sale</h3>
                                <Link className="button" to="/shop">Shop Now</Link>
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
          </div>
        </section>

        {/* Top Categories */}
        <section className="section section-padding m-b-70">
          <div className="section-container">
            <div className="block block-product-cats slider round-border">
              <div className="block-widget-wrap">
                <div className="block-title"><h2>Top Categories</h2></div>
                <div className="block-content" style={{ padding: "0 15px" }}>
                  <div className="row justify-content-center">
                    {[
                      { name: "Bracelets", img: "/media/product/cat-1.jpg" },
                      { name: "Charms", img: "/media/product/cat-2.jpg" },
                      { name: "Earrings", img: "/media/product/cat-3.jpg" },
                      { name: "Necklaces", img: "/media/product/cat-4.jpg" },
                      { name: "Rings", img: "/media/product/cat-5.jpg" }
                    ].map((cat, i) => (
                      <div key={i} className="col-md-2 col-6 text-center" style={{ margin: "10px 0" }}>
                        <div className="item-product-cat-content">
                          <Link to={`/shop?category=${cat.name}`}>
                            <div className="item-image" style={{ borderRadius: "50%", overflow: "hidden", border: "2px solid #eee", padding: "5px" }}>
                              <img src={cat.img} alt={cat.name} style={{ width: "100%", borderRadius: "50%" }} />
                            </div>
                          </Link>
                          <div className="product-cat-content-info" style={{ marginTop: "15px" }}>
                            <h2 className="item-title" style={{ fontSize: "16px", fontFamily: "Lato", fontWeight: 600 }}>
                              <Link to={`/shop?category=${cat.name}`}>{cat.name}</Link>
                            </h2>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="section m-b-70">
          <div className="row no-gutters" style={{ margin: 0, display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
            {/* Left column - text content */}
            <div
              className="col-md-6 col-12"
              style={{
                background: "#fdf3ec",
                padding: "80px 60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >
              <h2
                className="intro-title"
                style={{
                  color: "#111",
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "40px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "40px",
                  lineHeight: "1.3"
                }}
              >
                Handcrafted <br /> &amp; Ethically Sourced
              </h2>

              <div className="intro-item" style={{ display: "flex", gap: "20px", marginBottom: "30px", alignItems: "flex-start" }}>
                <div
                  className="icon-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    minWidth: "60px",
                    borderRadius: "50%",
                    background: "#e8a978",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                    <path d="M6 3h12l3 6-9 12L3 9l3-6z" strokeLinejoin="round" />
                    <path d="M3 9h18M9 3l3 6-3 12M15 3l-3 6 3 12" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="content">
                  <h3 className="title" style={{ color: "#111", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                    Fair Pricing
                  </h3>
                  <div className="text" style={{ color: "#777", fontSize: "14px", lineHeight: "1.7" }}>
                    We sell directly to you. No middlemen, no retail markups. Just outstanding value on premium artisan-crafted jewelry.
                  </div>
                </div>
              </div>

              <div className="intro-item" style={{ display: "flex", gap: "20px", marginBottom: "40px", alignItems: "flex-start" }}>
                <div
                  className="icon-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    minWidth: "60px",
                    borderRadius: "50%",
                    background: "#e8a978",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M7 13l-2 8 7-3 7 3-2-8" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="content">
                  <h3 className="title" style={{ color: "#111", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                    High Quality
                  </h3>
                  <div className="text" style={{ color: "#777", fontSize: "14px", lineHeight: "1.7" }}>
                    Our pieces are made to last. Using certified sustainable metals and conflict-free gemstones, each item is forged by master smiths.
                  </div>
                </div>
              </div>

              <div className="intro-btn">
                <style>{`
                  @keyframes introBtnShake {
                    0%, 100% { transform: translateX(0); }
                    20% { transform: translateX(-5px); }
                    40% { transform: translateX(5px); }
                    60% { transform: translateX(-3px); }
                    80% { transform: translateX(3px); }
                  }
                  .intro-learnmore-btn {
                    background: #111;
                    transition: background 0.3s ease;
                  }
                  .intro-learnmore-btn:hover {
                    background: #cb8161;
                    animation: introBtnShake 0.5s ease;
                  }
                `}</style>
                <Link
                  to="/about"
                  className="intro-learnmore-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    color: "#fff",
                    padding: "16px 32px",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontSize: "13px",
                    letterSpacing: "1px",
                    fontWeight: 600
                  }}
                >
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right column - image */}
            <div
              className="col-md-6 col-12"
              style={{
                minHeight: "500px",
                backgroundImage: "url('/media/banner/intro-1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            ></div>
          </div>
        </section>

        {/* Trending Products */}
        <section className="section section-padding m-b-70">
          <div className="section-container large">
            <div className="block block-products slider">
              <div className="block-widget-wrap">
                <div className="block-title"><h2>Trending Products</h2></div>
                <div className="block-content">
                  <div className="row">
                    {trendingProducts.map((product) => {
                      const isWish = isInWishlist(product.id);
                      return (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 col-12" style={{ marginBottom: "30px" }}>
                          <div className="products-entry clearfix product-wapper" style={{ border: "1px solid #f2f2f2", padding: "15px", borderRadius: "8px" }}>
                            <div className="products-thumb" style={{ position: "relative", overflow: "hidden" }}>
                              
                              {/* Labels */}
                              {product.isHot && (
                                <div className="product-lable" style={{ position: "absolute", top: "10px", left: "10px", zIndex: 3 }}>
                                  <div className="hot" style={{ background: "#d9534f", color: "#fff", fontSize: "10px", fontWeight: "bold", padding: "3px 8px", textTransform: "uppercase" }}>Hot</div>
                                </div>
                              )}
                              {product.oldPrice && (
                                <div className="product-lable" style={{ position: "absolute", top: "10px", left: "10px", zIndex: 3 }}>
                                  <div className="onsale" style={{ background: "#bfa37a", color: "#fff", fontSize: "10px", fontWeight: "bold", padding: "3px 8px" }}>
                                    -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                                  </div>
                                </div>
                              )}

                              {/* Hover images */}
                              <div className="product-thumb-hover">
                                <Link to={`/product/${product.id}`}>
                                  <img width="600" height="600" src={product.image} className="post-image" alt={product.name} />
                                </Link>
                              </div>

                              {/* Action buttons */}
                              <div className="product-button" style={{ display: "flex", gap: "5px", justifyContent: "center", position: "absolute", bottom: "10px", left: 0, right: 0, opacity: 0, transition: "opacity 0.3s ease", background: "rgba(255,255,255,0.95)", padding: "10px 0" }}>
                                <div className="btn-add-to-cart">
                                  <button onClick={() => addToCart(product, 1)} className="product-btn button" style={{ padding: "8px 12px", fontSize: "12px", border: "none", cursor: "pointer" }}>Add to cart</button>
                                </div>
                                <div className="btn-wishlist">
                                  <button 
                                    className={`product-btn ${isWish ? "active" : ""}`}
                                    onClick={() => toggleWishlist(product)}
                                    style={{ padding: "8px 12px", background: isWish ? "#bfa37a" : "#fff", color: isWish ? "#fff" : "#111" }}
                                  >
                                    <i className="icon-heart"></i>
                                  </button>
                                </div>
                                <div className="btn-compare">
                                  <button onClick={() => addToCompare(product)} className="product-btn" style={{ padding: "8px 12px" }}>
                                    <i className="icon-shuffle"></i>
                                  </button>
                                </div>
                                <span className="product-quickview">
                                  <button onClick={() => handleQuickView(product)} className="quickview quickview-button" style={{ padding: "8px 12px", border: "none", background: "none" }}>
                                    <i className="icon-search"></i>
                                  </button>
                                </span>
                              </div>
                            </div>
                            <div className="products-content" style={{ marginTop: "15px", textAlign: "center" }}>
                              <div className="contents">
                                <h3 className="product-title" style={{ fontSize: "18px", fontFamily: "Cormorant Garamond", fontWeight: 600 }}>
                                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                                </h3>
                                <div className="rating" style={{ margin: "5px 0" }}>
                                  <div className="star-rating" style={{ margin: "0 auto" }}>
                                    <span style={{ width: `${(product.rating / 5) * 100}%` }}></span>
                                  </div>
                                </div>
                                <span className="price" style={{ color: "#bfa37a", fontSize: "16px", fontWeight: "bold" }}>
                                  {product.oldPrice && <del style={{ color: "#aaa", fontSize: "14px", marginRight: "10px" }}>${product.oldPrice}</del>}
                                  ${product.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="section section-padding m-b-70">
          <div className="section-container">
            <div className="block block-newsletter" style={{ background: "#f9f9f9", padding: "60px 30px", borderRadius: "10px", textAlign: "center" }}>
              <div className="newsletter-title-wrap" style={{ marginBottom: "25px" }}>
                <h2 className="newsletter-title" style={{ fontFamily: "Cormorant Garamond", fontSize: "40px", fontWeight: 700 }}>Latest From MoJuri!</h2>
                <div className="newsletter-text" style={{ color: "#666" }}>Sign-up to receive 10% off your next purchase. Plus hear about new arrivals and special offers.</div>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }} className="newsletter-form" style={{ display: "flex", justifyContent: "center", gap: "10px", maxWidth: "600px", margin: "0 auto" }}>
                <input 
                  type="email" 
                  required 
                  placeholder="Your Email address" 
                  style={{ flex: 1, padding: "12px 20px", border: "1px solid #ccc", outline: "none", background: "#fff", borderRadius: "4px" }} 
                />
                <button type="submit" style={{ background: "#bfa37a", color: "#fff", border: "none", padding: "12px 30px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", textTransform: "uppercase" }}>Subscribe</button>
              </form>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="section section-padding top-border p-t-40 p-b-40 m-b-0">
          <div className="section-container">
            <div className="block block-image slider">
              <div className="block-widget-wrap">
                <div className="row justify-content-center align-items-center">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="col-md-2 col-4 text-center">
                      <img 
                        src={`/media/brand/${num}.jpg`} 
                        alt={`Brand ${num}`} 
                        style={{ maxWidth: "120px", opacity: 0.6, transition: "opacity 0.3s" }} 
                        className="hover-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;