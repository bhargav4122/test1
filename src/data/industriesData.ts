
// Export the industries data for use in IndustryPage.tsx
export const industriesData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  challenges: string[];
  solutions: string[];
  caseStudies: {
    title: string;
    description: string;
    results: string[];
  }[];
}> = {
  'it-cloud': {
    title: 'IT & Cloud Solutions',
    description: 'Cutting-edge technology solutions for modern businesses',
    heroImage: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Legacy system integration',
      'Data security concerns',
      'Scalability issues',
      'Cost management'
    ],
    solutions: [
      'Cloud Migration',
      'DevOps Implementation',
      'Managed IT Services',
      'Security Solutions'
    ],
    caseStudies: [
      {
        title: 'Enterprise Cloud Migration',
        description: 'Helped a Fortune 500 company migrate their legacy systems to the cloud',
        results: [
          '40% reduction in operational costs',
          '99.9% uptime achieved',
          'Improved disaster recovery time by 65%'
        ]
      },
      {
        title: 'DevOps Transformation',
        description: 'Implemented CI/CD pipelines for a growing tech startup',
        results: [
          'Deployment time reduced from days to minutes',
          '80% reduction in code bugs in production',
          'Improved developer productivity by 35%'
        ]
      }
    ]
  },
  'finance': {
    title: 'Financial Services',
    description: 'Digital solutions for banking and financial institutions',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Regulatory compliance',
      'Legacy system modernization',
      'Cybersecurity threats',
      'Customer experience enhancements'
    ],
    solutions: [
      'FinTech Integration',
      'Blockchain Solutions',
      'AI-powered Analytics',
      'Digital Banking Platforms'
    ],
    caseStudies: [
      {
        title: 'Digital Banking Transformation',
        description: 'Helped a regional bank launch a new digital banking platform',
        results: [
          '200% increase in mobile banking adoption',
          '45% reduction in operational costs',
          '30% improvement in customer satisfaction scores'
        ]
      }
    ]
  },
  'healthcare': {
    title: 'Healthcare Solutions',
    description: 'Digital transformation for healthcare providers',
    heroImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Patient data security',
      'Interoperability between systems',
      'Regulatory compliance',
      'Remote patient monitoring'
    ],
    solutions: [
      'Electronic Health Records',
      'Telemedicine Platforms',
      'Healthcare Analytics',
      'Medical IoT Solutions'
    ],
    caseStudies: [
      {
        title: 'Telemedicine Platform Implementation',
        description: 'Developed a telemedicine solution for a network of hospitals',
        results: [
          '50% increase in patient accessibility',
          '30% reduction in no-shows',
          'Expanded service area by 200 miles'
        ]
      }
    ]
  },
  'education': {
    title: 'Education Technology',
    description: 'Digital solutions for modern education',
    heroImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Remote learning effectiveness',
      'Student engagement',
      'Administrative efficiency',
      'Data security and privacy'
    ],
    solutions: [
      'Learning Management Systems',
      'Interactive Educational Content',
      'Student Performance Analytics',
      'Administrative Automation'
    ],
    caseStudies: [
      {
        title: 'University Digital Transformation',
        description: 'Helped a leading university implement a comprehensive digital learning platform',
        results: [
          '35% increase in student engagement',
          'Improved course completion rates by 28%',
          'Reduced administrative workload by 40%'
        ]
      }
    ]
  },
  'manufacturing': {
    title: 'Manufacturing',
    description: 'Smart manufacturing solutions for Industry 4.0',
    heroImage: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Production efficiency',
      'Supply chain visibility',
      'Quality control',
      'Legacy system integration'
    ],
    solutions: [
      'IoT-Enabled Production Monitoring',
      'Predictive Maintenance',
      'Automated Quality Control',
      'Digital Twin Technology'
    ],
    caseStudies: [
      {
        title: 'Smart Factory Implementation',
        description: 'Implemented IoT-based monitoring for a manufacturing plant',
        results: [
          '22% increase in production efficiency',
          '35% reduction in downtime',
          'Quality defects reduced by 18%'
        ]
      }
    ]
  },
  'retail': {
    title: 'Retail & E-Commerce',
    description: 'Digital solutions for modern retail experiences',
    heroImage: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Omnichannel integration',
      'Customer experience personalization',
      'Inventory management',
      'Market competition'
    ],
    solutions: [
      'Unified Commerce Platforms',
      'AI-Powered Recommendation Systems',
      'Real-time Inventory Management',
      'Customer Journey Analytics'
    ],
    caseStudies: [
      {
        title: 'Omnichannel Retail Transformation',
        description: 'Developed an integrated omnichannel solution for a retail chain',
        results: [
          '45% increase in online sales',
          '28% improvement in customer retention',
          'Inventory accuracy improved to 98.5%'
        ]
      }
    ]
  },
  'restaurants': {
    title: 'Restaurants & Hospitality',
    description: 'Digital solutions for the food service industry',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Customer engagement',
      'Operational efficiency',
      'Labor management',
      'Online ordering integration'
    ],
    solutions: [
      'Integrated POS Systems',
      'Customer Loyalty Programs',
      'Kitchen Management Solutions',
      'Online Ordering Platforms'
    ],
    caseStudies: [
      {
        title: 'Restaurant Chain Digital Transformation',
        description: 'Implemented an integrated digital solution for a restaurant chain',
        results: [
          '32% increase in repeat customers',
          'Order accuracy improved by 25%',
          'Reduced wait times by 40%'
        ]
      }
    ]
  },
  'real-estate': {
    title: 'Real Estate',
    description: 'Digital solutions for property management and real estate',
    heroImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Property management efficiency',
      'Customer experience',
      'Market analysis',
      'Regulatory compliance'
    ],
    solutions: [
      'Property Management Systems',
      'Virtual Tours and 3D Visualization',
      'Market Analytics Platforms',
      'Document Management Solutions'
    ],
    caseStudies: [
      {
        title: 'Real Estate Agency Digital Transformation',
        description: 'Developed a comprehensive digital platform for a real estate agency',
        results: [
          '38% increase in lead generation',
          '28% reduction in paperwork',
          'Property showing efficiency improved by 45%'
        ]
      }
    ]
  },
  'transport': {
    title: 'Transport & Logistics',
    description: 'Digital solutions for transportation and logistics',
    heroImage: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Route optimization',
      'Fleet management',
      'Delivery tracking',
      'Supply chain visibility'
    ],
    solutions: [
      'Route Optimization Software',
      'Fleet Management Systems',
      'Real-time Tracking Solutions',
      'Supply Chain Visibility Platforms'
    ],
    caseStudies: [
      {
        title: 'Logistics Company Digital Transformation',
        description: 'Implemented an integrated logistics management system',
        results: [
          '22% reduction in fuel costs',
          'Delivery accuracy improved to 99.2%',
          'Customer satisfaction increased by 35%'
        ]
      }
    ]
  },
  'agriculture': {
    title: 'Agriculture',
    description: 'Digital solutions for modern farming',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Crop yield optimization',
      'Resource management',
      'Weather impact mitigation',
      'Supply chain efficiency'
    ],
    solutions: [
      'Precision Agriculture Systems',
      'IoT-Based Monitoring Solutions',
      'Farm Management Software',
      'Supply Chain Optimization'
    ],
    caseStudies: [
      {
        title: 'Smart Farming Implementation',
        description: 'Deployed IoT-based monitoring for a large farm operation',
        results: [
          '18% increase in crop yields',
          '25% reduction in water usage',
          'Reduced fertilizer costs by 20%'
        ]
      }
    ]
  },
  'legal': {
    title: 'Professional Services',
    description: 'Digital solutions for legal and professional services',
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Document management',
      'Client communication',
      'Time tracking and billing',
      'Regulatory compliance'
    ],
    solutions: [
      'Document Management Systems',
      'Client Portal Solutions',
      'Practice Management Software',
      'Compliance Management Tools'
    ],
    caseStudies: [
      {
        title: 'Law Firm Digital Transformation',
        description: 'Implemented a comprehensive digital solution for a law firm',
        results: [
          '35% improvement in document processing time',
          '28% increase in billable hours captured',
          'Client satisfaction improved by 40%'
        ]
      }
    ]
  },
  'marketing': {
    title: 'Marketing & Creative',
    description: 'Digital solutions for marketing and creative agencies',
    heroImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Campaign management',
      'Performance tracking',
      'Content creation efficiency',
      'Client reporting'
    ],
    solutions: [
      'Marketing Automation Platforms',
      'Analytics and Reporting Tools',
      'Creative Workflow Solutions',
      'Digital Asset Management'
    ],
    caseStudies: [
      {
        title: 'Marketing Agency Digital Transformation',
        description: 'Developed an integrated marketing operations platform',
        results: [
          '42% increase in campaign effectiveness',
          '30% reduction in campaign setup time',
          'Improved client retention by 25%'
        ]
      }
    ]
  },
  'startups': {
    title: 'Startups & Growth',
    description: 'Digital solutions for startups and growth businesses',
    heroImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80',
    challenges: [
      'Scaling operations',
      'Customer acquisition',
      'Process efficiency',
      'Limited resources'
    ],
    solutions: [
      'Growth Hacking Tools',
      'CRM and Customer Acquisition Systems',
      'Process Automation Solutions',
      'Analytics and Decision Support'
    ],
    caseStudies: [
      {
        title: 'Startup Scaling Success',
        description: 'Helped a startup implement digital systems to support rapid growth',
        results: [
          '200% increase in customer acquisition',
          'Operations scaled to support 5x growth',
          'Reduced customer acquisition cost by 35%'
        ]
      }
    ]
  }
};

// Add the exports that are being imported in other files
export const allIndustries = Object.keys(industriesData).map(id => ({
  id,
  name: industriesData[id].title,
  description: industriesData[id].description,
  path: `/industries/${id}`,
  imageUrl: industriesData[id].heroImage
}));

export const serviceIndustries = {
  'software-development': ['it-cloud', 'finance', 'healthcare'],
  'cloud-infrastructure': ['it-cloud', 'finance'],
  'cybersecurity': ['healthcare', 'finance', 'it-cloud'],
  'ai-ml': ['healthcare', 'finance', 'it-cloud', 'manufacturing'],
  'business-consulting': ['finance', 'healthcare', 'manufacturing'],
  'market-research': ['retail', 'finance', 'healthcare'],
  'consumer-voice': ['retail', 'restaurants', 'healthcare'],
  'workforce-solutions': ['manufacturing', 'healthcare', 'it-cloud'],
  'training-development': ['education', 'healthcare', 'it-cloud'],
   'core-data-cloud':['healthcare','retail','education', 'startups']
};
