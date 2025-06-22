import React, { useState } from 'react';
import { Factory, ShoppingBag, Truck, Heart, Lightbulb, Wifi, Award, Coffee, Clock, DollarSign, Zap, ArrowRight, Search, CheckCircle  } from 'lucide-react';
import HolographicCard from '../components/HolographicCard';
import CTASection from '../components/CTASection';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness programs.',
    details: ['Medical Insurance', 'Dental Coverage', 'Vision Care', 'Mental Health Support'],
  },
  {
    icon: Lightbulb,
    title: 'Professional Development',
    description: 'Continuous learning and career growth opportunities.',
    details: ['Training Budget', 'Conference Attendance', 'Online Courses', 'Mentorship'],
  },
  {
    icon: Wifi,
    title: 'Remote Work',
    description: 'Flexible work arrangements and remote options.',
    details: ['Work from Home', 'Flexible Hours', 'Global Teams', 'Digital Tools'],
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    description: 'We value your personal time and well-being.',
    details: ['Unlimited PTO', 'Paid Holidays', 'Sabbatical Leave', 'Parental Leave'],
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: "Work when you're most productive.",
    details: ['Flexible Hours', 'Core Hours', 'Time Zones', 'Schedule Freedom'],
  },
  {
    icon: DollarSign,
    title: 'Competitive Package',
    description: 'Excellent compensation and benefits.',
    details: ['Competitive Salary', 'Stock Options', '401(k) Match', 'Bonuses'],
  },
];

const openings = [
  {
    title: 'Senior Data Scientist',
    department: 'Data Science',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$130,000 - $180,000',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'SQL', 'Cloud Platforms'],
  },
  {
    title: 'Business Intelligence Analyst',
    department: 'Analytics',
    location: 'San Francisco',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$90,000 - $120,000',
    skills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Data Modeling'],
  },
  {
    title: 'Solutions Architect',
    department: 'Engineering',
    location: 'Remote / London',
    type: 'Full-time',
    experience: '7+ years',
    salary: '$140,000 - $190,000',
    skills: ['AWS', 'Azure', 'Kubernetes', 'Microservices', 'System Design'],
  },
  {
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    salary: '$120,000 - $160,000',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
  },
];

