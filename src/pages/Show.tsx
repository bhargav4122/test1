import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useAnimation } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X, Code, Cpu, Palette, Smartphone, BarChart2, Cloud, Brain } from 'lucide-react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useGesture } from 'react-use-gesture';
import Navbar from "@/components/Navbar";

const Show = () => {
  // State for interactive elements
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const constraintsRef = useRef(null);
  
  // Animation controls
  const controls = useAnimation();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  // Particle system config
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  // Track cursor for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

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

  // Floating animation
  const floating = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Interactive Particle Background */}
      <div className="fixed inset-0 z-0 opacity-70">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push"
                },
                onHover: {
                  enable: true,
                  mode: "repulse"
                }
              },
              modes: {
                push: {
                  quantity: 4
                },
                repulse: {
                  distance: 100,
                  duration: 0.4
                }
              }
            },
            particles: {
              color: {
                value: "#ffffff"
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1
              },
              move: {
                direction: "none",
                enable: true,
                outModes: "bounce",
                random: false,
                speed: 1,
                straight: false
              },
              number: {
                density: {
                  enable: true,
                  area: 800
                },
                value: 80
              },
              opacity: {
                value: 0.5
              },
              shape: {
                type: "circle"
              },
              size: {
                value: { min: 1, max: 3 }
              }
            },
            detectRetina: true
          }}
        />
      </div>

      {/* Dynamic Gradient Overlay */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
            'radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
            'radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.2) 0%, rgba(0, 0, 0, 0) 50%)',
            'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.2) 0%, rgba(0, 0, 0, 0) 50%)'
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />


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

      {/* Interactive Feature Showcase */}
      <section className="py-20 bg-gray-800/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              React Superpowers
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover what makes this showcase special
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Particle Systems",
                description: "Interactive particle backgrounds that respond to user actions",
                icon: <Cloud className="w-8 h-8" />,
                color: "from-blue-500/10 to-blue-600/10"
              },
              {
                title: "3D Transformations",
                description: "Card flips and perspective effects with CSS 3D",
                icon: <Cpu className="w-8 h-8" />,
                color: "from-purple-500/10 to-purple-600/10"
              },
              {
                title: "Gesture Controls",
                description: "Drag, swipe and hover interactions with react-use-gesture",
                icon: <BarChart2 className="w-8 h-8" />,
                color: "from-green-500/10 to-green-600/10"
              },
              {
                title: "Animated Gradients",
                description: "Smoothly transitioning gradient backgrounds",
                icon: <Palette className="w-8 h-8" />,
                color: "from-pink-500/10 to-pink-600/10"
              },
              {
                title: "Parallax Effects",
                description: "Depth perception with layered scrolling",
                icon: <Smartphone className="w-8 h-8" />,
                color: "from-indigo-500/10 to-indigo-600/10"
              },
              {
                title: "Micro-interactions",
                description: "Delightful details that enhance user experience",
                icon: <Brain className="w-8 h-8" />,
                color: "from-teal-500/10 to-teal-600/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "backOut"
                  } 
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)'
                }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm p-8 rounded-xl border border-gray-700/50`}
              >
                <motion.div 
                  className="text-blue-400 mb-4"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring' }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-700/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    See in action <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

   

    

     
  
    </div>
  );
};

export default Show;