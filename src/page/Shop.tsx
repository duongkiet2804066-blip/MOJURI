import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { type Product } from "../data/products";

const Shop: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist, addToCompare, setQuickviewProduct, setIsQuickviewOpen, searchQuery, setSearchQuery } = useShop();
  
  const location = useLocation();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Read search or category query from URL if any
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    const searchParam = params.get("search");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }

    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location.search, setSearchQuery]);

  // Categories list
  const categories = ["All", "Earrings", "Rings", "Necklaces", "Bracelets", "Charms"];

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  const handleQuickView = (product: Product) => {
    setQuickviewProduct(product);
    setIsQuickviewOpen(true);
  };

  return (
    <div id="primary" className="content-area">
      {/* Title Header */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Shop Jewelry
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>Shop
          </div>
        </div>
      </div>

      <div className="section-padding">
        <div className="section-container large">
          <div className="row">
            
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-12 sidebar">
              <div className="block block-product-cats style-1" style={{ border: "1px solid #eee", padding: "25px", borderRadius: "8px", marginBottom: "30px" }}>
                <h2 className="widget-title" style={{ fontFamily: "Cormorant Garamond", fontSize: "28px", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "20px" }}>
                  Product Categories
                </h2>
                <ul className="product-categories" style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "2" }}>
                  {categories.map((cat) => (
                    <li 
                      key={cat} 
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        cursor: "pointer", 
                        color: selectedCategory === cat ? "#cb8161" : "#111",
                        fontWeight: selectedCategory === cat ? "bold" : "normal"
                      }}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      <span>{cat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reset Filters */}
              {(selectedCategory !== "All" || searchQuery) && (
                <button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  style={{
                    width: "100%",
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    padding: "12px",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Products Main View */}
            <div className="col-lg-9 col-md-12">
              
              {/* Filter controls / Toolbar */}
              <div className="products-toolbar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "30px", flexWrap: "wrap", gap: "15px" }}>
                <div className="toolbar-left" style={{ color: "#666" }}>
                  Showing all {filteredProducts.length} results
                  {searchQuery && <span> for "{searchQuery}"</span>}
                </div>
                
                <div className="toolbar-right" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  {/* Grid / List toggle */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button 
                      onClick={() => setViewMode("grid")}
                      style={{ background: viewMode === "grid" ? "#cb8161" : "#eee", border: "none", padding: "5px 10px", color: viewMode === "grid" ? "#fff" : "#111", cursor: "pointer" }}
                    >
                      <i className="fa fa-th"></i>
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      style={{ background: viewMode === "list" ? "#cb8161" : "#eee", border: "none", padding: "5px 10px", color: viewMode === "list" ? "#fff" : "#111", cursor: "pointer" }}
                    >
                      <i className="fa fa-list"></i>
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{ padding: "8px 15px", border: "1px solid #ccc", background: "#fff", outline: "none", borderRadius: "4px" }}
                  >
                    <option value="default">Default sorting</option>
                    <option value="rating">Sort by average rating</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                  </select>
                </div>
              </div>

              {filteredProducts.length === 0 ? (
                <div style={{ padding: "60px 0", textAlign: "center" }}>
                  <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px" }}>No Products Found</h3>
                  <p style={{ color: "#666", marginTop: "10px" }}>Try adjusting your search or category filters.</p>
                </div>
              ) : (
                <div className="row">
                  {filteredProducts.map((product) => {
                    const isWish = isInWishlist(product.id);
                    
                    if (viewMode === "list") {
                      return (
                        <div key={product.id} className="col-12" style={{ marginBottom: "30px" }}>
                          <div style={{ display: "flex", gap: "25px", border: "1px solid #eee", padding: "20px", borderRadius: "8px", flexWrap: "wrap" }}>
                            <div style={{ width: "250px", position: "relative" }}>
                              <Link to={`/product/${product.id}`}>
                                <img src={product.image} alt={product.name} style={{ width: "100%", borderRadius: "5px" }} />
                              </Link>
                            </div>
                            <div style={{ flex: 1, minWidth: "250px" }}>
                              <span style={{ fontSize: "12px", textTransform: "uppercase", color: "#cb8161", fontWeight: "bold" }}>{product.category}</span>
                              <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "32px", margin: "10px 0 5px" }}>
                                <Link to={`/product/${product.id}`} style={{ color: "#111" }}>{product.name}</Link>
                              </h2>
                              <div className="star-rating" style={{ marginBottom: "15px" }}>
                                <span style={{ width: `${(product.rating / 5) * 100}%` }}></span>
                              </div>
                              <p style={{ color: "#666", marginBottom: "20px" }}>{product.description}</p>
                              
                              <div style={{ fontSize: "22px", fontWeight: "bold", color: "#cb8161", marginBottom: "20px" }}>
                                {product.oldPrice && <del style={{ color: "#aaa", fontSize: "16px", marginRight: "10px" }}>${product.oldPrice}</del>}
                                ${product.price}
                              </div>

                              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                <button 
                                  onClick={() => addToCart(product, 1)} 
                                  className="button"
                                  style={{ background: "#cb8161", color: "#fff", padding: "10px 25px", border: "none", cursor: "pointer", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px" }}
                                >
                                  Add to cart
                                </button>
                                <button 
                                  onClick={() => toggleWishlist(product)} 
                                  style={{ padding: "10px 15px", background: isWish ? "#cb8161" : "#eee", color: isWish ? "#fff" : "#111", border: "none", cursor: "pointer", borderRadius: "4px" }}
                                >
                                  <i className="icon-heart"></i>
                                </button>
                                <button 
                                  onClick={() => addToCompare(product)} 
                                  style={{ padding: "10px 15px", background: "#eee", border: "none", cursor: "pointer", borderRadius: "4px" }}
                                >
                                  <i className="icon-shuffle"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Grid View
                    return (
                      <div key={product.id} className="col-lg-4 col-md-6 col-sm-6 col-12" style={{ marginBottom: "30px" }}>
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
                                <div className="onsale" style={{ background: "#cb8161", color: "#fff", fontSize: "10px", fontWeight: "bold", padding: "3px 8px" }}>
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
                                  style={{ padding: "8px 12px", background: isWish ? "#cb8161" : "#fff", color: isWish ? "#fff" : "#111" }}
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
                              <span className="price" style={{ color: "#cb8161", fontSize: "16px", fontWeight: "bold" }}>
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
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
