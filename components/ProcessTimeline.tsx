'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, CheckCircle2, ClipboardList, Rocket } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Idea',
    why: 'Every breakthrough starts with a spark.',
    text: 'Clarify your vision and set a strong foundation.',
    icon: Lightbulb,
    color: 'from-blue-500 via-blue-400 to-cyan-400',
    badge: 'bg-gradient-to-r from-blue-500 to-cyan-400',
    border: 'border-blue-500/40',
  },
  {
    number: '02',
    title: 'Validation',
    why: 'Build what matters, not just what’s possible.',
    text: 'Test your idea with real users and real feedback.',
    icon: CheckCircle2,
    color: 'from-purple-500 via-purple-400 to-pink-400',
    badge: 'bg-gradient-to-r from-purple-500 to-pink-400',
    border: 'border-purple-500/40',
  },
  {
    number: '03',
    title: 'Planning',
    why: 'A clear roadmap turns vision into velocity.',
    text: 'Map out the fastest path to a launch-ready MVP.',
    icon: ClipboardList,
    color: 'from-emerald-500 via-teal-400 to-emerald-400',
    badge: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    border: 'border-emerald-500/40',
  },
  {
    number: '04',
    title: 'Execution',
    why: 'Momentum is everything. We ship, you launch.',
    text: 'Build, launch, and iterate for real-world results.',
    icon: Rocket,
    color: 'from-pink-500 via-pink-400 to-fuchsia-400',
    badge: 'bg-gradient-to-r from-pink-500 to-fuchsia-400',
    border: 'border-pink-500/40',
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

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

      if (stepsRef.current) {
        gsap.fromTo(stepsRef.current.children,
          { opacity: 0, y: 60, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            stagger: 0.3,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-16 mb-24 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-8">
          <h2 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg mb-4 tracking-tight">
            Our Process of Building MVP
          </h2>
          <p className="text-2xl md:text-3xl text-gray-100 font-semibold mb-2">A journey from spark to launch, crafted for founders.</p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">We don't just build MVPs. We build momentum, clarity, and confidence—so you can launch with certainty.</p>
        </div>

        {/* Timeline/Stepper Layout */}
        <div ref={stepsRef} className="flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-0 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="flex-1 flex flex-col items-center group relative z-10 min-w-[160px] max-w-[240px]">
                {/* Animated glowing connector (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-20 h-1 -translate-y-1/2 z-0">
                    <div className="w-full h-full bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 rounded-full animate-gradient-move shadow-lg opacity-80" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-blue-400 via-purple-400 to-emerald-400 rounded-full shadow-xl animate-pulse-fast border-2 border-white/10" />
                  </div>
                )}
                {/* Step Card - glassmorphic with platform styling */}
                <div className={`relative flex flex-col items-center text-center glass-effect rounded-xl shadow-xl border px-4 py-7 mb-1 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/40 animate-fadeInUp cursor-pointer hover:ring-2 hover:ring-blue-400/30 ${step.border}`}>
                  {/* Glowing animated orb with icon - accent color */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${step.color} shadow-md mb-2 animate-pulse-fast group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white drop-shadow-lg animate-icon-bounce group-hover:animate-icon-spin" />
                  </div>
                  {/* Gradient badge for step number - accent color */}
                  <div className="mb-1">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-white font-extrabold text-sm shadow-md tracking-widest font-mono ${step.badge}`}>
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0.5 tracking-tight font-sans">
                    {step.title}
                  </h3>
                  <p className="text-blue-100 text-sm font-semibold mb-0.5 font-sans">{step.why}</p>
                  <p className="text-gray-100 leading-relaxed text-xs max-w-[140px] mx-auto font-sans">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
