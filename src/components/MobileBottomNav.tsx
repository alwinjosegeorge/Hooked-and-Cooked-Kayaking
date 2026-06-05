import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Custom outline icons to match luxury reference design exactly
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="22" 
    height="22" 
    stroke={active ? "#73E6D8" : "currentColor"} 
    strokeWidth="1.8" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="transition-colors duration-300"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const CalendarIcon = ({ active }: { active: boolean }) => {
  const color = active ? "#73E6D8" : "currentColor";
  return (
    <svg 
      viewBox="0 0 24 24" 
      width="22" 
      height="22" 
      stroke={color} 
      strokeWidth="1.8" 
      fill="none" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="transition-colors duration-300"
    >
      <rect x="3" y="4" width="18" height="18" rx="4" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <circle cx="8" cy="13" r="1.1" fill={color} stroke="none" />
      <circle cx="12" cy="13" r="1.1" fill={color} stroke="none" />
      <circle cx="16" cy="13" r="1.1" fill={color} stroke="none" />
      <circle cx="8" cy="17" r="1.1" fill={color} stroke="none" />
      <circle cx="12" cy="17" r="1.1" fill={color} stroke="none" />
      <circle cx="16" cy="17" r="1.1" fill={color} stroke="none" />
    </svg>
  );
};

const WhatsAppIcon = ({ active }: { active: boolean }) => (
  <svg 
    viewBox="0 0 24 24" 
    width="22" 
    height="22" 
    stroke={active ? "#73E6D8" : "currentColor"} 
    strokeWidth="1.8" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className="transition-colors duration-300"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    <path d="M15.2 13.9c-.2-.1-.7-.4-.8-.4-.1 0-.2-.1-.3 0l-.4.5c-.1.1-.2.1-.4 0-.2-.1-.8-.3-1.5-1-.5-.5-.9-1.1-1-1.2-.1-.2 0-.3.1-.4l.3-.4c.1-.1.1-.2.1-.3l-.4-.8c-.1-.2-.2-.2-.3-.2l-.3.1c-.2.2-.4.4-.4.8 0 .8.6 1.7 1.5 2.5 1 1 2.2 1.6 3.1 1.6.5 0 .9-.2 1.1-.5l.1-.3c-.1-.1-.2-.1-.3-.2z" fill={active ? "#73E6D8" : "currentColor"} stroke="none" className="transition-all duration-300" />
  </svg>
);

const TABS = [
  { id: 'home' as const, label: 'Home', icon: HomeIcon, action: 'scroll-hero' },
  { id: 'book' as const, label: 'Book Now', icon: CalendarIcon, action: 'scroll-booking' },
  { id: 'whatsapp' as const, label: 'WhatsApp', icon: WhatsAppIcon, action: 'link-whatsapp' },
];

export default function MobileBottomNav() {
  const [activeTab, setActiveTab] = useState<'home' | 'book' | 'whatsapp'>('home');
  const lastClickTime = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(true);

  // Update active state based on scroll height
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Hide navigation bar when close to the bottom (footer view)
      const shouldBeVisible = scrollY + windowHeight < docHeight - 120;
      setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));

      // Don't override user selection if they clicked recently
      if (Date.now() - lastClickTime.current < 2000) return;

      const bookingEl = document.getElementById('booking-section');
      if (bookingEl) {
        const rect = bookingEl.getBoundingClientRect();
        const nextTab = rect.top < window.innerHeight * 0.6 ? 'book' : 'home';
        setActiveTab(prev => {
          if (prev !== nextTab && prev !== 'whatsapp') return nextTab;
          return prev;
        });
      } else {
        if (scrollY < 250) {
          setActiveTab(prev => {
            if (prev !== 'home' && prev !== 'whatsapp') return 'home';
            return prev;
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const lenisInstance = (window as any).lenis;
      if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
        lenisInstance.scrollTo(el, { duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleTabClick = (tabId: 'home' | 'book' | 'whatsapp', action: string) => {
    lastClickTime.current = Date.now();
    setActiveTab(tabId);

    if (action === 'scroll-hero') {
      handleScrollTo('hero');
    } else if (action === 'scroll-booking') {
      handleScrollTo('booking-section');
    } else if (action === 'link-whatsapp') {
      const message = "Hello,\n\nI would like to reserve an adventure.\n\nThank you.";
      window.open(`https://wa.me/919072611622?text=${encodeURIComponent(message)}`, '_blank');
      // Slide back to the active page section after a delay
      setTimeout(() => {
        const bookingEl = document.getElementById('booking-section');
        if (bookingEl) {
          const rect = bookingEl.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.6) {
            setActiveTab('book');
            return;
          }
        }
        setActiveTab(window.scrollY < 250 ? 'home' : 'book');
      }, 2000);
    }
  };

  const activeTabIdx = TABS.findIndex(t => t.id === activeTab);

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#091F27]/96 backdrop-blur-xl border-t border-white/10"
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        opacity: isVisible ? 1 : 0,
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
        paddingTop: '8px',
      }}
    >
      {/* Sliding indicator line at the top border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none">
        <motion.div
          className="h-full bg-[#73E6D8] rounded-b-[2px]"
          animate={{
            x: `${activeTabIdx * 100}%`,
          }}
          style={{
            width: '33.333%',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      </div>

      <div className="relative w-full flex items-center justify-around h-[56px]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, tab.action)}
              role="tab"
              aria-selected={isActive}
              className="flex-1 flex flex-col items-center justify-center h-full transition-colors duration-300 focus:outline-none relative"
              style={{
                color: isActive ? '#73E6D8' : 'rgba(255, 255, 255, 0.45)',
              }}
            >
              <div 
                className="transition-transform duration-300"
                style={{
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                <tab.icon active={isActive} />
              </div>
              <span className="text-[10px] font-sans font-bold tracking-wider uppercase mt-1 transition-all duration-300">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
