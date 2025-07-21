'use client';

import React from 'react';

const navLinks = [
  { title: 'Career', href: '#' },
  { title: 'Contact Us', href: '#' },
  { title: 'Feedback', href: '#' },
  { title: 'Our Team', href: '#' },
  { title: 'Privacy Policy', href: '#' },
  { title: 'Terms of Service', href: '#' },
];

const socialLinks = [
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 12 9.03c0 .34.04.67.1.99C8.28 9.85 5.1 8.13 2.98 5.7c-.37.64-.58 1.38-.58 2.17 0 1.5.77 2.82 1.95 3.6-.72-.02-1.4-.22-1.99-.55v.06c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.1 12.1 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z" fill="#1DA1F2"/>
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" fill="#0A66C2"/>
        <path d="M7.5 9.5v5h2v-5h-2zm1-1.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm2.5 1.5v5h2v-2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V15h2v-2.5c0-1.93-1.57-3.5-3.5-3.5s-3.5 1.57-3.5 3.5z" fill="#fff"/>
      </svg>
    ),
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="#E1306C" strokeWidth="1.5" fill="#fff"/>
        <circle cx="12" cy="12" r="5" stroke="#E1306C" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" />
      </svg>
    ),
  },
  {
    href: 'https://github.com',
    label: 'GitHub',
    icon: (
      <svg fill="none" viewBox="0 0 24 24" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#18181B" stroke="#52525B" strokeWidth="1.5"/>
        <path d="M12 7.5c-2.5 0-4.5 2-4.5 4.5 0 2 1.5 3.5 3.5 3.5.5 0 .7-.2.7-.5v-1.2c-1.4.3-1.7-.7-1.7-.7-.2-.5-.5-.7-.5-.7-.4-.3 0-.3 0-.3.5 0 .7.5.7.5.4.7 1 .5 1.2.4.1-.3.2-.5.3-.6-1.1-.1-2.2-.6-2.2-2.3 0-.5.2-.9.5-1.2 0-.1-.2-.6.1-1.2 0 0 .4-.1 1.3.5.4-.1.8-.2 1.2-.2s.8.1 1.2.2c.9-.6 1.3-.5 1.3-.5.3.6.1 1.1.1 1.2.3.3.5.7.5 1.2 0 1.7-1.1 2.2-2.2 2.3.2.2.4.5.4 1v1.5c0 .3.2.5.7.5 2 0 3.5-1.5 3.5-3.5 0-2.5-2-4.5-4.5-4.5z" fill="#fff"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative glass-effect border-t border-gray-800 py-4 px-2">
      <div className="platform-container">
        <div className="relative max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Logo and copyright */}
          <div className="flex items-center gap-3 min-w-max">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-md text-2xl border-2 border-white/10">
              {/* Rocket emoji */}
              <span role="img" aria-label="rocket">🚀</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base text-white leading-tight">The Builder Studio</span>
              <span className="text-gray-400 text-xs leading-tight">© 2025 All rights reserved</span>
            </div>
          </div>
          {/* Center: Navigation links */}
          <nav className="flex flex-wrap gap-8 justify-center text-gray-200 font-medium text-sm">
            {navLinks.map(link => (
              <a key={link.title} href={link.href} className="hover:text-white transition-colors duration-200">
                {link.title}
              </a>
            ))}
          </nav>
          {/* Right: Social icons */}
          <div className="flex gap-3">
            {socialLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-700 bg-black/40 hover:bg-gray-800 transition-colors duration-200"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
