'use client';

import { useState, useEffect } from 'react';

import Hero from '../src/components/sections/Hero';
import LoadingScreen from '../src/components/ui/LoadingScreen';
import MVPList from '../src/components/sections/MVPList';
import ProcessTimeline from '../src/components/sections/ProcessTimeline';
import HeroLaunchSection from '../components/ReadytoLaunch';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Auto-complete loading after 3 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <main className={`min-h-screen transition-opacity duration-500 platform-bg ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <ProcessTimeline />
        <MVPList />
        <HeroLaunchSection />
      </main>
    </>
  );
}
