import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  payment: string;
  status: "Completed" | "Pending" | "Processing" | "Cancelled";
  total: number;
}

interface ShopContextType {
  products: Product[];
  cartItems: CartItem[];
  wishlistItems: Product[];
  compareItems: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  isInCompare: (productId: number) => boolean;
  
  // Overlay controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isQuickviewOpen: boolean;
  setIsQuickviewOpen: (open: boolean) => void;
  quickviewProduct: Product | null;
  setQuickviewProduct: (product: Product | null) => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Search filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Product management
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: number) => void;

  // Order management
  orders: Order[];
  placeOrder: (order: { customer: string; email: string; payment: string; total: number }) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

const INITIAL_ORDERS: Order[] = [
  { id: "ORD-8594", customer: "John Doe", email: "john@example.com", date: "June 25, 2026", payment: "Paid via Credit Card", status: "Completed", total: 100.00 },
  { id: "ORD-8593", customer: "Jane Smith", email: "jane@example.com", date: "June 24, 2026", payment: "Unpaid (Bank Transfer)", status: "Pending", total: 200.00 },
  { id: "ORD-8592", customer: "Michael Brown", email: "michael@example.com", date: "June 24, 2026", payment: "Paid via PayPal", status: "Completed", total: 90.00 },
  { id: "ORD-8591", customer: "Emily Davis", email: "emily@example.com", date: "June 23, 2026", payment: "Refunded", status: "Cancelled", total: 180.00 },
  { id: "ORD-8590", customer: "William Wilson", email: "william@example.com", date: "June 22, 2026", payment: "Paid via Stripe", status: "Completed", total: 300.00 },
  { id: "ORD-8589", customer: "Sarah Jenkins", email: "sarah@example.com", date: "June 20, 2026", payment: "Processing", status: "Processing", total: 120.00 }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mojuri_products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mojuri_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlistItems, setWishlistItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mojuri_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [compareItems, setCompareItems] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mojuri_compare');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mojuri_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Modal open states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuickviewOpen, setIsQuickviewOpen] = useState(false);
  const [quickviewProduct, setQuickviewProduct] = useState<Product | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search query
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('mojuri_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mojuri_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mojuri_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('mojuri_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('mojuri_compare', JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    // Show mini cart overlay automatically
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const addToCompare = (product: Product) => {
    setCompareItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      if (prev.length >= 3) {
        // limit to 3 items
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
    setIsCompareOpen(true);
  };

  const removeFromCompare = (productId: number) => {
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  const isInCompare = (productId: number) => {
    return compareItems.some(item => item.id === productId);
  };

  // Product management actions
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    setCompareItems(prev => prev.filter(item => item.id !== productId));
  };

  // Dynamically resolve items using current product details
  const resolvedCartItems = cartItems
    .map(item => {
      const latestProduct = products.find(p => p.id === item.product.id);
      return latestProduct ? { ...item, product: latestProduct } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const resolvedWishlistItems = wishlistItems
    .map(item => products.find(p => p.id === item.id))
    .filter((item): item is Product => item !== undefined);

  const resolvedCompareItems = compareItems
    .map(item => products.find(p => p.id === item.id))
    .filter((item): item is Product => item !== undefined);

  // Order actions
  const placeOrder = (orderData: { customer: string; email: string; payment: string; total: number }) => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: orderData.customer,
      email: orderData.email,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      payment: orderData.payment,
      status: "Pending",
      total: orderData.total
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems: resolvedCartItems,
        wishlistItems: resolvedWishlistItems,
        compareItems: resolvedCompareItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
        addProduct,
        updateProduct,
        deleteProduct,
        orders,
        placeOrder,
        updateOrderStatus,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isQuickviewOpen,
        setIsQuickviewOpen,
        quickviewProduct,
        setQuickviewProduct,
        isCompareOpen,
        setIsCompareOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
