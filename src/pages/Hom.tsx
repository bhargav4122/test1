import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Navbar from "@/components/Navbar";


const Hom = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans">
        

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-100 opacity-20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>



      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6">
        <div className="container mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Transforming Ideas Into <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Digital Reality</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              We help businesses grow through innovative digital solutions and cutting-edge technology.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all flex items-center justify-center">
                Get Started <ArrowRight className="ml-2" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:bg-gray-50 transition-all flex items-center justify-center">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 md:mt-24 relative"
          >
           

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
              className="absolute -right-10 top-1/4 bg-white p-4 rounded-xl shadow-lg hidden md:block"
            >
              <div className="text-purple-600 font-bold text-lg">99%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-12 bg-white">
        
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
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
                icon: "💻"
              },
              {
                title: "Mobile Apps",
                description: "iOS and Android applications with stunning UI/UX design.",
                icon: "📱"
              },
              {
                title: "Digital Marketing",
                description: "Data-driven strategies to grow your online presence.",
                icon: "📈"
              },
              {
                title: "UI/UX Design",
                description: "Beautiful, intuitive interfaces that delight your users.",
                icon: "🎨"
              },
              {
                title: "Cloud Solutions",
                description: "Scalable infrastructure for your growing business.",
                icon: "☁️"
              },
              {
                title: "AI Integration",
                description: "Leverage artificial intelligence to gain a competitive edge.",
                icon: "🧠"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Let's discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-bold">
                Get a Free Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
          }}
          className="flex flex-col items-center text-gray-600 cursor-pointer"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
        >
          <span className="text-sm mb-1">Scroll</span>
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </div>
  );
};

export default Hom;