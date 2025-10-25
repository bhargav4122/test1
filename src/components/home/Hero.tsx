import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Building, Factory, Store, Heart, Users, Target, Zap, Shield, Cloud, Brain, BarChart3, Cpu, DollarSign, Globe, TrendingUp, Lightbulb, FileText, Search } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Hero(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
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

        {/* SECOND VISUAL SECTION - COMPREHENSIVE BUSINESS SOLUTIONS */}
        <motion.div 
          className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Left content for second visual - BUSINESS SOLUTIONS */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary inline-flex items-center">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                End-to-End Solutions
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">Complete Business Transformation</h3>
            <p className="text-muted-foreground">
              We partner with businesses across all sectors to drive comprehensive growth through strategic expansion, operational excellence, and customer-centric solutions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Strategic Growth Planning</div>
                  <div className="text-sm text-muted-foreground">Custom expansion strategies for your industry</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Process Automation</div>
                  <div className="text-sm text-muted-foreground">Streamline operations across all departments</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5">
                <Globe className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Market Research & Insights</div>
                  <div className="text-sm text-muted-foreground">Data-driven decisions for market expansion</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right visualization - COMPREHENSIVE BUSINESS DASHBOARD */}
          <motion.div 
            className="col-span-1 lg:col-span-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="relative bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-white/10"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="glass rounded-xl p-6 bg-white/80 dark:bg-black/50 backdrop-blur-md">
                <div className="w-full h-full rounded-lg overflow-hidden flex flex-col">
                  {/* Window Controls */}
                  <div className="h-8 bg-gray-100 dark:bg-gray-800 flex items-center px-4 justify-between">
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Business Solutions Dashboard</div>
                  </div>

                  {/* Dashboard Grid */}
                  <div className="flex-1 p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                    {/* Key Business Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-center">
                        <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-1" />
                        <div className="font-bold text-green-600 text-sm">+42%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Revenue Growth</div>
                      </div>
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-center">
                        <Users className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                        <div className="font-bold text-blue-600 text-sm">2.4M</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Customers Reached</div>
                      </div>
                      <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-center">
                        <Zap className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                        <div className="font-bold text-purple-600 text-sm">68%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Efficiency Gain</div>
                      </div>
                      <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-center">
                        <DollarSign className="h-5 w-5 text-orange-600 mx-auto mb-1" />
                        <div className="font-bold text-orange-600 text-sm">-32%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Cost Reduction</div>
                      </div>
                    </div>

                    {/* Business Growth Areas */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Growth Initiatives</div>
                        {[
                          { name: 'Market Expansion', value: 85 },
                          { name: 'Customer Acquisition', value: 72 },
                          { name: 'Product Development', value: 91 },
                          { name: 'Operational Scale', value: 68 }
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
                      
                      {/* Business Impact */}
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-gray-600 dark:text-gray-400">Business Impact</div>
                        {[
                          { icon: Rocket, name: 'Growth Rate', value: '+64%', color: 'text-green-500' },
                          { icon: Heart, name: 'Satisfaction', value: '94%', color: 'text-blue-500' },
                          { icon: Shield, name: 'Security Score', value: '99%', color: 'text-purple-500' },
                          { icon: Cloud, name: 'Data Uptime', value: '99.9%', color: 'text-orange-500' }
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

                    {/* Multi-sector Performance */}
                    <motion.div 
                      className="h-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg overflow-hidden p-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.8, duration: 0.5 }}
                    >
                      <div className="w-full h-full flex items-end justify-between">
                        {[
                          { height: 75, color: 'bg-green-500', label: 'Retail' },
                          { height: 65, color: 'bg-blue-500', label: 'Tech' },
                          { height: 80, color: 'bg-purple-500', label: 'Healthcare' },
                          { height: 70, color: 'bg-orange-500', label: 'Finance' },
                          { height: 85, color: 'bg-red-500', label: 'Manufacturing' },
                          { height: 60, color: 'bg-indigo-500', label: 'Services' },
                          { height: 90, color: 'bg-teal-500', label: 'Education' }
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
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
