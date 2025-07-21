'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const mvps = [
  {
    name: 'Mockskills',
    description: 'Elevate Your Skills with Mockskills Today. Boost your career with expert courses, AI tools, and community support through CollabZone and BattleGround!',
    category: 'EdTech',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Spring Boot', 'PostgreSQL', 'AI/ML'],
    timeline: '3 weeks',
    status: 'Launched',
    metrics: 'Launched',
    icon: '🎯',
    websiteUrl: 'https://mockskills.com',
    platform: 'Web Platform',
  },
  {
    name: 'VaultMind',
    description: 'Your private, structured space to capture and organize anything valuable you discover online — from articles, videos, and documents to voice notes, screenshots, and personal ideas.',
    category: 'Productivity',
    tech: ['React Native', 'TypeScript', 'Firebase', 'Node.js', 'MongoDB', 'AI/ML'],
    timeline: 'Coming Soon',
    status: 'Coming Soon',
    metrics: 'Pre-launch phase',
    icon: '🔐',
    platform: 'Mobile App',
  },
];

export default function MVPList() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');
  const [isIframeLoading, setIsIframeLoading] = useState<boolean>(true);

  const openPreview = (url: string, title: string) => {
    setPreviewUrl(url);
    setPreviewTitle(title);
    setIsIframeLoading(true);
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setPreviewTitle('');
    setIsIframeLoading(true);
  };

  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced entrance animations
      const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.85, rotationX: -10 },
        { opacity: 1, y: 0, scale: 1, rotationX: 0, duration: 1.2, ease: 'power3.out' },
      );

      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 80, scale: 0.8, rotationY: -15 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.3,
            stagger: 0.2,
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

      // Smooth particle system animation
      gsap.to('.particle', {
        y: -150,
        x: 'random(-80, 80)',
        opacity: 0,
        duration: 'random(5, 10)',
        ease: 'power1.out',
        stagger: 0.2,
        repeat: -1,
        yoyo: false,
      });

      // Smooth floating elements animation
      gsap.to('.floating-element', {
        y: -30,
        duration: 5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 1,
      });

      // Smooth glow effect on scroll
      gsap.to('.glow-orb', {
        scale: 1.1,
        opacity: 0.85,
        duration: 4,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="mvp-list" className="py-24 relative overflow-hidden">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-10 glow-orb floating-element">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 glow-orb floating-element">
        <div className="w-24 h-24 bg-gradient-to-br from-pink-500/20 via-red-500/15 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-20 left-1/4 glow-orb floating-element">
        <div className="w-40 h-40 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle System */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes */}
      <div className="absolute top-1/4 left-0 w-16 h-16 border border-blue-500/20 rotate-45 floating-element" />
      <div className="absolute bottom-1/4 right-0 w-12 h-12 border border-purple-500/20 rotate-12 floating-element" />
      <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-cyan-500/20 rotate-90 floating-element" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            MVPs We've Built
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From concept to launch in record time. Here's a showcase of the innovative products we've helped bring to life.
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {mvps.map((mvp, index) => (
            <div
              key={index}
              className="group glass-effect rounded-3xl overflow-hidden hover:scale-102 transition-all duration-300 border border-white/10 hover:border-blue-500/30 shadow-2xl"
            >
              {/* Header with icon, platform, and category */}
              <div className="h-56 bg-gradient-to-br from-cyan-600 via-purple-600 to-blue-600 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />

                <div className="relative text-center text-white z-10">
                  <div className="text-7xl mb-4 group-hover:scale-105 transition-transform duration-200">
                    {mvp.icon}
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-bold opacity-95">{mvp.name}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        {mvp.platform}
                      </span>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full backdrop-blur-sm">
                        {mvp.category}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Animated background elements */}
                <div className="absolute top-6 right-6 w-3 h-3 bg-white/30 rounded-full animate-pulse" />
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-1000" />
              </div>

              <div className="p-8">
                {/* Description */}
                <p className="text-gray-300 leading-relaxed text-base mb-6">
                  {mvp.description}
                </p>

                {/* Tech stack */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-3 font-medium">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800">
                    {mvp.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 bg-blue-600/20 text-blue-300 text-sm rounded-lg border border-blue-500/30 whitespace-nowrap font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status and timeline */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-effect rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-green-400 font-semibold">{mvp.metrics}</p>
                      {mvp.websiteUrl && (
                        <button
                          onClick={() => openPreview(mvp.websiteUrl!, mvp.name)}
                          className="text-green-400 hover:text-green-300 text-xs font-medium transition-colors"
                        >
                          Preview →
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="glass-effect rounded-xl p-4 border border-white/10">
                    <p className="text-xs text-gray-400 mb-1">Timeline</p>
                    <p className="text-sm text-blue-400 font-semibold">{mvp.timeline}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Website Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closePreview}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-6xl h-[80vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <h3 className="text-lg font-semibold text-gray-800">{previewTitle}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Open in New Tab
                </a>
                <button
                  onClick={closePreview}
                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            {/* Website Preview */}
            <div className="h-full relative">
              {isIframeLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
                    <p className="text-gray-600">Loading {previewTitle}...</p>
                  </div>
                </div>
              )}
              <iframe
                src={previewUrl}
                title={`${previewTitle} Preview`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onLoad={handleIframeLoad}
                onError={() => {
                  console.log('Iframe failed to load');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
