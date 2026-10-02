import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isInfo = toast.type === 'info';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        backgroundColor: '#131921',
        color: '#ffffff',
        padding: '14px 20px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '380px',
        animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        borderLeft: `4px solid ${isSuccess ? '#067d62' : isInfo ? '#00a8e1' : '#cc0c39'}`
      }}
    >
      {isSuccess && <CheckCircle2 size={20} color="#067d62" />}
      {isInfo && <Info size={20} color="#00a8e1" />}
      {!isSuccess && !isInfo && <AlertCircle size={20} color="#cc0c39" />}
      <span style={{ fontSize: '13.5px', fontWeight: '500', lineHeight: 1.4 }}>
        {toast.message}
      </span>
    </div>
  );
};
