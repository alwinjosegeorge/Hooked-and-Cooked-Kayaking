import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall } from 'lucide-react';

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" stroke="none" {...props}>
    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.414 0-6.19-2.776-6.19-6.19 0-3.414 2.776-6.19 6.19-6.19 1.543 0 2.95.57 4.032 1.503l3.057-3.057C19.263 2.058 15.932 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 11.24-4.542 11.24-11.24 0-.765-.082-1.503-.223-1.955H12.24z"></path>
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tours', href: '#popular-tours' },
    { name: 'About', href: '#expeditions' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Book', href: '#booking-section' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const targetId = href.substring(1);
      const el = document.getElementById(targetId || 'hero');
      if (el) {
        const lenisInstance = (window as any).lenis;
        if (lenisInstance && typeof lenisInstance.scrollTo === 'function') {
          lenisInstance.scrollTo(el, { duration: 1.8 });
        } else {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Don't hide the navbar if the mobile menu is active
      if (mobileMenuOpen) return;

      const currentScrollY = window.scrollY;

      // Capsule styling trigger
      setScrolled(currentScrollY > 50);

      // Hide on scroll down, show on scroll up
      if (currentScrollY <= 50) {
        setVisible(true);
      } else if (window.innerWidth < 1024) {
        // On mobile, once scrolled past 50px, keep it hidden completely until scrolled back to top
        setVisible(false);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === 'popular-tours') setActiveSection('Tours');
          else if (id === 'expeditions') setActiveSection('About');
          else if (id === 'gallery') setActiveSection('Gallery');
          else if (id === 'reviews') setActiveSection('Reviews');
          else if (id === 'booking-section') setActiveSection('Book');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['popular-tours', 'expeditions', 'gallery', 'reviews', 'booking-section'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [lastScrollY, mobileMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none select-none">
      <nav
        className={`w-full flex flex-col justify-between items-center pointer-events-auto relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          scrolled 
            ? 'w-[92%] max-w-5xl px-5 sm:px-8 py-3.5 mt-5 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-[#040e0f]/75 backdrop-blur-2xl'
            : 'w-full max-w-7xl px-5 sm:px-10 py-4 sm:py-6 mt-0 rounded-none border-transparent bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          
          {/* Logo Brand Emblem with animated wave */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/logo.png" 
              alt="Hooked & Cooked Logo" 
              className={`object-contain transition-all duration-300 shrink-0 ${
                scrolled ? 'w-10 h-10' : 'w-12 h-12 sm:w-14 sm:h-14'
              }`}
            />
            <div className={`flex flex-col items-start leading-none text-left transition-all duration-300 ${
              scrolled ? 'w-0 opacity-0 overflow-hidden md:w-auto md:opacity-100' : 'w-auto opacity-100'
            }`}>
              <span className="text-xs font-black tracking-widest text-white uppercase group-hover:text-glacier-cyan transition-colors duration-300">
                HOOKED & COOKED
              </span>
              <span className="text-[7px] font-mono tracking-[0.25em] text-glacier-cyan/55 uppercase mt-0.5">
                H & C BOAT CLUB
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-10 relative">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.name;
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative py-1 text-[10px] font-mono tracking-[0.25em] uppercase transition-colors duration-300 flex flex-col items-center group/item ${
                    isActive ? 'text-white font-black' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  
                  {/* Subtle glowing active underline sliding below */}
                  {isActive && (
                    <motion.span
                      layoutId="active-underline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-glacier-cyan shadow-[0_1px_5px_rgba(0,245,255,0.4)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Elegant magnet underline hover effect */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white/40 transition-all duration-300 group-hover/item:w-1/2" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Call CTA & Social Links (Desktop) */}
          <div className="hidden lg:flex items-center space-x-5 shrink-0">
            <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
              <a href="https://www.youtube.com/@HookedandCooked-l1l" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-glacier-cyan transition-colors duration-300 p-1.5 rounded-full hover:bg-white/5">
                <YoutubeIcon />
              </a>
              <a href="https://google.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-glacier-cyan transition-colors duration-300 p-1.5 rounded-full hover:bg-white/5">
                <GoogleIcon />
              </a>
            </div>

            <a
              href="#booking-section"
              onClick={(e) => handleLinkClick(e, '#booking-section')}
              className="relative px-6 py-2.5 rounded-full text-[9px] font-mono tracking-[0.25em] uppercase text-white overflow-hidden group transition-all duration-300 border border-white/20 hover:border-glacier-cyan hover:shadow-[0_0_15px_rgba(0,245,255,0.2)]"
            >
              <div className="absolute inset-0 bg-glacier-cyan translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-10" />
              <span className="relative z-10 flex items-center gap-1.5 group-hover:text-[#040e0f] transition-colors duration-300 font-bold">
                <PhoneCall size={10} />
                Book a Paddle
              </span>
            </a>
          </div>

          {/* Hamburger (Mobile Toggle) */}
          <div className="flex items-center lg:hidden pr-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white focus:outline-none transition-colors duration-300 p-2 rounded-full hover:bg-white/5"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Dynamic Expanding Mobile Overlay Dynamic Island */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full overflow-hidden flex flex-col pt-4 pb-2 space-y-2 border-t border-white/5 mt-3 lg:hidden"
            >
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`px-5 py-3 rounded-2xl text-[10px] font-mono tracking-[0.25em] uppercase transition-all flex items-center justify-between ${
                      isActive ? 'bg-glacier-cyan text-[#040e0f] font-bold shadow-md' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#040e0f]" />
                    )}
                  </a>
                );
              })}

              <div className="h-[1px] bg-white/5 w-full my-2" />

              <div className="flex justify-between items-center px-4 py-2">
                <div className="flex space-x-3">
                  <a href="https://www.youtube.com/@HookedandCooked-l1l" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-glacier-cyan p-1.5 rounded-full hover:bg-white/5"><YoutubeIcon /></a>
                  <a href="https://google.com" className="text-gray-400 hover:text-glacier-cyan p-1.5 rounded-full hover:bg-white/5"><GoogleIcon /></a>
                </div>
                <a
                  href="#booking-section"
                  onClick={(e) => handleLinkClick(e, '#booking-section')}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-glacier-cyan hover:text-[#040e0f] text-[9px] font-mono tracking-[0.2em] text-white uppercase hover:scale-103 transition-all font-bold border border-white/10"
                >
                  <PhoneCall size={10} />
                  Book a Paddle
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
