import React from 'react';
import { CATEGORY_CARDS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategoryCardGrid = () => {
  const { setSelectedCategory, setCurrentView, user, setIsAuthOpen } = useShop();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView('search');
  };

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        position: 'relative',
        zIndex: 30,
        marginTop: '-180px',
        marginBottom: '28px',
        padding: '0 4px'
      }}
    >
      {CATEGORY_CARDS.map(card => (
        <div key={card.id} className="amz-card">
          <h2 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '14px', lineHeight: 1.25 }}>
            {card.title}
          </h2>

          {/* 4-Item Grid */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              flex: 1,
              marginBottom: '14px'
            }}
          >
            {card.items.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => handleCategorySelect(item.category)}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
              >
                <div 
                  style={{
                    backgroundColor: '#f7f7f7',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    aspectRatio: '1 / 1',
                    marginBottom: '4px'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <span style={{ fontSize: '12px', color: '#0f1111', fontWeight: '500' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect(card.items[0].category);
            }}
            style={{ fontSize: '13px', fontWeight: '600' }}
          >
            {card.linkText}
          </a>
        </div>
      ))}

      {/* Account / Sign In Prompt Card if not logged in or Prime promo card */}
      <div className="amz-card" style={{ justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '19px', fontWeight: '700', marginBottom: '8px' }}>
            {user ? 'Fast, FREE delivery with Prime' : 'Sign in for the best experience'}
          </h2>
          <p style={{ fontSize: '13px', color: '#565959', marginBottom: '16px' }}>
            {user 
              ? 'Enjoy fast delivery, exclusive deals, award-winning movies and TV shows, plus ad-free music.' 
              : 'Save your shopping cart, track orders securely, and receive personalized recommendations.'}
          </p>
        </div>

        <div style={{ textAlign: 'center', margin: 'auto 0 16px' }}>
          <img 
            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop" 
            alt="Prime delivery box"
            style={{ borderRadius: '6px', maxHeight: '140px', width: '100%', objectFit: 'cover' }}
          />
        </div>

        <div>
          {!user ? (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="btn-primary" 
              style={{ width: '100%', padding: '10px 0' }}
            >
              Sign in securely
            </button>
          ) : (
            <button 
              onClick={() => {
                setSelectedCategory('Prime Deals');
                setCurrentView('deals');
              }}
              className="btn-primary" 
              style={{ width: '100%', padding: '10px 0' }}
            >
              Shop Prime Exclusive Deals
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
