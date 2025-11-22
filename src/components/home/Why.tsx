
import {Zap, Shield, Brain } from 'lucide-react';


import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Why() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
/* Why Choose Us */
    <section className="p-10">
      <h2 className="text-4xl font-bold text-center gradient-text mb-12">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 group hover:transform hover:scale-105 transition-all duration-300 bg-white shadow-lg rounded-xl dark:bg-black border dark:text-gray-100">
          <Brain className="h-12 w-12 text-blue-400 mb-6 group-hover:animate-bounce dark:text-blue-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-gray-100">Innovation First</h3>
          <p className="text-gray-800 dark:text-gray-300">
           AI-driven, automated, and cloud-powered solutions that push your business ahead of the competition.
          </p>
        </div>
        <div className="p-8 group hover:transform hover:scale-105 transition-all duration-300 bg-white shadow-lg rounded-xl dark:bg-black border dark:text-gray-100">
          <Shield className="h-12 w-12 text-blue-400 mb-6 group-hover:animate-bounce dark:text-blue-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-gray-100">Enterprise Security</h3>
          <p className="text-gray-800 dark:text-gray-300">
           Military-grade protection ensuring your data, operations, and digital assets remain fully secure.
          </p>
         </div>
          <div className="p-8 group hover:transform hover:scale-105 transition-all duration-300 bg-white shadow-lg rounded-xl dark:bg-black border dark:text-gray-100">
          <Zap className="h-12 w-12 text-blue-400 mb-6 group-hover:animate-bounce dark:text-blue-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-4 dark:text-gray-100">Rapid Results</h3>
          <p className="text-gray-800 dark:text-gray-300">
            Fast implementation, seamless integration, and accelerated go-to-market for measurable business impact.
          </p>
          </div>
      </div>
    </section>
    );
  }
