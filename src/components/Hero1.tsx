
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Stars, Wand2,PieChart, Database, LineChart, Code, Network } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero1: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Calculate mouse position relative to the center of the screen
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      
      setMousePosition({ x: mouseX, y: mouseY });
      
      // Find all elements with parallax effect
      const layers = heroRef.current.querySelectorAll('.parallax-layer');
      
      layers.forEach((layer) => {
        const htmlLayer = layer as HTMLElement;
        const depth = parseFloat(htmlLayer.getAttribute('data-depth') || '0');
        const moveX = mouseX * depth * -50;
        const moveY = mouseY * depth * -50;
        
        htmlLayer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 80 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    })
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center perspective"
      style={{
        background: 'linear-gradient(135deg,rgb(12, 12, 12) 0%,rgb(7, 7, 7) 100%)',
      }}
    >
      {/* Abstract mesh background */}
      <div className="absolute inset-0 perspective overflow-hidden">
        <div 
          className="absolute inset-0 preserve-3d"
          style={{ transform: `translateZ(-600px) scale(1.7) rotateX(${mousePosition.y * 8}deg) rotateY(${mousePosition.x * -8}deg)` }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Premium abstract mesh */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6E59A5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#33C3F0" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
              fill="url(#grad1)"
              initial={{ d: "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z" }}
              animate={{ 
                d: [
                  "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z",
                  "M0,400 Q250,600 500,400 T1000,400 L1000,1000 L0,1000 Z",
                  "M0,500 Q250,300 500,500 T1000,500 L1000,1000 L0,1000 Z"
                ]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.path
              d="M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z"
              fill="url(#grad1)"
              opacity="0.3"
              initial={{ d: "M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z" }}
              animate={{ 
                d: [
                  "M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z",
                  "M0,700 Q250,500 500,700 T1000,700 L1000,1000 L0,1000 Z",
                  "M0,600 Q250,800 500,600 T1000,600 L1000,1000 L0,1000 Z"
                ]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </svg>
          
          {/* Abstract circular elements */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full bg-gradient-radial from-bds-purple/20 to-transparent blur-3xl"
            style={{ top: '10%', left: '60%' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-gradient-radial from-bds-accent/20 to-transparent blur-3xl"
            style={{ top: '60%', left: '20%' }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />
        </div>
        
        {/* Second layer with service-related imagery */}
        <div 
          className="absolute inset-0 preserve-3d" 
          style={{ transform: `translateZ(-300px) scale(1.4) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * -5}deg)` }}
        >
          {/* Service visuals - Data processing visual */}
          <motion.div 
            className="absolute top-[10%] left-[10%] w-72 h-48 rounded-2xl overflow-hidden parallax-layer"
            data-depth="0.2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bds-purple/10 to-bds-accent/5 backdrop-blur-sm border border-white/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="grid grid-cols-8 grid-rows-8 gap-1 w-[80%] h-[80%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className={`rounded-sm bg-gradient-to-br ${i % 5 === 0 ? 'from-bds-purple/40 to-bds-purple/20' : 'from-white/10 to-white/5'}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: Math.random() * 0.5 + 0.3,
                      height: `${Math.random() * 100}%`
                    }}
                    transition={{ 
                      delay: 0.5 + (i * 0.01),
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      repeatDelay: Math.random() * 5 + 2
                    }}
                  />
                ))}
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-2 left-0 right-0 text-center text-white/60 text-xs font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1, duration: 1 }}
            >
              DATA INFRASTRUCTURE
            </motion.div>
          </motion.div>
          
          {/* Business Intelligence visual */}
          <motion.div 
            className="absolute top-[15%] right-[10%] w-64 h-64 rounded-2xl overflow-hidden parallax-layer"
            data-depth="0.35"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bds-accent/10 to-bds-purple/5 backdrop-blur-sm border border-white/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="w-[80%] h-[80%] relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                <motion.div 
                  className="absolute inset-0" 
                  style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 30,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                >
                  {/* Create 3D pie chart segments */}
                  {[...Array(5)].map((_, idx) => {
                    const rotation = idx * 72;
                    const color = idx % 2 === 0 ? 'from-bds-accent/40 to-bds-accent/20' : 'from-bds-purple/40 to-bds-purple/20';
                    const size = 80 + (idx * 5);
                    
                    return (
                      <motion.div 
                        key={idx}
                        className={`absolute top-1/2 left-1/2 w-${size} h-${size} bg-gradient-to-br ${color} rounded-full`}
                        style={{ 
                          transformOrigin: 'center', 
                          transform: `translate(-50%, -50%) rotateZ(${rotation}deg)`,
                          clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                        }}
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3 + idx,
                          repeat: Infinity,
                          repeatType: 'reverse',
                        }}
                      />
                    );
                  })}
                  
                  <motion.div 
                    className="absolute top-1/2 left-1/2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full"
                    style={{ transform: 'translate(-50%, -50%)' }}
                    animate={{ 
                      boxShadow: [
                        '0 0 0px rgba(255,255,255,0.5)',
                        '0 0 30px rgba(255,255,255,0.5)',
                        '0 0 0px rgba(255,255,255,0.5)'
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-2 left-0 right-0 text-center text-white/60 text-xs font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1, duration: 1 }}
            >
              BUSINESS INTELLIGENCE
            </motion.div>
          </motion.div>
          
          {/* Custom Solutions visual - code base */}
          <motion.div 
            className="absolute bottom-[25%] left-[15%] w-80 h-52 rounded-2xl overflow-hidden parallax-layer"
            data-depth="0.25"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bds-blue/40 to-bds-purple/20 backdrop-blur-sm border border-white/10"></div>
            <div className="absolute inset-0 p-4">
              <motion.div 
                className="h-full overflow-hidden font-mono text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear",
                    repeatType: "loop" 
                  }}
                >
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="flex items-center mb-1">
                      <span className="text-bds-accent/70 mr-2">{i + 1}</span>
                      <span className="text-white/50 mr-2">{i % 4 === 0 ? 'function' : i % 4 === 1 ? 'class' : i % 4 === 2 ? 'const' : 'let'}</span>
                      <span className="text-bds-light-purple/70 mr-1">{i % 3 === 0 ? 'processData' : i % 3 === 1 ? 'renderComponent' : 'analyzeResults'}</span>
                      <span className="text-white/60 mr-1">{i % 4 === 0 ? '(' : i % 4 === 1 ? ' {' : ' ='}</span>
                      <span className="text-bds-accent/80">
                        {i % 5 === 0 ? 'data => transform(data)' : 
                         i % 5 === 1 ? '<Dashboard {...props} />' : 
                         i % 5 === 2 ? 'new DataService()' : 
                         i % 5 === 3 ? '[...results].map(analyze)' : 
                         'compute(metrics)'}
                      </span>
                      <span className="text-white/60">{i % 3 === 0 ? ');' : i % 3 === 1 ? '}' : ';'}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-2 left-0 right-0 text-center text-white/60 text-xs font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1, duration: 1 }}
            >
              CUSTOM SOLUTIONS
            </motion.div>
          </motion.div>
          
          {/* AI & ML visual */}
          <motion.div 
            className="absolute bottom-[20%] right-[15%] w-72 h-52 rounded-2xl overflow-hidden parallax-layer"
            data-depth="0.3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.9, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-bds-purple/10 to-bds-accent/10 backdrop-blur-sm border border-white/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="relative h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                {/* Neural network visualization */}
                <svg width="100%" height="100%" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(10,10)">
                    {/* Nodes */}
                    {[0, 1, 2, 3].map(layer => (
                      <g key={`layer-${layer}`}>
                        {Array.from({ length: layer === 0 || layer === 3 ? 3 : 5 }).map((_, idx) => {
                          const x = (layer * 80) + 20;
                          const y = layer === 0 || layer === 3 ? 
                            30 + idx * 60 : 
                            20 + idx * 40;
                          return (
                            <motion.circle 
                              key={`node-${layer}-${idx}`}
                              cx={x} 
                              cy={y} 
                              r={layer === 0 || layer === 3 ? 8 : 6}
                              fill={layer === 0 ? 'rgba(155, 135, 245, 0.5)' : 
                                   layer === 3 ? 'rgba(51, 195, 240, 0.5)' : 
                                   'rgba(255, 255, 255, 0.3)'}
                              strokeWidth="1"
                              stroke="rgba(255,255,255,0.3)"
                              initial={{ opacity: 0 }}
                              animate={{ 
                                opacity: 0.8,
                                filter: [
                                  'drop-shadow(0 0 2px rgba(255,255,255,0.1))',
                                  'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
                                  'drop-shadow(0 0 2px rgba(255,255,255,0.1))'
                                ]
                              }}
                              transition={{
                                opacity: { delay: 1.2 + (layer * 0.2) + (idx * 0.05), duration: 0.5 },
                                filter: { delay: 1.2 + (layer * 0.2) + (idx * 0.05), duration: 3, repeat: Infinity }
                              }}
                            />
                          );
                        })}
                      </g>
                    ))}
                    
                    {/* Connections */}
                    <g>
                      {[0, 1, 2].map(fromLayer => {
                        const fromNodes = fromLayer === 0 || fromLayer === 3 ? 3 : 5;
                        const toNodes = fromLayer === 2 ? 3 : 5;
                        
                        return Array.from({ length: fromNodes }).map((_, fromIdx) => {
                          const fromX = (fromLayer * 80) + 20;
                          const fromY = fromLayer === 0 ? 
                            30 + fromIdx * 60 : 
                            20 + fromIdx * 40;
                          
                          return Array.from({ length: toNodes }).map((_, toIdx) => {
                            const toX = ((fromLayer + 1) * 80) + 20;
                            const toY = (fromLayer + 1) === 3 ? 
                              30 + toIdx * 60 : 
                              20 + toIdx * 40;
                            
                            return (
                              <motion.line
                                key={`connection-${fromLayer}-${fromIdx}-${toIdx}`}
                                x1={fromX}
                                y1={fromY}
                                x2={toX}
                                y2={toY}
                                stroke={`rgba(255,255,255,${0.1 + (Math.random() * 0.2)})`}
                                strokeWidth="0.5"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ 
                                  pathLength: 1,
                                  opacity: [0.2, 0.5, 0.2],
                                  strokeDasharray: ["0, 150", "150, 0"],
                                }}
                                transition={{
                                  pathLength: { delay: 1.5 + (fromLayer * 0.3) + ((fromIdx + toIdx) * 0.02), duration: 0.8, ease: "easeInOut" },
                                  opacity: { delay: 1.5 + (fromLayer * 0.3), duration: 3, repeat: Infinity, ease: "easeInOut" },
                                  strokeDasharray: { 
                                    delay: 1.5 + (fromLayer * 0.3) + ((fromIdx + toIdx) * 0.02),
                                    duration: 3 + (Math.random() * 2),
                                    repeat: Infinity, 
                                    ease: "linear" 
                                  }
                                }}
                              />
                            );
                          });
                        }).flat();
                      }).flat()}
                    </g>
                    
                    {/* Data flow animation */}
                    {[0, 1, 2].map(fromLayer => {
                      const fromNodes = fromLayer === 0 || fromLayer === 3 ? 3 : 5;
                      const toNodes = fromLayer === 2 ? 3 : 5;
                      
                      return Array.from({ length: Math.min(fromNodes, toNodes) }).map((_, idx) => {
                        const fromX = (fromLayer * 80) + 20;
                        const fromY = fromLayer === 0 ? 
                          30 + idx * 60 : 
                          20 + idx * 40;
                        
                        const toX = ((fromLayer + 1) * 80) + 20;
                        const toY = (fromLayer + 1) === 3 ? 
                          30 + idx * 60 : 
                          20 + idx * 40;
                        
                        return (
                          <motion.circle
                            key={`pulse-${fromLayer}-${idx}`}
                            r={3}
                            fill={fromLayer === 0 ? 'rgba(155, 135, 245, 0.8)' : 
                                 fromLayer === 2 ? 'rgba(51, 195, 240, 0.8)' : 
                                 'rgba(255, 255, 255, 0.6)'}
                            initial={{ cx: fromX, cy: fromY, opacity: 0 }}
                            animate={{ 
                              cx: [fromX, toX],
                              cy: [fromY, toY],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1.2, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              delay: 2 + (Math.random() * 2),
                              repeat: Infinity,
                              repeatDelay: 3 + (Math.random() * 5),
                              ease: "easeInOut"
                            }}
                          />
                        );
                      });
                    }).flat()}
                  </g>
                </svg>
              </motion.div>
            </div>
            <motion.div 
              className="absolute bottom-2 left-0 right-0 text-center text-white/60 text-xs font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1, duration: 1 }}
            >
              AI & MACHINE LEARNING
            </motion.div>
          </motion.div>
        </div>
        
        {/* Third layer with service icons and decorative elements */}
       
      </div>
      
     
      
      {/* Digital data flow effect throughout */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 8 }).map((_, i) => {
          const y1 = Math.random() * 100;
          const y2 = Math.random() * 100;
          const dash = Math.random() * 10 + 5;
          const gap = Math.random() * 20 + 10;
          const duration = Math.random() * 40 + 40;
          const delay = Math.random() * 5;
          const reverse = Math.random() > 0.5;
          
          return (
            <motion.line 
              key={`flow-line-${i}`}
              x1={reverse ? "100%" : "0%"} 
              y1={`${y1}%`} 
              x2={reverse ? "0%" : "100%"} 
              y2={`${y2}%`} 
              stroke={i % 2 === 0 ? "url(#data-gradient1)" : "url(#data-gradient2)"} 
              strokeWidth={Math.random() * 0.5 + 0.5} 
              strokeDasharray={`${dash},${gap}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: reverse ? 1000 : -1000 }}
              transition={{ duration: duration, repeat: Infinity, ease: "linear", delay }}
            />
          );
        })}
      
      </svg>
     
    </div>
  );
};

export default Hero1;
