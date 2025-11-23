import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Building, Factory, Store, Heart, Users, Target, Zap, Shield, Cloud, Brain, BarChart3, Cpu, DollarSign, Globe, TrendingUp, Lightbulb, FileText, Search } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Hero(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Cloudinary video URLs with optimizations
  const videoSources = {
    desktop: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:good,w_1920/v1753041808/Google_Gemini_n4h8by.mp4"
    },
    mobile: {
      webm: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_webm,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4",
      mp4: "https://res.cloudinary.com/dsf4d41i8/video/upload/f_mp4,q_auto:eco,w_640/v1753041808/Google_Gemini_n4h8by.mp4"
    },
    fallback: "https://res.cloudinary.com/dsf4d41i8/video/upload/v1753041808/Google_Gemini_n4h8by.mp4"
  };

  return (
    <div className="relative overflow-hidden pt-20">
      {/* Optimized Background Video */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover opacity-20 transition-opacity duration-500 ${
          videoLoaded ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
          transform: 'translateZ(0)'
        }}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://res.cloudinary.com/dsf4d41i8/image/upload/w_50,q_auto,f_auto/v1753041808/Google_Gemini_n4h8by.jpg"
        onLoadedData={() => setVideoLoaded(true)}
        onError={() => console.log('Video failed to load')}
      >
        {/* Mobile-optimized sources */}
        {isMobile ? (
          <>
            <source src={videoSources.mobile.webm} type="video/webm" />
            <source src={videoSources.mobile.mp4} type="video/mp4" />
          </>
        ) : (
          <>
            <source src={videoSources.desktop.webm} type="video/webm" />
            <source src={videoSources.desktop.mp4} type="video/mp4" />
          </>
        )}
        {/* Fallback to original MP4 */}
        <source src={videoSources.fallback} type="video/mp4" />
      </video>

      {/* Background gradient */}
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"
        aria-hidden="true"
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left content section - COMPREHENSIVE BUSINESS GROWTH */}
          <motion.div 
            className="col-span-1 lg:col-span-6 space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary inline-flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
                Your Complete Business Growth Partner
              </div>
            </motion.div>
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Transform your business into a <span className="text-gradient-primary">growth powerhouse</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              From startups to enterprises across every sector - we provide end-to-end solutions that drive expansion, automation, security, and customer excellence. Your success is our business.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Rocket className="h-4 w-4 text-primary" />
                  <span>Growth Expansion</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span>Process Automation</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Enterprise Security</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Cloud className="h-4 w-4 text-primary" />
                  <span>Data Storage</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Customer Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <Search className="h-4 w-4 text-primary" />
                  <span>Market Research</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span>Product Analytics</span>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-primary/5">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>Cost Optimization</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-primary" />
                <span>All Industries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Factory className="h-4 w-4 text-primary" />
                <span>All Sectors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Store className="h-4 w-4 text-primary" />
                <span>All Business Types</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="gap-2">
                Start Growing Today <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                View Case Studies
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Right visualization section - BUSINESS GROWTH DASHBOARD */}
          <motion.div 
            className="col-span-1 lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div 
              className="relative perspective-1000"
              animate={{ 
                y: [0, -20, 0],
                rotateX: [-2, 2, -2],
                rotateY: [-3, 3, -3]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Gradient orbs */}
              <div className="absolute top-10 right-0 w-64 h-64 rounded-full bg-primary/30 filter blur-3xl opacity-30 animate-pulse" />
              <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-blue-500/20 filter blur-2xl opacity-20 animate-pulse" />
              
              <div className="w-full aspect-[4/3] flex items-center justify-center relative">
                {/* Main Dashboard - Business Growth Overview */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/30 p-8 shadow-2xl backdrop-blur-sm border border-white/10"
                  initial={{ rotateY: 25, rotateX: -15 }}
                  animate={{ rotateY: 0, rotateX: 0 }}
                  transition={{ duration: 1.5, type: "spring", damping: 15 }}
                >
                  <div className="relative w-full h-full">
                    {/* Dashboard Content */}
                    <div className="glass h-full w-full rounded-xl p-6 flex items-center justify-center bg-white/80 dark:bg-black/50 backdrop-blur-md">
                      <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
                        {/* Window Controls */}
                        <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 justify-between">
                          <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Business Growth Dashboard</div>
                        </div>

                        {/* Dashboard Grid */}
                        <div className="flex-1 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          {/* Business Growth Metrics */}
                          <div className="space-y-6">
                            {/* Revenue Growth */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Revenue Growth</span>
                                <span className="text-sm font-bold text-green-500">+64%</span>
                              </div>
                              <motion.div 
                                className="h-4 bg-green-500/20 rounded-full overflow-hidden"
                                initial={{ width: "30%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                              >
                                <div className="h-full bg-green-500/60 rounded-full"></div>
                              </motion.div>
                            </div>

                            {/* Customer Satisfaction */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Satisfaction</span>
                                <span className="text-sm font-bold text-blue-500">94%</span>
                              </div>
                              <motion.div 
                                className="h-4 bg-blue-500/20 rounded-full overflow-hidden"
                                initial={{ width: "50%" }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 2.5, delay: 0.7, repeat: Infinity, repeatType: "reverse" }}
                              >
                                <div className="h-full bg-blue-500/70 rounded-full"></div>
                              </motion.div>
                            </div>

                            {/* Market Expansion */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Market Expansion</span>
                                <span className="text-sm font-bold text-purple-500">+35%</span>
                              </div>
                              <motion.div 
                                className="h-4 bg-purple-500/20 rounded-full overflow-hidden"
                                initial={{ width: "70%" }}
                                animate={{ width: "40%" }}
                                transition={{ duration: 3, delay: 0.9, repeat: Infinity, repeatType: "reverse" }}
                              >
                                <div className="h-full bg-purple-500/80 rounded-full"></div>
                              </motion.div>
                            </div>

                            {/* Operational Efficiency */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Operational Efficiency</span>
                                <span className="text-sm font-bold text-orange-500">+82%</span>
                              </div>
                              <motion.div 
                                className="h-4 bg-orange-500/20 rounded-full overflow-hidden"
                                initial={{ width: "40%" }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 3.5, delay: 1.1, repeat: Infinity, repeatType: "reverse" }}
                              >
                                <div className="h-full bg-orange-500/90 rounded-full"></div>
                              </motion.div>
                            </div>
                          </div>

                          {/* Business Sectors Chart */}
                          <motion.div 
                            className="mt-6 h-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden p-3"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                          >
                            <div className="w-full h-full flex items-end justify-between">
                              {[45, 65, 55, 80, 60, 75, 50].map((height, index) => (
                                <motion.div
                                  key={index}
                                  className="w-6 bg-primary/80 rounded-t-sm"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height}%` }}
                                  transition={{
                                    duration: 1,
                                    delay: index * 0.1,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    repeatDelay: 1
                                  }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Cards */}
                <motion.div 
                  className="animate-float absolute -bottom-6 -right-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-28 h-28 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: 20, opacity: 0, rotate: 5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="text-center">
                    <Rocket className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="font-bold text-lg text-green-500">3.5x</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Growth</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="animate-float absolute -top-4 -left-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-24 h-24 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: -20, opacity: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="text-center">
                    <Users className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <div className="font-bold text-md text-blue-500">94%</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Satisfied</div>
                  </div>
                </motion.div>

                {/* Third floating card */}
                <motion.div 
                  className="animate-float absolute top-10 -right-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-2 w-20 h-20 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: -10, opacity: 0, rotate: 3 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  <div className="text-center">
                    <Zap className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                    <div className="font-bold text-sm text-purple-500">82%</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400">Efficient</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
