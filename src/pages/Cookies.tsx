import React, { useRef, useState, useEffect } from 'react';
import SEO from '@/components/common/SEO';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Cookies = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false
  });

  const sections = [
    { id: 'what-are-cookies', number: 1, title: 'What Are Cookies', color: 'primary' },
    { id: 'types-of-cookies', number: 2, title: 'Types of Cookies We Use', color: 'blue' },
    { id: 'cookie-preferences', number: 3, title: 'Your Cookie Preferences', color: 'green' },
    { id: 'control-cookies', number: 4, title: 'How to Control Cookies', color: 'yellow' },
    { id: 'contact', number: 5, title: 'Contact Us', color: 'pink' },
    { id: 'policy-changes', number: 6, title: 'Changes to This Policy', color: 'purple' }
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
              if (section.id !== 'what-are-cookies') {
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

    // Animate cookie settings panel
    const settingsPanel = containerRef.current.querySelector('.settings-panel');
    if (settingsPanel) {
      gsap.from(settingsPanel, {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: settingsPanel,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const updatePreferences = (newPreferences: Partial<typeof preferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
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
        title="Cookie Policy | Business and Data Solutions LTD"
        description="Understand how Business and Data Solutions LTD uses cookies to improve your experience and how you can manage your cookie preferences."
        keywords="cookie policy, UK GDPR cookies, cookie consent, PECR compliance, cookie preferences, data privacy"

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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-primary uppercase tracking-wider">Cookie Document</span>
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
                  <span className="block text-gray-900 dark:text-white">Cookie</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-purple-600">
                    Policy
                  </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8">
                  Welcome to the Cookie Policy of Business and Data Solutions LTD. This document explains how we use cookies and similar technologies
                  to enhance your experience and how you can manage your cookie preferences.
                  <br></br>
                  This Cookie Policy is provided in accordance with the UK General Data Protection Regulation (UK GDPR) and the Privacy and Electronic Communications Regulations (PECR).

                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                    onClick={() => {
                      document.getElementById('what-are-cookies')?.scrollIntoView({ behavior: 'smooth' });
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

          {/* What Are Cookies */}
          <section id="what-are-cookies" className="mb-20 relative">
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
                      What Are Cookies
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                        Basic Information
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
                          Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                          They help us provide you with a better experience by remembering your preferences and improving our services.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Types of Cookies */}
          <section id="types-of-cookies" className="mb-20">
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
                      Types of Cookies We Use
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-sm font-semibold rounded-full">
                        Cookie Categories
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <motion.div
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="h-12 w-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Essential Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.
                    </p>
                  </motion.div>

                  <motion.div
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="h-12 w-12 mb-4 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Analytics Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      These cookies help us understand how visitors interact with our website by collecting information in an aggregated and anonymised form. These cookies are only activated after you provide explicit consent.

                    </p>
                  </motion.div>

                  <motion.div
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="h-12 w-12 mb-4 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <svg className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Marketing Cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      These cookies may track visitors across websites to deliver relevant advertising. Marketing cookies are disabled by default and only enabled after explicit user consent.

                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Cookie Preferences */}
          <section id="cookie-preferences" className="mb-20">
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
                      Your Cookie Preferences
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-green-500/10 text-green-500 text-sm font-semibold rounded-full">
                        Settings Control
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
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      You can manage your cookie preferences below. Note that disabling certain cookies may affect your experience on our website.
                      <br></br>
                      Your consent choices are recorded and can be updated at any time in accordance with data protection regulations.

                    </p>
                  </motion.div>

                  <div className="settings-panel p-8 rounded-xl border border-green-500/20 bg-gradient-to-br from-white to-green-50/30 dark:from-gray-800 dark:to-green-900/10 shadow-lg">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-white">
                      <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      Current Settings
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-500/50 transition-colors">
                        <div className="mb-3 sm:mb-0">
                          <p className="font-medium text-lg text-gray-900 dark:text-white">Essential Cookies</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Required for basic website functionality</p>
                        </div>
                        <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-sm font-medium flex items-center">
                          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Always Active
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500/50 transition-colors">
                        <div className="mb-3 sm:mb-0">
                          <p className="font-medium text-lg text-gray-900 dark:text-white">Analytics Cookies</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Help us improve our website</p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updatePreferences({ analytics: !preferences.analytics })}
                          className={`px-6 py-2 rounded-lg font-medium ${preferences.analytics
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                          {preferences.analytics ? "Enabled" : "Disabled"}
                        </motion.button>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500/50 transition-colors">
                        <div className="mb-3 sm:mb-0">
                          <p className="font-medium text-lg text-gray-900 dark:text-white">Marketing Cookies</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Personalize ads and content</p>


                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updatePreferences({ marketing: !preferences.marketing })}
                          className={`px-6 py-2 rounded-lg font-medium ${preferences.marketing
                            ? 'bg-purple-500 text-white hover:bg-purple-600'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                          {preferences.marketing ? "Enabled" : "Disabled"}
                        </motion.button>
                      </div>
                      <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                        Changes to cookie preferences apply immediately. Essential cookies are always active as they are required for core website functionality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* How to Control Cookies */}
          <section id="control-cookies" className="mb-20">
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
                      How to Control Cookies
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 text-sm font-semibold rounded-full">
                        Browser Settings
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
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer
                          and you can set most browsers to prevent them from being placed.
                          <br></br>
                          You can also revisit this page at any time to update your consent preferences.

                        </p>
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
                      5
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Contact Us
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-pink-500/10 text-pink-500 text-sm font-semibold rounded-full">
                        Questions & Support
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
                      This contact may also be used for privacy and data protection related enquiries.
                      <br></br>
                      If you have any questions about our use of cookies, please contact us:


                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        Email
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">info@businessanddatasolutions.com</p>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        Phone
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">+44 (748) 787-1919</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Changes to This Policy */}
          <section id="policy-changes" className="mb-20">
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
                      6
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                      Changes to This Policy
                    </h2>
                    <div className="flex items-center space-x-4 mb-6">
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-sm font-semibold rounded-full">
                        Policy Updates
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
                      We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or legal requirements.
                      Where required by law, renewed consent will be requested following material changes.

                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        Policy Updates
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Check the "Last Updated" date at the top</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Significant changes will be communicated</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 text-blue-500">•</span>
                          <span className="text-gray-600 dark:text-gray-400">Continued use means acceptance of updates</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Your Rights
                      </h3>
                      <div className="space-y-3">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          You can manage marketing communications separately via our unsubscribe options described in the Privacy Policy.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Essential service notices may be sent regardless of marketing preferences.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Cookies;
