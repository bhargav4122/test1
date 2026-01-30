import React, { useRef, useState, useEffect } from 'react';
import SEO from '@/components/common/SEO';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Terms = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>('');
  const controls = useAnimation();
  const sections = [
    { id: 'acceptance', number: 1, title: 'Acceptance of Terms', color: 'primary' },
    { id: 'license', number: 2, title: 'Use License', color: 'blue' },
    { id: 'availability', number: 3, title: 'Service Availability', color: 'green' },
    { id: 'protection', number: 4, title: 'Data Protection', color: 'yellow' },
    { id: 'liability', number: 5, title: 'Limitation of Liability', color: 'red' },
    { id: 'termination', number: 6, title: 'Termination', color: 'orange' },
    { id: 'third-party', number: 7, title: 'Third-Party Services', color: 'indigo' },
    { id: 'force-majeure', number: 8, title: 'Force Majeure', color: 'pink' },
    { id: 'governing-law', number: 9, title: 'Governing Law', color: 'teal' },
    { id: 'legal-integrity', number: 10, title: 'Legal Integrity', color: 'purple' },
    { id: 'contact', number: 11, title: 'Contact Information', color: 'purple' }
  ];


  React.useEffect(() => {
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
              // Don't reset opacity when scrolling back up
              if (section.id !== 'acceptance') {
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

  // Simple section variants without viewport
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
        title="Terms of Service | Business and Data Solutions LTD"
        description="Read our comprehensive Terms of Service to understand the rules and regulations for using Business and Data Solutions LTD's premium data solutions and services."
        keywords="terms of service, terms and conditions, user agreement, legal terms, data protection, privacy policy"
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Legal Document</span>
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
                  <span className="block text-gray-900 dark:text-white">Terms of</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-purple-600">
                    Service
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
                  Welcome to “Business and Data Solutions LTD (‘Company’, ‘we’, ‘us’, ‘our’) operates this website.”. These terms govern your use of our premium data solutions and services.
                  By accessing our platform, you agree to be bound by these comprehensive terms and conditions.
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                    onClick={() => {
                      document.getElementById('acceptance')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Review Terms
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

          {/* Acceptance of Terms - Remove GSAP conflicts */}
          <section id="acceptance" className="mb-20 relative">
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
                      Acceptance of Terms
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                        Mandatory Agreement
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
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          By accessing or using this website, you confirm that you are at least 18 years old and agree to be legally bound by these Terms of Service. You acknowledge that you have read,
                          understood, and agree to be bound by these Terms of Service in their entirety.
                          These terms constitute a legally binding agreement between you and Business and Data Solutions LTD.
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
                        Your Agreement
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span className="text-gray-600 dark:text-gray-400">You agree to these terms automatically upon service access</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-green-500">✓</span>
                          <span className="text-gray-600 dark:text-gray-400">You confirm you have legal authority to enter this agreement</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                        If You Disagree
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        If you do not agree with any part of these terms, you must immediately discontinue
                        your use of Business and Data Solutions LTD's services and terminate your account.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Use License */}
          <section id="license" className="mb-20">
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
                      Use License
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm font-semibold rounded-full">
                        Intellectual Property
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
                      Business and Data Solutions LTD grants you a limited, non-exclusive, non-transferable license to access and
                      use our services for your personal or internal business purposes, subject to these terms.
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          Permitted Use
                        </h3>
                        <span className="text-sm font-medium text-green-600 bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded">Allowed</span>
                      </div>

                      <ul className="space-y-3">
                        {[
                          "Materials may not be redistributed, resold, sublicensed, or used for commercial purposes without prior written permission.",
                          "Personal, non-commercial use of our platform",
                          "Temporary viewing of materials",
                          "Downloading for internal business purposes",
                          "Sharing with authorized team members"
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start"
                          >
                            <span className="mr-3 text-green-500">•</span>
                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          Prohibited Use
                        </h3>
                        <span className="text-sm font-medium text-red-600 bg-red-100 dark:bg-red-500/20 px-2 py-1 rounded">Restricted</span>
                      </div>
                      <ul className="space-y-3">
                        {[
                          "Modify or copy proprietary materials",
                          "Use for commercial resale or public display",
                          "Reverse engineer any software",
                          "Remove copyright or proprietary notices"
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start"
                          >
                            <span className="mr-3 text-red-500">•</span>
                            <span className="text-gray-600 dark:text-gray-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Service Availability */}
          <section id="availability" className="mb-20">
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
                      Service Availability
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-semibold rounded-full">
                        Uptime & Maintenance
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          “We aim to maintain high service availability; however, uninterrupted or error-free service is not guaranteed. Services may be modified, suspended, or discontinued at any time.”
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { label: 'Uptime', value: '99.9%', color: 'text-green-600', bg: 'bg-green-500/10' },
                      { label: 'Response Time', value: '<15min', color: 'text-blue-600', bg: 'bg-blue-500/10' },
                      { label: 'Support Coverage', value: '24/7', color: 'text-purple-600', bg: 'bg-purple-500/10' }
                    ].map((metric, index) => (
                      <motion.div
                        key={index}
                        className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                      >
                        <div className={`w-12 h-12 ${metric.bg} rounded-lg flex items-center justify-center mb-4`}>
                          <div className={`text-xl font-bold ${metric.color}`}>{metric.value}</div>
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white">{metric.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Guaranteed in contract</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Data Protection */}
          <section id="protection" className="mb-20">
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
                      Data Protection
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          “We process limited personal data such as names, email addresses, and system identifiers solely for operational, communication, and security purposes. Appropriate technical and organisational measures are applied to protect this data. Full details are available in our Privacy Policy.”
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Limitation of Liability */}
          <section id="liability" className="mb-20">
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
                      5
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Limitation of Liability
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-red-500/10 text-red-500 text-sm font-semibold rounded-full">
                        Important Notice
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">Critical Legal Notice</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          To the maximum extent permitted by applicable law, Business and Data Solutions LTD and its affiliates shall not
                          be liable for any indirect, incidental, special, consequential, or punitive damages,
                          including but not limited to loss of profits, data, business, or goodwill.
                          Nothing in these Terms limits liability where such limitation is prohibited by applicable law.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* NEW SECTION 6: Termination & Suspension */}
          <section id="termination" className="mb-20">
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
                      Termination
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-sm font-semibold rounded-full">
                        Account Access
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We reserve the right to suspend or terminate access to the website or services at any time if these Terms are violated or where required for legal or security reasons.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* NEW SECTION 7: Third-Party Services */}
          <section id="third-party" className="mb-20">
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
                    <div className="w-14 h-14 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold text-2xl">
                      7
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Third-Party Services
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-sm font-semibold rounded-full">
                        External Providers
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-indigo-500/5 to-transparent dark:from-indigo-500/10 rounded-xl border border-indigo-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-indigo-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Our services may rely on third-party providers such as hosting, analytics, email, or cloud infrastructure services. We are not responsible for outages or issues originating from these third-party systems.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* NEW SECTION 8: Force Majeure */}
          <section id="force-majeure" className="mb-20">
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
                      8
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Force Majeure
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-pink-500/10 text-pink-500 text-sm font-semibold rounded-full">
                        Uncontrollable Events
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
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-pink-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          We shall not be liable for any failure or delay caused by events beyond our reasonable control, including natural disasters, internet outages, governmental actions, or system failures.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* NEW SECTION 9: Governing Law */}
          <section id="governing-law" className="mb-20">
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
                    <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-500 font-bold text-2xl">
                      9
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Governing Law
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-teal-500/10 text-teal-500 text-sm font-semibold rounded-full">
                        Legal Jurisdiction
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <motion.div
                    className="p-6 bg-gradient-to-r from-teal-500/5 to-transparent dark:from-teal-500/10 rounded-xl border border-teal-500/20"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-teal-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Legal Jurisdiction Notice</p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          These Terms are governed by and construed in accordance with the laws of England and Wales. The courts of England and Wales shall have exclusive jurisdiction.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* NEW SECTION 10: Legal Integrity */}
          <section id="legal-integrity" className="mb-20">
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
                      10
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Legal Integrity
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-sm font-semibold rounded-full">
                        Agreement Structure
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
                    <div className="flex items-start">
                      <svg className="w-8 h-8 text-purple-500 mr-4 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <div>
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          These Terms constitute the entire agreement between you and Business and Data Solutions LTD. If any provision is held invalid, the remaining provisions shall remain in full force and effect.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Updated Contact Information Section (now Section 11) */}
          {/* Contact Information */}
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
                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-2xl">
                      11
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Contact Information
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-sm font-semibold rounded-full">
                        Get in Touch
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    For any questions regarding these Terms of Service, please contact our dedicated support teams:
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300"
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
                        HR & Legal Department
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

export default Terms;
