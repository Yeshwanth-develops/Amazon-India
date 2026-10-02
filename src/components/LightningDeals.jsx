import React, { useState, useEffect } from 'react';
import { Clock, Zap, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { LIGHTNING_DEALS, PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const LightningDeals = () => {
  const { addToCart, openProductDetail, setCurrentView, setSelectedCategory } = useShop();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const scrollContainerRef = React.useRef(null);

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const formatDigits = (num) => String(num).padStart(2, '0');

  return (
    <div 
      className="amz-card" 
      style={{ 
        marginBottom: '28px',
        padding: '20px 24px',
        borderLeft: '4px solid #cc0c39'
      }}
    >
      {/* Header with Title & Live Timer */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              backgroundColor: '#ffebee',
              color: '#cc0c39',
              padding: '6px 10px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '700',
              fontSize: '14px'
            }}
          >
            <Zap size={18} fill="#cc0c39" />
            <span>Lightning Deals</span>
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Today's Top Offers</h3>
        </div>

        {/* Live Timer Countdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="#cc0c39" />
          <span style={{ fontSize: '13px', color: '#565959', fontWeight: '600' }}>Ends in:</span>
          <div style={{ display: 'flex', gap: '4px', fontFamily: 'monospace', fontWeight: '700', fontSize: '14px' }}>
            <span style={{ backgroundColor: '#232f3e', color: '#fff', padding: '3px 6px', borderRadius: '3px' }}>
              {formatDigits(timeLeft.hours)}h
            </span>
            <span>:</span>
            <span style={{ backgroundColor: '#232f3e', color: '#fff', padding: '3px 6px', borderRadius: '3px' }}>
              {formatDigits(timeLeft.minutes)}m
            </span>
            <span>:</span>
            <span style={{ backgroundColor: '#cc0c39', color: '#fff', padding: '3px 6px', borderRadius: '3px' }}>
              {formatDigits(timeLeft.seconds)}s
            </span>
          </div>
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setSelectedCategory('Prime Deals');
              setCurrentView('deals');
            }}
            style={{ fontSize: '13px', marginLeft: '12px', fontWeight: '600' }}
          >
            See all deals →
          </a>
        </div>
      </div>

      {/* Horizontal Carousel Controls & Track */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => handleScroll('left')}
          style={{
            position: 'absolute',
            left: '-14px',
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: '#ffffff',
            border: '1px solid #d5d9d9',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            color: '#111'
          }}
        >
          <ChevronLeft size={22} />
        </button>

        <div 
          ref={scrollContainerRef}
          style={{
            display: 'flex',
            gap: '18px',
            overflowX: 'auto',
            paddingBottom: '10px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {LIGHTNING_DEALS.map(deal => {
            const product = PRODUCTS.find(p => p.id === deal.productId) || {
              id: deal.productId,
              title: deal.title,
              price: deal.dealPrice,
              originalPrice: deal.originalPrice,
              image: deal.image,
              isPrime: true,
              rating: 4.8,
              reviewsCount: 3200,
              brand: 'Featured',
              category: 'Deals',
              stock: 10
            };

            return (
              <div 
                key={deal.id}
                style={{
                  minWidth: '240px',
                  maxWidth: '240px',
                  border: '1px solid #e7e7e7',
                  borderRadius: '6px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#ffffff',
                  scrollSnapAlign: 'start',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Image */}
                <div 
                  onClick={() => openProductDetail(product)}
                  style={{
                    backgroundColor: '#f7f7f7',
                    borderRadius: '4px',
                    height: '160px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    marginBottom: '10px',
                    overflow: 'hidden'
                  }}
                >
                  <img 
                    src={deal.image} 
                    alt={deal.title} 
                    loading="lazy"
                    style={{ maxHeight: '140px', maxWidth: '90%', objectFit: 'contain' }}
                  />
                </div>

                {/* Deal Discount Badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge-deal">
                    {deal.discountPercent}% off
                  </span>
                  <span style={{ fontSize: '12px', color: '#cc0c39', fontWeight: '700' }}>
                    Limited time deal
                  </span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f1111' }}>
                    ₹{deal.dealPrice.toLocaleString('en-IN')}
                  </span>
                  <span style={{ fontSize: '12px', color: '#565959', textDecoration: 'line-through' }}>
                    ₹{deal.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Title */}
                <h4 
                  onClick={() => openProductDetail(product)}
                  style={{
                    fontSize: '13px',
                    fontWeight: '500',
                    lineHeight: 1.35,
                    marginBottom: '10px',
                    cursor: 'pointer',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    height: '36px'
                  }}
                >
                  {deal.title}
                </h4>

                {/* Claimed Progress Bar */}
                <div style={{ marginTop: 'auto', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#565959', marginBottom: '3px' }}>
                    <span>{deal.claimedPercent}% claimed</span>
                    <span style={{ color: '#067d62', fontWeight: '600' }}>In stock</span>
                  </div>
                  <div 
                    style={{
                      height: '6px',
                      backgroundColor: '#e7e7e7',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}
                  >
                    <div 
                      style={{
                        height: '100%',
                        width: `${deal.claimedPercent}%`,
                        backgroundColor: deal.claimedPercent > 80 ? '#cc0c39' : '#e67a00',
                        borderRadius: '3px'
                      }}
                    />
                  </div>
                </div>

                {/* Quick Add to Cart */}
                <button
                  onClick={() => addToCart(product, 1)}
                  className="btn-primary"
                  style={{ width: '100%', padding: '7px 0', fontSize: '13px' }}
                >
                  <ShoppingCart size={15} />
                  Add Deal to Cart
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => handleScroll('right')}
          style={{
            position: 'absolute',
            right: '-14px',
            top: '40%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: '#ffffff',
            border: '1px solid #d5d9d9',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            color: '#111'
          }}
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
