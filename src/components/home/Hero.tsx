import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Activity, Shield, Zap, Brain, TrendingUp, Users, Target, Rocket, Globe, BarChart3, Cpu, Heart, Search, Cloud, Lock, DollarSign, Users2, FileText, Lightbulb, PieChart } from "lucide-react";
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
    <div className="relative overflow-hidden pt-20">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
        style={{
          filter: 'brightness(1.1) contrast(1.1) saturate(1.2)',
          transform: 'translateZ(0)'
        }}
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/Google Gemini.mp4" type="video/mp4" />
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
                End-to-End Business Solutions
              </div>
            </motion.div>
            <motion.h1 
              variants={itemVariants} 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
            >
              Transform your business <span className="text-gradient-primary">across every dimension</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants} 
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Comprehensive solutions for every aspect of your business - from cost reduction and team performance to advanced analytics and strategic expansion across all sectors.
            </motion.p>
            
            <motion.div variants={itemVariants} className="pt-6">
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Rocket className="h-4 w-4 text-primary" />
                  <span>Growth Expansion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span>Cost Reduction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span>Process Automation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Business Insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  <span>Market Research</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users2 className="h-4 w-4 text-primary" />
                  <span>Team Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Cloud className="h-4 w-4 text-primary" />
                  <span>Data Storage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span>Advanced Reporting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Customer Satisfaction</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span>Enterprise Security</span>
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
                        <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 justify-between">
                          <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-400"></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Business Performance Dashboard</div>
                        </div>

                        {/* Dashboard Grid */}
                        <div className="flex-1 p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                          {/* Key Metrics Grid */}
                          <div className="grid grid-cols-4 gap-2 mb-4">
                            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                              <TrendingUp className="h-4 w-4 text-green-600 mx-auto mb-1" />
                              <div className="font-bold text-green-600 text-sm">+42%</div>
                              <div className="text-[10px] text-gray-600 dark:text-gray-400">Revenue</div>
                            </div>
                            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
                              <DollarSign className="h-4 w-4 text-red-600 mx-auto mb-1" />
                              <div className="font-bold text-red-600 text-sm">-28%</div>
                              <div className="text-[10px] text-gray-600 dark:text-gray-400">Costs</div>
                            </div>
                            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                              <Users2 className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                              <div className="font-bold text-blue-600 text-sm">+35%</div>
                              <div className="text-[10px] text-gray-600 dark:text-gray-400">Productivity</div>
                            </div>
                            <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-center">
                              <Heart className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                              <div className="font-bold text-purple-600 text-sm">94%</div>
                              <div className="text-[10px] text-gray-600 dark:text-gray-400">Satisfaction</div>
                            </div>
                          </div>

                          {/* Business Impact Areas */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Performance Metrics</div>
                              {[
                                { name: 'Team Efficiency', value: 85 },
                                { name: 'Cost Savings', value: 72 },
                                { name: 'Reporting Accuracy', value: 91 },
                                { name: 'Process Automation', value: 68 }
                              ].map((metric, index) => (
                                <motion.div
                                  key={metric.name}
                                  className="flex justify-between items-center text-xs"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <span>{metric.name}</span>
                                  <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full bg-primary rounded-full"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${metric.value}%` }}
                                      transition={{ delay: index * 0.2 + 0.5, duration: 1 }}
                                    />
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                            
                            {/* Solutions Impact */}
                            <div className="space-y-2">
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Business Impact</div>
                              {[
                                { icon: DollarSign, name: 'Cost Reduction', value: '+32%', color: 'text-red-500' },
                                { icon: Lightbulb, name: 'Business Insights', value: '+45%', color: 'text-yellow-500' },
                                { icon: Users2, name: 'Team Performance', value: '+28%', color: 'text-blue-500' },
                                { icon: FileText, name: 'Reporting', value: '+67%', color: 'text-green-500' }
                              ].map((item, index) => (
                                <motion.div
                                  key={item.name}
                                  className="flex items-center space-x-2 text-xs"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                  <item.icon className={`h-3 w-3 ${item.color}`} />
                                  <span className="flex-1">{item.name}</span>
                                  <span className="font-medium text-green-600">{item.value}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          {/* Multi-dimensional Performance Chart */}
                          <motion.div 
                            className="h-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg overflow-hidden p-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                          >
                            <div className="w-full h-full flex items-end justify-between">
                              {[
                                { height: 65, color: 'bg-red-500', label: 'Cost' },
                                { height: 80, color: 'bg-green-500', label: 'Revenue' },
                                { height: 70, color: 'bg-blue-500', label: 'Team' },
                                { height: 85, color: 'bg-yellow-500', label: 'Growth' },
                                { height: 75, color: 'bg-purple-500', label: 'Satisfaction' },
                                { height: 60, color: 'bg-indigo-500', label: 'Automation' },
                                { height: 90, color: 'bg-teal-500', label: 'Reporting' }
                              ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center flex-1 mx-1">
                                  <motion.div
                                    className={`w-3/4 ${item.color} rounded-t-sm`}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${item.height}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: index * 0.1,
                                      repeat: Infinity,
                                      repeatType: "reverse",
                                      repeatDelay: 1
                                    }}
                                  />
                                  <div className="text-[8px] mt-1 text-gray-500 dark:text-gray-400">
                                    {item.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Cards - Business Impact */}
                <motion.div 
                  className="animate-float absolute -bottom-6 -right-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-28 h-28 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: 20, opacity: 0, rotate: 5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="text-center">
                    <DollarSign className="h-5 w-5 text-green-500 mx-auto mb-1" />
                    <div className="font-bold text-lg text-green-500">32%</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Cost Saved</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="animate-float absolute -top-4 -left-4 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 w-24 h-24 flex items-center justify-center z-10 border border-white/20 dark:border-white/5 backdrop-blur-md"
                  initial={{ y: -20, opacity: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <div className="text-center">
                    <Users2 className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <div className="font-bold text-md text-blue-500">+35%</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Performance</div>
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
                    <FileText className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                    <div className="font-bold text-sm text-purple-500">67%</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400">Reporting</div>
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
