import React, { useRef, useState, useEffect } from 'react';
import SEO from '@/components/common/SEO';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>('');
  const controls = useAnimation();

  const sections = [
    { id: 'information-collect', number: 1, title: 'Information We Collect', color: 'primary' },
    { id: 'information-use', number: 2, title: 'How We Use Your Information', color: 'blue' },
    { id: 'information-sharing', number: 3, title: 'Information Sharing', color: 'green' },
    { id: 'data-security', number: 4, title: 'Data Security', color: 'yellow' },
    { id: 'your-rights', number: 5, title: 'Your Rights', color: 'purple' },
    { id: 'cookies', number: 6, title: 'Cookies', color: 'orange' },
    { id: 'contact', number: 7, title: 'Contact Us', color: 'pink' },
    { id: 'communications', number: 8, title: 'Communications & Unsubscribe', color: 'red' }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Set up GSAP ScrollTrigger for section animations
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) return;

      gsap.fromTo(element,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            end: "bottom center",
            toggleActions: "play none none reverse",
            onEnter: () => {
              setActiveSection(section.id);
            },
            onEnterBack: () => {
              setActiveSection(section.id);
            },
            onLeaveBack: () => {
              if (section.id !== 'information-collect') {
                gsap.to(element, {
                  opacity: 0,
                  y: 30,
                  duration: 0.3,
                  clearProps: "all"
                });
              }
            }
          }
        }
      );

      // Animate inner elements
      const innerElements = element.querySelectorAll('.animate-inner');
      gsap.from(innerElements, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.2,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Hero animation
    const heroElement = containerRef.current.querySelector('#hero-section');
    if (heroElement) {
      gsap.from(heroElement, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        delay: 0.2
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(`${type} copied!`);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <SEO
        title="Privacy Policy | Business and Data Solutions LTD"
        description="Learn how Business and Data Solutions LTD collects, uses, and protects your personal information. Your privacy is important to us."
        keywords="privacy policy, data protection, privacy notice, personal information security, GDPR compliance"
      />

      <main className="flex-1 py-20 relative z-10" ref={containerRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div id="hero-section" className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 p-8 md:p-12"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-32 translate-x-32 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Privacy Document</span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Version 2.1 • Effective Immediately</p>
                    </div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="block md:hidden"
                  >
                    <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last updated</span>
                      <p className="text-lg font-bold text-primary">{new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</p>
                    </div>
                  </motion.div>
                </div>

                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="block text-gray-900 dark:text-white">Privacy</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-purple-600">
                    Policy
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
                  Welcome to the Privacy Policy of Business and Data Solutions LTD. This document explains how we collect, use, disclose,
                  and safeguard your information when you use our services. Your privacy is critically important to us.
                  This policy applies in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                    onClick={() => {
                      document.getElementById('information-collect')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Review Policy
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-xl font-semibold border border-gray-300 dark:border-gray-700 hover:border-primary transition-colors"
                    onClick={() => window.print()}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      <span>Print Document</span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Information We Collect */}
          <section id="information-collect" className="mb-20 relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                      1
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Information We Collect
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                        Data Collection
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 rounded-xl border border-primary/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-primary mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We collect information you provide directly to us, such as when you create an account, use our services, or contact us.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Personal Information
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Name, email address, phone number</span>
                        </li>
                        <li>  <span className="mr-2 text-green-500">•</span> IP address </li>
                        <li>  <span className="mr-2 text-green-500">•</span> Log files</li>
                        <li>  <span className="mr-2 text-green-500">•</span> Referral URLs </li>
                        <li>  <span className="mr-2 text-green-500">•</span> Timestamp of access </li>

                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Business information (company, industry, role)</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Usage Data
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Analytics and usage patterns</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Device and browser information</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* How We Use Your Information */}
          <section id="information-use" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-2xl">
                      2
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      How We Use Your Information
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm font-semibold rounded-full">
                        Data Processing
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-500/10 rounded-xl border border-blue-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      We use the information we collect to provide, maintain, and improve our services, process transactions, send technical notices and support messages, and communicate about products and services.
                    </p>
                  </motion.div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">

                    Legal Basis for Processing (UK GDPR)
                    We process personal data based on consent, contractual necessity, legal obligations, and legitimate business interests.
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Service Operations</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Provide, maintain, and improve our services</p>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Transactions</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Process transactions and send related information</p>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Support</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Send technical notices and support messages</p>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Communications</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Communicate about products, services, and events</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Information Sharing */}
          <section id="information-sharing" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-2xl">
                      3
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Information Sharing
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-semibold rounded-full">
                        Privacy Commitment
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-green-500/5 to-transparent dark:from-green-500/10 rounded-xl border border-green-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-green-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
                          <br />
                          We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, as long as those parties agree to keep this information confidential.
                          <br />
                          We may also disclose your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect our or others' rights, property, or safety.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Data Security */}
          <section id="data-security" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-2xl">
                      4
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Data Security
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-semibold rounded-full">
                        Security & Compliance
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-yellow-500/5 to-transparent dark:from-yellow-500/10 rounded-xl border border-yellow-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-yellow-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                        </p>
                        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-900/30">
                          <p className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Compliance Approach</p>
                          <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                            We apply GDPR-aligned security and privacy-by-design practices. Formal certifications such as ISO 27001 and SOC 2 are planned as our organisation scales. </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Your Rights */}
          <section id="your-rights" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-2xl">
                      5
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Your Rights
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-sm font-semibold rounded-full">
                        Data Subject Rights
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-purple-500/5 to-transparent dark:from-purple-500/10 rounded-xl border border-purple-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      You have the following rights regarding your personal data under applicable data protection laws:
                      To exercise any of these rights, please contact us using the details provided below. We respond within 30 days as required by law.

                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { icon: '👁️', title: 'Access', desc: 'View your personal information' },
                      { icon: '✏️', title: 'Correction', desc: 'Correct inaccurate data' },
                      { icon: '🗑️', title: 'Deletion', desc: 'Delete your personal information' },
                      { icon: '🚫', title: 'Objection', desc: 'Object to processing' },
                      { icon: '📤', title: 'Portability', desc: 'Request data transfer' },
                      { icon: '⏸️', title: 'Restriction', desc: 'Limit data processing' },
                    ].map((right, index) => (
                      <motion.div
                        key={index}
                        className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                      >
                        <div className="flex items-start">
                          <span className="text-2xl mr-3">{right.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{right.title}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{right.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cookies */}
          <section id="cookies" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-2xl">
                      6
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Cookies
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-semibold rounded-full">
                        Tracking Technologies
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-orange-500/5 to-transparent dark:from-orange-500/10 rounded-xl border border-orange-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-orange-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We use cookies and similar technologies to enhance your experience. You can control cookie preferences through our cookie settings.
                          Non-essential cookies are only activated after explicit user consent.

                        </p>
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          href="https://www.businessanddatasolutions.com/cookies/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors shadow-lg"
                        >
                          Manage Cookie Preferences
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Contact Us */}
          <section id="contact" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 font-bold text-2xl">
                      7
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Contact Us
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-pink-500/10 text-pink-500 text-sm font-semibold rounded-full">
                        Privacy & Data Protection Contact
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-pink-500/5 to-transparent dark:from-pink-500/10 rounded-xl border border-pink-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      For privacy-related questions, contact our Data Protection Officer:
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        Contact Information
                      </h3>

                      <div className="space-y-4">
                        {[
                          {
                            type: 'email',
                            value: 'hr@businessanddatasolutions.com',
                            icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                          },
                          {
                            type: 'phone',
                            value: '+44 (748) 787-1919',
                            icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
                          },
                          {
                            type: 'address',
                            value: 'Katherine Road, London, E7 8LS',
                            icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          }
                        ].map((contact, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                            whileHover={{ x: 5 }}
                            onClick={() => copyToClipboard(contact.value, contact.type)}
                          >
                            <div className="flex items-center">
                              <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={contact.icon} />
                              </svg>
                              <span className="text-gray-700 dark:text-gray-300">
                                {contact.value}
                              </span>
                            </div>
                            <button className="text-xs text-primary font-medium px-2 py-1 rounded hover:bg-primary/10">
                              Copy
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 rounded-xl border border-blue-200 dark:border-blue-900/30 hover:border-blue-500 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-6 flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        Support Hours & Response
                      </h3>

                      <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <div className="font-semibold text-gray-900 dark:text-white mb-2">Standard Support</div>
                          <div className="text-gray-600 dark:text-gray-400">Monday – Friday: 9:00 AM – 5:00 PM (UK time)</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">Response time: Within 4 business hours</div>
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/30">
                          <div className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Premium Support</div>
                          <div className="text-blue-600 dark:text-blue-400">24/7 for enterprise clients</div>
                          <div className="text-sm text-blue-500 dark:text-blue-400 mt-2">Response time: Within 30 minutes</div>
                        </div>

                        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-900/30">
                          <div className="font-semibold text-red-700 dark:text-red-300 mb-2">Urgent Privacy Matters</div>
                          <p className="text-sm text-red-600 dark:text-red-400">
                            For urgent privacy matters outside business hours, please email with "URGENT" in the subject line.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Communications & Unsubscribe */}
          <section id="communications" className="mb-20">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-shadow duration-500 overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex items-start mb-8">
                  <div className="mr-6">
                    <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-2xl">
                      8
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Communications & Unsubscribe
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-semibold rounded-full">
                        Communication Control
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-red-500/5 to-transparent dark:from-red-500/10 rounded-xl border border-red-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-red-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We may send you service-related notifications, updates, or informational emails related to your interaction with Business and Data Solutions LTD.
                          You are always in control of your communications preferences.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Unsubscribe Methods
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start">
                          <span className="mr-3 text-green-500">•</span>
                          <div>
                            <span className="text-gray-700 dark:text-gray-300">Email us at </span>
                            <span className="font-medium text-gray-900 dark:text-white">hr@businessanddatasolutions.com</span>
                            <span className="text-gray-700 dark:text-gray-300"> with subject line </span>
                            <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">"Unsubscribe"</code>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-3 text-green-500">•</span>
                          <div>
                            <span className="text-gray-700 dark:text-gray-300">Use our unsubscribe page: </span>
                            <br />
                            <motion.a
                              href="https://www.businessanddatasolutions.com/unsubscribe"
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="mt-2 inline-block px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors shadow"
                            >
                              Click here to unsubscribe
                            </motion.a>
                          </div>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-yellow-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Important Notes
                      </h3>
                      <div className="space-y-3">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Unsubscribe requests are typically processed within a reasonable timeframe.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Certain essential or security-related communications may still be sent where legally required.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Copy Success Toast */}
          {copySuccess && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-in">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{copySuccess}</span>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Privacy;
