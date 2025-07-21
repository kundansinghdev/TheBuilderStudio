'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );

      gsap.fromTo(videoRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="m-0 p-0 w-full flex justify-center items-center">
      <div ref={videoRef} className="relative w-full max-w-4xl aspect-video flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-700/30 via-purple-700/20 to-cyan-700/10 blur-xl z-0 animate-pulse-slow" />
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-500/60 glass-effect backdrop-blur-xl z-10 transition-transform duration-700 ease-out scale-95 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <iframe
            src="https://www.youtube.com/embed/xNUx-rMGvvw?modestbranding=1&rel=0&showinfo=0&controls=1"
            title="The Builder Studio - Video"
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
           />
        </div>
      </div>
    </section>
  );
}
