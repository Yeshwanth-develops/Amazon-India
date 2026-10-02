import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Bookmark, 
  ShieldCheck, 
  Truck, 
  ShoppingBag,
  Sparkles,
  Tag
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    savedItems, 
    updateQuantity, 
    removeFromCart, 
    saveForLater, 
    moveToCartFromSaved, 
    removeSavedItem, 
    cartSubtotal, 
    rawSubtotal,
    discountAmount,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    cartTotalItems,
    eligibleForFreeShipping,
    amountNeededForFreeShipping,
    setIsCheckoutOpen,
    openProductDetail,
    setCurrentView,
    setIsSpinModalOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const c = couponInput.trim().toUpperCase();
    if (c === 'DIWALI500') {
      applyCouponCode(c, { label: '₹500 Diwali Cashback', type: 'cashback', value: 500 });
    } else if (c === 'FESTIVE20') {
      applyCouponCode(c, { label: '20% Festive Discount', type: 'discount', value: 20 });
    } else if (c === 'RUFUSVIP10') {
      applyCouponCode(c, { label: '10% Rufus VIP Discount', type: 'discount', value: 10 });
    } else {
      applyCouponCode(c, { label: '15% Great Indian Festival Discount', type: 'discount', value: 15 });
    }
    setCouponInput('');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '980px',
          maxHeight: '92vh',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid #e7e7e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8fafc'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#007185" />
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f1111' }}>
              Shopping Cart ({cartTotalItems} {cartTotalItems === 1 ? 'item' : 'items'})
            </h2>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: '#565959',
              padding: '4px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Free Delivery Bar in India */}
        <div 
          style={{
            backgroundColor: eligibleForFreeShipping ? '#e6f4ea' : '#fff8e1',
            padding: '12px 24px',
            borderBottom: '1px solid #e7e7e7',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Truck size={20} color={eligibleForFreeShipping ? '#067d62' : '#e67a00'} />
          <div style={{ fontSize: '13.5px', color: '#0f1111', flex: 1 }}>
            {eligibleForFreeShipping ? (
              <span>
                <strong style={{ color: '#067d62' }}>Your order is eligible for FREE Delivery with Prime!</strong>
              </span>
            ) : (
              <span>
                Add <strong style={{ color: '#cc0c39' }}>₹{amountNeededForFreeShipping.toLocaleString('en-IN')}</strong> of eligible items for <strong>FREE Delivery</strong>
              </span>
            )}
          </div>
        </div>

        {/* Body Container */}
        <div 
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: cart.length > 0 ? '1fr 340px' : '1fr',
            gap: '24px'
          }}
        >
          {/* Main Items List */}
          <div>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop" 
                  alt="Empty Cart"
                  style={{ width: '160px', margin: '0 auto 16px', borderRadius: '8px', opacity: 0.8 }}
                />
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px' }}>Your Amazon.in Cart is empty</h3>
                <p style={{ fontSize: '14px', color: '#565959', marginBottom: '20px' }}>
                  Explore blockbuster deals on OnePlus, boAt, Sarees, and Kitchen Cookware!
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setCurrentView('deals');
                    }}
                    className="btn-primary"
                    style={{ padding: '10px 24px', fontSize: '14px' }}
                  >
                    Shop Festival Deals
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsSpinModalOpen(true);
                    }}
                    className="btn-secondary"
                    style={{ padding: '10px 20px', fontSize: '14px' }}
                  >
                    🎰 Spin & Win Jackpot
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #e7e7e7',
                      paddingBottom: '16px',
                      display: 'grid',
                      gridTemplateColumns: '100px 1fr auto',
                      gap: '16px'
                    }}
                  >
                    {/* Item Image */}
                    <div 
                      onClick={() => {
                        setIsCartOpen(false);
                        openProductDetail(item);
                      }}
                      style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: '6px',
                        padding: '6px',
                        height: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: '1px solid #f0f0f0'
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Item Info */}
                    <div>
                      <h4 
                        onClick={() => {
                          setIsCartOpen(false);
                          openProductDetail(item);
                        }}
                        style={{
                          fontSize: '14.5px',
                          fontWeight: '600',
                          lineHeight: 1.3,
                          marginBottom: '4px',
                          cursor: 'pointer',
                          color: '#0f1111'
                        }}
                      >
                        {item.title}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#067d62', fontWeight: '600', marginBottom: '4px' }}>
                        In Stock (Eligible for FREE Prime Delivery)
                      </p>

                      {/* Quantity & Actions Bar */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px' }}>
                        <div 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #d5d9d9',
                            borderRadius: '6px',
                            backgroundColor: '#f0f2f2'
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              padding: '5px 8px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Minus size={13} />
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '13px', fontWeight: '700' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              padding: '5px 8px',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center'
                            }}
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            color: '#007185',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={13} /> Delete
                        </button>

                        <button
                          onClick={() => saveForLater(item)}
                          style={{
                            background: 'transparent',
                            color: '#007185',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Bookmark size={13} /> Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '17px', fontWeight: '700', color: '#0f1111' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Saved For Later */}
            {savedItems.length > 0 && (
              <div style={{ marginTop: '32px', borderTop: '2px solid #e7e7e7', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>
                  Saved for later ({savedItems.length})
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '14px' }}>
                  {savedItems.map(sItem => (
                    <div 
                      key={sItem.id} 
                      style={{
                        border: '1px solid #e7e7e7',
                        borderRadius: '6px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <img 
                        src={sItem.image} 
                        alt={sItem.title} 
                        style={{ height: '90px', objectFit: 'contain', margin: '0 auto 8px' }}
                      />
                      <h5 style={{ fontSize: '12px', fontWeight: '600', lineHeight: 1.25, marginBottom: '6px' }}>
                        {sItem.title}
                      </h5>
                      <span style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>
                        ₹{sItem.price.toLocaleString('en-IN')}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                          onClick={() => moveToCartFromSaved(sItem)}
                          className="btn-primary"
                          style={{ padding: '5px 0', fontSize: '12px' }}
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeSavedItem(sItem.id)}
                          style={{ background: 'transparent', color: '#007185', fontSize: '11px', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          {cart.length > 0 && (
            <div>
              <div 
                style={{
                  backgroundColor: '#f8fafc',
                  borderRadius: '8px',
                  border: '1px solid #d5d9d9',
                  padding: '20px',
                  position: 'sticky',
                  top: '0'
                }}
              >
                {/* Coupon Input Form */}
                <div style={{ marginBottom: '18px', borderBottom: '1px solid #e7e7e7', paddingBottom: '14px' }}>
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      placeholder="Coupon (e.g. DIWALI500)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid #d5d9d9', fontSize: '12.5px', textTransform: 'uppercase' }}
                    />
                    <button type="submit" className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                      Apply
                    </button>
                  </form>

                  {appliedCoupon ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#e6f4ea', padding: '6px 10px', borderRadius: '4px', fontSize: '11.5px', color: '#067d62' }}>
                      <span>✓ {appliedCoupon.label}</span>
                      <button onClick={removeCoupon} style={{ background: 'transparent', color: '#cc0c39', cursor: 'pointer', fontWeight: '700' }}>×</button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsSpinModalOpen(true)}
                      style={{ fontSize: '11.5px', color: '#007185', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Sparkles size={12} color="#ff9900" />
                      <span>Don't have a coupon? <strong>Spin the Wheel</strong></span>
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '16px', color: '#0f1111', marginBottom: '6px' }}>
                  Subtotal ({cartTotalItems} items):{' '}
                </div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: '#0f1111', marginBottom: '14px' }}>
                  ₹{cartSubtotal.toLocaleString('en-IN')}
                </div>

                {discountAmount > 0 && (
                  <div style={{ fontSize: '13px', color: '#067d62', fontWeight: '600', marginBottom: '12px' }}>
                    You save: ₹{discountAmount.toLocaleString('en-IN')} on this festive order!
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '11px 0',
                    fontSize: '14.5px',
                    fontWeight: '700',
                    backgroundColor: 'var(--amz-btn-yellow)',
                    marginBottom: '14px'
                  }}
                >
                  Proceed to Buy ({cartTotalItems} items)
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#565959' }}>
                  <ShieldCheck size={16} color="#067d62" />
                  <span>100% Purchase Protection with Amazon A-to-z Guarantee</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
