// CareersSection.tsx
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Zap, ShoppingBag, Factory, Truck, DollarSign, Heart, Lightbulb, Wifi, Award, Coffee, Clock, ArrowRight, Search, CheckCircle,  X  } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from "@/providers/ThemeProvider";

import { signInWithGoogle } from "@/authService";
import { useToast } from "@/hooks/use-toast";


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
  }
];

const openings = [
  {
    id:1,
    title: 'Data Engineer',
    location: 'Remote / UK',
    type: 'Full-time',
    department: 'Engineering',
    salary: '£60,000 - £80,000',
    skills: ['SQL', 'Python', 'Azure', 'Power BI'],
  },
  {
    id:2,
    title: 'Frontend Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Product',
    salary: '£55,000 - £70,000',
    skills: ['React', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id:3,
    title: 'Senior Data Scientist',
    department: 'Data Science',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '5+ years',
    salary: '$130,000 - $180,000',
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'SQL', 'Cloud Platforms'],
  },
  {
    id:4,
    title: 'Business Intelligence Analyst',
    department: 'Analytics',
    location: 'San Francisco',
    type: 'Full-time',
    experience: '3+ years',
    salary: '$90,000 - $120,000',
    skills: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Data Modeling'],
  },
  {
    id:5,
    title: 'Solutions Architect',
    department: 'Engineering',
    location: 'Remote / London',
    type: 'Full-time',
    experience: '7+ years',
    salary: '$140,000 - $190,000',
    skills: ['AWS', 'Azure', 'Kubernetes', 'Microservices', 'System Design'],
  },
  {
    id:6,
    title: 'Product Manager',
    department: 'Product',
    location: 'Remote',
    type: 'Full-time',
    experience: '4+ years',
    salary: '$120,000 - $160,000',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics', 'Roadmapping'],
  },
];

const CareersSection = ({ onApply }: { onApply: (job: any) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
   const [selectedJob, setSelectedJob] = useState<any>(null);
  const { theme } = useTheme();

  const departments = ['All', ...new Set(openings.map(job => job.department))];

  const filteredOpenings = openings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });



  
    const openJobDetails = (job: any) => {
            setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                   <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary">{selectedJob.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ShoppingBag className="w-4 h-4" />
                      {selectedJob.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Factory className="w-4 h-4" />
                      {selectedJob.location}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={closeJobDetails}
                  className="p-1 rounded-full hover:bg-muted"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Job Description</h4>
                  <div className="prose prose-sm dark:prose-invert">
                    <p>We're looking for a talented {selectedJob.title} to join our {selectedJob.department} team. In this role, you'll be responsible for:</p>
                    <ul>
                      <li>Developing and maintaining high-quality solutions</li>
                      <li>Collaborating with cross-functional teams</li>
                      <li>Implementing best practices in your domain</li>
                      <li>Contributing to architectural decisions</li>
                    </ul>
                    <p>This is a {selectedJob.type.toLowerCase()} position based in {selectedJob.location}.</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.experience && (
                      <li className="flex items-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-primary mr-2 flex-shrink-0" />
                        <span>{selectedJob.experience} of relevant experience</span>
                      </li>
                    )}
                    {selectedJob.skills.map((skill: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 mt-0.5 text-primary mr-2 flex-shrink-0" />
                        <span>Proficiency in {skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Compensation</h4>
                  <p className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>{selectedJob.salary} per year</span>
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      onApply(selectedJob);
                      closeJobDetails();
                    }}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={closeJobDetails}
                    className="btn-outline flex-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center pt-5"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Join Our Team
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto pt-5">
          Build your career at the forefront of data innovation. We're looking for passionate individuals to help shape the future.
        </p>
      </motion.div>
      
      {/* Benefits Section */}
      <section className="mb-10">
        <motion.h4 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold p-5 text-center"
        >
          Why Join Us
        </motion.h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-${theme === 'dark' ? 'primary/20' : 'primary/10'} text-primary`}>
                  <b.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold ml-4">{b.title}</h3>
              </div>
              <p className="text-muted-foreground mb-4">{b.description}</p>
              <ul className="space-y-2">
                {b.details.map((d, j) => (
                  <li key={j} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-primary mr-2 flex-shrink-0" />
                    <span className="text-sm">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect role for your skills and ambitions
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs or skills..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </motion.div>

           {/* Job Listings */}
        <div className="space-y-6">
          {filteredOpenings.length > 0 ? (
            filteredOpenings.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className="p-8 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Factory className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                      {job.experience && (
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          {job.experience}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => openJobDetails(job)}
                      className="btn-outline whitespace-nowrap flex items-center gap-2"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onApply(job)}
                      className="btn-primary whitespace-nowrap flex items-center gap-2"
                    >
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 rounded-xl border border-dashed border-border"
            >
              <p className="text-muted-foreground">No positions match your search criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('All');
                }}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CareersSection;