import React, { useState } from 'react';
import { X, Sparkles, Gift, Copy, Check, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WHEEL_PRIZES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const SpinAndWinModal = () => {
  const { isSpinModalOpen, setIsSpinModalOpen, applyCouponCode, showToast } = useShop();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);

  if (!isSpinModalOpen) return null;

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setWonPrize(null);

    // Random prize index between 0 and WHEEL_PRIZES.length - 1
    const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
    const sliceAngle = 360 / WHEEL_PRIZES.length;
    // Extra full spins (5-8 spins) + slice alignment
    const extraSpins = 360 * 6;
    // Align needle at top
    const targetAngle = extraSpins + (360 - prizeIndex * sliceAngle - sliceAngle / 2);

    const finalRotation = rotation + targetAngle;
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      const selected = WHEEL_PRIZES[prizeIndex];
      setWonPrize(selected);
      applyCouponCode(selected.code, selected);
      
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
      showToast(`Congratulations! You won: ${selected.label}`);
    }, 4000);
  };

  const handleCopyCode = () => {
    if (wonPrize?.code) {
      navigator.clipboard?.writeText(wonPrize.code);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsSpinModalOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #131921 0%, #232f3e 50%, #4a154b 100%)',
          color: '#ffffff',
          width: '100%',
          maxWidth: '540px',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(255, 153, 0, 0.3)',
          padding: '28px 24px',
          textAlign: 'center',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
          border: '2px solid #febd69'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSpinModalOpen(false)}
          style={{
            position: 'absolute',
            right: '16px',
            top: '16px',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>

        {/* Festive Header */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(254, 189, 105, 0.2)', padding: '4px 12px', borderRadius: '20px', border: '1px solid #febd69', marginBottom: '8px' }}>
          <Sparkles size={14} color="#febd69" />
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#febd69', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
            Great Indian Festival 2026
          </span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '900', fontFamily: 'var(--font-heading)', color: '#ffffff', marginBottom: '4px' }}>
          Diwali Spin & Win Jackpot 🪔
        </h2>
        <p style={{ fontSize: '13px', color: '#dddddd', marginBottom: '20px' }}>
          Spin the wheel to unlock exclusive Amazon Pay Cashback & Festive discounts!
        </p>

        {/* Wheel Container */}
        <div style={{ position: 'relative', width: '280px', height: '280px', margin: '0 auto 24px' }}>
          
          {/* Wheel Pointer */}
          <div 
            style={{
              position: 'absolute',
              top: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 30,
              width: 0,
              height: 0,
              borderLeft: '14px solid transparent',
              borderRight: '14px solid transparent',
              borderTop: '24px solid #ff9900',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
            }}
          />

          {/* Rotating Wheel */}
          <div 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '6px solid #febd69',
              boxShadow: '0 0 25px rgba(254, 189, 105, 0.6), inset 0 0 15px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden',
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 4s cubic-bezier(0.15, 0.9, 0.2, 1)' : 'none',
              background: '#232f3e'
            }}
          >
            {WHEEL_PRIZES.map((prize, idx) => {
              const angle = (360 / WHEEL_PRIZES.length) * idx;
              return (
                <div
                  key={prize.id}
                  style={{
                    position: 'absolute',
                    width: '50%',
                    height: '50%',
                    top: '0',
                    right: '0',
                    transformOrigin: '0% 100%',
                    transform: `rotate(${angle}deg) skewY(-30deg)`,
                    backgroundColor: prize.color,
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}
                >
                  <span 
                    style={{
                      position: 'absolute',
                      left: '20px',
                      bottom: '20px',
                      transform: 'skewY(30deg) rotate(45deg)',
                      fontSize: '11px',
                      fontWeight: '800',
                      color: '#ffffff',
                      textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {prize.label}
                  </span>
                </div>
              );
            })}

            {/* Wheel Center Cap */}
            <div 
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                backgroundColor: '#131921',
                border: '3px solid #febd69',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
                zIndex: 10
              }}
            >
              <Trophy size={20} color="#febd69" />
            </div>
          </div>
        </div>

        {/* Action Button / Winner Card */}
        {wonPrize ? (
          <div 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              padding: '16px',
              border: '1px solid #febd69',
              animation: 'fadeIn 0.3s ease-out'
            }}
          >
            <div style={{ fontSize: '13px', color: '#febd69', fontWeight: '700' }}>YOU WON!</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', margin: '4px 0 10px' }}>
              {wonPrize.label}
            </h3>
            
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: '#131921',
                padding: '8px 16px',
                borderRadius: '6px',
                marginBottom: '12px',
                border: '1px dashed #febd69'
              }}
            >
              <span style={{ fontSize: '14px', fontFamily: 'monospace', fontWeight: '700', letterSpacing: '1px', color: '#febd69' }}>
                {wonPrize.code}
              </span>
              <button
                onClick={handleCopyCode}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px'
                }}
              >
                {hasCopied ? <Check size={14} color="#067d62" /> : <Copy size={14} />}
                {hasCopied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p style={{ fontSize: '11px', color: '#067d62', fontWeight: '600' }}>
              ✓ Coupon automatically applied to your checkout cart!
            </p>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="btn-primary"
            style={{
              width: '100%',
              maxWidth: '320px',
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: '800',
              backgroundColor: spinning ? '#767676' : '#febd69',
              boxShadow: '0 4px 15px rgba(254, 189, 105, 0.5)'
            }}
          >
            {spinning ? 'SPINNING...' : '🎰 SPIN THE LUCKY WHEEL NOW'}
          </button>
        )}

      </div>
    </div>
  );
};
