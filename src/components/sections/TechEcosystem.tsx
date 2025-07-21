'use client';

import React from 'react';

export default function TechEcosystem() {
  return (
    <>
      {/* Floating tech icons */}
      <div className="tech-ecosystem">
        {/* Database/Server icons */}
        <div className="floating-tech-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-400">
            <path d="M4 7V17C4 19.2091 5.79086 21 8 21H16C18.2091 21 20 19.2091 20 17V7C20 4.79086 18.2091 3 16 3H8C5.79086 3 4 4.79086 4 7Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M9 16H15" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </div>

        {/* Code/Development icons */}
        <div className="floating-tech-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-purple-400">
            <path d="M8 6L3 12L8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 6L21 12L16 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 4L10 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* API/Connection icons */}
        <div className="floating-tech-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Cloud/Infrastructure icons */}
        <div className="floating-tech-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
            <path d="M18 10H16.74C16.3659 7.49025 14.2353 5.5 11.5 5.5C8.46243 5.5 6 7.96243 6 11C6 11.4142 5.66421 11.75 5.25 11.75C4.83579 11.75 4.5 11.4142 4.5 11C4.5 6.85786 7.85786 3.5 12 3.5C15.0376 3.5 17.5 5.96243 17.5 9C17.5 9.41421 17.1642 9.75 16.75 9.75H15.5C15.0858 9.75 14.75 10.0858 14.75 10.5C14.75 10.9142 15.0858 11.25 15.5 11.25H18C18.4142 11.25 18.75 10.9142 18.75 10.5C18.75 10.0858 18.4142 10 18 10Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 12.5C9.51472 12.5 7.5 14.5147 7.5 17C7.5 19.4853 9.51472 21.5 12 21.5C14.4853 21.5 16.5 19.4853 16.5 17C16.5 14.5147 14.4853 12.5 12 12.5Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Analytics/Data icons */}
        <div className="floating-tech-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-blue-500">
            <path d="M3 3V21H21" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M7 14L10 11L14 15L21 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M21 8H17" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M21 8V12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Security/Shield icons */}
        <div className="floating-tech-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-400">
            <path d="M12 2L3 7V12C3 16.4183 6.58172 20 11 20H13C17.4183 20 21 16.4183 21 12V7L12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Light effects and glows */}
        <div className="tech-glow" />
        <div className="tech-glow" />
        <div className="tech-glow" />
      </div>

      {/* Subtle scan line effect */}
      <div className="scan-line-effect" />

      {/* Additional tech ecosystem elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-1">
        {/* Circuit board patterns */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" className="text-blue-400">
            <path d="M10 10H30V30H10V10Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M70 70H90V90H70V70Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M10 70H30V90H10V70Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M70 10H90V30H70V10Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M30 20H70" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M30 80H70" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M20 30V70" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M80 30V70" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>

        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 opacity-5">
          <svg viewBox="0 0 100 100" fill="none" className="text-purple-400">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
            <path d="M30 50H70" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M50 30V70" stroke="currentColor" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Data flow lines */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" fill="none" className="text-cyan-400">
            <path d="M10 50H90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            <path d="M50 10V90" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
        </div>

        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 opacity-8">
          <svg viewBox="0 0 100 100" fill="none" className="text-emerald-400">
            <path d="M20 20L80 80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"/>
            <path d="M80 20L20 80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3"/>
            <circle cx="50" cy="50" r="2" fill="currentColor"/>
          </svg>
        </div>
      </div>
    </>
  );
}
