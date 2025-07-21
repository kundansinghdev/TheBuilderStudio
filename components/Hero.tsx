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
      // Initial animation sequence
      const tl = gsap.timeline();
      tl.fromTo(headingRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
      )
      .fromTo(subheadingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.5',
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.3',
      );

      // Floating animation for background elements
      gsap.to('.floating-bg-element', {
        y: -20,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
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
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Floating background elements */}
      <div className="absolute top-20 left-20 floating-bg-element pointer-events-none">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/30 to-transparent rounded-full opacity-20 blur-2xl" style={{ boxShadow: 'none', border: 'none' }} />
      </div>
      <div className="absolute top-40 right-20 floating-bg-element pointer-events-none">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-600/30 to-transparent rounded-full opacity-20 blur-2xl" style={{ boxShadow: 'none', border: 'none' }} />
      </div>
      <div className="absolute bottom-20 left-1/3 floating-bg-element pointer-events-none">
        <div className="w-40 h-40 bg-gradient-to-br from-emerald-500/30 to-transparent rounded-full opacity-20 blur-2xl" style={{ boxShadow: 'none', border: 'none' }} />
      </div>

      <div className="relative z-10 platform-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main content section - redesigned for a pro look */}
          <div className="flex flex-col items-center justify-center text-center py-8 md:py-12">
            <div className="mb-8 relative">
              <h1 className="text-6xl md:text-8xl font-black leading-tight relative z-10 animate-fade-in">
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
              <div className="w-40 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto mt-6 rounded-full relative z-10" />
            </div>

            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight max-w-6xl animate-fade-in-up">
              <span className="whitespace-nowrap">Turn your idea into a ready</span><br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">to launch MVP in 4-weeks</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl leading-relaxed animate-fade-in-up">
              Trusted by <span className="text-blue-400 font-bold">10+ startups</span> to build & launch software products with <span className="text-purple-400 font-bold">95% success rate</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 animate-fade-in-up">
              <a
                href="#contact"
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 hover:from-blue-700 hover:via-purple-600 hover:to-purple-700 text-white text-xl font-bold px-12 py-6 rounded-3xl shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transform hover:scale-110 hover:shadow-[0_25px_50px_rgba(59,130,246,0.3)] hover:-translate-y-1"
              >
                <span className="text-2xl animate-bounce">📞</span>
                Schedule A Call
              </a>
              <a
                href="https://wa.me/917827843470?text=Hi%20Kundan,%20I%20want%20to%20discuss%20my%20MVP%20idea%20with%20you.%20Can%20we%20schedule%20a%20call?"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-emerald-600 hover:to-emerald-700 text-white text-xl font-bold px-12 py-6 rounded-3xl shadow-2xl transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transform hover:scale-110 hover:shadow-[0_25px_50px_rgba(34,197,94,0.3)] hover:-translate-y-1"
              >
                <span className="text-2xl animate-pulse">💬</span>
                Start WhatsApp Chat
              </a>
            </div>

            {/* Video section with consistent background */}
            <div className="w-full max-w-7xl aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 mx-auto relative group animate-fade-in-up glass-effect">
              <iframe
                id="hero-video"
                src="https://www.youtube.com/embed/hkWVTnr3LTk"
                title="The Builder Studio - Video"
                className="w-full h-full relative z-10"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
               />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
