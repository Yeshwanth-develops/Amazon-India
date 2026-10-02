import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ShoppingCart, 
  Zap, 
  ChevronRight, 
  ThumbsUp, 
  MessageSquare,
  Gift
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'rufus',
      text: 'Namaste! 🙏 I am **Rufus AI India**, your smart shopping & bargaining assistant for the Great Indian Festival. How can I help you save today?',
      suggestions: [
        'Best gifts under ₹1,000 🎁',
        'Compare OnePlus 12 vs iPhone 16 Pro 📱',
        'Secret festive coupon code 🎟️',
        'Best noise cancelling earbuds 🎧'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { addToCart, openProductDetail, applyCouponCode, showToast } = useShop();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response logic tailored for Indian e-commerce
    setTimeout(() => {
      let aiReply = '';
      let recommendedProducts = [];
      let extraCoupon = null;

      const q = query.toLowerCase();

      if (q.includes('gift') || q.includes('1000') || q.includes('1,000') || q.includes('diwali')) {
        aiReply = 'Here are our top trending festive gift hampers and tea collections under ₹1,000 with 1-day Prime delivery:';
        recommendedProducts = PRODUCTS.filter(p => p.price <= 1000).slice(0, 3);
      } else if (q.includes('oneplus') || q.includes('iphone') || q.includes('compare')) {
        aiReply = 'Here is a quick spec comparison:\n• **OnePlus 12**: Snapdragon 8 Gen 3, 5400mAh, 100W charging at ₹64,999 (Best Value & Fast Charging).\n• **iPhone 16 Pro**: Apple A18 Pro, Titanium build, 4K 120fps video at ₹1,29,900 (Top Video & Ecosystem).\n\nBoth are eligible for No Cost EMI & ₹4,000 Instant Bank Discount!';
        recommendedProducts = PRODUCTS.filter(p => p.id === 'prod-1' || p.id === 'prod-5');
      } else if (q.includes('coupon') || q.includes('discount') || q.includes('code') || q.includes('secret')) {
        aiReply = '🎉 Here is a secret VIP Festive Coupon for you: **RUFUSVIP10** for an extra 10% OFF on all electronics & fashion!';
        extraCoupon = { code: 'RUFUSVIP10', label: '10% Rufus AI Discount', type: 'discount', value: 10 };
        applyCouponCode('RUFUSVIP10', extraCoupon);
        showToast('Secret coupon RUFUSVIP10 applied!');
      } else if (q.includes('earbuds') || q.includes('boat') || q.includes('headphones') || q.includes('audio')) {
        aiReply = 'The **boAt Nirvana Ion ANC** is currently at an 80% discount during Great Indian Festival (₹2,499 with 120 hours battery life and 32dB ANC)!';
        recommendedProducts = PRODUCTS.filter(p => p.id === 'prod-2');
      } else {
        aiReply = `I found some blockbuster Great Indian Festival deals matching "${query}". Check these top picks with No Cost EMI & 10% Bank discount:`;
        recommendedProducts = PRODUCTS.slice(0, 2);
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'rufus',
          text: aiReply,
          products: recommendedProducts,
          coupon: extraCoupon,
          suggestions: [
            'How to get No Cost EMI? 💳',
            'Is free Prime delivery available? 🚚',
            'Spin the Diwali wheel 🎡'
          ]
        }
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating AI Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            zIndex: 950,
            background: 'linear-gradient(135deg, #131921 0%, #232f3e 50%, #ff9900 100%)',
            color: '#ffffff',
            padding: '12px 18px',
            borderRadius: '30px',
            boxShadow: '0 8px 25px rgba(255, 153, 0, 0.4), 0 4px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            border: '2px solid #febd69',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#febd69',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#131921'
            }}
          >
            <Bot size={20} />
          </div>
          <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
            <span style={{ fontSize: '11px', color: '#febd69', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Amazon Rufus AI
            </span>
            <div style={{ fontSize: '13.5px', fontWeight: '700' }}>Ask Shopping Genie 🪔</div>
          </div>
        </button>
      )}

      {/* AI Assistant Chat Modal / Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            width: '390px',
            maxWidth: '90vw',
            height: '560px',
            maxHeight: '85vh',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
            zIndex: 1050,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid #febd69',
            animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #131921 0%, #232f3e 100%)',
              color: '#ffffff',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '2px solid #febd69'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: '#febd69',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#131921'
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Rufus AI India <Sparkles size={14} color="#febd69" />
                </h4>
                <span style={{ fontSize: '11px', color: '#067d62', fontWeight: '700' }}>
                  ● Great Indian Festival Deals Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#f8fafc' }}>
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    backgroundColor: msg.sender === 'user' ? '#febd69' : '#ffffff',
                    color: '#0f1111',
                    fontSize: '13.5px',
                    lineHeight: 1.45,
                    boxShadow: 'var(--shadow-sm)',
                    border: msg.sender === 'rufus' ? '1px solid #e7e7e7' : 'none',
                    whiteSpace: 'pre-line'
                  }}
                >
                  {msg.text}
                </div>

                {/* Embedded Products Cards in Chat */}
                {msg.products && msg.products.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', width: '90%' }}>
                    {msg.products.map(p => (
                      <div
                        key={p.id}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #d5d9d9',
                          borderRadius: '8px',
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <img 
                          src={p.image} 
                          alt="" 
                          style={{ width: '42px', height: '42px', objectFit: 'contain' }} 
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h6 
                            onClick={() => openProductDetail(p)}
                            style={{ fontSize: '12px', fontWeight: '700', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer', color: '#007185' }}
                          >
                            {p.title}
                          </h6>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <strong style={{ fontSize: '13px', color: '#0f1111' }}>₹{p.price.toLocaleString('en-IN')}</strong>
                            {p.originalPrice && (
                              <span style={{ fontSize: '11px', color: '#565959', textDecoration: 'line-through' }}>
                                ₹{p.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="btn-primary"
                          style={{ padding: '4px 8px', fontSize: '11px', whiteSpace: 'nowrap' }}
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions Pills */}
                {msg.suggestions && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => handleSendMessage(sug)}
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #d5d9d9',
                          borderRadius: '16px',
                          padding: '5px 10px',
                          fontSize: '11.5px',
                          color: '#007185',
                          fontWeight: '600',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#565959', fontSize: '12px' }}>
                <Bot size={16} color="#febd69" />
                <span>Rufus AI is finding the best deals...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{
              padding: '10px 14px',
              backgroundColor: '#ffffff',
              borderTop: '1px solid #e7e7e7',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask Rufus (e.g. Compare, secret coupon...)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '20px',
                border: '1px solid #d5d9d9',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#febd69',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#131921'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
