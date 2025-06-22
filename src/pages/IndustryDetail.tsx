import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Building2, Briefcase, Wheat, Guitar as Hospital, Heart, Pill as Pills, Beer, UtensilsCrossed, Pizza, Store, Shield, ChevronRight, Trophy, Users, BarChart, Clock, ArrowRight, Building, Globe, Award, Zap, CheckCircle, ArrowLeft, Brain, Cloud, Database, Lock } from 'lucide-react';
import HolographicCard from '../components/HolographicCard';

interface Technology {
  name: string;
  icon: any;
  description: string;
}

interface Project {
  title: string;
  description: string;
  image: string;
  results: string[];
  technologies: string[];
  duration: string;
  status: 'completed' | 'ongoing';
}

interface IndustryData {
  id: string;
  title: string;
  icon: any;
  description: string;
  heroImage: string;
  challenges: string[];
  solutions: {
    title: string;
    description: string;
    benefits: string[];
    icon: any;
  }[];
  technologies: Technology[];
  completedProjects: Project[];
  ongoingProjects: Project[];
  partners: {
    name: string;
    logo: string;
    description: string;
  }[];
  stats: {
    value: string;
    label: string;
    icon: any;
  }[];
}

const industriesData: Record<string, IndustryData> = {
  'business': {
    id: 'business',
    title: 'Business & Corporate Solutions',
    icon: Building2,
    description: 'Comprehensive digital solutions for modern enterprises',
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    challenges: [
      'Digital Transformation Complexity',
      'Data Security Concerns',
      'Legacy System Integration',
      'Scalability Issues',
      'Process Inefficiencies',
    ],
    solutions: [
      {
        title: 'Enterprise Digital Transformation',
        description: 'End-to-end digital transformation solutions',
        icon: Zap,
        benefits: [
          '45% Operational Cost Reduction',
          '87% Faster Processing Time',
          '99.9% System Uptime',
          'Enhanced Security Protocols',
        ],
      },
      {
        title: 'AI-Powered Analytics',
        description: 'Advanced analytics for business intelligence',
        icon: Brain,
        benefits: [
          'Real-time Business Insights',
          'Predictive Analysis',
          'Automated Reporting',
          'Decision Support Systems',
        ],
      },
      {
        title: 'Cloud Infrastructure',
        description: 'Scalable cloud solutions for enterprises',
        icon: Cloud,
        benefits: [
          'Infinite Scalability',
          'Global Accessibility',
          'Disaster Recovery',
          'Cost Optimization',
        ],
      },
    ],
    technologies: [
      {
        name: 'AI & Machine Learning',
        icon: Brain,
        description: 'Advanced AI solutions for business automation',
      },
      {
        name: 'Big Data Analytics',
        icon: Database,
        description: 'Enterprise-scale data processing and analytics',
      },
      {
        name: 'Cybersecurity',
        icon: Lock,
        description: 'Military-grade security protocols',
      },
    ],
    completedProjects: [
      {
        title: 'Global ERP Implementation',
        description: 'Implemented enterprise-wide digital transformation',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        results: [
          '45% Cost Reduction',
          '87% Process Efficiency',
          '99.9% Uptime',
        ],
        technologies: ['AI', 'Cloud', 'Big Data'],
        duration: '18 months',
        status: 'completed',
      },
      {
        title: 'Data Analytics Platform',
        description: 'Built comprehensive analytics solution',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        results: [
          '360° Business Insights',
          '40% Better Decisions',
          '95% Accuracy',
        ],
        technologies: ['ML', 'Analytics', 'Cloud'],
        duration: '12 months',
        status: 'completed',
      },
    ],
    ongoingProjects: [
      {
        title: 'AI-Powered CRM',
        description: 'Implementing intelligent customer relationship management',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
        results: [
          'Enhanced Customer Insights',
          'Automated Interactions',
          'Predictive Analytics',
        ],
        technologies: ['AI', 'ML', 'Cloud'],
        duration: '8 months',
        status: 'ongoing',
      },
    ],
    partners: [
      {
        name: 'TechCorp Solutions',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Enterprise technology partner',
      },
      {
        name: 'DataFlow Systems',
        logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300&h=300',
        description: 'Data analytics solutions',
      },
    ],
    stats: [
      {
        value: '500+',
        label: 'Projects Delivered',
        icon: Trophy,
      },
      {
        value: '98%',
        label: 'Client Satisfaction',
        icon: Users,
      },
      {
        value: '45%',
        label: 'Average Cost Reduction',
        icon: BarChart,
      },
      {
        value: '24/7',
        label: 'Support Available',
        icon: Clock,
      },
    ],
  },
  // Add more industries here with similar structure
};

