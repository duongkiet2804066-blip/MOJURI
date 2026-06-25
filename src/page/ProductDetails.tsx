import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { PRODUCTS, type Product } from "../data/products";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleWishlist, isInWishlist, addToCompare } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  // Find product
  useEffect(() => {
    if (id) {
      const found = PRODUCTS.find((p) => p.id === parseInt(id));
      if (found) {
        setProduct(found);
        setQuantity(1); // reset quantity when product changes
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div style={{ padding: "100px 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "40px" }}>Product Not Found</h2>
        <p style={{ color: "#666", marginTop: "15px" }}>The product you are looking for does not exist or has been removed.</p>
        <Link to="/shop" className="button btn btn-primary" style={{ marginTop: "20px", display: "inline-block" }}>Back to Shop</Link>
      </div>
    );
  }

  // Related products (from same category, excluding current product)
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const isWish = isInWishlist(product.id);

  return (
    <div id="primary" className="content-area">
      {/* Breadcrumbs */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <span className="delimiter"></span>
            <Link to="/shop">Shop</Link>
            <span className="delimiter"></span>
            <Link to={`/shop?category=${product.category}`}>{product.category}</Link>
            <span className="delimiter"></span>
            {product.name}
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container large">
            <div className="product-detail">
              <div className="row m-b-50">
                
                {/* Images */}
                <div className="col-md-6" style={{ marginBottom: "30px" }}>
                  <div className="product-images-slider">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: "100%", borderRadius: "8px", border: "1px solid #eee" }} 
                    />
                    <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                      <img src={product.image} alt={product.name} style={{ width: "80px", border: "1px solid #bfa37a", padding: "2px", borderRadius: "4px" }} />
                      <img src={product.hoverImage} alt={product.name} style={{ width: "80px", border: "1px solid #eee", padding: "2px", borderRadius: "4px" }} />
                    </div>
                  </div>
                </div>

                {/* Info summary */}
                <div className="col-md-6" style={{ paddingLeft: "30px" }}>
                  <div className="quickview-single-info">
                    <div className="product-content-detail entry-summary">
                      <h1 className="product-title entry-title" style={{ fontFamily: "Cormorant Garamond", fontSize: "42px", fontWeight: 700 }}>
                        {product.name}
                      </h1>
                      
                      <div className="product-rating" style={{ margin: "15px 0" }}>
                        <div className="star-rating" role="img">
                          <span style={{ width: `${(product.rating / 5) * 100}%` }}></span>
                        </div>
                        <span className="review-link" style={{ marginLeft: "10px" }}>( {product.reviewsCount} customer review )</span>
                      </div>

                      <div className="price-single" style={{ margin: "20px 0" }}>
                        <div className="price" style={{ fontSize: "28px" }}>
                          {product.oldPrice && (
                            <del style={{ marginRight: "10px", color: "#aaa" }}>
                              <span>${product.oldPrice}</span>
                            </del>
                          )}
                          <span style={{ color: "#bfa37a", fontWeight: "bold" }}>${product.price}</span>
                        </div>
                      </div>

                      <div className="description" style={{ color: "#666", marginBottom: "30px", fontSize: "16px", lineHeight: "1.6" }}>
                        <p>{product.description}</p>
                      </div>

                      <form className="cart" onSubmit={(e) => { e.preventDefault(); addToCart(product, quantity); }}>
                        <div className="quantity-button" style={{ display: "flex", gap: "15px", alignItems: "center", marginBottom: "30px", flexWrap: "wrap" }}>
                          <div className="quantity" style={{ display: "flex", alignItems: "center" }}>
                            <button type="button" className="minus" onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>-</button>
                            <input
                              type="number"
                              className="input-text qty text"
                              value={quantity}
                              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                              style={{ width: "60px", textAlign: "center", border: "1px solid #ccc", height: "45px" }}
                            />
                            <button type="button" className="plus" onClick={() => setQuantity(prev => prev + 1)}>+</button>
                          </div>
                          <button 
                            type="submit" 
                            className="single-add-to-cart-button button alt"
                            style={{ background: "#bfa37a", color: "#fff", height: "45px", padding: "0 35px", border: "none", cursor: "pointer", textTransform: "uppercase", fontWeight: "bold", borderRadius: "4px" }}
                          >
                            Add to cart
                          </button>
                        </div>
                      </form>

                      {/* Action links */}
                      <div style={{ display: "flex", gap: "25px", marginBottom: "30px", borderBottom: "1px solid #eee", paddingBottom: "20px" }}>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                          style={{ color: isWish ? "#bfa37a" : "#111", fontWeight: 600 }}
                        >
                          <i className="icon-heart" style={{ marginRight: "8px" }}></i>
                          {isWish ? "Remove from Wishlist" : "Add to Wishlist"}
                        </a>
                        <a 
                          href="#" 
                          onClick={(e) => { e.preventDefault(); addToCompare(product); }}
                          style={{ color: "#111", fontWeight: 600 }}
                        >
                          <i className="icon-shuffle" style={{ marginRight: "8px" }}></i>
                          Compare this Product
                        </a>
                      </div>

                      {/* Metadata */}
                      <div style={{ fontSize: "14px", color: "#888", display: "grid", gap: "5px" }}>
                        <div>SKU: <strong style={{ color: "#111" }}>{product.sku}</strong></div>
                        <div>Category: <strong style={{ color: "#111" }}>{product.category}</strong></div>
                        <div>Availability: <strong style={{ color: product.inStock ? "green" : "red" }}>{product.inStock ? "In Stock" : "Out of Stock"}</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="product-tabs" style={{ marginBottom: "70px", border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                <div style={{ display: "flex", background: "#f9f9f9", borderBottom: "1px solid #eee" }}>
                  <button 
                    onClick={() => setActiveTab("description")}
                    style={{ 
                      padding: "15px 30px", 
                      border: "none", 
                      background: activeTab === "description" ? "#fff" : "none", 
                      color: activeTab === "description" ? "#bfa37a" : "#666",
                      fontWeight: "bold",
                      borderRight: "1px solid #eee",
                      cursor: "pointer"
                    }}
                  >
                    Description
                  </button>
                  <button 
                    onClick={() => setActiveTab("reviews")}
                    style={{ 
                      padding: "15px 30px", 
                      border: "none", 
                      background: activeTab === "reviews" ? "#fff" : "none", 
                      color: activeTab === "reviews" ? "#bfa37a" : "#666",
                      fontWeight: "bold",
                      cursor: "pointer"
                    }}
                  >
                    Reviews ({product.reviewsCount})
                  </button>
                </div>
                
                <div style={{ padding: "30px", background: "#fff" }}>
                  {activeTab === "description" ? (
                    <div style={{ color: "#555", lineHeight: "1.7" }}>
                      <p>{product.description}</p>
                      <p style={{ marginTop: "15px" }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "24px", marginBottom: "20px" }}>Customer Reviews</h3>
                      <div style={{ display: "grid", gap: "20px" }}>
                        <div style={{ borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <strong>Jane Doe</strong>
                            <span style={{ color: "#bfa37a" }}>★★★★★</span>
                          </div>
                          <div style={{ fontSize: "12px", color: "#999", marginBottom: "10px" }}>June 10, 2026</div>
                          <p style={{ color: "#666" }}>Absolutely stunning! The packaging was gorgeous and the earrings have a premium weight to them. Highly recommend!</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="related-products">
                  <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", borderBottom: "1px solid #eee", paddingBottom: "15px", marginBottom: "30px" }}>
                    Related Products
                  </h2>
                  <div className="row">
                    {relatedProducts.map((p) => (
                      <div key={p.id} className="col-lg-3 col-md-4 col-sm-6 col-12" style={{ marginBottom: "30px" }}>
                        <div className="products-entry clearfix product-wapper" style={{ border: "1px solid #eee", padding: "15px", borderRadius: "8px" }}>
                          <div className="products-thumb" style={{ position: "relative", overflow: "hidden" }}>
                            <Link to={`/product/${p.id}`}>
                              <img src={p.image} alt={p.name} style={{ width: "100%" }} />
                            </Link>
                          </div>
                          <div className="products-content" style={{ marginTop: "15px", textAlign: "center" }}>
                            <h3 style={{ fontFamily: "Cormorant Garamond", fontSize: "18px", fontWeight: 600 }}>
                              <Link to={`/product/${p.id}`} style={{ color: "#111" }}>{p.name}</Link>
                            </h3>
                            <span className="price" style={{ color: "#bfa37a", fontWeight: "bold" }}>${p.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
