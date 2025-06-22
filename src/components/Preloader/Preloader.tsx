'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, animate } from 'framer-motion';

const words = [ "Welcome to BDS","Future"," Loading"];
const WORD_DURATION = 2500; // 2.5 seconds per word
const FINAL_DELAY = 1500; // 1.5 seconds after last word

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  // Handle word sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < words.length - 1) {
        setIndex(index + 1);
      } else {
        setTimeout(() => {
          onComplete(); // Trigger completion callback
        }, FINAL_DELAY);
      }
    }, WORD_DURATION);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  // Animate letters
  useEffect(() => {
    if (!textRef.current) return;

    const letters = textRef.current.querySelectorAll('span');
    letters.forEach((letter, i) => {
      animate(
        letter,
        { 
          opacity: [0, 1],
          y: [20, 0],
          textShadow: [
            '0 0 8px rgba(255,255,255,0)',
            '0 0 12px rgba(255,255,255,0.8)',
            '0 0 8px rgba(255,255,255,0)'
          ]
        },
        {
          duration: 0.8,
          delay: i * 0.05
        }
      );
    });
  }, [index]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-[9999]">
      <motion.div
        ref={textRef}
        className="text-center font-bold"
        style={{
          fontSize: 'clamp(3rem, 10vw, 5rem)',
          color: 'white',
          textTransform: 'uppercase',
          letterSpacing: '0.2em'
        }}
      >
        {words[index].split('').map((letter, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.8)'
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}