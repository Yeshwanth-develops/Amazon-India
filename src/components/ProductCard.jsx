import React, { useState } from 'react';
import { Star, Heart, Eye, ShoppingCart, Check, CreditCard, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, openProductDetail, toggleWishlist, isInWishlist } = useShop();
  const [isAddedAnim, setIsAddedAnim] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1200);
  };

  return (
    <div 
      className="amz-card"
      style={{
        padding: '16px',
        border: '1px solid #e7e7e7',
        cursor: 'pointer',
        height: '100%',
        justifyContent: 'space-between',
        position: 'relative'
      }}
      onClick={() => openProductDetail(product)}
    >
      {/* Top Badges & Wishlist */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', minHeight: '26px' }}>
        <div>
          {product.badge === 'Best Seller' && (
            <span className="badge-best-seller">Best Seller</span>
          )}
          {product.badge === "Amazon's Choice" && (
            <span className="badge-amazon-choice">
              Amazon's <span>Choice</span>
            </span>
          )}
          {product.badge?.includes('Festival') && (
            <span className="badge-deal" style={{ background: '#cc0c39', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={11} /> {product.badge}
            </span>
          )}
          {product.badge?.startsWith('Save') && (
            <span className="badge-deal">{product.badge}</span>
          )}
        </div>

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          style={{
            background: '#ffffff',
            border: '1px solid #e7e7e7',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
            color: isWishlisted ? '#cc0c39' : '#767676'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={16} fill={isWishlisted ? '#cc0c39' : 'transparent'} />
        </button>
      </div>

      {/* Product Image */}
      <div 
        style={{
          height: '210px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '12px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          loading="lazy"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />

        {/* Quick View Button on Hover */}
        <div 
          style={{
            position: 'absolute',
            bottom: '4px',
            background: 'rgba(255, 255, 255, 0.94)',
            padding: '4px 10px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '600',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
          }}
        >
          <Eye size={13} /> Quick look
        </div>
      </div>

      {/* Product Details Section */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Brand */}
        <span style={{ fontSize: '12px', color: '#565959', fontWeight: '500' }}>
          {product.brand}
        </span>

        {/* Title */}
        <h3 
          style={{
            fontSize: '14px',
            fontWeight: '600',
            lineHeight: 1.35,
            color: '#0f1111',
            margin: '4px 0 6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '38px'
          }}
        >
          {product.title}
        </h3>

        {/* Star Ratings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={13} 
                fill={star <= Math.floor(product.rating) ? '#ffa41c' : 'none'} 
                color="#ffa41c" 
              />
            ))}
          </div>
          <span style={{ fontSize: '12px', color: '#007185', fontWeight: '500' }}>
            {product.reviewsCount?.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Indian Pricing in INR */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px', flexWrap: 'wrap' }}>
          {discountPercent > 0 && (
            <span style={{ fontSize: '18px', color: '#cc0c39', fontWeight: '300' }}>
              -{discountPercent}%
            </span>
          )}
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#0f1111' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', marginRight: '2px' }}>₹</span>
            {product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '12px', color: '#565959', textDecoration: 'line-through' }}>
              M.R.P: ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* No Cost EMI info */}
        {product.emi && (
          <div style={{ fontSize: '11.5px', color: '#007185', fontWeight: '600', marginBottom: '4px' }}>
            {product.emi}
          </div>
        )}

        {/* Bank Offer preview */}
        {product.bankOffer && (
          <div style={{ fontSize: '11px', color: '#067d62', fontWeight: '700', marginBottom: '6px' }}>
            🏷️ {product.bankOffer}
          </div>
        )}

        {/* Prime Delivery Tag */}
        {product.isPrime && (
          <div style={{ marginBottom: '8px' }}>
            <span className="prime-tag">
              <span className="check">✓</span>prime
            </span>
            <span style={{ fontSize: '12px', color: '#565959', marginLeft: '6px' }}>
              Get it by <strong>{product.deliveryDate || 'Tomorrow'}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="btn-primary"
        style={{
          width: '100%',
          marginTop: '10px',
          padding: '8px 0',
          fontSize: '13.5px',
          backgroundColor: isAddedAnim ? '#067d62' : 'var(--amz-btn-yellow)',
          color: isAddedAnim ? '#ffffff' : '#0f1111',
          borderColor: isAddedAnim ? '#067d62' : '#fcd200',
          transition: 'all 0.25s ease'
        }}
      >
        {isAddedAnim ? (
          <>
            <Check size={16} /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart size={15} /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
};
