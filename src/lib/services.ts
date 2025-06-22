export type ServiceStatus = 'active' | 'pilot' | 'development' | 'upcoming';

export type ServiceCategory = {
  id: number;
  name: string;
  description: string;
  icon: string;
  status: ServiceStatus;
  subServices: string[];
  stats?: {
    value: string;
    label: string;
  }[];
  imageUrl: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: 1,
    name: "Core Data & Cloud Services",
    description: "End-to-end data management and cloud infrastructure solutions to power your business intelligence needs.",
    icon: "database",
    status: "active",
    subServices: [
      "Data Storage & Management",
      "Cloud Infrastructure",
      "Data Protection",
      "Backup & Disaster Recovery",
      "Data Capturing",
      "Data Integration",
      "Data Migration",
      "Data Cleansing",
      "Data Transformation",
      "Cloud & Database Maintenance",
      "ETL/ELT Pipeline Building"
    ],
    imageUrl:"/public/photos/cloud1.jpg",
    stats: [
      { value: '99.9%', label: 'Accuracy' },
      { value: '50TB+', label: 'Processed' },
      { value: '24/7', label: 'Support' }
    ]
  },
  {
    id: 2,
    name: "Business Intelligence (BI) Services",
    description: "Transform raw data into actionable insights with our comprehensive BI solutions.",
    icon: "pie-chart",
    status: "active",
    subServices: [
      "BI Dashboards & Visualizations",
      "Custom KPI Building",
      "Self-Service Reporting",
      "Embedded Analytics",
      "Real-Time Data Insights",
      "KPI Monitoring Tools",
      "Data Storytelling & Presentation",
      "Data Blending & Modeling",
      "Ad-hoc Analysis & Exploration",
      "BI Tool Implementation (Power BI, Tableau, etc.)"
    ],
    imageUrl:"/public/photos/bi1.jpg",
    stats: [
      { value: '45%', label: 'Faster Decisions' },
      { value: '2x', label: 'ROI' },
      { value: '100+', label: 'Dashboards Built' }
    ]
  },
  {
    id: 3,
    name: "Digital Transformation Services",
    description: "Reimagine your business in the digital age with our transformation services and custom software solutions.",
    icon: "code",
    status: "active",
    subServices: [
      "Website & App Development",
      "SEO & Digital Marketing",
      "UI/UX Design",
      "Website Redesigning",
      "Hosting & Maintenance",
      "CRM/ERP Integration",
      "Digital Channel Optimization",
      "Data-Driven Digital Roadmaps",
      "Automation of Customer Journeys",
      "Digital Asset Management",
      "Web Application Development",
      "Mobile App Development",
      "Custom ERP/CRM Solutions",
      "API Integration & Development",
      "Cloud-Native Apps",
      "SaaS Product Design",
      "Platform Modernization",
      "Backend & Frontend Architecture",
      "MVP & Prototype Development",
      "QA & Testing Services"
    ],
    imageUrl:"/public/photos/digital5.jpg",
    stats: [
      { value: '60%', label: 'Cost Reduction' },
      { value: '3x', label: 'Faster Deployment' },
      { value: '200+', label: 'Projects Completed' }
    ]
  },
  {
    id: 4,
    name: "Business Consulting Services",
    description: "Strategic guidance to optimize operations, mitigate risks, and drive sustainable growth.",
    icon: "briefcase",
    status: "active",
    subServices: [
      "Strategic Business Planning",
      "Operational Efficiency Optimization",
      "Financial & Revenue Modeling",
      "Risk Assessment & Mitigation",
      "Business Scaling Support",
      "Business Model Innovation",
      "Cost Optimization Strategies",
      "Digital Strategy Alignment",
      "Performance Benchmarking",
      "Process Re-engineering"
    ],
    imageUrl:"/public/photos/business1.jpg",
    stats: [
      { value: '30%', label: 'Efficiency Gain' },
      { value: '50+', label: 'Clients Served' },
      { value: '$10M+', label: 'Cost Savings' }
    ]
  },
  {
    id: 5,
    name: "Market Research & Trend Analysis",
    description: "Data-driven market intelligence to understand your customers, competitors, and industry landscape.",
    icon: "search",
    status: "active",
    subServices: [
      "Competitor Analysis",
      "Industry Trends & Forecasting",
      "Consumer Behaviour Insights",
      "Brand Perception Tracking",
      "Pricing Strategy Research",
      "Product-Market Fit Studies",
      "Custom Surveys & Focus Groups",
      "Voice of Customer (VoC) Reports",
      "Demographic & Psychographic Analysis",
      "Emerging Tech & Innovation Trends"
    ],
    imageUrl:"/public/photos/ai2.jpg",
    stats: [
      { value: '95%', label: 'Accuracy' },
      { value: '500+', label: 'Studies Conducted' },
      { value: '20+', label: 'Industries Covered' }
    ]
  },
  {
    id: 6,
    name: "Consumer Voice & Sentiment Analytics",
    description: "Capture and analyze customer feedback across all touchpoints to drive experience improvements.",
    icon: "message-square",
    status: "pilot",
    subServices: [
      "Feedback Collection Systems",
      "AI-Based Sentiment Analysis",
      "Social Listening & Brand Tracking",
      "Customer Review Mining",
      "Open-Text Feedback Analytics",
      "Omnichannel Survey Deployment",
      "Experience Score Mapping",
      "Complaint Resolution Analytics",
      "Loyalty & Advocacy Insights",
      "Multilingual Sentiment Detection"
    ],
    imageUrl:"/public/photos/business3.jpg",
    stats: [
      { value: '10M+', label: 'Reviews Analyzed' },
      { value: '92%', label: 'Sentiment Accuracy' },
      { value: '15', label: 'Languages Supported' }
    ]
  },
  {
    id: 7,
    name: "Workforce Intelligence & Employee Experience",
    description: "Optimize your workforce management with data-driven insights and employee experience analysis.",
    icon: "users",
    status: "pilot",
    subServices: [
      "Workforce Analytics & Forecasting",
      "Resource Planning & Scheduling",
      "Performance Dashboards",
      "Attrition & Retention Insights",
      "Engagement Monitoring",
      "Skill Mapping & Internal Mobility",
      "Roster Optimization Tools",
      "WFM System Integration (IEX, NICE, etc.)",
      "Real-time Occupancy & Productivity Monitoring",
      "Employee Sentiment & Feedback Loop"
    ],
    imageUrl:"/public/photos/stock.jpg",
    stats: [
      { value: '25%', label: 'Productivity Gain' },
      { value: '30%', label: 'Retention Improvement' },
      { value: '50+', label: 'Workforces Analyzed' }
    ]
  },
  {
    id: 8,
    name: "Training, Support & Talent Services",
    description: "Empower your team with technical skills and knowledge to drive digital transformation.",
    icon: "book",
    status: "development",
    subServices: [
      "Technical Upskilling (Cloud, Data, AI)",
      "Business & Soft Skill Programs",
      "Custom Training Programs",
      "Learning Management Systems (LMS)",
      "Certification Preparation (AWS, Azure, etc.)",
      "Talent Onboarding & Role-based Training",
      "Bootcamps & Hackathons",
      "Internship & Graduate Programs",
      "Team Workshops & Webinars",
      "Ongoing Support & Knowledge Transfer"
    ],
    imageUrl:"/public/photos/digital1.jpg",
    stats: [
      { value: '1000+', label: 'Trained Professionals' },
      { value: '95%', label: 'Satisfaction Rate' },
      { value: '20+', label: 'Certification Programs' }
    ]
  },
  {
    id: 9,
    name: "DevOps & Cloud Automation",
    description: "Streamline your development and operations with automated cloud infrastructure and CI/CD pipelines.",
    icon: "settings",
    status: "development",
    subServices: [
      "CI/CD Pipeline Implementation",
      "Infrastructure as Code (Terraform, Ansible)",
      "Kubernetes & Container Management",
      "Cloud Resource Automation",
      "GitOps & Version Control",
      "Auto Scaling & Monitoring",
      "Cloud Environment Provisioning",
      "Cloud-native Deployment Pipelines",
      "Logging & Alerting Automation",
      "DevSecOps Best Practices"
    ],
    imageUrl:"/public/photos/dev1.jpg",
    stats: [
      { value: '90%', label: 'Deployment Speed' },
      { value: '99.99%', label: 'Uptime' },
      { value: '50%', label: 'Ops Cost Reduction' }
    ]
  },
  {
    id: 10,
    name: "AI, ML & Intelligent Automation",
    description: "Harness the power of artificial intelligence and machine learning to automate processes and gain predictive insights.",
    icon: "zap",
    status: "upcoming",
    subServices: [
      "Predictive Analytics & Forecasting",
      "Robotic Process Automation (RPA)",
      "AI Chatbots & Virtual Assistants",
      "NLP & Text Mining",
      "Machine Learning Models",
      "Image & Video Recognition (CV)",
      "Intelligent Document Processing (IDP)",
      "Automated Decision Making",
      "Custom ML Pipelines",
      "Business Process Automation"
    ],
    imageUrl:"/public/photos/help.jpg",
    stats: [
      { value: '85%', label: 'Process Accuracy' },
      { value: '3x', label: 'Faster Processing' },
      { value: '100+', label: 'Use Cases' }
    ]
  },
  {
    id: 11,
    name: "Cybersecurity & Compliance Services",
    description: "Protect your data and systems with comprehensive security solutions and compliance management.",
    icon: "shield",
    status: "upcoming",
    subServices: [
      "Network & Endpoint Security",
      "Identity & Access Management (IAM)",
      "Data Encryption & Protection",
      "Cloud Security & DevSecOps",
      "Threat Detection & Prevention",
      "Penetration Testing & Vulnerability Scans",
      "Compliance Management (ISO, GDPR, HIPAA)",
      "Security Awareness Training",
      "Incident Detection & Response (IDR)",
      "Zero Trust Architecture"
    ],
    imageUrl:"/public/photos/cyber3.jpg",
    stats: [
      { value: '100%', label: 'Compliance' },
      { value: '0', label: 'Breaches' },
      { value: '24/7', label: 'Monitoring' }
    ]
  },
  {
    id: 12,
    name: "Bookkeeping & Taxation Services",
    description: "Comprehensive financial management and tax compliance solutions for your business.",
    icon: "file",
    status: "upcoming",
    subServices: [
      "Daily Bookkeeping",
      "Monthly & Year-End Reporting",
      "Tax Return Preparation & Filing",
      "VAT/GST Reporting",
      "Payroll Processing",
      "Financial Statements",
      "Cash Flow Management",
      "HMRC Compliance (UK)",
      "Expense Tracking & Categorization",
      "Self-Assessment Assistance"
    ],
    imageUrl:"/public/photos/business2.jpg",
    stats: [
      { value: '99%', label: 'Accuracy' },
      { value: '30%', label: 'Time Saved' },
      { value: '100+', label: 'Clients Served' }
    ]
  }

  
];

export const getServicesByStatus = (status: ServiceStatus): ServiceCategory[] => {
  return serviceCategories.filter(category => category.status === status);
};