
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I set up my first dashboard?",
          answer: "To create your first dashboard, navigate to the Dashboards section and click 'Create New Dashboard'. You can then drag and drop widgets, connect data sources, and customize the layout to fit your needs."
        },
        {
          question: "What data sources can I connect?",
          answer: "DataSphere supports over 100 data sources including SQL databases (MySQL, PostgreSQL, SQL Server), cloud platforms (AWS, Azure, GCP), SaaS applications (Salesforce, HubSpot), and file formats (CSV, Excel, JSON)."
        },
        {
          question: "How long does initial setup take?",
          answer: "Most users can complete the initial setup and create their first dashboard within 30 minutes. Our quick start guide walks you through each step of the process."
        }
      ]
    },
    {
      title: "Data & Analytics",
      faqs: [
        {
          question: "How often is my data updated?",
          answer: "Data refresh frequency depends on your plan and data source. Real-time sources update continuously, while batch sources can be scheduled from every 15 minutes to daily intervals."
        },
        {
          question: "Can I create custom calculations?",
          answer: "Yes, DataSphere includes a powerful formula engine that allows you to create custom metrics, calculated fields, and complex aggregations using SQL-like syntax or our visual formula builder."
        },
        {
          question: "How accurate are the AI insights?",
          answer: "Our AI models achieve 95%+ accuracy on trend predictions and anomaly detection. Accuracy varies by data quality and volume, with more historical data generally improving prediction accuracy."
        }
      ]
    },
    {
      title: "Account & Billing",
      faqs: [
        {
          question: "How do I upgrade my plan?",
          answer: "You can upgrade your plan anytime from the Account Settings page. Changes take effect immediately, and you'll only be charged the prorated difference for the current billing period."
        },
        {
          question: "What's included in each plan?",
          answer: "Each plan includes different limits for data sources, users, and storage. Visit our pricing page for detailed comparison of features and limits across all plans."
        },
        {
          question: "Can I cancel anytime?",
          answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your current billing period, and your data will be available for export."
        }
      ]
    }
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      availability: "24/7"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      availability: "Response within 2 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk to our technical experts",
      action: "Call Now",
      availability: "Mon-Fri 9AM-6PM EST"
    }
  ];

  const toggleFaq = (categoryIndex: number, faqIndex: number) => {
    const id = categoryIndex * 100 + faqIndex;
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen flex flex-col">
     
      
      <main className="flex-1 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers to common questions, browse our knowledge base, or contact our support team for personalized assistance.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search help articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{option.description}</p>
                <p className="text-xs text-muted-foreground mb-4">{option.availability}</p>
                <Button className="w-full">{option.action}</Button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-card border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {category.title}
                  </h3>
                  <div className="space-y-4">
                    {category.faqs.map((faq, faqIndex) => {
                      const id = categoryIndex * 100 + faqIndex;
                      const isExpanded = expandedFaq === id;
                      
                      return (
                        <div key={faqIndex} className="border rounded-lg">
                          <button
                            onClick={() => toggleFaq(categoryIndex, faqIndex)}
                            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            )}
                          </button>
                          {isExpanded && (
                            <div className="px-4 pb-3 text-muted-foreground">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
    </div>
  );
};

export default HelpCenter;