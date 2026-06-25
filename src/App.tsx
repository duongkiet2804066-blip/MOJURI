import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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

// Admin Page Imports
import AdminLayout from "./page/admin/AdminLayout";
import AdminDashboard from "./page/admin/AdminDashboard";
import AdminProducts from "./page/admin/AdminProducts";
import AdminCategories from "./page/admin/AdminCategories";
import AdminOrders from "./page/admin/AdminOrders";
import AdminCustomers from "./page/admin/AdminCustomers";
import AdminUsers from "./page/admin/AdminUsers";
import AdminBlogs from "./page/admin/AdminBlogs";
import AdminBanners from "./page/admin/AdminBanners";
import AdminReviews from "./page/admin/AdminReviews";
import AdminSettings from "./page/admin/AdminSettings";

function RouteBodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/admin")) {
      document.body.className = "admin-body";
    } else if (path === "/") {
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

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div id="page" className={isAdmin ? "admin-root-wrapper" : "hfeed page-wrapper"}>
      {!isAdmin && <Header />}

      <div id="site-main" className={isAdmin ? "admin-site-main" : "site-main"}>
        <div id="main-content" className={isAdmin ? "admin-main-content" : "main-content"}>
          <Routes>
            {/* Storefront Routes */}
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

            {/* Admin Routes */}
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="banners" element={<AdminBanners />} />
              <Route path="reviews" element={<AdminReviews />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </div>
      </div>

      {!isAdmin && <Footer />}
      {!isAdmin && <GlobalOverlays />}
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
        <RouteBodyClassManager />
        <AppContent />
      </BrowserRouter>
    </ShopProvider>
  );
}

export default App;