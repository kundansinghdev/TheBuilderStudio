import './globals.css';

import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

import BackgroundShapes from '../src/components/sections/BackgroundShapes';
import Footer from '../src/components/sections/Footer';
import Navbar from '../src/components/sections/Navbar';
import { cn } from '../src/lib/utils';

export const metadata = {
  metadataBase: new URL('https://thebuilderstudio.in'),
  title: 'The Builder Studio',
  description: 'From Idea to Launched App in Just 4 Weeks. Learn everything you need to build your SaaS or online business—even as a complete beginner.',
  keywords: ['MVP', 'startup', 'development', 'SaaS', 'founder', 'app development'],
  authors: [{ name: 'The Builder Studio' }],
  openGraph: {
    title: 'The Builder Studio',
    description: 'From Idea to Launched App in Just 4 Weeks',
    url: 'https://thebuilderstudio.in',
    siteName: 'The Builder Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Builder Studio',
    description: 'From Idea to Launched App in Just 4 Weeks',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased platform-bg">
        <Toaster position="top-center" />
        <BackgroundShapes />
        {children}
      </body>
    </html>
  );
}
