import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  Lock, 
  Sparkles,
  ShoppingBag,
  QrCode,
  Smartphone,
  Banknote,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal,
    rawSubtotal,
    discountAmount,
    appliedCoupon,
    removeCoupon,
    user, 
    placeOrder, 
    setIsOrdersOpen 
  } = useShop();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    name: user?.name || 'Yeshwanth Sunkara',
    street: user?.address?.street || 'Flat 402, Prestige Palms, Indiranagar',
    city: user?.address?.city || 'Bengaluru',
    state: user?.address?.state || 'Karnataka',
    zip: user?.address?.zip || '560038',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi', 'card', 'cod', 'amazonPay'
  const [upiId, setUpiId] = useState('yeshwanth.sunkara@okaxis');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '•••• •••• •••• 5124',
    nameOnCard: user?.name || 'Yeshwanth Sunkara',
    expDate: '10/29',
    cvv: '812'
  });

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderData, setPlacedOrderData] = useState(null);

  if (!isCheckoutOpen) return null;

  const shippingCost = 0.00; // Free Prime shipping in India
  const grandTotal = cartSubtotal;

  const handlePlaceOrder = () => {
    confetti({
      particleCount: 160,
      spread: 90,
      origin: { y: 0.55 }
    });

    let methodLabel = 'Amazon Pay UPI';
    if (paymentMethod === 'upi') methodLabel = `UPI (${upiId})`;
    else if (paymentMethod === 'card') methodLabel = 'RuPay / Visa Card ending in 5124';
    else if (paymentMethod === 'cod') methodLabel = 'Cash on Delivery (COD)';
    else if (paymentMethod === 'amazonPay') methodLabel = 'Amazon Pay Balance';

    const newOrder = placeOrder(
      { method: methodLabel },
      address
    );

    setPlacedOrderData(newOrder);
    setIsOrderPlaced(true);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsOrderPlaced(false);
    setStep(1);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '1040px',
          maxHeight: '94vh',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Amazon.in Top Header */}
        <div 
          style={{
            backgroundColor: '#131921',
            color: '#ffffff',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
              amazon<span style={{ color: '#febd69' }}>.in</span>
            </span>
            <span style={{ fontSize: '18px', color: '#ccc', fontWeight: '300' }}>|</span>
            <span style={{ fontSize: '17px', fontWeight: '600' }}>Secure Indian Checkout</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cccccc', fontSize: '13px' }}>
            <Lock size={15} color="#067d62" />
            <span>100% Purchase Protection</span>
            <button
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                marginLeft: '12px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {isOrderPlaced ? (
            /* Order Placed Success Screen */
            <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
              <div 
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#e6f4ea',
                  color: '#067d62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f1111', marginBottom: '8px' }}>
                Badhai Ho! Your Order is Placed! 🪔
              </h2>

              <p style={{ fontSize: '14px', color: '#565959', marginBottom: '24px' }}>
                Confirmation SMS and Email sent to <strong>{user?.email || 'your mobile & email'}</strong>.
              </p>

              <div 
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #d5d9d9',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'left',
                  marginBottom: '28px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#565959', fontSize: '13px' }}>Order Number:</span>
                  <strong style={{ fontSize: '14px' }}>{placedOrderData?.id}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#565959', fontSize: '13px' }}>Delivery Schedule:</span>
                  <strong style={{ color: '#067d62', fontSize: '14px' }}>Tomorrow by 11:00 AM (Prime Delivery)</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#565959', fontSize: '13px' }}>Tracking Reference:</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '13px' }}>{placedOrderData?.trackingNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e7e7e7', paddingTop: '10px' }}>
                  <span style={{ fontWeight: '700' }}>Amount Paid:</span>
                  <strong style={{ fontSize: '18px', color: '#cc0c39' }}>₹{placedOrderData?.total?.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
                <button
                  onClick={() => {
                    handleClose();
                    setIsOrdersOpen(true);
                  }}
                  className="btn-primary"
                  style={{ padding: '10px 24px' }}
                >
                  Track Order
                </button>
                <button
                  onClick={handleClose}
                  className="btn-secondary"
                  style={{ padding: '10px 20px' }}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            /* 3-Step Checkout Flow */
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '28px' }}>
              
              {/* Left Accordion Steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Step 1: Delivery Address */}
                <div 
                  style={{
                    border: '1px solid #d5d9d9',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span 
                        style={{
                          backgroundColor: '#232f3e',
                          color: '#fff',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700'
                        }}
                      >
                        1
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Select Delivery Address</h3>
                    </div>
                    {step !== 1 && (
                      <button 
                        onClick={() => setStep(1)} 
                        style={{ background: 'transparent', color: '#007185', fontSize: '13px', fontWeight: '600' }}
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {step === 1 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Full Name</label>
                          <input 
                            type="text" 
                            value={address.name} 
                            onChange={(e) => setAddress({ ...address, name: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Flat, House no., Building, Street</label>
                          <input 
                            type="text" 
                            value={address.street} 
                            onChange={(e) => setAddress({ ...address, street: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>City (e.g. Bengaluru, Mumbai, Delhi)</label>
                          <input 
                            type="text" 
                            value={address.city} 
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>State</label>
                          <input 
                            type="text" 
                            value={address.state} 
                            onChange={(e) => setAddress({ ...address, state: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>PIN Code (6 Digits)</label>
                          <input 
                            type="text" 
                            value={address.zip} 
                            onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                            style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6' }}
                          />
                        </div>
                      </div>

                      <button 
                        onClick={() => setStep(2)}
                        className="btn-primary" 
                        style={{ alignSelf: 'flex-start', marginTop: '8px', padding: '8px 20px' }}
                      >
                        Deliver to this address
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '13.5px', color: '#565959', paddingLeft: '34px' }}>
                      {address.name}, {address.street}, {address.city}, {address.state} - {address.zip}
                    </p>
                  )}
                </div>

                {/* Step 2: Indian Payment Options */}
                <div 
                  style={{
                    border: '1px solid #d5d9d9',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span 
                        style={{
                          backgroundColor: '#232f3e',
                          color: '#fff',
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: '700'
                        }}
                      >
                        2
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Payment Method</h3>
                    </div>
                    {step !== 2 && (
                      <button 
                        onClick={() => setStep(2)} 
                        style={{ background: 'transparent', color: '#007185', fontSize: '13px', fontWeight: '600' }}
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {step === 2 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      
                      {/* UPI Option */}
                      <label 
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '6px',
                          border: paymentMethod === 'upi' ? '2px solid #e77600' : '1px solid #d5d9d9',
                          backgroundColor: paymentMethod === 'upi' ? '#fcfbf7' : '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'upi'} 
                          onChange={() => setPaymentMethod('upi')}
                          style={{ marginTop: '4px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <Smartphone size={18} color="#007185" />
                            <strong style={{ fontSize: '14px' }}>UPI (Google Pay, PhonePe, Paytm, BHIM, Amazon Pay UPI)</strong>
                          </div>
                          <span style={{ fontSize: '12px', color: '#067d62', fontWeight: '600' }}>
                            Instant payment with zero transaction fees
                          </span>

                          {paymentMethod === 'upi' && (
                            <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                              <input 
                                type="text" 
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="Enter UPI ID (e.g., mobilenumber@upi)"
                                style={{ flex: 1, padding: '6px 10px', borderRadius: '4px', border: '1px solid #a6a6a6', fontSize: '13px' }}
                              />
                              <button 
                                type="button" 
                                className="btn-secondary" 
                                style={{ padding: '6px 14px', fontSize: '12px' }}
                              >
                                Verify
                              </button>
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Credit/Debit/RuPay Option */}
                      <label 
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '6px',
                          border: paymentMethod === 'card' ? '2px solid #e77600' : '1px solid #d5d9d9',
                          backgroundColor: paymentMethod === 'card' ? '#fcfbf7' : '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'card'} 
                          onChange={() => setPaymentMethod('card')}
                          style={{ marginTop: '4px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <CreditCard size={18} color="#007185" />
                            <strong style={{ fontSize: '14px' }}>Credit / Debit Card (RuPay, Visa, MasterCard) & No Cost EMI</strong>
                          </div>

                          {paymentMethod === 'card' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px', marginTop: '10px' }}>
                              <input 
                                type="text" 
                                value={cardDetails.cardNumber}
                                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                              />
                              <input 
                                type="text" 
                                value={cardDetails.expDate}
                                onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                                style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                              />
                              <input 
                                type="password" 
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                style={{ padding: '6px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
                              />
                            </div>
                          )}
                        </div>
                      </label>

                      {/* Cash on Delivery */}
                      <label 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '12px',
                          borderRadius: '6px',
                          border: paymentMethod === 'cod' ? '2px solid #e77600' : '1px solid #d5d9d9',
                          backgroundColor: paymentMethod === 'cod' ? '#fcfbf7' : '#fff',
                          cursor: 'pointer'
                        }}
                      >
                        <input 
                          type="radio" 
                          name="paymentMethod" 
                          checked={paymentMethod === 'cod'} 
                          onChange={() => setPaymentMethod('cod')}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Banknote size={18} color="#067d62" />
                          <strong style={{ fontSize: '14px' }}>Cash on Delivery / Pay on Delivery (Cash, UPI or Card at doorstep)</strong>
                        </div>
                      </label>

                      <button 
                        onClick={() => setStep(3)}
                        className="btn-primary" 
                        style={{ alignSelf: 'flex-start', marginTop: '8px', padding: '8px 20px' }}
                      >
                        Use this payment method
                      </button>
                    </div>
                  ) : (
                    <p style={{ fontSize: '13.5px', color: '#565959', paddingLeft: '34px' }}>
                      {paymentMethod === 'upi' ? `UPI (${upiId})` : paymentMethod === 'card' ? 'RuPay / Visa Card ending in 5124' : 'Cash on Delivery'}
                    </p>
                  )}
                </div>

                {/* Step 3: Items Review */}
                <div 
                  style={{
                    border: '1px solid #d5d9d9',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                    <span 
                      style={{
                        backgroundColor: '#232f3e',
                        color: '#fff',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: '700'
                      }}
                    >
                      3
                    </span>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>Review items and delivery schedule</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img src={item.image} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                        <div style={{ flex: 1, fontSize: '13px' }}>
                          <p style={{ fontWeight: '600' }}>{item.title}</p>
                          <span style={{ color: '#565959' }}>Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <strong style={{ fontSize: '14px' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Order Summary */}
              <div>
                <div 
                  style={{
                    border: '1px solid #d5d9d9',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    position: 'sticky',
                    top: '0'
                  }}
                >
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-buy-now"
                    style={{ width: '100%', padding: '12px 0', fontSize: '15px', marginBottom: '14px' }}
                  >
                    Place your order
                  </button>

                  {/* Coupon Indicator if active */}
                  {appliedCoupon && (
                    <div 
                      style={{
                        backgroundColor: '#e6f4ea',
                        border: '1px solid #b7e1cd',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        marginBottom: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '12px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Tag size={14} color="#067d62" />
                        <span>Coupon <strong>{appliedCoupon.code}</strong></span>
                      </div>
                      <button 
                        onClick={removeCoupon}
                        style={{ background: 'transparent', color: '#cc0c39', fontSize: '11px', cursor: 'pointer', fontWeight: '700' }}
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', borderBottom: '1px solid #e7e7e7', paddingBottom: '8px' }}>
                    Order Summary
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Items Subtotal:</span>
                      <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#067d62' }}>
                        <span>Festive Discount:</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Delivery Fee:</span>
                      <span><strong style={{ color: '#067d62' }}>FREE</strong></span>
                    </div>

                    <div 
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        borderTop: '1px solid #e7e7e7',
                        paddingTop: '10px',
                        fontSize: '18px',
                        fontWeight: '800',
                        color: '#cc0c39'
                      }}
                    >
                      <span>Order Total:</span>
                      <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
