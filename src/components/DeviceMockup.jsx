/* ═══════════════════════════════════════════════════════════
   DeviceMockup — CSS-only device frames
   Types: "laptop" | "phone" | "dual" (carousel) | "none"
   ═══════════════════════════════════════════════════════════ */
import { useState, useCallback, useEffect } from 'react';
import { Monitor, Smartphone } from 'lucide-react';

// Global timer to ensure ALL carousels switch perfectly at the exact same time
let carouselTimerInitialized = false;
const CAROUSEL_EVENT = 'mockup-carousel-tick';

if (typeof window !== 'undefined' && !carouselTimerInitialized) {
  carouselTimerInitialized = true;
  let currentSlide = 0;
  setInterval(() => {
    currentSlide = currentSlide === 0 ? 1 : 0;
    window.dispatchEvent(new CustomEvent(CAROUSEL_EVENT, { detail: currentSlide }));
  }, 3000);
}

export default function DeviceMockup({ type = 'laptop', src, mobileSrc, alt = 'Screenshot' }) {
  const actualMobileSrc = mobileSrc || src;
  const [activeSlide, setActiveSlide] = useState(0); // 0 = desktop, 1 = mobile

  // Synchronize with the global timer
  useEffect(() => {
    if (type !== 'dual') return;
    
    const handleTick = (e) => {
      setActiveSlide(e.detail);
    };

    window.addEventListener(CAROUSEL_EVENT, handleTick);
    return () => window.removeEventListener(CAROUSEL_EVENT, handleTick);
  }, [type]);

  const handleToggle = useCallback((e, index) => {
    e.stopPropagation();
    setActiveSlide(index);
  }, []);

  if (type === 'none') {
    return (
      <div className="mockup-none">
        <img src={src} alt={alt} loading="lazy" />
      </div>
    );
  }

  if (type === 'phone') {
    return (
      <div className="mockup-phone">
        <div className="mockup-phone-frame">
          <div className="mockup-phone-notch">
            <div className="mockup-phone-camera" />
          </div>
          <div className="mockup-phone-screen">
            <img src={actualMobileSrc} alt={alt} loading="lazy" />
          </div>
          <div className="mockup-phone-home" />
        </div>
      </div>
    );
  }

  if (type === 'dual') {
    return (
      <div className="mockup-carousel">
        {/* Carousel slides */}
        <div className="mockup-carousel-track">
          {/* Slide 0: Desktop */}
          <div className={`mockup-carousel-slide ${activeSlide === 0 ? 'active' : ''}`}>
            <div className="mockup-laptop">
              <div className="mockup-laptop-screen">
                <div className="mockup-laptop-topbar">
                  <span className="mockup-dot red" />
                  <span className="mockup-dot yellow" />
                  <span className="mockup-dot green" />
                </div>
                <div className="mockup-laptop-viewport">
                  <img src={src} alt={`${alt} Desktop`} loading="lazy" />
                </div>
              </div>
              <div className="mockup-laptop-base">
                <div className="mockup-laptop-notch" />
              </div>
            </div>
          </div>

          {/* Slide 1: Mobile */}
          <div className={`mockup-carousel-slide ${activeSlide === 1 ? 'active' : ''}`}>
            <div className="mockup-phone mockup-phone-carousel">
              <div className="mockup-phone-frame">
                <div className="mockup-phone-notch">
                  <div className="mockup-phone-camera" />
                </div>
                <div className="mockup-phone-screen">
                  <img src={actualMobileSrc} alt={`${alt} Mobile`} loading="lazy" />
                </div>
                <div className="mockup-phone-home" />
              </div>
            </div>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="mockup-carousel-controls">
          <button
            className={`mockup-carousel-btn ${activeSlide === 0 ? 'active' : ''}`}
            onClick={(e) => handleToggle(e, 0)}
            aria-label="Ver versão Desktop"
          >
            <Monitor size={14} />
            <span>Desktop</span>
          </button>
          <button
            className={`mockup-carousel-btn ${activeSlide === 1 ? 'active' : ''}`}
            onClick={(e) => handleToggle(e, 1)}
            aria-label="Ver versão Mobile"
          >
            <Smartphone size={14} />
            <span>Mobile</span>
          </button>
        </div>
      </div>
    );
  }

  // Default: laptop
  return (
    <div className="mockup-laptop">
      <div className="mockup-laptop-screen">
        <div className="mockup-laptop-topbar">
          <span className="mockup-dot red" />
          <span className="mockup-dot yellow" />
          <span className="mockup-dot green" />
        </div>
        <div className="mockup-laptop-viewport">
          <img src={src} alt={alt} loading="lazy" />
        </div>
      </div>
      <div className="mockup-laptop-base">
        <div className="mockup-laptop-notch" />
      </div>
    </div>
  );
}
