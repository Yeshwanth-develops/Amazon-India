import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  MapPin, 
  Menu, 
  ChevronDown, 
  Heart, 
  Package, 
  User, 
  Sparkles,
  X,
  Gift,
  Tv,
  CreditCard
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/products';

export const Navbar = () => {
  const {
    cartTotalItems,
    setIsCartOpen,
    user,
    setUser,
    setIsAuthOpen,
    setIsOrdersOpen,
    setIsPrimeModalOpen,
    setIsDrawerOpen,
    setIsAddressModalOpen,
    setIsSpinModalOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    setCurrentView,
    wishlist,
    showToast
  } = useShop();

  const [isAccountHovered, setIsAccountHovered] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setCurrentView('search');
  };

  const clearSearch = () => {
    setLocalSearch('');
    setSearchQuery('');
  };

  const toggleLanguage = () => {
    const nextLang = user?.language === 'HI' ? 'EN' : 'HI';
    if (user) {
      setUser({ ...user, language: nextLang });
    }
    showToast(`Language switched to ${nextLang === 'HI' ? 'हिन्दी (Hindi)' : 'English'}`);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900 }}>
      
      {/* Great Indian Festival Top Notification Banner */}
      <div 
        onClick={() => setIsSpinModalOpen(true)}
        style={{
          background: 'linear-gradient(90deg, #b31217 0%, #e52d27 50%, #ff9900 100%)',
          color: '#ffffff',
          padding: '6px 16px',
          fontSize: '12.5px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: 'pointer',
          letterSpacing: '0.3px',
          borderBottom: '1px solid #febd69'
        }}
      >
        <span style={{ fontSize: '14px' }}>🪔</span>
        <span>GREAT INDIAN FESTIVAL: 10% Instant Discount on SBI & HDFC Bank Cards | Free Delivery on 1st Order</span>
        <span style={{ backgroundColor: '#febd69', color: '#111', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} /> Spin & Win Lucky Wheel
        </span>
      </div>

      {/* Top Navbar */}
      <div 
        style={{
          backgroundColor: '#131921',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '6px 14px',
          gap: '12px',
          minHeight: '60px',
          fontSize: '14px'
        }}
      >
        {/* Amazon.in Logo */}
        <div 
          onClick={() => {
            setCurrentView('home');
            setSearchQuery('');
            setSelectedCategory('All Categories');
          }}
          style={{
            cursor: 'pointer',
            padding: '6px 8px',
            border: '1px solid transparent',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '-0.8px', fontFamily: 'var(--font-heading)' }}>
                amazon
              </span>
              <span style={{ fontSize: '14px', color: '#febd69', fontWeight: '800', marginLeft: '1px' }}>.in</span>
            </div>
            {/* Smile Arrow SVG */}
            <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ marginTop: '-3px' }}>
              <path 
                d="M2 3C14 10 36 11 54 4" 
                stroke="#ff9900" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              <path 
                d="M50 3L56 4L54 8" 
                stroke="#ff9900" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Deliver To Indian Address */}
        <div 
          onClick={() => setIsAddressModalOpen(true)}
          style={{
            cursor: 'pointer',
            padding: '6px 8px',
            border: '1px solid transparent',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <MapPin size={18} color="#ffffff" style={{ marginTop: '4px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '11.5px', color: '#cccccc' }}>
              Deliver to {user?.name ? user.name.split(' ')[0] : 'Bengaluru'}
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: '700', whiteSpace: 'nowrap' }}>
              {user?.address?.city || 'Bengaluru'} {user?.address?.zip || '560038'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearchSubmit}
          style={{
            flex: 1,
            display: 'flex',
            height: '40px',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
            border: '2px solid transparent',
            transition: 'border-color 0.2s ease'
          }}
          onFocus={(e) => e.currentTarget.style.borderColor = '#ff9900'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          {/* Category Select */}
          <select 
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentView('search');
            }}
            style={{
              backgroundColor: '#f3f3f3',
              border: 'none',
              borderRight: '1px solid #cdcdcd',
              padding: '0 10px',
              fontSize: '12px',
              color: '#333333',
              cursor: 'pointer',
              outline: 'none',
              maxWidth: '140px'
            }}
          >
            {CATEGORIES_LIST.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Search Input */}
          <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input 
              type="text"
              placeholder="Search Amazon.in (e.g. OnePlus 12, boAt, Manyavar, Prestige, Kindle)"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                padding: '0 32px 0 12px',
                fontSize: '14px',
                outline: 'none',
                color: '#0f1111'
              }}
            />
            {localSearch && (
              <button
                type="button"
                onClick={clearSearch}
                style={{
                  position: 'absolute',
                  right: '6px',
                  background: 'transparent',
                  color: '#767676',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            style={{
              backgroundColor: '#febd69',
              border: 'none',
              width: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3a847'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#febd69'}
          >
            <Search size={20} color="#131921" />
          </button>
        </form>

        {/* Indian Flag & Language Toggle */}
        <div 
          onClick={toggleLanguage}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 6px',
            cursor: 'pointer',
            border: '1px solid transparent',
            borderRadius: '2px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <span style={{ fontSize: '16px' }}>🇮🇳</span>
          <span style={{ fontSize: '13px', fontWeight: '700' }}>
            {user?.language === 'HI' ? 'हिन्दी' : 'EN'}
          </span>
          <ChevronDown size={12} color="#a7acb2" />
        </div>

        {/* Account & Lists */}
        <div 
          style={{ position: 'relative' }}
          onMouseEnter={() => setIsAccountHovered(true)}
          onMouseLeave={() => setIsAccountHovered(false)}
        >
          <div 
            onClick={() => setIsAuthOpen(true)}
            style={{
              cursor: 'pointer',
              padding: '6px 8px',
              border: '1px solid transparent',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.2
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            <span style={{ fontSize: '11.5px', color: '#cccccc' }}>
              Hello, {user?.name ? user.name.split(' ')[0] : 'Sign in'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '13.5px', fontWeight: '700' }}>Account & Lists</span>
              <ChevronDown size={12} color="#a7acb2" />
            </div>
          </div>

          {/* Account Dropdown */}
          {isAccountHovered && (
            <div 
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '280px',
                backgroundColor: '#ffffff',
                color: '#0f1111',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                borderRadius: '4px',
                padding: '16px',
                zIndex: 1001,
                border: '1px solid #d5d9d9',
                marginTop: '2px'
              }}
            >
              {!user ? (
                <div style={{ textAlign: 'center', borderBottom: '1px solid #e7e7e7', paddingBottom: '14px' }}>
                  <button 
                    onClick={() => {
                      setIsAuthOpen(true);
                      setIsAccountHovered(false);
                    }}
                    className="btn-primary" 
                    style={{ width: '100%', padding: '9px 0' }}
                  >
                    Sign in to Amazon.in
                  </button>
                  <p style={{ fontSize: '11px', marginTop: '8px', color: '#565959' }}>
                    New customer? <a href="#" onClick={(e) => { e.preventDefault(); setIsAuthOpen(true); setIsAccountHovered(false); }}>Start here.</a>
                  </p>
                </div>
              ) : (
                <div style={{ borderBottom: '1px solid #e7e7e7', paddingBottom: '12px', marginBottom: '10px' }}>
                  <p style={{ fontWeight: '700', fontSize: '14px' }}>{user.name}</p>
                  <p style={{ fontSize: '12px', color: '#565959' }}>{user.email}</p>
                  <span style={{ display: 'inline-block', marginTop: '4px' }} className="prime-tag">
                    <span className="check">✓</span>prime India member
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', paddingTop: '8px' }}>
                <div 
                  onClick={() => { setIsOrdersOpen(true); setIsAccountHovered(false); }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}
                >
                  <Package size={16} color="#565959" />
                  <span>Your Orders & Tracking</span>
                </div>
                <div 
                  onClick={() => { setCurrentView('wishlist'); setIsAccountHovered(false); }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}
                >
                  <Heart size={16} color="#565959" />
                  <span>Your Wishlist ({wishlist.length})</span>
                </div>
                <div 
                  onClick={() => { setIsPrimeModalOpen(true); setIsAccountHovered(false); }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}
                >
                  <Sparkles size={16} color="#00a8e1" />
                  <span>Prime India Benefits</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div 
          onClick={() => setIsOrdersOpen(true)}
          style={{
            cursor: 'pointer',
            padding: '6px 8px',
            border: '1px solid transparent',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.2
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <span style={{ fontSize: '11.5px', color: '#cccccc' }}>Returns</span>
          <span style={{ fontSize: '13.5px', fontWeight: '700' }}>& Orders</span>
        </div>

        {/* Cart */}
        <div 
          onClick={() => setIsCartOpen(true)}
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            border: '1px solid transparent',
            borderRadius: '2px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '4px',
            position: 'relative',
            height: '40px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          {/* Authentic Amazon Cart SVG + Centered Badge */}
          <div style={{ position: 'relative', width: '38px', height: '28px', display: 'flex', alignItems: 'center' }}>
            <svg 
              width="38" 
              height="28" 
              viewBox="0 0 38 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Cart Handle & Basket outline */}
              <path 
                d="M2 3H7L10.5 19H29L33.5 7H9" 
                stroke="#ffffff" 
                strokeWidth="2.4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              {/* Cart Wheels */}
              <circle cx="13" cy="24" r="2.2" fill="#ffffff" />
              <circle cx="27" cy="24" r="2.2" fill="#ffffff" />
            </svg>

            {/* Cart Count Badge */}
            <span 
              style={{
                position: 'absolute',
                top: '-4px',
                left: '12px',
                width: '18px',
                color: '#f08804',
                fontSize: '15px',
                fontWeight: '800',
                textAlign: 'center',
                lineHeight: 1,
                fontFamily: 'var(--font-heading)'
              }}
            >
              {cartTotalItems}
            </span>
          </div>

          <span style={{ fontSize: '14px', fontWeight: '700', lineHeight: 1, paddingBottom: '2px' }}>
            Cart
          </span>
        </div>
      </div>

      {/* Subnav / Header Bottom */}
      <div 
        style={{
          backgroundColor: '#232f3e',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: '14px',
          height: '40px',
          fontSize: '13.5px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        {/* All Hamburger Menu */}
        <button 
          onClick={() => setIsDrawerOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'transparent',
            color: '#ffffff',
            fontWeight: '700',
            padding: '6px 8px',
            border: '1px solid transparent',
            borderRadius: '2px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
        >
          <Menu size={18} />
          <span>All</span>
        </button>

        {/* Indian Subnav Links */}
        <div 
          onClick={() => { setCurrentView('deals'); setSelectedCategory('Prime Deals'); }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#febd69', fontWeight: '700' }}
        >
          <span>🔥 Great Indian Festival</span>
        </div>

        <div 
          onClick={() => setIsSpinModalOpen(true)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff', fontWeight: '600' }}
        >
          <Gift size={15} color="#febd69" />
          <span>Spin & Win 🪔</span>
        </div>

        {[
          { label: "Amazon miniTV", action: () => alert("Amazon miniTV: Watch Free Movies & Indian Web Series!") },
          { label: "Mobiles & Electronics", action: () => { setSelectedCategory('Electronics'); setCurrentView('search'); } },
          { label: "Amazon Pay UPI", action: () => alert("Amazon Pay: Scan any UPI QR, Pay Bills & Earn Cashback!") },
          { label: "Fashion & Sarees", action: () => { setSelectedCategory('Fashion'); setCurrentView('search'); } },
          { label: "Home & Kitchen", action: () => { setSelectedCategory('Home & Kitchen'); setCurrentView('search'); } },
          { label: "Prime", action: () => setIsPrimeModalOpen(true) }
        ].map(item => (
          <div 
            key={item.label}
            onClick={item.action}
            style={{
              cursor: 'pointer',
              padding: '6px 8px',
              border: '1px solid transparent',
              borderRadius: '2px',
              fontSize: '13px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#ffffff'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            {item.label}
          </div>
        ))}

        {/* Festive Promo Right Link */}
        <div 
          onClick={() => setIsPrimeModalOpen(true)}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '4px 10px',
            background: 'rgba(254, 189, 105, 0.2)',
            border: '1px solid #febd69',
            borderRadius: '4px',
            fontSize: '12.5px',
            fontWeight: '700',
            color: '#febd69'
          }}
        >
          <Sparkles size={14} />
          <span>Prime 30-Day Free Trial</span>
        </div>
      </div>
    </header>
  );
};
