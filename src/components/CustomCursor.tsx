
import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/providers/ThemeProvider';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;
    
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // For the cursor circle
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursor.style.opacity = '1';
      
      // For the cursor dot (follows with slight delay)
      setTimeout(() => {
        if (cursorDot) {
          cursorDot.style.left = `${clientX}px`;
          cursorDot.style.top = `${clientY}px`;
          cursorDot.style.opacity = '1';
        }
      }, 50);
    };
    
    const onMouseLeave = () => {
      cursor.style.opacity = '0';
      cursorDot.style.opacity = '0';
    };
    
    const onMouseEnter = () => {
      cursor.style.opacity = '1';
      cursorDot.style.opacity = '1';
    };
    
    const onMouseDown = () => {
      cursor.style.transform = 'scale(0.8)';
      cursorDot.style.transform = 'scale(0.6)';
    };
    
    const onMouseUp = () => {
      cursor.style.transform = 'scale(1)';
      cursorDot.style.transform = 'scale(1)';
    };
    
    // Add hover effect for clickable elements
    const addHoverEffect = () => {
      const clickables = document.querySelectorAll('button, a, input, textarea, [role="button"]');
      
      clickables.forEach((element) => {
        element.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)';
          cursor.style.mixBlendMode = 'difference';
        });
        
        element.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)';
          cursor.style.mixBlendMode = 'normal';
        });
      });
    };
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Call once to initialize hover effects
    addHoverEffect();
    
    // Add mutation observer to handle dynamically added elements
    const observer = new MutationObserver(addHoverEffect);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
    };
  }, [theme]);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 transition-transform duration-200 ease-out ${
          theme === 'dark' ? 'bg-white/10 backdrop-blur-sm' : 'bg-black/10 backdrop-blur-sm'
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          opacity: 0
        }}
      />
      <div 
        ref={cursorDotRef} 
        className={`fixed w-2 h-2 rounded-full pointer-events-none z-50 transition-transform duration-100 ${
          theme === 'dark' ? 'bg-white' : 'bg-black'
        }`}
        style={{ 
          transform: 'translate(-50%, -50%)',
          opacity: 0
        }}
      />
    </>
  );
};

export default CustomCursor;