import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

import Header from "./page/Header";
import Footer from "./page/Footer";
import GlobalOverlays from "./page/GlobalOverlays";

import Home from "./page/Home";
import Contact from "./page/Contact";
import Shop from "./page/Shop";
import ProductDetails from "./page/ProductDetails";
import Cart from "./page/Cart";
import Checkout from "./page/Checkout";
import Wishlist from "./page/Wishlist";
import About from "./page/About";
import FAQ from "./page/FAQ";
import MyAccount from "./page/MyAccount";

function RouteBodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/") {
      document.body.className = "home";
    } else if (
      path === "/shop" ||
      path.startsWith("/product/") ||
      path === "/cart" ||
      path === "/checkout" ||
      path === "/wishlist"
    ) {
      document.body.className = "shop";
    } else {
      document.body.className = "page";
    }
  }, [location]);

  return null;
}

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <RouteBodyClassManager />
        <div id="page" className="hfeed page-wrapper">
          <Header />

          <div id="site-main" className="site-main">
            <div id="main-content" className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/my-account" element={<MyAccount />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>

        <GlobalOverlays />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;