import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Applied Coupon / Reward
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Saved for later items
  const [savedItems, setSavedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_saved');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Indian User state with automatic localStorage migration
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_user_v2') || localStorage.getItem('amz_in_user') || localStorage.getItem('amz_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.name || parsed.name === 'Rahul Sharma' || parsed.name === 'Alex Johnson') {
          parsed.name = 'Yeshwanth Sunkara';
          parsed.email = 'yeshwanth.sunkara@example.in';
          if (parsed.address) parsed.address.name = 'Yeshwanth Sunkara';
        }
        localStorage.setItem('amz_in_user_v2', JSON.stringify(parsed));
        return parsed;
      }
      return {
        isLoggedIn: true,
        name: 'Yeshwanth Sunkara',
        email: 'yeshwanth.sunkara@example.in',
        isPrime: true,
        language: 'EN', // 'EN' | 'HI'
        address: {
          name: 'Yeshwanth Sunkara',
          street: 'Flat 402, Prestige Palms, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          zip: '560038',
          country: 'India'
        }
      };
    } catch {
      return {
        isLoggedIn: true,
        name: 'Yeshwanth Sunkara',
        email: 'yeshwanth.sunkara@example.in',
        isPrime: true,
        language: 'EN',
        address: {
          name: 'Yeshwanth Sunkara',
          street: 'Flat 402, Prestige Palms, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          zip: '560038',
          country: 'India'
        }
      };
    }
  });

  // Order history
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('amz_in_orders');
      if (saved) return JSON.parse(saved);
      // Sample Indian Order
      return [
        {
          id: 'AMZ-IN-9482-3819',
          date: 'Sep 29, 2026',
          status: 'Delivered',
          total: 2499,
          items: [
            {
              id: 'prod-2',
              title: 'boAt Nirvana Ion ANC True Wireless Earbuds',
              price: 2499,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop'
            }
          ],
          trackingNumber: 'DELHIVERY-7391048291',
          deliveryAddress: 'Indiranagar, Bengaluru, Karnataka 560038'
        }
      ];
    } catch {
      return [];
    }
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [primeOnly, setPrimeOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200000 });
  const [sortBy, setSortBy] = useState('featured');
  const [currentView, setCurrentView] = useState('home'); // 'home', 'deals', 'orders', 'wishlist', 'search'

  // Modals & UI Controls
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isPrimeModalOpen, setIsPrimeModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);

  // Toast Notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('amz_in_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amz_in_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  useEffect(() => {
    localStorage.setItem('amz_in_saved', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem('amz_in_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('amz_in_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('amz_in_user_v2', JSON.stringify(user));
      localStorage.removeItem('amz_in_user');
      localStorage.removeItem('amz_user');
    } else {
      localStorage.removeItem('amz_in_user_v2');
      localStorage.removeItem('amz_in_user');
      localStorage.removeItem('amz_user');
    }
  }, [user]);

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity, options }];
    });
    showToast(`Added "${product.title.slice(0, 30)}..." to your Cart`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCouponCode = (code, couponData) => {
    setAppliedCoupon({ code, ...couponData });
    showToast(`Coupon "${code}" applied successfully!`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const saveForLater = (product) => {
    removeFromCart(product.id);
    setSavedItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
    showToast('Saved for later', 'info');
  };

  const moveToCartFromSaved = (product) => {
    setSavedItems(prev => prev.filter(item => item.id !== product.id));
    addToCart(product, 1);
  };

  const removeSavedItem = (productId) => {
    setSavedItems(prev => prev.filter(item => item.id !== productId));
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast('Added to your Wishlist');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Quick View / Product Detail
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
    setIsDetailOpen(false);
  };

  // Calculations in INR
  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'discount') {
      discountAmount = (rawSubtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'cashback') {
      discountAmount = Math.min(rawSubtotal, appliedCoupon.value);
    }
  }

  const cartSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 499;
  const eligibleForFreeShipping = user?.isPrime || rawSubtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  // Place Order
  const placeOrder = (paymentDetails, shippingAddress) => {
    const newOrder = {
      id: `AMZ-IN-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Ordered',
      total: cartSubtotal,
      items: [...cart],
      trackingNumber: `AMZL-IN-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      deliveryAddress: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}`,
      paymentMethod: paymentDetails.method
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  // Filtered Products
  const filteredProducts = PRODUCTS.filter(product => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = product.title.toLowerCase().includes(q);
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesBrand = product.brand.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesDesc && !matchesBrand && !matchesCategory) {
        return false;
      }
    }

    if (selectedCategory !== 'All Categories') {
      if (selectedCategory === 'Prime Deals') {
        if (!product.isPrime || !(product.badge || product.originalPrice > product.price)) return false;
      } else if (product.category !== selectedCategory) {
        return false;
      }
    }

    if (primeOnly && !product.isPrime) return false;
    if (product.price < priceRange.min || product.price > priceRange.max) return false;
    if (product.rating < minRating) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
    return 0;
  });

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        filteredProducts,
        cart,
        savedItems,
        wishlist,
        user,
        orders,
        toast,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,
        rawSubtotal,
        discountAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        saveForLater,
        moveToCartFromSaved,
        removeSavedItem,
        cartSubtotal,
        cartTotalItems,
        eligibleForFreeShipping,
        amountNeededForFreeShipping,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        selectedProduct,
        isDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrdersOpen,
        setIsOrdersOpen,
        isPrimeModalOpen,
        setIsPrimeModalOpen,
        isDrawerOpen,
        setIsDrawerOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isSpinModalOpen,
        setIsSpinModalOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        primeOnly,
        setPrimeOnly,
        minRating,
        setMinRating,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        currentView,
        setCurrentView,
        setUser,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
