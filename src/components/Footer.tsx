import React from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#040e0f] text-[#ccd6d7] overflow-hidden select-none">

      {/* 1. TOP Silhouette Banner */}
      <div className="relative w-full h-[220px] md:h-[280px] overflow-hidden">
        {/* Warm sandy-beige background block */}
        <div className="absolute inset-0 bg-[#F4EBDB] z-0" />
        
        {/* Silhouette Image */}
        <img
          src="/footer_banner.png"
          alt="Kadambrayar Kayaking silhouette banner"
          className="absolute inset-0 w-full h-full object-cover z-10"
        />
        
        {/* Soft fading gradient to transition into the dark footer canvas */}
        <div className="absolute inset-x-0 bottom-0 h-[100px] bg-gradient-to-t from-[#040e0f] via-[#040e0f]/50 to-transparent z-20" />
      </div>

      {/* 2. MAIN FOOTER CONTENT COLUMNS with Awwwards Asymmetric Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 relative z-20 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* COLUMN 1 (Left - BIG): Brand & Short Emotional copy */}
          <div className="lg:col-span-6 text-left flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/logo.png" 
                  alt="Hooked & Cooked Logo" 
                  className="w-16 h-16 object-contain shrink-0" 
                />
                <div className="flex flex-col items-start leading-none text-left">
                  <h3 className="text-xl font-black tracking-[0.25em] text-white uppercase leading-none mb-1">
                    HOOKED & COOKED
                  </h3>
                  <span className="text-[9px] font-mono tracking-[0.3em] text-[#BFA054] uppercase block mt-0.5">
                    H & C BOAT CLUB
                  </span>
                </div>
              </div>
              
              <p className="text-[14px] text-white leading-relaxed font-sans font-light max-w-sm mb-3">
                River experiences through the hidden backwaters of Kochi.
              </p>
              
              <p className="text-[12px] text-gray-500 italic font-serif leading-relaxed max-w-sm">
                Slow paddles. Quiet waters. Meaningful journeys.
              </p>
            </div>

            {/* Clean minimal outline socials */}
            <div className="flex space-x-3 pt-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#BFA054]/20 hover:border-[#BFA054] text-[#ccd6d7] hover:text-[#BFA054] flex items-center justify-center transition-all duration-300">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#BFA054]/20 hover:border-[#BFA054] text-[#ccd6d7] hover:text-[#BFA054] flex items-center justify-center transition-all duration-300">
                <FacebookIcon />
              </a>
              <a href="https://www.youtube.com/@HookedandCooked-l1l" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-[#BFA054]/20 hover:border-[#BFA054] text-[#ccd6d7] hover:text-[#BFA054] flex items-center justify-center transition-all duration-300">
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* COLUMN 2 (Right): Minimal Contact info with CTA */}
          <div className="lg:col-span-6 text-left space-y-6 lg:pl-16 border-t lg:border-t-0 lg:border-l border-[#082124]/60 pt-8 lg:pt-0">
            <h4 className="text-[10px] font-mono text-[#BFA054] uppercase tracking-widest block font-bold">
              Directory
            </h4>

            <ul className="space-y-4 font-sans text-[12px] tracking-wide text-[#a5b9ba]">
              
              <li className="flex items-start gap-3">
                <MapPin size={14} className="text-[#BFA054] shrink-0 mt-0.5" />
                <span>Kadambrayar, Kochi, Kerala</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={13} className="text-[#BFA054] shrink-0" />
                <a href="tel:+919072611622" className="hover:text-white transition-colors tracking-widest">+91 90726 11622</a>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={13} className="text-[#BFA054] shrink-0" />
                <a href="mailto:hookedandcooked.riverdian@gmail.com" className="hover:text-white transition-colors lowercase">
                  hookedandcooked.riverdian@gmail.com
                </a>
              </li>

            </ul>

          </div>

        </div>

        {/* 3. BOTTOM COPYRIGHT ROW */}
        <div className="pt-8 mt-12 border-t border-[#082124]/50 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] font-mono tracking-widest text-gray-500 uppercase">
          <div>
            © 2026 H & C Boat Club. All Rights Reserved
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms & Conditions</a>
            <span>|</span>
            <span className="text-gray-600 font-sans tracking-widest text-[9px]">
            Designed & Developed by{" "}
            <a 
              href="https://codexorastudio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#BFA054]/80 hover:text-[#BFA054] transition-all duration-300 font-bold font-sans tracking-widest uppercase hover:underline decoration-[#BFA054]/40 underline-offset-4"
            >
              Codexora Studio
            </a>
          </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
