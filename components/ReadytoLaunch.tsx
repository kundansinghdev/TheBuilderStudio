'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { db } from '../src/lib/firebase'; // adjust path if needed
import { collection, addDoc, Timestamp } from "firebase/firestore";
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

export default function HeroLaunchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    idea: ''
  });
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const submissionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rate limiting: max 3 submissions per hour
  const MAX_SUBMISSIONS_PER_HOUR = 3;
  const SUBMISSION_COOLDOWN = 60 * 60 * 1000; // 1 hour in milliseconds

  // Anti-spam patterns
  const spamPatterns = [
    /\b(buy|sell|money|cash|loan|credit|debt|rich|million|billion|dollar|profit|earn|income|investment|stock|crypto|bitcoin|ethereum|forex|trading|casino|gambling|lottery|prize|winner|jackpot|free|discount|offer|deal|limited|urgent|act now|click here|subscribe|unsubscribe|remove|stop|quit)\b/gi,
    /\b(viagra|cialis|penis|sex|porn|adult|dating|hookup|escort|massage|enlargement|weight loss|diet|supplement|vitamin|medicine|drug|pharmacy|prescription)\b/gi,
    /\b(click|visit|website|url|link|http|www|com|net|org|online|web|site|page|download|upload|file|virus|hack|crack|keygen|serial|license|activation)\b/gi,
    /\b(admin|root|password|login|signin|account|bank|paypal|card|credit|debit|ssn|social|security|number|id|passport|driver|license)\b/gi,
    /\b(prince|king|queen|royal|nigerian|african|foreign|overseas|international|urgent|help|assistance|charity|donation|fund|raise|money)\b/gi
  ];

  const suspiciousPatterns = [
    /[A-Z]{5,}/g, // Too many consecutive uppercase letters
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{3,}/g, // Too many special characters
    /\b\w{20,}\b/g, // Very long words
    /(.)\1{4,}/g, // Repeated characters (like "aaaaa")
    /\b\w*\d{5,}\w*\b/g, // Words with many numbers
  ];

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (submissionTimeoutRef.current) {
        clearTimeout(submissionTimeoutRef.current);
      }
    };
  }, []);

  const isSpamContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    
    // Check for spam patterns
    for (const pattern of spamPatterns) {
      if (pattern.test(lowerText)) {
        return true;
      }
    }
    
    // Check for suspicious patterns
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(text)) {
        return true;
      }
    }
    
    // Check for excessive repetition
    const words = text.split(/\s+/);
    const uniqueWords = new Set(words);
    if (words.length > 10 && uniqueWords.size / words.length < 0.3) {
      return true; // Too much repetition
    }
    
    return false;
  };

  const isRateLimited = (): boolean => {
    const now = Date.now();
    const timeSinceLastSubmission = now - lastSubmissionTime;
    
    // Check if too many submissions in the last hour
    if (submissionCount >= MAX_SUBMISSIONS_PER_HOUR) {
      const timeUntilReset = SUBMISSION_COOLDOWN - timeSinceLastSubmission;
      if (timeUntilReset > 0) {
        const minutesLeft = Math.ceil(timeUntilReset / (60 * 1000));
        toast.error(`Too many submissions. Please wait ${minutesLeft} minutes before trying again.`);
        return true;
      } else {
        // Reset counter if an hour has passed
        setSubmissionCount(0);
      }
    }
    
    // Check cooldown between submissions (minimum 30 seconds)
    if (timeSinceLastSubmission < 30000) {
      toast.error("Please wait 30 seconds between submissions.");
      return true;
    }
    
    return false;
  };

  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
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
        }
      });

      tl.fromTo(leftRef.current,
        { opacity: 0, x: -120, scale: 0.75, rotationY: -15 },
        { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.4, ease: 'power3.out' }
      )
      .fromTo(rightRef.current,
        { opacity: 0, x: 120, scale: 0.75, rotationY: 15 },
        { opacity: 1, x: 0, scale: 1, rotationY: 0, duration: 1.4, ease: 'power3.out' },
        '-=1'
      );

      // Smooth particle system animation
      if (particlesRef.current) {
        gsap.to('.particle', {
          y: -200,
          x: 'random(-120, 120)',
          opacity: 0,
          duration: 'random(8, 15)',
          ease: 'power1.out',
          stagger: 0.3,
          repeat: -1,
          yoyo: false,
        });
      }

      // Smooth floating elements animation
      gsap.to('.floating-element', {
        y: -40,
        duration: 7,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 1.5,
      });

      // Smooth glow effect on scroll
      gsap.to('.glow-orb', {
        scale: 1.05,
        opacity: 0.75,
        duration: 6,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 3,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    if (isRateLimited()) {
      return;
    }
    
    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      whatsapp: sanitizeInput(formData.whatsapp),
      idea: sanitizeInput(formData.idea)
    };
    
    // Validation checks
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const whatsappRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
    
    // Validate name (letters only, 2-50 characters)
    if (!sanitizedData.name) {
      toast.error("Name is required");
      return;
    }
    if (!nameRegex.test(sanitizedData.name)) {
      toast.error("Name should be 2-50 characters with letters only");
      return;
    }
    
    // Validate email
    if (!sanitizedData.email) {
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(sanitizedData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Validate WhatsApp
    if (!sanitizedData.whatsapp) {
      toast.error("WhatsApp number is required");
      return;
    }
    if (!whatsappRegex.test(sanitizedData.whatsapp)) {
      toast.error("Please enter a valid WhatsApp number");
      return;
    }
    
    // Validate idea (minimum 15 words, maximum 200 words)
    if (!sanitizedData.idea) {
      toast.error("Please describe your idea");
      return;
    }
    const wordCount = sanitizedData.idea.split(/\s+/).length;
    if (wordCount < 15) {
      toast.error(`Please describe your idea in at least 15 words (currently ${wordCount} words)`);
      return;
    }
    if (wordCount > 200) {
      toast.error("Please keep your idea description under 200 words");
      return;
    }
    
    // Anti-spam content check
    if (isSpamContent(sanitizedData.idea) || isSpamContent(sanitizedData.name)) {
      toast.error("Your submission contains suspicious content. Please review and try again.");
      return;
    }
    
    // Check for suspicious email patterns
    const suspiciousEmails = [
      /^test@/i,
      /^admin@/i,
      /^info@/i,
      /^noreply@/i,
      /^spam@/i,
      /^bot@/i,
      /^user@/i,
      /^demo@/i,
      /^example@/i
    ];
    
    for (const pattern of suspiciousEmails) {
      if (pattern.test(sanitizedData.email)) {
        toast.error("Please use a valid personal email address");
        return;
      }
    }
    
    // Update rate limiting
    setSubmissionCount(prev => prev + 1);
    setLastSubmissionTime(Date.now());
    
    // Set timeout to reset submission count after an hour
    if (submissionTimeoutRef.current) {
      clearTimeout(submissionTimeoutRef.current);
    }
    submissionTimeoutRef.current = setTimeout(() => {
      setSubmissionCount(0);
    }, SUBMISSION_COOLDOWN);
    
    const cleanData = {
      ...sanitizedData,
      createdAt: Timestamp.now(),
      userAgent: navigator.userAgent.substring(0, 200), // Track browser info for spam detection
      ipAddress: 'client-side', // Will be replaced by server-side IP detection
      submissionId: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    
    try {
      const docRef = await addDoc(collection(db, "ideas"), cleanData);
      toast.success("Your idea has been submitted successfully!");
      setFormData({ name: '', email: '', whatsapp: '', idea: '' });
    } catch (error) {
      toast.error("Error submitting your idea. Please try again.");
    }
  };

  const handleScheduleCall = () => {
    // Fast scroll to form and focus on first input
    setIsScrolling(true);
    
    if (formRef.current) {
      // Get the form position
      const formRect = formRef.current.getBoundingClientRect();
      const offsetTop = formRect.top + window.pageYOffset - 100; // 100px offset from top
      
      // Fast scroll with custom duration
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Focus on the first input after a very short delay
      setTimeout(() => {
        const firstInput = formRef.current?.querySelector('input[name="name"]') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
        setIsScrolling(false);
      }, 200);
    }
  };

  return (
    <section ref={sectionRef} id="readytoLaunch" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden min-h-screen">
      {/* Advanced Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-5" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-10 left-10 glow-orb floating-element">
        <div className="w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="absolute top-20 right-20 glow-orb floating-element">
        <div className="w-32 h-32 bg-gradient-to-br from-pink-500/20 via-red-500/15 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-20 left-1/4 glow-orb floating-element">
        <div className="w-48 h-48 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle System */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 glass-effect rounded-full mb-4 sm:mb-6">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs sm:text-sm font-medium">Ready to Launch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Ready to Build
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Your Idea for Real?
            </span>
            </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Let's connect and take the first step to product launch. 
            <span className="text-blue-400 font-semibold"> Your success story starts here.</span>
            </p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side - Advanced Stats & Contact */}
          <div ref={leftRef} className="space-y-8 sm:space-y-12">
            {/* Animated Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="group relative glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center overflow-hidden hover:scale-102 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200">⚡</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">4 Weeks</div>
                  <div className="text-xs sm:text-sm text-gray-400">From idea to launched MVP</div>
                </div>
              </div>
              
              <div className="group relative glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center overflow-hidden hover:scale-102 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200">🎯</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">95% Success</div>
                  <div className="text-xs sm:text-sm text-gray-400">Rate of successful launches</div>
                </div>
              </div>
              
              <div className="group relative glass-effect rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center overflow-hidden hover:scale-102 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200">💎</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">3+ Startups</div>
                  <div className="text-xs sm:text-sm text-gray-400">Built and launched</div>
                </div>
              </div>
            </div>

            {/* Advanced Contact Card */}
            <div className="relative glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse" />
                  <h3 className="text-xl sm:text-2xl font-bold text-white">Get in Touch</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-effect rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-400 text-sm sm:text-lg">📧</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium text-sm sm:text-base truncate">manavhustles@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 glass-effect rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-sm sm:text-lg">💬</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-400">WhatsApp</p>
                      <p className="text-white font-medium text-sm sm:text-base">+91 78278 43470</p>
            </div>
            </div>
          </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={handleScheduleCall}
                    disabled={isScrolling}
                    className={`inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] group ${isScrolling ? 'opacity-75 cursor-not-allowed' : ''} text-sm sm:text-base`}
                  >
                    <span className="text-lg sm:text-xl">{isScrolling ? '⏳' : '📞'}</span>
                    <span className="whitespace-nowrap">{isScrolling ? 'Taking you there...' : 'Schedule A Call'}</span>
                    <span className={`text-base sm:text-lg transition-transform duration-200 ${isScrolling ? 'animate-spin' : 'group-hover:translate-x-1'}`}>
                      {isScrolling ? '⟳' : ''}
                    </span>
                  </button>
                  
                  <a
                    href="https://wa.me/917827843470?text=Hi%20Kundan,%20I%20want%20to%20discuss%20my%20MVP%20idea%20with%20you.%20Can%20we%20schedule%20a%20call?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-3 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(34,197,94,0.3)] group text-sm sm:text-base"
                  >
                    <span className="text-lg sm:text-xl">💬</span>
                    <span className="whitespace-nowrap">Start WhatsApp Chat</span>
                   
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Advanced Form */}
          <div ref={rightRef} className="relative">
            <div className={`glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-6 sm:space-y-8 transition-all duration-300 ${isFormFocused ? 'scale-102 shadow-[0_10px_20px_rgba(59,130,246,0.1)] border border-blue-400/30' : ''}`}>
              {/* Form Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/20 rounded-full mb-3 sm:mb-4">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-blue-400 text-xs sm:text-sm font-medium">Contact Form</span>
        </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">Tell Us About Your Idea</h2>
                <p className="text-gray-300 text-sm sm:text-base">
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
              </div>

              {/* Advanced Form */}
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative group">
              <input
                type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setIsFormFocused(true)}
                      onBlur={() => setIsFormFocused(false)}
                placeholder="Full Name"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-400 focus:bg-black/60 transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
              />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </div>
                  
                  <div className="relative group">
              <input
                type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setIsFormFocused(true)}
                      onBlur={() => setIsFormFocused(false)}
                placeholder="Email Address"
                      className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-blue-400 focus:bg-black/60 transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
              />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                  </div>
            </div>
                
                <div className="relative group">
            <input
              type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
              placeholder="WhatsApp Number"
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-green-400 focus:bg-black/60 transition-all duration-300 placeholder-gray-500 text-sm sm:text-base"
            />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
                
                <div className="relative group">
            <textarea
                    name="idea"
                    value={formData.idea}
                    onChange={handleInputChange}
                    onFocus={() => setIsFormFocused(true)}
                    onBlur={() => setIsFormFocused(false)}
              placeholder="Describe your startup idea, target market, and what you're looking to achieve..."
                    rows={4}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-cyan-400 focus:bg-black/60 transition-all duration-300 placeholder-gray-500 resize-none text-sm sm:text-base"
                  />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none" />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl transition-all duration-200 hover:scale-102 hover:shadow-[0_10px_20px_rgba(59,130,246,0.2)] group"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-lg sm:text-xl group-hover:scale-105 transition-transform duration-200">🚀</span>
                    <span className="whitespace-nowrap">Submit Your Idea</span>
                    <span className="text-lg sm:text-xl group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </span>
            </button>
          </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
