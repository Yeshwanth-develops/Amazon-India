import React from 'react';
import { Globe, ChevronUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#232f3e', color: '#ffffff', marginTop: 'auto' }}>
      
      {/* Back to top banner */}
      <div 
        onClick={scrollToTop}
        style={{
          backgroundColor: '#37475a',
          color: '#ffffff',
          textAlign: 'center',
          padding: '15px 0',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#485769'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#37475a'}
      >
        <ChevronUp size={16} />
        <span>Back to top</span>
      </div>

      {/* 4-Column Indian Navigation Links */}
      <div 
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px'
        }}
      >
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#fff' }}>
            Get to Know Us
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#dddddd' }}>
            <li><a href="#" style={{ color: '#dddddd' }}>About Amazon.in</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Careers in India</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Press Releases</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Amazon Science</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Amazon Cares & CSR</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#fff' }}>
            Connect with Us
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#dddddd' }}>
            <li><a href="#" style={{ color: '#dddddd' }}>Facebook India</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Twitter / X</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Instagram India</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#fff' }}>
            Make Money with Us
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#dddddd' }}>
            <li><a href="#" style={{ color: '#dddddd' }}>Sell on Amazon India</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Sell under Amazon Accelerator</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Protect and Build Your Brand</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Amazon Global Selling</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Become an Indian Affiliate</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Fulfilment by Amazon (FBA)</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#fff' }}>
            Let Us Help You
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#dddddd' }}>
            <li><a href="#" style={{ color: '#dddddd' }}>COVID-19 and Amazon</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Your Account</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Returns Centre</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>100% Purchase Protection</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Amazon App Download</a></li>
            <li><a href="#" style={{ color: '#dddddd' }}>Customer Support 24/7</a></li>
          </ul>
        </div>
      </div>

      {/* Middle Brand & Language Bar */}
      <div 
        style={{
          borderTop: '1px solid #3a4553',
          padding: '24px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', fontFamily: 'var(--font-heading)' }}>
            amazon<span style={{ color: '#febd69' }}>.in</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ border: '1px solid #848688', borderRadius: '3px', padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} />
            <span>English / हिन्दी</span>
          </div>
          <div style={{ border: '1px solid #848688', borderRadius: '3px', padding: '6px 12px', fontSize: '13px' }}>
            <span>₹ INR - Indian Rupee</span>
          </div>
          <div style={{ border: '1px solid #848688', borderRadius: '3px', padding: '6px 12px', fontSize: '13px' }}>
            <span>🇮🇳 India</span>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div 
        style={{
          backgroundColor: '#131921',
          padding: '24px 20px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#999999'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <a href="#" style={{ color: '#dddddd' }}>Conditions of Use & Sale</a>
          <a href="#" style={{ color: '#dddddd' }}>Privacy Notice</a>
          <a href="#" style={{ color: '#dddddd' }}>Interest-Based Ads</a>
        </div>
        <p>© 1996-2026, Amazon.com, Inc. or its affiliates (Amazon.in Great Indian Festival Edition)</p>
      </div>

    </footer>
  );
};
