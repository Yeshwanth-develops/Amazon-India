import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setSelectedCategory, setCurrentView, setIsPrimeModalOpen } = useShop();

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentSlide];

  const handleCtaClick = () => {
    if (slide.category === 'Prime') {
      setIsPrimeModalOpen(true);
    } else {
      setSelectedCategory(slide.category);
      setCurrentView('search');
    }
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1540px',
        margin: '0 auto',
        height: '480px',
        overflow: 'hidden',
        userSelect: 'none'
      }}
    >
      {/* Background Image with smooth transition */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: idx === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top'
          }}
        >
          {/* Gradient Overlay bottom blend */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(180deg, rgba(19, 25, 33, 0.25) 0%, rgba(19, 25, 33, 0.1) 40%, #e3e6e6 98%)'
            }}
          />
        </div>
      ))}

      {/* Slide Content Caption */}
      <div 
        style={{
          position: 'absolute',
          top: '40px',
          left: '48px',
          maxWidth: '560px',
          zIndex: 10,
          color: '#ffffff',
          textShadow: '0 2px 10px rgba(0,0,0,0.7)',
          animation: 'fadeIn 0.5s ease-out'
        }}
      >
        <span 
          style={{
            backgroundColor: 'rgba(0, 168, 225, 0.9)',
            color: '#fff',
            padding: '4px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '12px'
          }}
        >
          <Sparkles size={14} /> Amazon Exclusive
        </span>
        <h1 
          style={{
            fontSize: '34px',
            fontWeight: '800',
            lineHeight: 1.15,
            marginBottom: '10px',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {slide.title}
        </h1>
        <p style={{ fontSize: '15px', fontWeight: '400', marginBottom: '20px', color: '#f0f0f0' }}>
          {slide.subtitle}
        </p>
        <button
          onClick={handleCtaClick}
          className="btn-primary"
          style={{
            padding: '10px 24px',
            fontSize: '15px',
            fontWeight: '700',
            backgroundColor: '#febd69',
            color: '#111'
          }}
        >
          {slide.ctaText} →
        </button>
      </div>

      {/* Navigation Arrow Left */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          top: '35%',
          left: '12px',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
          width: '42px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(2px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.65)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronLeft size={30} />
      </button>

      {/* Navigation Arrow Right */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          top: '35%',
          right: '12px',
          zIndex: 20,
          background: 'rgba(255, 255, 255, 0.65)',
          border: '1px solid rgba(0,0,0,0.1)',
          borderRadius: '4px',
          width: '42px',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111',
          transition: 'all 0.2s ease',
          backdropFilter: 'blur(2px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#ffffff';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.65)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ChevronRight size={30} />
      </button>

      {/* Slide Indicators */}
      <div 
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20
        }}
      >
        {HERO_SLIDES.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: idx === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: idx === currentSlide ? '#febd69' : 'rgba(255, 255, 255, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};
