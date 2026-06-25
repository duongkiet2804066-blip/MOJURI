import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Product, PRODUCTS } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
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
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
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

  return (
    <ShopContext.Provider
      value={{
        products,
        cartItems,
        wishlistItems,
        compareItems,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare,
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
