import React from 'react';
import { useTheme } from '../providers/ThemeProvider'; // Adjust the path if needed

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
}

export const HolographicCard = ({ children, className = '' }: HolographicCardProps) => {
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  
  return (
     <div
      className={`relative overflow-hidden rounded-2xl ${className} transition-all duration-300`}
      style={{
        background: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Holographic Effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Horizontal shimmer */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent ${
             isDark ? 'via-white/20' : 'via-blue-100/50'
          } to-transparent animate-shimmer`}
        />
        {/* Vertical shimmer */}
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent ${
            isDark ? 'via-blue-500/10' : 'via-indigo-400/10'
          } to-transparent`}
        />
      </div>

      {/* Border */}
       <div
        className={`absolute inset-0 rounded-2xl border ${
          isDark ? 'border-white/10' : 'border-gray-200/50'
        } transition-colors duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default HolographicCard;