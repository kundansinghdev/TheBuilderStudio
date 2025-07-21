'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple 2-second loading with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Complete loading after 100%
          setTimeout(onComplete, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // 2 seconds total (40ms * 50 steps)

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center space-y-8">
        <div className="loading-logo" />

        <div className="text-center">
          <h1 className="holographic-text text-3xl font-bold mb-4">
            The Builder Studio
          </h1>
          <p className="text-cyan-400 text-lg mb-6">
            Initializing Digital Workspace...
          </p>

          {/* Progress bar */}
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
             />
          </div>

          <p className="text-gray-400 text-sm mt-2">
            {progress}% Complete
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 floating-element">
          <div className="w-4 h-4 bg-cyan-400 rounded-full opacity-50" />
        </div>
        <div className="absolute top-1/3 right-1/4 floating-element">
          <div className="w-3 h-3 bg-purple-400 rounded-full opacity-50" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 floating-element">
          <div className="w-5 h-5 bg-green-400 rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
}
