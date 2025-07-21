'use client';

import React, { useEffect, useRef } from 'react';

export default function GlowingStartupIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Startup icons data
    const icons = [
      {
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.2,
        size: 40,
        speed: 0.02,
        phase: 0,
        type: 'rocket',
      },
      {
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.3,
        size: 35,
        speed: 0.03,
        phase: Math.PI / 3,
        type: 'lightbulb',
      },
      {
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.7,
        size: 45,
        speed: 0.025,
        phase: Math.PI / 2,
        type: 'zap',
      },
      {
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.6,
        size: 38,
        speed: 0.035,
        phase: Math.PI,
        type: 'target',
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.4,
        size: 42,
        speed: 0.015,
        phase: Math.PI * 1.5,
        type: 'trending',
      },
      {
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.8,
        size: 36,
        speed: 0.04,
        phase: Math.PI * 0.75,
        type: 'users',
      },
      {
        x: window.innerWidth * 0.7,
        y: window.innerHeight * 0.15,
        size: 33,
        speed: 0.03,
        phase: Math.PI * 0.5,
        type: 'chart',
      },
      {
        x: window.innerWidth * 0.9,
        y: window.innerHeight * 0.75,
        size: 39,
        speed: 0.02,
        phase: Math.PI * 1.25,
        type: 'star',
      },
    ];

    // RGB color cycling function
    const getRGBColor = (phase: number, speed: number) => {
      const time = Date.now() * speed + phase;
      const r = Math.sin(time) * 127 + 128;
      const g = Math.sin(time + Math.PI * 2 / 3) * 127 + 128;
      const b = Math.sin(time + Math.PI * 4 / 3) * 127 + 128;
      return { r: Math.floor(r), g: Math.floor(g), b: Math.floor(b) };
    };

    // Draw icon functions
    const drawRocket = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      // Rocket body
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.beginPath();
      ctx.moveTo(12, 2);
      ctx.lineTo(8, 22);
      ctx.lineTo(16, 22);
      ctx.closePath();
      ctx.fill();

      // Rocket tip
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
      ctx.beginPath();
      ctx.moveTo(12, 2);
      ctx.lineTo(10, 8);
      ctx.lineTo(14, 8);
      ctx.closePath();
      ctx.fill();

      // Rocket fins
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
      ctx.fillRect(6, 18, 2, 4);
      ctx.fillRect(16, 18, 2, 4);

      ctx.restore();
    };

    const drawLightbulb = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      // Bulb
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      ctx.beginPath();
      ctx.arc(12, 12, 8, 0, Math.PI * 2);
      ctx.fill();

      // Base
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`;
      ctx.fillRect(10, 20, 4, 4);

      // Glow effect
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(12, 12, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawZap = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      ctx.beginPath();
      ctx.moveTo(12, 2);
      ctx.lineTo(8, 12);
      ctx.lineTo(12, 12);
      ctx.lineTo(10, 22);
      ctx.lineTo(16, 12);
      ctx.lineTo(12, 12);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawTarget = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      // Outer ring
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(12, 12, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Middle ring
      ctx.beginPath();
      ctx.arc(12, 12, 6, 0, Math.PI * 2);
      ctx.stroke();

      // Center
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      ctx.beginPath();
      ctx.arc(12, 12, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawTrending = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      // Trending line
      ctx.beginPath();
      ctx.moveTo(4, 18);
      ctx.lineTo(8, 14);
      ctx.lineTo(12, 16);
      ctx.lineTo(16, 8);
      ctx.lineTo(20, 6);
      ctx.stroke();

      // Arrow
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 1)`;
      ctx.beginPath();
      ctx.moveTo(20, 6);
      ctx.lineTo(18, 4);
      ctx.lineTo(18, 8);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const drawUsers = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;

      // Left user
      ctx.beginPath();
      ctx.arc(8, 8, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(6, 12, 4, 8);

      // Right user
      ctx.beginPath();
      ctx.arc(16, 8, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(14, 12, 4, 8);

      // Center user (smaller)
      ctx.beginPath();
      ctx.arc(12, 10, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(11, 13, 2, 6);

      ctx.restore();
    };

    const drawChart = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;

      // Chart bars
      ctx.fillRect(4, 16, 2, 4);
      ctx.fillRect(7, 12, 2, 8);
      ctx.fillRect(10, 8, 2, 12);
      ctx.fillRect(13, 14, 2, 6);
      ctx.fillRect(16, 6, 2, 14);
      ctx.fillRect(19, 10, 2, 10);

      ctx.restore();
    };

    const drawStar = (x: number, y: number, size: number, color: any) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 24, size / 24);

      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`;
      ctx.beginPath();

      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x1 = 12 + 8 * Math.cos(angle);
        const y1 = 12 + 8 * Math.sin(angle);

        if (i === 0) {
          ctx.moveTo(x1, y1);
        } else {
          ctx.lineTo(x1, y1);
        }

        const innerAngle = angle + Math.PI / 5;
        const x2 = 12 + 4 * Math.cos(innerAngle);
        const y2 = 12 + 4 * Math.sin(innerAngle);
        ctx.lineTo(x2, y2);
      }

      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      icons.forEach(icon => {
        const color = getRGBColor(icon.phase, icon.speed);

        // Draw glow effect
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.3)`;
        ctx.shadowBlur = 20;

        // Draw icon based on type
        switch (icon.type) {
          case 'rocket':
            drawRocket(icon.x, icon.y, icon.size, color);
            break;
          case 'lightbulb':
            drawLightbulb(icon.x, icon.y, icon.size, color);
            break;
          case 'zap':
            drawZap(icon.x, icon.y, icon.size, color);
            break;
          case 'target':
            drawTarget(icon.x, icon.y, icon.size, color);
            break;
          case 'trending':
            drawTrending(icon.x, icon.y, icon.size, color);
            break;
          case 'users':
            drawUsers(icon.x, icon.y, icon.size, color);
            break;
          case 'chart':
            drawChart(icon.x, icon.y, icon.size, color);
            break;
          case 'star':
            drawStar(icon.x, icon.y, icon.size, color);
            break;
        }

        // Reset shadow
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  );
}
