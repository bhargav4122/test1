
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import { useIsMobile } from '@/hooks/useWindowSize';

const FloatingShapes: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Disable on mobile for performance
    if (isMobile) return;
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    if (!container) return;

    const shapes = Array.from({ length: 5 }, (_, i) => {
      const shape = document.createElement('div');
      const size = Math.random() * 100 + 50;

      shape.style.position = 'absolute';
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.transform = `rotate(${Math.random() * 360}deg)`;
      shape.style.opacity = '0.1';
      shape.style.transition = 'transform 3s ease-in-out, opacity 3s ease-in-out';
      shape.style.backdropFilter = 'blur(5px)';
      shape.style.zIndex = '-1';

      // Randomly assign shape
      const shapeType = Math.floor(Math.random() * 3);
      if (shapeType === 0) {
        // Circle
        shape.style.borderRadius = '50%';
        shape.style.background = theme === 'dark'
          ? 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.2))'
          : 'linear-gradient(45deg, rgba(0,0,0,0.02), rgba(0,0,0,0.08))';
      } else if (shapeType === 1) {
        // Square
        shape.style.borderRadius = '10px';
        shape.style.background = theme === 'dark'
          ? 'linear-gradient(135deg, rgba(65,105,225,0.1), rgba(138,43,226,0.15))'
          : 'linear-gradient(135deg, rgba(65,105,225,0.05), rgba(138,43,226,0.08))';
      } else {
        // Triangle
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size / 2}px solid transparent`;
        shape.style.borderRight = `${size / 2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'}`;
        shape.style.background = 'transparent';
      }

      container.appendChild(shape);
      return shape;
    });

    // Add animation
    const animate = () => {
      shapes.forEach(shape => {
        const x = Math.random() * 20 - 10;
        const y = Math.random() * 20 - 10;
        const rotation = Math.random() * 90 - 45;
        const scale = 0.8 + Math.random() * 0.4;

        shape.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
        shape.style.opacity = `${0.05 + Math.random() * 0.1}`;
      });
    };

    animate();
    const interval = setInterval(animate, 5000);

    return () => {
      clearInterval(interval);
      shapes.forEach(shape => shape.remove());
    };
  }, [theme, isMobile]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden hidden md:block"
    />
  );
};

export default FloatingShapes;