function Careers() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const filteredOpenings = openings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['All', ...new Set(openings.map(job => job.department))];

  // Wrapper component that conditionally applies HolographicCard
  const ThemedCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    return theme === 'dark' ? (
      <HolographicCard className={className}>{children}</HolographicCard>
    ) : (
      <div className={cn(
        "rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
        theme === 'light' ? 'border-gray-200' : 'border-gray-800',
        className
      )}>
        {children}
      </div>
    );
  };

  return (
    <div className={cn(
      "container mx-auto px-4 py-16 min-h-screen",
      theme === "dark" ? "bg-gray-900" : "bg-white"
    )}>
      <Navbar />
      
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "text-4xl md:text-5xl font-bold mb-4",
            theme === "dark" ? "gradient-text" : "text-primary"
          )}
        >
          Join Our Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "text-xl max-w-2xl mx-auto",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}
        >
          Build your career at the forefront of data innovation
        </motion.p>
      </div>

      {/* Benefits Section */}
      <div className="mb-20">
        <h2 className={cn(
          "text-3xl font-bold mb-12 text-center",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>Why Work With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ThemedCard
              key={index}
              className="p-8 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <benefit.icon className={cn(
                "h-12 w-12 mx-auto mb-6",
                theme === "dark" ? "text-blue-400" : "text-primary"
              )} />
              <h3 className={cn(
                "text-xl font-bold mb-4 text-center",
                theme === "dark" ? "text-white" : "text-gray-800"
              )}>{benefit.title}</h3>
              <p className={cn(
                "mb-6 text-center",
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              )}>{benefit.description}</p>
              <ul className="space-y-2">
                {benefit.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center">
                    <Zap className={cn(
                      "h-4 w-4 mr-2 flex-shrink-0",
                      theme === "dark" ? "text-blue-400" : "text-primary"
                    )} />
                    <span className={cn(
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>{detail}</span>
                  </li>
                ))}
              </ul>
            </ThemedCard>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-20">
        <h2 className={cn(
          "text-3xl font-bold mb-12 text-center",
          theme === "dark" ? "gradient-text" : "text-primary"
        )}>Open Positions</h2>
        
        {/* Search and Filter */}
        <ThemedCard className="mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={cn(
                "absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )} />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all",
                  theme === "dark" 
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                    : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                )}
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className={cn(
                "rounded-lg border focus:ring-2 focus:outline-none transition-all",
                theme === "dark" 
                  ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500" 
                  : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
              )}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </ThemedCard>

        <div className="space-y-6">
          {filteredOpenings.map((job, index) => (
            <ThemedCard
              key={index}
              className="p-6 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <h3 className={cn(
                    "text-xl font-bold mb-2",
                    theme === "dark" ? "gradient-text" : "text-primary"
                  )}>{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center">
                      <ShoppingBag className={cn(
                        "h-4 w-4 mr-2",
                        theme === "dark" ? "text-blue-400" : "text-primary"
                      )} />
                      <span className={cn(
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>{job.department}</span>
                    </span>
                    <span className="flex items-center">
                      <Factory className={cn(
                        "h-4 w-4 mr-2",
                        theme === "dark" ? "text-blue-400" : "text-primary"
                      )} />
                      <span className={cn(
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>{job.location}</span>
                    </span>
                    <span className="flex items-center">
                      <Truck className={cn(
                        "h-4 w-4 mr-2",
                        theme === "dark" ? "text-blue-400" : "text-primary"
                      )} />
                      <span className={cn(
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>{job.type}</span>
                    </span>
                    <span className="flex items-center">
                      <DollarSign className={cn(
                        "h-4 w-4 mr-2",
                        theme === "dark" ? "text-blue-400" : "text-primary"
                      )} />
                      <span className={cn(
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      )}>{job.salary}</span>
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className={cn(
                          "text-xs px-3 py-1 rounded-full",
                          theme === "dark" 
                            ? "bg-blue-500/20 text-blue-300" 
                            : "bg-primary/10 text-primary"
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "px-6 py-2 rounded-lg font-medium transition-all flex items-center group",
                    theme === "dark" 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  Apply Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </ThemedCard>
          ))}
        </div>
      </div>

   {/* CTA Section */}
<div className={cn(
  "rounded-2xl p-8 md:p-12 my-12",
  theme === "dark" 
    ? "bg-gradient-to-br from-cyan-900/80 to-blue-900/80 border border-cyan-500/20" 
    : "bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20",
  "shadow-lg"
)}>
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row items-center gap-8">
      {/* Text Content */}
      <div className="flex-1">
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold mb-4",
          theme === "dark" ? "text-white" : "text-gray-800"
        )}>
          Shape the Future with Us
        </h2>
        <p className={cn(
          "text-lg mb-6",
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        )}>
          Join our team of innovators and make a difference in the world of technology.
        </p>
        
        {/* Benefits List */}
        <ul className="space-y-3 mb-6">
          {['Competitive compensation', 'Professional development', 'Work-life balance'].map((benefit, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className={cn(
                "h-5 w-5 mr-3 flex-shrink-0",
                theme === "dark" ? "text-cyan-400" : "text-primary"
              )} />
              <span className={cn(
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Buttons */}
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 w-full md:w-auto">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            theme === "dark" 
              ? "bg-white text-cyan-900 hover:bg-gray-100" 
              : "bg-primary text-white hover:bg-primary/90",
            "shadow-md hover:shadow-lg",
            "flex items-center justify-center"
          )}
        >
          View Open Positions
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all",
            theme === "dark" 
              ? "bg-transparent border border-white text-white hover:bg-white/10" 
              : "bg-transparent border border-primary text-primary hover:bg-primary/10",
            "shadow-md hover:shadow-lg",
            "flex items-center justify-center"
          )}
        >
          Send Resume
        </motion.button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Careers;