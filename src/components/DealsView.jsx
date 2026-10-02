import React, { useState } from 'react';
import { Zap, Clock, Sparkles, Filter } from 'lucide-react';
import { PRODUCTS, LIGHTNING_DEALS, CATEGORIES_LIST } from '../data/products';
import { ProductCard } from './ProductCard';
import { LightningDeals } from './LightningDeals';
import { useShop } from '../context/ShopContext';

export const DealsView = () => {
  const { setSelectedCategory } = useShop();
  const [selectedDealTab, setSelectedDealTab] = useState('All Deals');

  // Filter products that have discounts or deals
  const dealProducts = PRODUCTS.filter(p => {
    if (selectedDealTab === 'All Deals') return p.originalPrice > p.price || p.badge;
    return p.category === selectedDealTab && (p.originalPrice > p.price || p.badge);
  });

  return (
    <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '16px 4px' }}>
      
      {/* Deals Header Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, #131921 0%, #232f3e 50%, #cc0c39 100%)',
          borderRadius: '8px',
          color: '#ffffff',
          padding: '28px 32px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: '#cc0c39', color: '#fff', fontSize: '12px', fontWeight: '800', padding: '3px 8px', borderRadius: '4px' }}>
              TODAY'S DEALS
            </span>
            <span style={{ fontSize: '13px', color: '#febd69', fontWeight: '600' }}>
              ✦ Lightning Offers & Prime Exclusive Discounts
            </span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
            Deals and Promotions
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            Shop top deals on tech, fashion, home essentials and more. Updated every hour.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: '10px 18px', borderRadius: '6px', textAlign: 'center' }}>
            <span style={{ fontSize: '11px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prime Savings</span>
            <strong style={{ fontSize: '16px', color: '#febd69' }}>Up to 50% Off</strong>
          </div>
        </div>
      </div>

      {/* Lightning Deals Carousel */}
      <LightningDeals />

      {/* Category Pills Navigation */}
      <div 
        style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '14px',
          marginBottom: '20px'
        }}
      >
        {['All Deals', 'Electronics', 'Computers', 'Home & Kitchen', 'Fashion', 'Books', 'Beauty & Personal Care'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedDealTab(tab)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: selectedDealTab === tab ? '1px solid #131921' : '1px solid #d5d9d9',
              backgroundColor: selectedDealTab === tab ? '#131921' : '#ffffff',
              color: selectedDealTab === tab ? '#ffffff' : '#0f1111',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Deals Products Grid */}
      <div className="grid-responsive">
        {dealProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