function IndustryDetail() {
  const { industryId } = useParams<{ industryId: string }>();
  const [industry, setIndustry] = useState<IndustryData | null>(null);

  useEffect(() => {
    if (industryId && industryId in industriesData) {
      setIndustry(industriesData[industryId]);
    }
  }, [industryId]);

  if (!industry) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">Industry not found</h1>
          <Link to="/industries" className="btn-future mt-8">
            Back to Industries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={industry.heroImage}
            alt={industry.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-5xl text-white font-bold gradient-text mb-4">{industry.title}</h1>
            <p className="text-xl text-gray-300 max-w-2xl">{industry.description}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {industry.stats.map((stat, index) => (
            <HolographicCard key={index} className="p-6 text-center">
              <stat.icon className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </HolographicCard>
          ))}
        </div>

        {/* Challenges & Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Challenges */}
          <HolographicCard className="p-8">
            <h2 className="text-2xl font-bold gradient-text mb-6">Industry Challenges</h2>
            <div className="space-y-4">
              {industry.challenges.map((challenge, index) => (
                <div key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="h-5 w-5 text-blue-400 mr-3" />
                  {challenge}
                </div>
              ))}
            </div>
          </HolographicCard>

          {/* Solutions */}
          <div className="space-y-8">
            {industry.solutions.map((solution, index) => (
              <HolographicCard key={index} className="p-8">
                <div className="flex items-center mb-4">
                  <solution.icon className="h-8 w-8 text-blue-400 mr-3" />
                  <h3 className="text-xl font-bold gradient-text">{solution.title}</h3>
                </div>
                <p className="text-gray-300 mb-4">{solution.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {solution.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-gray-400">
                      <ChevronRight className="h-4 w-4 text-blue-400 mr-2" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </HolographicCard>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8">Technologies Used</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {industry.technologies.map((tech, index) => (
              <HolographicCard key={index} className="p-8 text-center">
                <tech.icon className="h-12 w-12 text-blue-400 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-4">{tech.name}</h3>
                <p className="text-gray-300">{tech.description}</p>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* Projects Showcase */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8">Success Stories</h2>
          
          {/* Completed Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Completed Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.completedProjects.map((project, index) => (
                <HolographicCard key={index} className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                        Completed
                      </span>
                      <span className="text-gray-400">{project.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="space-y-2">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                          {result}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </HolographicCard>
              ))}
            </div>
          </div>

          {/* Ongoing Projects */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Ongoing Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.ongoingProjects.map((project, index) => (
                <HolographicCard key={index} className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                        In Progress
                      </span>
                      <span className="text-gray-400">{project.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="space-y-2">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-gray-400">
                          <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                          {result}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </HolographicCard>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold gradient-text mb-8">Technology Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industry.partners.map((partner, index) => (
              <HolographicCard key={index} className="p-6 flex items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-24 h-24 object-cover rounded-lg mr-6"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{partner.name}</h3>
                  <p className="text-gray-300">{partner.description}</p>
                </div>
              </HolographicCard>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <HolographicCard className="p-12 text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how our industry-specific solutions can help you achieve your goals.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/contact" className="btn-future group">
              Schedule a Consultation
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/industries" className="btn-future group">
              <ArrowLeft className="mr-2" />
              Back to Industries
            </Link>
          </div>
        </HolographicCard>
      </div>
    </div>
  );
}

export default IndustryDetail;