// CompactHero.tsx
import React, { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Shield, Zap, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CompactHero = memo(() => {
  const navigate = useNavigate();

  const handleGetStarted = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const handleLearnMore = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  return (
    <section className="min-h-[70vh] flex items-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Value Proposition */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Target className="h-4 w-4" />
              Your Complete Digital Growth Partner
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Transform Your Business with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Data & Technology
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              We deliver end-to-end solutions in Data & Cloud, BI & Analytics, 
              Digital Marketing, and Business Consulting to drive your growth.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <Rocket className="h-5 w-5 text-green-500" />
                <span className="text-gray-700 dark:text-gray-300">Rapid Implementation</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Zap className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">AI-Powered Insights</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Target className="h-5 w-5 text-red-500" />
                <span className="text-gray-700 dark:text-gray-300">Measurable Results</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleLearnMore}
                className="rounded-full px-8 py-6 text-lg border-2"
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>

          {/* Right Side - Visual Element (Simplified) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Clients Served</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Growth</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Uptime SLA</div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-600">5-8</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Weeks Delivery</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white text-center">
                <div className="text-sm font-semibold">Ready to Transform?</div>
                <div className="text-xs opacity-90">Book your free consultation today</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default CompactHero;