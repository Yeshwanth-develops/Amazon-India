import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistView = () => {
  const { wishlist, toggleWishlist, addToCart, openProductDetail, setCurrentView } = useShop();

  return (
    <div style={{ maxWidth: '1100px', margin: '24px auto', padding: '0 16px' }}>
      
      {/* Back to Shopping */}
      <button
        onClick={() => setCurrentView('home')}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#007185',
          fontSize: '13.5px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '16px'
        }}
      >
        <ArrowLeft size={16} /> Back to shopping
      </button>

      <div className="amz-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', borderBottom: '1px solid #e7e7e7', paddingBottom: '14px' }}>
          <Heart size={24} color="#cc0c39" fill="#cc0c39" />
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0f1111' }}>
            Your Wish List ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
          </h2>
        </div>

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <Heart size={54} color="#d5d9d9" style={{ margin: '0 auto 14px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Your Wish List is currently empty</h3>
            <p style={{ fontSize: '14px', color: '#565959', marginBottom: '20px' }}>
              Explore products and click the heart icon to save items for future purchases.
            </p>
            <button
              onClick={() => setCurrentView('home')}
              className="btn-primary"
              style={{ padding: '10px 24px' }}
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {wishlist.map(product => (
              <div 
                key={product.id}
                style={{
                  border: '1px solid #e7e7e7',
                  borderRadius: '8px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff'
                }}
              >
                <div>
                  <div 
                    onClick={() => openProductDetail(product)}
                    style={{
                      height: '150px',
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      marginBottom: '12px'
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      style={{ maxHeight: '130px', maxWidth: '90%', objectFit: 'contain' }}
                    />
                  </div>

                  <h4 
                    onClick={() => openProductDetail(product)}
                    style={{
                      fontSize: '13.5px',
                      fontWeight: '600',
                      lineHeight: 1.35,
                      marginBottom: '8px',
                      cursor: 'pointer',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {product.title}
                  </h4>

                  <span style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111', display: 'block', marginBottom: '14px' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="btn-primary"
                    style={{ width: '100%', padding: '7px 0', fontSize: '13px' }}
                  >
                    <ShoppingCart size={14} /> Add to Cart
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    style={{
                      background: 'transparent',
                      color: '#007185',
                      fontSize: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Trash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
