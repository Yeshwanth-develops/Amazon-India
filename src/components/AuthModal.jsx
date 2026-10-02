import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, user, setUser, showToast } = useShop();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    const userData = {
      isLoggedIn: true,
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      isPrime: true,
      address: {
        name: name.trim() || 'Valued Customer',
        street: '123 Market St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'United States'
      }
    };

    setUser(userData);
    setIsAuthOpen(false);
    showToast(`Welcome back, ${userData.name}!`);
  };

  const handleDemoSignIn = () => {
    const demoUser = {
      isLoggedIn: true,
      name: 'Yeshwanth Sunkara',
      email: 'yeshwanth.sunkara@example.in',
      isPrime: true,
      language: 'EN',
      address: {
        name: 'Yeshwanth Sunkara',
        street: 'Flat 402, Prestige Palms, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560038',
        country: 'India'
      }
    };
    setUser(demoUser);
    setIsAuthOpen(false);
    showToast('Signed in as Yeshwanth Sunkara (Prime Member)');
  };

  const handleSignOut = () => {
    setUser(null);
    setIsAuthOpen(false);
    showToast('Signed out successfully', 'info');
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthOpen(false)}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-xl)',
          padding: '30px 26px',
          animation: 'slideUp 0.25s ease-out',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
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

        {/* Amazon Logo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '28px', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#131921' }}>
            amazon<span style={{ color: '#ff9900' }}>.clone</span>
          </span>
        </div>

        {user ? (
          /* Already Signed In Profile View */
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#232f3e',
                color: '#fff',
                fontSize: '24px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}
            >
              {user.name.charAt(0)}
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f1111' }}>{user.name}</h3>
            <p style={{ fontSize: '13px', color: '#565959', marginBottom: '8px' }}>{user.email}</p>
            <span className="prime-tag" style={{ marginBottom: '20px', display: 'inline-block' }}>
              <span className="check">✓</span>prime member
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <button
                onClick={handleSignOut}
                className="btn-secondary"
                style={{ width: '100%', padding: '9px 0' }}
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Sign In / Sign Up Form */
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '16px', color: '#0f1111' }}>
              {isSignUp ? 'Create account' : 'Sign in'}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {isSignUp && (
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                    Your name
                  </label>
                  <input 
                    type="text" 
                    placeholder="First and last name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #888c8c', fontSize: '14px' }}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                  Email or mobile phone number
                </label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #888c8c', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', display: 'block', marginBottom: '4px' }}>
                  Password
                </label>
                <input 
                  type="password" 
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '4px', border: '1px solid #888c8c', fontSize: '14px' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ width: '100%', padding: '9px 0', fontSize: '14px', marginTop: '6px' }}
              >
                {isSignUp ? 'Verify email & Create' : 'Sign in'}
              </button>
            </form>

            {/* Quick Demo Sign In */}
            <div style={{ marginTop: '16px', borderTop: '1px solid #e7e7e7', paddingTop: '14px' }}>
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="btn-buy-now"
                style={{ width: '100%', padding: '8px 0', fontSize: '13px' }}
              >
                ⚡ Fast Demo Sign-In (Prime User)
              </button>
            </div>

            {/* Switch between Sign In / Sign Up */}
            <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12.5px', color: '#565959' }}>
              {isSignUp ? (
                <span>
                  Already have an account?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(false); }} style={{ fontWeight: '600' }}>
                    Sign in
                  </a>
                </span>
              ) : (
                <span>
                  New to Amazon?{' '}
                  <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(true); }} style={{ fontWeight: '600' }}>
                    Create your Amazon account
                  </a>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
