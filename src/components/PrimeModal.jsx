import React from 'react';
import { X, Check, Sparkles, Film, Music, Truck, Zap, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PrimeModal = () => {
  const { isPrimeModalOpen, setIsPrimeModalOpen, user, setUser, showToast } = useShop();

  if (!isPrimeModalOpen) return null;

  const togglePrimeStatus = () => {
    if (user) {
      const updated = { ...user, isPrime: !user.isPrime };
      setUser(updated);
      showToast(user.isPrime ? 'Prime membership paused' : 'Welcome to Amazon Prime!');
    } else {
      showToast('Please sign in to manage Prime membership', 'info');
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsPrimeModalOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          borderRadius: '12px',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideUp 0.25s ease-out',
          position: 'relative'
        }}
      >
        {/* Prime Banner Header */}
        <div 
          style={{
            background: 'linear-gradient(135deg, #002f6c 0%, #00a8e1 100%)',
            color: '#ffffff',
            padding: '30px',
            position: 'relative'
          }}
        >
          <button
            onClick={() => setIsPrimeModalOpen(false)}
            style={{
              position: 'absolute',
              right: '16px',
              top: '16px',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>
              prime
            </span>
            <span style={{ backgroundColor: '#febd69', color: '#111', fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px' }}>
              MEMBERSHIP
            </span>
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>
            Everything you love, all in one place.
          </h2>
          <p style={{ fontSize: '15px', opacity: 0.9, maxWidth: '520px' }}>
            Enjoy unlimited fast, free delivery on millions of items, popular movies and series, ad-free music, and exclusive deals.
          </p>
        </div>

        {/* Prime Perks Grid */}
        <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
            
            <div style={{ border: '1px solid #e7e7e7', borderRadius: '8px', padding: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Truck size={22} color="#00a8e1" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Fast, Free Delivery</h4>
              <p style={{ fontSize: '13px', color: '#565959' }}>
                Free Two-Day and One-Day delivery on millions of eligible items with no minimum spend.
              </p>
            </div>

            <div style={{ border: '1px solid #e7e7e7', borderRadius: '8px', padding: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Film size={22} color="#00a8e1" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Prime Video</h4>
              <p style={{ fontSize: '13px', color: '#565959' }}>
                Stream award-winning Amazon Originals, blockbuster films, and live sports anywhere.
              </p>
            </div>

            <div style={{ border: '1px solid #e7e7e7', borderRadius: '8px', padding: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Zap size={22} color="#00a8e1" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Exclusive Deals</h4>
              <p style={{ fontSize: '13px', color: '#565959' }}>
                Get 30-minute early access to Lightning Deals and massive savings during Prime Day.
              </p>
            </div>

            <div style={{ border: '1px solid #e7e7e7', borderRadius: '8px', padding: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#e1f5fe', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Music size={22} color="#00a8e1" />
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px' }}>Amazon Music</h4>
              <p style={{ fontSize: '13px', color: '#565959' }}>
                Access 100 million songs ad-free, the largest catalog of top podcasts, and offline playback.
              </p>
            </div>

          </div>

          {/* Membership Status Box */}
          <div 
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #d5d9d9',
              borderRadius: '8px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <span style={{ fontSize: '12px', color: '#565959', fontWeight: '600', textTransform: 'uppercase' }}>Current Plan</span>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f1111' }}>
                {user?.isPrime ? 'Amazon Prime – Active ($14.99/month)' : 'Standard Account (No Prime active)'}
              </h3>
              <p style={{ fontSize: '13px', color: '#067d62' }}>
                {user?.isPrime ? '✓ You are enjoying all Prime benefits' : 'Start your 30-day free trial today'}
              </p>
            </div>

            <button
              onClick={togglePrimeStatus}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '700' }}
            >
              {user?.isPrime ? 'Toggle / Pause Prime' : 'Start 30-Day Free Trial'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
