import React from "react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

const Wishlist: React.FC = () => {
  const { wishlistItems, toggleWishlist, addToCart } = useShop();

  return (
    <div id="primary" className="content-area">
      {/* Title */}
      <div id="title" className="page-title">
        <div className="section-container">
          <div className="content-title-heading">
            <h1 className="text-title-heading" style={{ fontFamily: "Cormorant Garamond" }}>
              Wishlist
            </h1>
          </div>
          <div className="breadcrumbs">
            <Link to="/">Home</Link><span className="delimiter"></span>Wishlist
          </div>
        </div>
      </div>

      <div id="content" className="site-content" role="main">
        <div className="section-padding">
          <div className="section-container large">
            
            {wishlistItems.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <h2 style={{ fontFamily: "Cormorant Garamond", fontSize: "36px", marginBottom: "20px" }}>Your Wishlist is Empty</h2>
                <p style={{ color: "#666" }}>Add items to your wishlist to keep track of products you love!</p>
                <Link to="/shop" className="button btn btn-primary" style={{ marginTop: "20px", display: "inline-block", background: "#111", color: "#fff", padding: "12px 35px", textTransform: "uppercase" }}>
                  Go to Shop
                </Link>
              </div>
            ) : (
              <table className="shop-table wishlist-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #eee", paddingBottom: "15px", textAlign: "left" }}>
                    <th style={{ padding: "15px 0" }}>Product</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th>Action</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems.map((product) => (
                    <tr key={product.id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "20px 0", display: "flex", alignItems: "center" }}>
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image} alt={product.name} style={{ width: "80px", borderRadius: "5px", border: "1px solid #eee", marginRight: "20px" }} />
                        </Link>
                        <div>
                          <Link to={`/product/${product.id}`} style={{ fontWeight: "bold", color: "#111", fontSize: "16px" }}>
                            {product.name}
                          </Link>
                          <div style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>SKU: {product.sku}</div>
                        </div>
                      </td>
                      <td>
                        {product.oldPrice && <del style={{ color: "#aaa", marginRight: "10px" }}>${product.oldPrice}</del>}
                        <span style={{ fontWeight: "bold", color: "#bfa37a" }}>${product.price}</span>
                      </td>
                      <td>
                        <span style={{ color: product.inStock ? "green" : "red", fontWeight: "bold" }}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => addToCart(product, 1)}
                          disabled={!product.inStock}
                          style={{
                            background: product.inStock ? "#bfa37a" : "#ccc",
                            color: "#fff",
                            border: "none",
                            padding: "8px 20px",
                            textTransform: "uppercase",
                            fontWeight: "bold",
                            fontSize: "12px",
                            borderRadius: "4px",
                            cursor: product.inStock ? "pointer" : "default"
                          }}
                        >
                          Add to Cart
                        </button>
                      </td>
                      <td>
                        <button 
                          onClick={() => toggleWishlist(product)}
                          style={{ background: "none", border: "none", color: "#cc0000", fontSize: "18px", cursor: "pointer" }}
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
