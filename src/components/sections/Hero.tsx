'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth initial animation sequence
      const tl = gsap.timeline({ ease: "power2.out" });
      tl.fromTo(headingRef.current,
        { opacity: 0, y: 80, scale: 0.85, rotationX: -15 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: "power3.out" },
      )
      .fromTo(subheadingRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
        '-=0.8',
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 30, scale: 0.9, rotationY: -5 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.8, ease: "back.out(1.4)" },
        '-=0.6',
      );

      // Smooth particle system animation
      gsap.to('.particle', {
        y: -120,
        x: 'random(-60, 60)',
        opacity: 0,
        duration: 'random(4, 8)',
        ease: 'power1.out',
        stagger: 0.15,
        repeat: -1,
        yoyo: false,
      });

      // Smooth floating elements animation
      gsap.to('.floating-element', {
        y: -25,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.8,
      });

      // Smooth glow effect on scroll
      gsap.to('.glow-orb', {
        scale: 1.15,
        opacity: 0.9,
        duration: 3,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 1.5,
      });

      // Parallax effect on scroll
      gsap.to('.parallax-bg', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Responsive animated gradient orbs */}
      <div className="absolute top-4 left-4 sm:top-10 sm:left-10 glow-orb floating-element">
        <div className="w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      </div>
      <div className="absolute top-8 right-8 sm:top-20 sm:right-20 glow-orb floating-element">
        <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-pink-500/20 via-red-500/15 to-orange-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-8 left-1/4 sm:bottom-20 glow-orb floating-element">
        <div className="w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-0 w-20 h-20 border border-blue-500/20 rotate-45 floating-element" />
      <div className="absolute bottom-1/4 right-0 w-16 h-16 border border-purple-500/20 rotate-12 floating-element" />
      <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-cyan-500/20 rotate-90 floating-element" />

      <div className="relative z-10 platform-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          {/* Main content section - redesigned for a pro look */}
          <div className="flex flex-col items-center justify-center text-center py-6 sm:py-8 md:py-12 lg:py-16">
            <div className="mb-6 sm:mb-8 relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight relative z-10 animate-fade-in">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  The
                </span>
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Builder
                </span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Studio
                </span>
              </h1>
              <div className="w-20 sm:w-32 md:w-40 h-1 sm:h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto mt-4 sm:mt-6 rounded-full relative z-10"></div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight max-w-4xl sm:max-w-5xl lg:max-w-6xl animate-fade-in-up px-4 sm:px-0">
              <span className="whitespace-normal sm:whitespace-nowrap">Turn your idea into a ready</span><br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">to launch MVP in 4-weeks</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl sm:max-w-4xl leading-relaxed animate-fade-in-up px-4 sm:px-0">
              Trusted by <span className="text-blue-400 font-bold">3+ startups</span> to build & launch software products with <span className="text-purple-400 font-bold">95% success rate</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-8 sm:mb-12 animate-fade-in-up px-4 sm:px-0 w-full sm:w-auto">
              <a
                href="#readytoLaunch"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('readytoLaunch');
                  if (element) {
                    element.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] group text-sm sm:text-base"
              >
                <span className="text-base sm:text-lg animate-bounce">📞</span>
                <span className="whitespace-nowrap">Schedule A Call</span>
              </a>
              <a
                href="https://wa.me/917827843470?text=Hi%20Kundan,%20I%20want%20to%20discuss%20my%20MVP%20idea%20with%20you.%20Can%20we%20schedule%20a%20call?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(34,197,94,0.3)] group text-sm sm:text-base"
                onClick={() => {
                  // Add a small delay to show the button click effect before opening WhatsApp
                  setTimeout(() => {
                    // The link will open in new tab automatically
                  }, 150);
                }}
              >
                <span className="text-base sm:text-lg animate-pulse">💬</span>
                <span className="whitespace-nowrap">Start WhatsApp Chat</span>
              </a>
            </div>
            
            {/* Video section with consistent background */}
            <div className="w-full max-w-5xl sm:max-w-6xl lg:max-w-7xl aspect-video rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden border border-white/10 mx-auto relative group animate-fade-in-up glass-effect shadow-[0_10px_30px_rgba(0,0,0,0.3)] px-4 sm:px-0">
              {/* Background lighting effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 z-0"></div>
              <div className="absolute top-0 left-1/4 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-400/30 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-purple-400/30 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-0 w-12 h-12 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-cyan-400/30 rounded-full blur-xl sm:blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              <video
                id="hero-video"
                className="w-full h-full relative z-10 object-cover"
                autoPlay
                muted
                loop
                playsInline
                controls
              >
                <source src="/The_Builder_Studio_Coming_Soon.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay gradient for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-5 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
