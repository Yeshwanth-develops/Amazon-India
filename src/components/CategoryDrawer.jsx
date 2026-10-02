import React from 'react';
import { 
  X, 
  User, 
  ChevronRight, 
  Tv, 
  ShoppingBag, 
  Laptop, 
  BookOpen, 
  Sparkles, 
  Headphones, 
  Home as HomeIcon,
  HelpCircle,
  LogOut,
  Flame
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CategoryDrawer = () => {
  const { 
    isDrawerOpen, 
    setIsDrawerOpen, 
    user, 
    setIsAuthOpen, 
    setSelectedCategory, 
    setCurrentView,
    setIsOrdersOpen,
    setIsPrimeModalOpen,
    setUser
  } = useShop();

  if (!isDrawerOpen) return null;

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentView('search');
    setIsDrawerOpen(false);
  };

  const handleDealsClick = () => {
    setSelectedCategory('Prime Deals');
    setCurrentView('deals');
    setIsDrawerOpen(false);
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={() => setIsDrawerOpen(false)}
      style={{ justifyContent: 'flex-start', padding: 0, zIndex: 1100 }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '365px',
          maxWidth: '85vw',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '4px 0 20px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInLeft 0.25s ease-out',
          position: 'relative'
        }}
      >
        {/* Close Button on outside */}
        <button
          onClick={() => setIsDrawerOpen(false)}
          style={{
            position: 'absolute',
            left: '375px',
            top: '15px',
            background: 'transparent',
            color: '#ffffff',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={28} />
        </button>

        {/* Drawer Header */}
        <div 
          onClick={() => {
            if (!user) setIsAuthOpen(true);
            setIsDrawerOpen(false);
          }}
          style={{
            backgroundColor: '#232f3e',
            color: '#ffffff',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#37475a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <User size={20} color="#ffffff" />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>
              Hello, {user?.name || 'Sign In'}
            </h3>
            {user?.isPrime && (
              <span className="prime-tag" style={{ fontSize: '12px', color: '#febd69' }}>
                <span className="check" style={{ color: '#ff9900' }}>✓</span>Prime Member
              </span>
            )}
          </div>
        </div>

        {/* Drawer Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
          
          {/* Trending Section */}
          <div style={{ padding: '0 24px 8px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>
              Trending & Deals
            </h4>
          </div>
          <DrawerItem 
            icon={<Sparkles size={18} color="#cc0c39" />} 
            label="Diwali Spin & Win Jackpot 🪔" 
            onClick={() => { setIsSpinModalOpen(true); setIsDrawerOpen(false); }} 
          />
          <DrawerItem 
            icon={<Flame size={18} color="#cc0c39" />} 
            label="Great Indian Festival Deals" 
            onClick={handleDealsClick} 
          />
          <DrawerItem 
            icon={<Sparkles size={18} color="#00a8e1" />} 
            label="Amazon Prime India Benefits" 
            onClick={() => { setIsPrimeModalOpen(true); setIsDrawerOpen(false); }} 
          />
          <DrawerItem 
            icon={<Tv size={18} color="#007185" />} 
            label="Amazon miniTV (Free Videos)" 
            onClick={() => { alert("Amazon miniTV: Watch Trending Indian Series & Comedy!"); setIsDrawerOpen(false); }} 
          />

          <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '14px 0' }} />

          {/* Shop By Department */}
          <div style={{ padding: '0 24px 8px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>
              Shop by Department
            </h4>
          </div>
          <DrawerItem 
            icon={<Headphones size={18} />} 
            label="Electronics & Audio" 
            onClick={() => handleCategoryClick('Electronics')} 
          />
          <DrawerItem 
            icon={<Laptop size={18} />} 
            label="Computers & Accessories" 
            onClick={() => handleCategoryClick('Computers')} 
          />
          <DrawerItem 
            icon={<ShoppingBag size={18} />} 
            label="Fashion & Apparel" 
            onClick={() => handleCategoryClick('Fashion')} 
          />
          <DrawerItem 
            icon={<HomeIcon size={18} />} 
            label="Home & Kitchen" 
            onClick={() => handleCategoryClick('Home & Kitchen')} 
          />
          <DrawerItem 
            icon={<BookOpen size={18} />} 
            label="Books & Kindle e-Readers" 
            onClick={() => handleCategoryClick('Books')} 
          />
          <DrawerItem 
            icon={<Sparkles size={18} />} 
            label="Beauty & Personal Care" 
            onClick={() => handleCategoryClick('Beauty & Personal Care')} 
          />

          <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '14px 0' }} />

          {/* Help & Settings */}
          <div style={{ padding: '0 24px 8px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111', marginBottom: '8px' }}>
              Help & Settings
            </h4>
          </div>
          <DrawerItem 
            label="Your Account" 
            onClick={() => { setIsAuthOpen(true); setIsDrawerOpen(false); }} 
          />
          <DrawerItem 
            label="Track Your Orders" 
            onClick={() => { setIsOrdersOpen(true); setIsDrawerOpen(false); }} 
          />
          <DrawerItem 
            label="Customer Service & Help" 
            onClick={() => alert("Amazon Clone 24/7 Customer Help Center.")} 
          />
          {user && (
            <DrawerItem 
              icon={<LogOut size={18} color="#cc0c39" />} 
              label="Sign Out" 
              onClick={() => {
                setUser(null);
                setIsDrawerOpen(false);
              }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

const DrawerItem = ({ icon, label, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        fontSize: '14px',
        color: '#0f1111',
        cursor: 'pointer',
        transition: 'background-color 0.15s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eaeded'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
        <span style={{ fontWeight: '500' }}>{label}</span>
      </div>
      <ChevronRight size={16} color="#767676" />
    </div>
  );
};
