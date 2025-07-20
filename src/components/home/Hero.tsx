import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Activity, Shield, Zap, Brain, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
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

  return (
    <div className="relative overflow-hidden pt-5">
      {/* Background Video */}
      <video
  className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
  style={{
    filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
    transform: 'translateZ(0)' // Forces GPU acceleration
  }}
  autoPlay
  muted
  loop
  playsInline
>
        <source src="/videos/GoogleGemini.mp4" type="video/mp4" />

      </video>

      {/* Background gradient */}
      <div
        className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70"
        aria-hidden="true"
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[100px] -z-10" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left content section */}
          <motion.div 
            className="col-span-1 lg:col-span-6 space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary inline-flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2 animate-pulse"></span>
                Next-Gen Business Solutions
              </div>
            </motion.div>
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Transform your data into <span className="text-gradient-primary">intelligent action</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Leverage our cutting-edge analytics and AI-powered intelligence solutions to turn your business data into strategic advantages.
            </motion.p>
            {/*<motion.div 
              variants={itemVariants} 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Button size="lg" className="rounded-full px-8 text-sm h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30">
                Start your journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 text-sm h-12 backdrop-blur-sm border-primary/20 hover:bg-primary/10">
                Watch demo
              </Button>
            </motion.div>*/}
            <motion.div variants={itemVariants} className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Enterprise security</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <span>AI-driven insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Real-time analytics</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right visualization section */}
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
                {/* Main Dashboard */}
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
                        <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4">
                          <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                          </div>
                        </div>

                        {/* Dashboard Grid */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Metrics Section */}
                            <div className="space-y-4">
                              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <div className="flex items-center justify-between">
                                  <TrendingUp className="h-6 w-6 text-primary" />
                                  <span className="text-2xl font-bold text-primary">+64%</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Growth Rate</p>
                              </div>
                              <div className="p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
                                <div className="flex items-center justify-between">
                                  <Users className="h-6 w-6 text-indigo-600" />
                                  <span className="text-2xl font-bold text-indigo-600">2.4M</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                              </div>
                            </div>

                            {/* Animated Bars */}
                            <div className="space-y-2">
                              <motion.div 
                                className="h-3 bg-primary/60 rounded-full"
                                initial={{ width: "30%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
                              ></motion.div>
                              <motion.div 
                                className="h-3 bg-primary/70 rounded-full"
                                initial={{ width: "50%" }}
                                animate={{ width: "70%" }}
                                transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
                              ></motion.div>
                              <motion.div 
                                className="h-3 bg-primary/80 rounded-full"
                                initial={{ width: "70%" }}
                                animate={{ width: "40%" }}
                                transition={{ duration: 3, delay: 1.4, repeat: Infinity, repeatType: "reverse" }}
                              ></motion.div>
                              <motion.div 
                                className="h-3 bg-primary/90 rounded-full"
                                initial={{ width: "40%" }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 3.5, delay: 1.6, repeat: Infinity, repeatType: "reverse" }}
                              ></motion.div>
                            </div>
                          </div>

                          {/* Chart Section */}
                          <motion.div 
                            className="mt-6 h-32 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg overflow-hidden"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                          >
                            <div className="w-full h-full flex items-end justify-between px-2 pb-2">
                              {[40, 70, 90, 60, 80, 50, 75].map((height, index) => (
                                <motion.div
                                  key={index}
                                  className="w-8 bg-primary/80 rounded-t-sm"
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
                  className="animate-float absolute -bottom-6 -right-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 w-32 h-32 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: 20, opacity: 0, rotate: 5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="text-center">
                    <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-2xl text-primary">87%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Accuracy Rate</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="animate-float absolute -top-4 -left-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-24 h-24 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: -20, opacity: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="text-center">
                    <div className="font-bold text-xl text-primary">3.5x</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">ROI</div>
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
