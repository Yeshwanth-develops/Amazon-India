import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AddressModal = () => {
  const { isAddressModalOpen, setIsAddressModalOpen, user, setUser, showToast } = useShop();
  const [zip, setZip] = useState(user?.address?.zip || '560038');
  const [city, setCity] = useState(user?.address?.city || 'Bengaluru');
  const [stateVal, setStateVal] = useState(user?.address?.state || 'Karnataka');

  if (!isAddressModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (user) {
      setUser({
        ...user,
        address: {
          ...user.address,
          city,
          state: stateVal,
          zip
        }
      });
    }
    setIsAddressModalOpen(false);
    showToast(`Delivery location set to ${city}, ${zip}`);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAddressModalOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-xl)',
          padding: '24px',
          animation: 'slideUp 0.25s ease-out',
          position: 'relative'
        }}
      >
        <button
          onClick={() => setIsAddressModalOpen(false)}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#565959'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <MapPin size={22} color="#007185" />
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111' }}>
            Choose your Indian location
          </h3>
        </div>

        <p style={{ fontSize: '13px', color: '#565959', marginBottom: '16px' }}>
          Select a delivery location to see product availability and delivery options across India.
        </p>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
              Indian 6-Digit PIN Code
            </label>
            <input 
              type="text" 
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="e.g. 560038, 110001, 400001"
              maxLength={6}
              style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6', fontSize: '14px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Bengaluru / Mumbai"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>State</label>
              <input 
                type="text" 
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                placeholder="Karnataka"
                style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #a6a6a6', fontSize: '14px' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '8px', padding: '9px 0' }}
          >
            Apply Delivery Location
          </button>
        </form>
      </div>
    </div>
  );
};
