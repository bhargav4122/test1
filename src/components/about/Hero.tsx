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
    <div className="relative overflow-hidden">
     
     
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 pb-2 md:pt-2 md:pb-10">
        

        {/* SECOND VISUAL SECTION - COMPREHENSIVE BUSINESS SOLUTIONS */}
        <motion.div 
          className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
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
                           {/* Revenue Growth */}
                                                   
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
                      <div className="w-full h-full flex items-end justify-between ">
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
                            <div className="text-[15px] mt-1 text-gray-500 dark:text-gray-400 ">
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
