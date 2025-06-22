
import { useEffect, useState } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref);
        }
      },
      { threshold }
    );
    
    observer.observe(ref);
    
    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, threshold]);
  
  return [setRef, isVisible] as const;
};

export const useParallax = (speed = 0.5) => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!element) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const translateY = scrollY * speed;
      element.style.transform = `translateY(${translateY}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [element, speed]);
  
  return setElement;
};

export const useMouseParallax = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!element) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const moveX = (clientX - windowWidth / 2) * 0.01;
      const moveY = (clientY - windowHeight / 2) * 0.01;
      
      element.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [element]);
  
  return setElement;
};