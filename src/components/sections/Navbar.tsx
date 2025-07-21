'use client';

import { gsap } from 'gsap';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const buildTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Logo animation on hover
    const logo = logoRef.current;
    if (logo) {
      logo.addEventListener('mouseenter', () => {
        gsap.to(logo, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      logo.addEventListener('mouseleave', () => {
        gsap.to(logo, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }

    // "Let's Build" text animation on hover
    const buildText = buildTextRef.current;
    if (buildText) {
      buildText.addEventListener('mouseenter', () => {
        gsap.to(buildText, {
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      buildText.addEventListener('mouseleave', () => {
        gsap.to(buildText, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    }
  }, []);

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-effect shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="platform-container">
        <div className="flex justify-between items-center h-20">
          {/* Platform Name */}
          <a
            ref={logoRef}
            href="#"
            className="flex items-center gap-3 min-w-max text-white cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md text-2xl border-2 border-white/10">
              <span role="img" aria-label="rocket">🚀</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white leading-tight">The Builder Studio</span>
              <span className="text-blue-400 text-xs font-semibold leading-tight">Startup Studio</span>
            </div>
          </a>

          {/* Mobile menu button */}
          <button className="md:hidden flex items-center justify-center w-12 h-12 rounded-full bg-[#18181B] border border-white/10 text-white hover:bg-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </div>

      {/* Enhanced cyber border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
    </nav>
  );
}
