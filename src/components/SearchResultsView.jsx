import React from 'react';
import { useShop } from '../context/ShopContext';
import { FilterSidebar } from './FilterSidebar';
import { ProductCard } from './ProductCard';
import { ChevronDown, Sparkles } from 'lucide-react';

export const SearchResultsView = () => {
  const { 
    filteredProducts, 
    searchQuery, 
    selectedCategory, 
    sortBy, 
    setSortBy,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  return (
    <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '16px 4px' }}>
      
      {/* Top Results & Sort Header Bar */}
      <div 
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e7e7e7',
          borderRadius: '6px',
          padding: '12px 18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '20px'
        }}
      >
        <div style={{ fontSize: '14px', color: '#565959' }}>
          <span>1-{filteredProducts.length} of {filteredProducts.length} results</span>
          {searchQuery && (
            <span> for <strong style={{ color: '#c45500' }}>"{searchQuery}"</strong></span>
          )}
          {selectedCategory !== 'All Categories' && (
            <span> in <strong style={{ color: '#0f1111' }}>{selectedCategory}</strong></span>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '13px', color: '#565959', fontWeight: '500' }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #d5d9d9',
              backgroundColor: '#f0f2f2',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Avg. Customer Review</option>
            <option value="reviews">Most Reviewed</option>
          </select>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Products Grid */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        <FilterSidebar />

        <div style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div 
              className="amz-card" 
              style={{ textAlign: 'center', padding: '50px 20px' }}
            >
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>
                No results found
              </h3>
              <p style={{ fontSize: '14px', color: '#565959', marginBottom: '20px' }}>
                Try clearing filters, checking your spelling, or searching with broader keywords.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                }}
                className="btn-primary"
                style={{ padding: '9px 24px' }}
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid-responsive">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
