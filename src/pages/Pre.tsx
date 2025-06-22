import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Navbar from "@/components/Navbar";

const Pre = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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

  // Hover effects
  const hoverEffect = {
    scale: 1.03,
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 10 
    }
  };

  const tapEffect = {
    scale: 0.98
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans overflow-hidden"
    >
        <Navbar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 300 + 100,
              height: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(40px)'
            }}
            animate={{
              y: [0, Math.random() * 200 - 100],
              x: [0, Math.random() * 200 - 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 10 + 2,
              height: Math.random() * 10 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Navigation with Glass Morphism */}
      <motion.header 
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}
        style={{
          backdropFilter: scrolled ? 'blur(10px)' : 'blur(0px)',
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
          boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.3)' : 'none'
        }}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YourCompany
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <Navbar />


          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <motion.button 
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-xl transition-all overflow-hidden group"
              whileHover={hoverEffect}
              whileTap={tapEffect}
            >
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-700 focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu with Glass Morphism */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-lg shadow-lg"
            style={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
              {['Home', 'Services', 'About', 'Work', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mt-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section with Parallax */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"
          style={{ y: y1 }}
        />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Transforming Ideas Into <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital Reality</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              We help businesses grow through innovative digital solutions and cutting-edge technology.
            </motion.p>

            <motion.div 
              variants={fadeIn} 
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <motion.button 
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              
              <motion.button 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:bg-gray-50/50 transition-all flex items-center justify-center backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image with Floating Effect */}
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
            className="mt-16 md:mt-24 relative"
          >
            <motion.div 
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-blue-500 to-purple-500">
                {/* Placeholder for hero image - replace with your actual image */}
                <div className="w-full h-full flex items-center justify-center text-white text-2xl">
                  [Your Hero Image]
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>

            {/* Floating elements with Glass Morphism */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }}
              className="absolute -left-10 -bottom-10 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hidden md:block border border-white/20"
            >
              <div className="text-blue-600 font-bold text-lg">+250%</div>
              <div className="text-gray-500 text-sm">Client Growth</div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: 1,
                ease: "easeInOut"
              }}
              className="absolute -right-10 top-1/4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg hidden md:block border border-white/20"
            >
              <div className="text-purple-600 font-bold text-lg">99%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section with Fade-in Effect */}
      <section className="py-16 bg-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"
          style={{ y: y2, opacity }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Trusted by innovative companies worldwide</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </motion.div>

          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-70">
            {['Company1', 'Company2', 'Company3', 'Company4', 'Company5'].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
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
                className="text-xl font-bold text-gray-700 hover:text-blue-600 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                {company}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Card Effect */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We offer comprehensive solutions to bring your digital vision to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Development",
                description: "Custom websites and web applications tailored to your business needs.",
                icon: "💻",
                color: "from-blue-100/50 to-blue-200/50"
              },
              {
                title: "Mobile Apps",
                description: "iOS and Android applications with stunning UI/UX design.",
                icon: "📱",
                color: "from-purple-100/50 to-purple-200/50"
              },
              {
                title: "Digital Marketing",
                description: "Data-driven strategies to grow your online presence.",
                icon: "📈",
                color: "from-green-100/50 to-green-200/50"
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that delight your users.",
                icon: "🎨",
                color: "from-pink-100/50 to-pink-200/50"
              },
              {
                title: "Cloud Solutions",
                description: "Scalable infrastructure for your growing business.",
                icon: "☁️",
                color: "from-indigo-100/50 to-indigo-200/50"
              },
              {
                title: "AI Integration",
                description: "Leverage artificial intelligence to gain a competitive edge.",
                icon: "🧠",
                color: "from-teal-100/50 to-teal-200/50"
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
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-white/20`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200/50"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.button
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    Learn more <ArrowRight className="w-4 h-4 ml-1" />
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Mesh Background */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-purple-600/10 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99]
              } 
            }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Get a Free Consultation</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </motion.button>
              
              <motion.button 
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:bg-white/50 transition-all backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Case Studies
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Gradient Border */}
      <footer className="relative bg-gray-900 text-white py-12 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                YourCompany
              </h3>
              <p className="text-gray-400 mb-4">
                Innovating digital solutions for the modern world.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -3, color: '#3B82F6' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {['Company', 'Services', 'Resources', 'Legal'].map((column) => (
              <div key={column}>
                <h4 className="text-lg font-semibold mb-4 text-white">{column}</h4>
                <ul className="space-y-2">
                  {Array(4).fill(0).map((_, i) => (
                    <motion.li 
                      key={i}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {column} Link {i + 1}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <p className="text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} YourCompany. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Scroll Indicator with Animation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          animate={{
            y: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-gray-600 cursor-pointer"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-sm mb-1">Scroll</span>
          <ChevronDown size={24} className="animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};

export default Pre;