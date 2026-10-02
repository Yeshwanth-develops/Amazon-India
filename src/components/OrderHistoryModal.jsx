import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle, 
  RotateCcw, 
  Search, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OrderHistoryModal = () => {
  const { isOrdersOpen, setIsOrdersOpen, orders, addToCart } = useShop();
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(null);
  const [searchOrderQuery, setSearchOrderQuery] = useState('');

  if (!isOrdersOpen) return null;

  const filteredOrders = orders.filter(order => {
    if (!searchOrderQuery) return true;
    const q = searchOrderQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.items.some(i => i.title.toLowerCase().includes(q))
    );
  });

  return (
    <div className="modal-overlay" onClick={() => setIsOrdersOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '960px',
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
            <Package size={22} color="#007185" />
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f1111' }}>Your Orders</h2>
          </div>

          <button
            onClick={() => setIsOrdersOpen(false)}
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

        {/* Search Orders Bar */}
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e7e7e7', backgroundColor: '#fff' }}>
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <input 
              type="text"
              placeholder="Search all orders (e.g. Sony, Order ID)"
              value={searchOrderQuery}
              onChange={(e) => setSearchOrderQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                border: '1px solid #d5d9d9',
                fontSize: '14px'
              }}
            />
            <Search size={16} color="#767676" style={{ position: 'absolute', left: '12px', top: '11px' }} />
          </div>
        </div>

        {/* Orders List Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Package size={48} color="#d5d9d9" style={{ margin: '0 auto 12px' }} />
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111' }}>No orders found</h3>
              <p style={{ fontSize: '14px', color: '#565959' }}>Try searching with a different term or place a new order.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div 
                key={order.id}
                style={{
                  border: '1px solid #d5d9d9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundColor: '#ffffff'
                }}
              >
                {/* Order Meta Header */}
                <div 
                  style={{
                    backgroundColor: '#f0f2f2',
                    padding: '12px 20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '12.5px',
                    color: '#565959'
                  }}
                >
                  <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '600' }}>Order Placed</span>
                      <strong style={{ color: '#0f1111' }}>{order.date}</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '600' }}>Total</span>
                      <strong style={{ color: '#0f1111' }}>${order.total.toFixed(2)}</strong>
                    </div>
                    <div>
                      <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '600' }}>Ship To</span>
                      <span style={{ color: '#007185', fontWeight: '600' }}>{order.deliveryAddress ? order.deliveryAddress.split(',')[0] : 'You'}</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '11px', fontWeight: '600' }}>Order # {order.id}</span>
                    <a 
                      href="#" 
                      onClick={(e) => { e.preventDefault(); alert(`Invoice for Order #${order.id}\nItems: ${order.items.length}\nTotal: $${order.total.toFixed(2)}\nStatus: ${order.status}`); }}
                      style={{ fontSize: '12px', fontWeight: '600' }}
                    >
                      View Invoice
                    </a>
                  </div>
                </div>

                {/* Order Item Details & Tracking */}
                <div style={{ padding: '20px' }}>
                  
                  {/* Delivery Status Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <CheckCircle size={18} color="#067d62" />
                    <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#0f1111' }}>
                      {order.status === 'Delivered' ? 'Delivered' : 'Arriving Tomorrow'}
                    </h3>
                  </div>

                  {/* Tracking Stepper Bar (if tracking clicked or expanded) */}
                  <div 
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '6px',
                      padding: '14px 18px',
                      marginBottom: '20px',
                      border: '1px solid #e7e7e7'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '8px' }}>
                      {['Ordered', 'Shipped', 'Out for delivery', 'Delivered'].map((stepName, sIdx) => {
                        const isDone = order.status === 'Delivered' || sIdx <= 1;
                        return (
                          <div key={stepName} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                            <div 
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                backgroundColor: isDone ? '#067d62' : '#d5d9d9',
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '11px',
                                fontWeight: '700',
                                marginBottom: '4px'
                              }}
                            >
                              ✓
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: isDone ? '700' : '400', color: isDone ? '#0f1111' : '#767676' }}>
                              {stepName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items in this Order */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {order.items.map(item => (
                      <div key={item.id} style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            style={{ width: '70px', height: '70px', objectFit: 'contain', backgroundColor: '#f8fafc', borderRadius: '4px', padding: '4px' }}
                          />
                          <div>
                            <h4 style={{ fontSize: '14.5px', fontWeight: '600', color: '#0f1111', marginBottom: '4px' }}>
                              {item.title}
                            </h4>
                            <span style={{ fontSize: '12.5px', color: '#565959' }}>
                              Qty: {item.quantity || 1} • ${item.price?.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Order Actions */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
                          <button
                            onClick={() => addToCart(item, 1)}
                            className="btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12.5px' }}
                          >
                            <RotateCcw size={13} /> Buy it again
                          </button>
                          <button
                            onClick={() => alert(`Tracking details for item: ${item.title}\nCarrier: Amazon Logistics (AMZL)\nTracking #: ${order.trackingNumber}`)}
                            className="btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            Track Package
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};
