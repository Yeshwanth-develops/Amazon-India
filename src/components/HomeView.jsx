import React from 'react';
import { HeroCarousel } from './HeroCarousel';
import { CategoryCardGrid } from './CategoryCardGrid';
import { LightningDeals } from './LightningDeals';
import { ProductCard } from './ProductCard';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Headphones, RotateCcw, Gift, Trophy, Flame } from 'lucide-react';

export const HomeView = () => {
  const { setSelectedCategory, setCurrentView, setIsPrimeModalOpen, setIsSpinModalOpen } = useShop();

  const electronics = PRODUCTS.filter(p => p.category === 'Electronics').slice(0, 4);
  const fashionAndEthnic = PRODUCTS.filter(p => p.category === 'Fashion').slice(0, 4);
  const groceriesAndFestive = PRODUCTS.filter(p => p.category === 'Groceries' || p.category === 'Home & Kitchen').slice(0, 4);

  return (
    <div>
      {/* Hero Carousel with Festival Theme */}
      <HeroCarousel />

      {/* Main Content Area */}
      <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '0 8px 40px' }}>
        
        {/* Overlapping 4-in-1 Category Cards Grid */}
        <CategoryCardGrid />

        {/* Spin & Win Diwali Jackpot Banner (Unique Highlight) */}
        <div 
          onClick={() => setIsSpinModalOpen(true)}
          style={{
            background: 'linear-gradient(90deg, #131921 0%, #3b1443 50%, #ff9900 100%)',
            borderRadius: '12px',
            color: '#ffffff',
            padding: '20px 28px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(255, 153, 0, 0.25)',
            border: '2px solid #febd69',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div 
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: '#febd69',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#131921'
              }}
            >
              <Trophy size={28} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ backgroundColor: '#cc0c39', color: '#fff', fontSize: '11px', fontWeight: '800', padding: '2px 6px', borderRadius: '3px' }}>
                  DAILY JACKPOT
                </span>
                <span style={{ fontSize: '12.5px', color: '#febd69', fontWeight: '700' }}>
                  Great Indian Festival Special 🪔
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>
                Spin the Lucky Wheel & Win up to ₹1,000 Amazon Pay Balance & Flat 20% Coupons!
              </h3>
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '10px 22px', fontSize: '14px', fontWeight: '800', backgroundColor: '#febd69' }}
          >
            🎰 Spin Wheel Now
          </button>
        </div>

        {/* Lightning Deals Carousel */}
        <LightningDeals />

        {/* Section 1: Smartphones & Audio Mela */}
        <div className="amz-card" style={{ marginBottom: '28px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f1111' }}>
                Top Deals in Mobiles & Audio | OnePlus, boAt, Noise
              </h2>
              <p style={{ fontSize: '13px', color: '#565959' }}>Up to 80% off + No Cost EMI & 10% Bank Discount</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Electronics');
                setCurrentView('search');
              }}
              style={{
                background: 'transparent',
                color: '#007185',
                fontSize: '13.5px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              See all electronics <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid-responsive">
            {electronics.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Festive Ethnic Wear & Apparel */}
        <div className="amz-card" style={{ marginBottom: '28px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f1111' }}>
                Festive Ethnic Wear, Sarees & Riding Jackets
              </h2>
              <p style={{ fontSize: '13px', color: '#565959' }}>Manyavar, Suta Handloom & Royal Enfield Apparel</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Fashion');
                setCurrentView('search');
              }}
              style={{
                background: 'transparent',
                color: '#007185',
                fontSize: '13.5px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              Explore festive fashion <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid-responsive">
            {fashionAndEthnic.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Amazon Prime India Strip */}
        <div 
          onClick={() => setIsPrimeModalOpen(true)}
          style={{
            background: 'linear-gradient(90deg, #002f6c 0%, #00a8e1 100%)',
            borderRadius: '8px',
            color: '#ffffff',
            padding: '24px 32px',
            marginBottom: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '38px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>
              prime
            </span>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>
                Join Amazon Prime India for Free 1-Day Delivery & Prime Video Blockbusters
              </h3>
              <p style={{ fontSize: '13.5px', opacity: 0.9 }}>
                Watch Mirzapur, The Boys, Panchayat & stream ad-free Amazon Music.
              </p>
            </div>
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '700', whiteSpace: 'nowrap' }}
          >
            Try Prime Free
          </button>
        </div>

        {/* Festive Grocery, Sweets & Kitchen Cookware */}
        <div className="amz-card" style={{ marginBottom: '28px', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f1111' }}>
                Amazon Fresh & Kitchen Essentials | Prestige & Cadbury
              </h2>
              <p style={{ fontSize: '13px', color: '#565959' }}>Dry fruit gift hampers, Tata Tea, and Prestige cookers</p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('Home & Kitchen');
                setCurrentView('search');
              }}
              style={{
                background: 'transparent',
                color: '#007185',
                fontSize: '13.5px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              Shop Kitchen & Grocery <ArrowRight size={15} />
            </button>
          </div>

          <div className="grid-responsive">
            {groceriesAndFestive.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Indian Trust & Reliability Badges */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginTop: '20px'
          }}
        >
          <div className="amz-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <Truck size={32} color="#007185" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>Free & Fast Delivery</h4>
              <p style={{ fontSize: '12px', color: '#565959' }}>Over 19,000+ Indian PIN Codes</p>
            </div>
          </div>
          <div className="amz-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <RotateCcw size={32} color="#007185" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>7 Days Easy Replacement</h4>
              <p style={{ fontSize: '12px', color: '#565959' }}>Doorstep pickup & quick refund</p>
            </div>
          </div>
          <div className="amz-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <ShieldCheck size={32} color="#007185" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>100% Secure UPI & RuPay</h4>
              <p style={{ fontSize: '12px', color: '#565959' }}>NPCI & RBI Certified Gateway</p>
            </div>
          </div>
          <div className="amz-card" style={{ flexDirection: 'row', alignItems: 'center', gap: '14px', padding: '16px' }}>
            <Headphones size={32} color="#007185" />
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700' }}>24/7 Indian Support</h4>
              <p style={{ fontSize: '12px', color: '#565959' }}>Assistance in Hindi, English & more</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
