import { Variants } from 'framer-motion';

export const opacity: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.8, 
      delay: 0.9,
      ease: [0.33, 1, 0.68, 1] 
    }
  }
};

export const slideUp: Variants = {
  initial: {
    top: 0
  },
  exit: {
    top: "-100vh",
    transition: { 
      duration: 1, 
      ease: [0.76, 0, 0.24, 1], 
      delay: 0.5
    }
  }
};