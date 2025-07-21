'use client';

import { useState, useEffect } from 'react';

import ReadytoLaunch from '../components/ReadytoLaunch';
import Hero from '../src/components/sections/Hero';
import MVPList from '../src/components/sections/MVPList';
import ProcessTimeline from '../src/components/sections/ProcessTimeline';
import LoadingScreen from '../src/components/ui/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <ProcessTimeline />
      <MVPList />
      <ReadytoLaunch />
    </main>
  );
}
