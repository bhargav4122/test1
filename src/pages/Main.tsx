import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { ArrowRight, ChevronDown, Menu, X, Code, Cpu, Palette, Smartphone, BarChart2, Cloud, Brain } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  color: string;
  icon: string;
}

interface MousePosition {
  x: number;
  y: number;
}

const Main: React.FC = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const FloatingGrid: React.FC = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            x: mousePosition.x * 20,
            y: mousePosition.y * 20,
            scale: 2 + Math.random() * 3,
            opacity: 0.2 + Math.random() * 0.3
          }}
          animate={{
            x: [0, mousePosition.x * 40],
            y: [0, mousePosition.y * 40],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );

 // Interactive card flip
  const flipCard = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: { 
      rotateY: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
    }
  };


  const features: Feature[] = [
    {
      title: "Visual Design",
      description: "Create stunning interfaces with our advanced design tools",
      color: "#4ECDC4",
      icon: "🎨"
    },
    {
      title: "Smart Automation",
      description: "Streamline workflow with AI-powered tools",
      color: "#FF6B6B",
      icon: "🤖"
    },
    {
      title: "Collaboration",
      description: "Real-time teamwork from anywhere",
      color: "#45B7D1",
      icon: "👥"
    },
              {
                title: "Web Development",
                description: "Custom websites and web applications tailored to your business needs.",
                 color: "#45B7D1",
                icon: "💻"
              },
              {
                title: "Mobile Apps",
                description: "iOS and Android applications with stunning UI/UX design.",
                 color: "#45B7D1",
                icon: "📱"
              },
              {
                title: "Digital Marketing",
                description: "Data-driven strategies to grow your online presence.",
                 color: "#45B7D1",
                icon: "📈"
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that delight your users.",
                 color: "#45B7D1",
                icon: "🎨"
              },
              {
                title: "Cloud Solutions",
                description: "Scalable infrastructure for your growing business.",
                 color: "#45B7D1",
                icon: "☁️"
              },
              {
                title: "AI Integration",
                description: "Leverage artificial intelligence to gain a competitive edge.",
                 color: "#45B7D1",
                icon: "🧠"
              }


  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" ref={containerRef}>



   

      {/* Hero Section */}

      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-0" />

        
        
        <motion.div 
          className="absolute inset-0 bg-grid-pattern opacity-10"
          style={{ y: y1 }}
        />

        <div className="relative z-10 max-w-7xl px-6 mx-auto text-center">

 <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1,
              }}
             className="absolute -right-10 -top-10 bg-white p-4 rounded-xl shadow-lg hidden md:block"
            >
              <div className="text-purple-600 font-bold text-lg">99%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </motion.div>


          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `translateX(${-scrollY * 0.2}px)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            Future of Design
          </motion.h1>
           {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="absolute -left-10 -bottom-10 bg-white p-4 rounded-xl shadow-lg hidden md:block"
            >
              <div className="text-blue-600 font-bold text-lg">+250%</div>
              <div className="text-gray-500 text-sm">Client Growth</div>
            </motion.div>

           




          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              transform: `translateX(${-scrollY * 0.1}px)`,
              opacity: Math.max(0, 1 - scrollY / 100)
            }}
          >
            Revolutionizing the way you create and build for the web
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              transform: `translateX(${-scrollY * 0.05}px)`,
              opacity: Math.max(0, 1 - scrollY / 500)
            }}
          >
            <button className="relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start your journey</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </section>

    {/* Interactive Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto relative z-10">

          {/* Floating 3D Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: 0.4, 
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              } 
            }}
            className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {['Interactive', 'Animated', 'Responsive', 'Dynamic'].map((item, index) => (
              <motion.div
                key={item}
                variants={flipCard}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: hoveredCard === index ? 10 : 1
                }}
              >
                <div className="text-4xl mb-4 text-blue-400">
                  {index === 0 && <Code className="w-10 h-10" />}
                  {index === 1 && <Palette className="w-10 h-10" />}
                  {index === 2 && <Smartphone className="w-10 h-10" />}
                  {index === 3 && <Cpu className="w-10 h-10" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item}</h3>
                <p className="text-gray-400 text-sm">
                  {index === 0 && 'Click & drag elements for interactive experience'}
                  {index === 1 && 'Beautiful animations powered by Framer Motion'}
                  {index === 2 && 'Looks great on any device size'}
                  {index === 3 && 'Real-time updates and reactivity'}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

     

      {/* Features Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-black/50 to-gray-900/50 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-cyan-400 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 
                  className="text-2xl font-bold mb-3" 
                  style={{ color: feature.color }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Ready to Create?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of designers and creators who are already building the future.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="relative overflow-hidden group bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Get Started Now</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Main;