import React from 'react';
import { Star, Check, RotateCcw, Filter } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES_LIST } from '../data/products';

export const FilterSidebar = () => {
  const { 
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
    filteredProducts
  } = useShop();

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setPrimeOnly(false);
    setMinRating(0);
    setPriceRange({ min: 0, max: 4000 });
    setSortBy('featured');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All Categories' || 
    primeOnly || 
    minRating > 0 || 
    priceRange.min > 0 || 
    priceRange.max < 4000;

  return (
    <aside 
      style={{
        width: '240px',
        backgroundColor: '#ffffff',
        border: '1px solid #e7e7e7',
        borderRadius: '6px',
        padding: '18px 16px',
        height: 'fit-content',
        position: 'sticky',
        top: '115px'
      }}
    >
      {/* Header & Reset Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={16} color="#0f1111" />
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f1111' }}>Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            style={{
              background: 'transparent',
              color: '#007185',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <RotateCcw size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Prime Eligible Toggle */}
      <div style={{ paddingBottom: '14px', borderBottom: '1px solid #e7e7e7', marginBottom: '14px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={primeOnly}
            onChange={(e) => setPrimeOnly(e.target.checked)}
            style={{ width: '16px', height: '16px', accentColor: '#00a8e1' }}
          />
          <span className="prime-tag" style={{ fontSize: '14px' }}>
            <span className="check">✓</span>prime
          </span>
        </label>
      </div>

      {/* Department / Category */}
      <div style={{ paddingBottom: '14px', borderBottom: '1px solid #e7e7e7', marginBottom: '14px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0f1111' }}>
          Department
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
          {CATEGORIES_LIST.map(cat => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                cursor: 'pointer',
                fontWeight: selectedCategory === cat ? '700' : '400',
                color: selectedCategory === cat ? '#0f1111' : '#007185',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {selectedCategory === cat && <span style={{ color: '#ff9900' }}>•</span>}
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div style={{ paddingBottom: '14px', borderBottom: '1px solid #e7e7e7', marginBottom: '14px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0f1111' }}>
          Customer Reviews
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[4, 3, 2, 1].map(stars => (
            <div
              key={stars}
              onClick={() => setMinRating(minRating === stars ? 0 : stars)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: minRating === stars ? '#f0f2f2' : 'transparent'
              }}
            >
              <div style={{ display: 'flex' }}>
                {[1, 2, 3, 4, 5].map(s => (
                  <Star 
                    key={s} 
                    size={14} 
                    fill={s <= stars ? '#ffa41c' : 'none'} 
                    color="#ffa41c" 
                  />
                ))}
              </div>
              <span style={{ fontSize: '12px', color: '#0f1111', fontWeight: minRating === stars ? '700' : '400' }}>
                & Up
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div style={{ paddingBottom: '14px', borderBottom: '1px solid #e7e7e7', marginBottom: '14px' }}>
        <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px', color: '#0f1111' }}>
          Price
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
          {[
            { label: 'Under ₹1,000', min: 0, max: 1000 },
            { label: '₹1,000 to ₹5,000', min: 1000, max: 5000 },
            { label: '₹5,000 to ₹25,000', min: 5000, max: 25000 },
            { label: '₹25,000 & Above', min: 25000, max: 200000 }
          ].map(p => {
            const isSelected = priceRange.min === p.min && priceRange.max === p.max;
            return (
              <div
                key={p.label}
                onClick={() => {
                  if (isSelected) {
                    setPriceRange({ min: 0, max: 200000 });
                  } else {
                    setPriceRange({ min: p.min, max: p.max });
                  }
                }}
                style={{
                  cursor: 'pointer',
                  fontWeight: isSelected ? '700' : '400',
                  color: isSelected ? '#0f1111' : '#007185'
                }}
              >
                {p.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Count Helper */}
      <div style={{ fontSize: '12px', color: '#565959', textAlign: 'center', marginTop: '6px' }}>
        Showing <strong>{filteredProducts.length}</strong> matching items
      </div>
    </aside>
  );
};
