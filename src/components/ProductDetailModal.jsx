import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Lock, 
  Share2, 
  Check, 
  ShoppingCart, 
  Zap,
  MapPin,
  CreditCard,
  Sparkles,
  Gift
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, 
    isDetailOpen, 
    closeProductDetail, 
    addToCart, 
    toggleWishlist, 
    isInWishlist,
    setIsCheckoutOpen,
    user
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  if (!isDetailOpen || !selectedProduct) return null;

  const product = selectedProduct;
  const isWishlisted = isInWishlist(product.id);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleBuyNow = () => {
    addToCart(product, selectedQuantity);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={closeProductDetail}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '92vh',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div 
          style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e7e7e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8fafc'
          }}
        >
          <div style={{ fontSize: '13px', color: '#565959', display: 'flex', gap: '6px' }}>
            <span>Amazon.in</span>
            <span>›</span>
            <span>{product.category}</span>
            <span>›</span>
            <span style={{ color: '#0f1111', fontWeight: '600' }}>{product.brand}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleShare}
              style={{
                background: 'transparent',
                border: '1px solid #d5d9d9',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer'
              }}
            >
              <Share2 size={14} />
              {isCopied ? 'Link Copied!' : 'Share'}
            </button>

            <button
              onClick={closeProductDetail}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                color: '#565959'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 420px) 1fr minmax(250px, 300px)',
            gap: '28px'
          }}
        >
          {/* Column 1: Image Gallery */}
          <div>
            <div 
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e7e7e7',
                padding: '20px',
                height: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}
            >
              <img 
                src={images[activeImageIndex] || product.image} 
                alt={product.title}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Thumbnail Row */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '4px',
                    border: `2px solid ${idx === activeImageIndex ? '#e77600' : '#d5d9d9'}`,
                    padding: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img src={img} alt="" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
              ))}
            </div>

            {/* Trust Highlights */}
            <div 
              style={{
                marginTop: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                textAlign: 'center',
                borderTop: '1px solid #e7e7e7',
                paddingTop: '16px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Truck size={22} color="#007185" />
                <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px', fontWeight: '600' }}>
                  Free Prime Delivery
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <RotateCcw size={22} color="#007185" />
                <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px', fontWeight: '600' }}>
                  7 Days Replacement
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ShieldCheck size={22} color="#007185" />
                <span style={{ fontSize: '11px', color: '#007185', marginTop: '4px', fontWeight: '600' }}>
                  1 Year Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Details & Offers */}
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', lineHeight: 1.35, color: '#0f1111', marginBottom: '8px' }}>
              {product.title}
            </h1>

            <div style={{ fontSize: '13px', color: '#007185', marginBottom: '8px' }}>
              Brand: <strong style={{ color: '#007185' }}>{product.brand}</strong>
            </div>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>{product.rating}</span>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    fill={star <= Math.floor(product.rating) ? '#ffa41c' : 'none'} 
                    color="#ffa41c" 
                  />
                ))}
              </div>
              <span style={{ fontSize: '13px', color: '#007185' }}>
                {product.reviewsCount?.toLocaleString('en-IN')} ratings
              </span>
            </div>

            <div style={{ height: '1px', backgroundColor: '#e7e7e7', margin: '12px 0' }} />

            {/* Price Box */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
                {discountPercent > 0 && (
                  <span style={{ fontSize: '24px', color: '#cc0c39', fontWeight: '300' }}>
                    -{discountPercent}%
                  </span>
                )}
                <span style={{ fontSize: '28px', fontWeight: '800', color: '#0f1111' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
              </div>

              {product.originalPrice && (
                <div style={{ fontSize: '13px', color: '#565959', marginTop: '2px' }}>
                  M.R.P.: <span style={{ textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span> (Inclusive of all Indian taxes)
                </div>
              )}

              {/* Bank Offers & EMI Banner */}
              <div 
                style={{
                  marginTop: '12px',
                  backgroundColor: '#fcf8e3',
                  border: '1px solid #faebcc',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8a6d3b', fontWeight: '700' }}>
                  <Sparkles size={14} /> Great Indian Festival Offers
                </div>
                <div style={{ color: '#0f1111' }}>
                  • <strong>Bank Offer:</strong> Up to ₹4,000 Instant Discount on HDFC/SBI Credit Cards
                </div>
                <div style={{ color: '#0f1111' }}>
                  • <strong>No Cost EMI:</strong> Available on Bajaj Finserv, ICICI & Amazon Pay Later from {product.emi || '₹499/mo'}
                </div>
                <div style={{ color: '#0f1111' }}>
                  • <strong>Amazon Pay:</strong> Earn ₹100 Cashback on UPI order
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{ fontSize: '13.5px', color: '#333333', lineHeight: 1.5, marginBottom: '20px' }}>
              {product.description}
            </p>

            {/* Feature Bullets */}
            {product.features && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>About this item</h3>
                <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#333333', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {product.features.map((feat, idx) => (
                    <li key={idx} style={{ lineHeight: 1.45 }}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technical Specifications */}
            {product.specs && (
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>Technical Details</h3>
                <table style={{ width: '100%', fontSize: '12.5px', borderCollapse: 'collapse' }}>
                  <tbody>
                    {Object.entries(product.specs).map(([key, value]) => (
                      <tr key={key} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '6px 12px 6px 0', fontWeight: '600', color: '#565959', width: '38%' }}>{key}</td>
                        <td style={{ padding: '6px 0', color: '#0f1111' }}>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Column 3: Buy Box */}
          <div>
            <div 
              style={{
                border: '1px solid #d5d9d9',
                borderRadius: '8px',
                padding: '18px',
                backgroundColor: '#ffffff',
                boxShadow: 'var(--shadow-sm)',
                position: 'sticky',
                top: '0'
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f1111', marginBottom: '10px' }}>
                ₹{(product.price * selectedQuantity).toLocaleString('en-IN')}
              </div>

              {product.isPrime && (
                <div style={{ marginBottom: '12px' }}>
                  <span className="prime-tag">
                    <span className="check">✓</span>prime
                  </span>
                  <div style={{ fontSize: '13px', color: '#007185', fontWeight: '600', marginTop: '2px' }}>
                    FREE delivery <strong>{product.deliveryDate || 'Tomorrow'}</strong>
                  </div>
                </div>
              )}

              {/* Delivery Pin Address */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#007185', marginBottom: '14px' }}>
                <MapPin size={14} />
                <span>Deliver to {user?.name || 'Bengaluru'} - {user?.address?.zip || '560038'}</span>
              </div>

              {/* Stock Status */}
              <div style={{ fontSize: '16px', color: '#067d62', fontWeight: '700', marginBottom: '16px' }}>
                {product.stock > 0 ? 'In Stock' : 'Currently Unavailable'}
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600' }}>Quantity:</label>
                <select
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #d5d9d9',
                    backgroundColor: '#f0f2f2',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {[1, 2, 3, 4, 5, 10].map(qty => (
                    <option key={qty} value={qty}>{qty}</option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => {
                  addToCart(product, selectedQuantity);
                  closeProductDetail();
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '10px 0', fontSize: '14px', marginBottom: '10px' }}
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-buy-now"
                style={{ width: '100%', padding: '10px 0', fontSize: '14px', marginBottom: '16px' }}
              >
                <Zap size={16} /> Buy Now
              </button>

              {/* Security & Seller */}
              <div style={{ fontSize: '12px', color: '#565959', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid #e7e7e7', paddingTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={13} color="#067d62" />
                  <span>Secure Amazon.in payment</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Fulfilled by:</span>
                  <span style={{ color: '#0f1111', fontWeight: '500' }}>Amazon Appario Retail</span>
                </div>
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  width: '100%',
                  marginTop: '16px',
                  padding: '8px 0',
                  border: '1px solid #d5d9d9',
                  borderRadius: '6px',
                  backgroundColor: '#ffffff',
                  fontSize: '13px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  color: isWishlisted ? '#cc0c39' : '#0f1111'
                }}
              >
                <Heart size={15} fill={isWishlisted ? '#cc0c39' : 'transparent'} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
