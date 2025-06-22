import { 
  Database, 
  Cloud, 
  Laptop, 
  Lock, 
  Globe, 
  Bot as BotIcon,
  Building2, 
  BookUser, 
  LineChart, 
  TrendingUp, 
  PencilRuler, 
  HeartPulse,
  BookOpen, 
  Truck, 
  Wrench, 
  ShoppingBag,
  Utensils, 
  Home, 
  ArrowUpRight, 
  Zap, 
  Users,
  Network, 
  LandPlot,
  BarChart3,
  MessageSquare,
  GraduationCap,
  Sparkles,
  BrainCircuit,
  Search,
  Calculator,
  Cpu,
  Code,
  Camera
} from 'lucide-react';
import { DropdownItem } from '@/types/navigation';

export const servicesDropdown: DropdownItem[] = [
    // Active Services (Fully launched and available)
  {
    title: 'Core Data and Cloud Services',
    path: '/service-detail/core-data-cloud',
    description: 'Comprehensive data management and cloud solutions for modern enterprises.',
    icon: Cloud,
    stage: 'active',
    image:"/photos/cloud1.jpg",
    subService: [
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
     stats: [
      { value: '99.9%', label: 'Accuracy' },
      { value: '50TB+', label: 'Processed' },
      { value: '24/7', label: 'Support' }
    ]
  },
  
  {
    title: 'Business Intelligence',
    path: '/service-detail/bi-digital-transformation',
    description: 'Transforming raw data into actionable intelligence, BI dashboards, apps, and digital strategies.',
    icon: BarChart3,
    stage: 'active',
    subService: [
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
    image:"/photos/bi1.jpg",
      stats: [
      { value: '45%', label: 'Faster Decisions' },
      { value: '2x', label: 'ROI' },
      { value: '100+', label: 'Dashboards Built' }
    ]
  },

{
    title: 'Digital Transformation',
    path: '/service-detail/digital-transformation',
    description: 'Reimagine your business in the digital age with our transformation services and custom software solutions.',
    icon: Code,
    stage: 'active',
    subService: [
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
    image:"/photos/digital5.jpg",
    stats: [
      { value: '60%', label: 'Cost Reduction' },
      { value: '3x', label: 'Faster Deployment' },
      { value: '200+', label: 'Projects Completed' }
    ]


},


   {
    title: 'Business Consulting',
    path: '/service-detail/business-consulting',
    description: 'Strategic business advice and planning',
    icon: Building2,
    stage: 'active',
    subService: [
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
    image:"/photos/business1.jpg",
    stats: [
      { value: '30%', label: 'Efficiency Gain' },
      { value: '50+', label: 'Clients Served' },
      { value: '$10M+', label: 'Cost Savings' }
    ]
  },
  {
    title: 'Market Research and Trends',
    path: '/service-detail/market-research',
    description: 'Informed decisions through competitor analysis and market insights.',
    icon: Search,
    stage: 'active',
    subService: [
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
    image:"/photos/ai2.jpg",
    stats: [
      { value: '95%', label: 'Accuracy' },
      { value: '500+', label: 'Studies Conducted' },
      { value: '20+', label: 'Industries Covered' }
    ]
  },
   
  {
    title: 'Consumer Voice Services',
    path: '/service-detail/consumer-voice',
    description: 'Customer feedback and sentiment analysis to understand and improve customer experience',
    icon: MessageSquare,
    stage: 'active',
    subService: [
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
    image:"/photos/business3.jpg",
    stats: [
      { value: '10M+', label: 'Reviews Analyzed' },
      { value: '92%', label: 'Sentiment Accuracy' },
      { value: '15', label: 'Languages Supported' }
    ]
    
  },
  {
    title: 'Workforce Solutions',
    path: '/service-detail/employee-solutions',
    description: 'Staffing, training, workforce planning, management and optimization through data-driven HR solutions',
    icon: Users,
    stage: 'active',
    pilotDetails: 'Piloting with 2 retail organizations',
    subService: [
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
    image:"/photos/stock.jpg",
    stats: [
      { value: '25%', label: 'Productivity Gain' },
      { value: '30%', label: 'Retention Improvement' },
      { value: '50+', label: 'Workforces Analyzed' }
    ]
  },

 // Pilot Services (developed and in testing with clients)
  
   {
    title: 'AI & Machine Learning',
    path: '/service-detail/ai-ml',
    description: 'Intelligent solutions for business problems',
    icon: BrainCircuit,
    stage: 'pilot',
     subService: [
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
    image:"/photos/help.jpg",
    stats: [
      { value: '85%', label: 'Process Accuracy' },
      { value: '3x', label: 'Faster Processing' },
      { value: '100+', label: 'Use Cases' }
    ]
  },
{
    title: 'DevOps & Cloud Automation',
    path: '/service-detail/devops',
    description: 'Seamless CI/CD pipelines and infrastructure automation for tech agility.',
    icon: Lock,
    stage: 'pilot',
     subService: [
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
    image:"/photos/dev1.jpg",
    stats: [
      { value: '90%', label: 'Deployment Speed' },
      { value: '99.99%', label: 'Uptime' },
      { value: '50%', label: 'Ops Cost Reduction' }
    ]
  },

 // Under Development (In development, not yet released)
   
  {
    title: 'AI Automation',
    path: '/service-detail/ai-automation',
    description: 'Advanced AI automation services to streamline business processes',
    icon: BotIcon,
    stage: 'development',
    developmentPhase: 'Prototype phase',
    estimatedLaunch: 'Q4 2025'
  },
   // Upcoming Services (Planned future offerings)
  
  
  {
    title: 'Cybersecurity',
    path: '/service-detail/cybersecurity',
    description: 'Protect your business from digital threats',
    icon: Lock,
    stage: 'upcoming',
    releaseDate: 'Q2 2026',
    subService: [
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
    image:"/photos/cyber3.jpg",
    stats: [
      { value: '100%', label: 'Compliance' },
      { value: '0', label: 'Breaches' },
      { value: '24/7', label: 'Monitoring' }
    ]
  },
   
  {
    title: 'IoT Solutions',
    path: '/service-detail/iot-solutions',
    description: 'Connected device ecosystems',
    icon: Zap,
    stage: 'upcoming',
    releaseDate: 'Q3 2026'
  },
  {
    title: 'Bookkeeping and Taxation',
    path: '/service-detail/bookkeeping',
    description: 'Financial management services for accurate accounting',
    icon: Calculator,
    stage: 'upcoming',
    releaseDate: 'Q4 2026',
    subService: [
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
    image:"/photos/business2.jpg",
    stats: [
      { value: '99%', label: 'Accuracy' },
      { value: '30%', label: 'Time Saved' },
      { value: '100+', label: 'Clients Served' }
    ]
  }
  
  /*,
   {
    title: 'Digital Twin Consulting',
    path: '/service-detail/digital-twin',
    description: 'AI-powered digital twin solutions for simulation and optimization',
    icon: Cpu,
    stage: 'upcoming',
    developmentPhase: 'Beta testing',
    estimatedLaunch: 'Q3 2025'
  }*/
 
];

export const industriesDropdown: DropdownItem[] = [
  {
    title: 'IT & Cloud Services',
    path: '/industries/it-cloud',
    description: 'Digital infrastructure and cloud services',
    icon: Cloud
  },
  {
    title: 'Financial Services',
    path: '/industries/finance',
    description: 'Solutions for banking and finance',
    icon: LineChart
  },
  {
    title: 'Healthcare',
    path: '/industries/healthcare',
    description: 'Digital healthcare transformation',
    icon: HeartPulse
  },
  {
    title: 'Education',
    path: '/industries/education',
    description: 'Edtech and learning platforms',
    icon: BookOpen
  },
  {
    title: 'Manufacturing',
    path: '/industries/manufacturing',
    description: 'Smart factory and industry 4.0',
    icon: Wrench
  },
  {
    title: 'Retail & E-Commerce',
    path: '/industries/retail',
    description: 'Online shopping and retail systems',
    icon: ShoppingBag
  },
  {
    title: 'Restaurants & Hospitality',
    path: '/industries/restaurants',
    description: 'Food service and customer experience',
    icon: Utensils
  },
  {
    title: 'Real Estate',
    path: '/industries/real-estate',
    description: 'Property management solutions',
    icon: Home
  },
  {
    title: 'Transport & Logistics',
    path: '/industries/transport',
    description: 'Supply chain and logistics solutions',
    icon: Truck
  },
  {
    title: 'Agriculture',
    path: '/industries/agriculture',
    description: 'Smart farming and agricultural tech',
    icon: LandPlot
  },
  {
    title: 'Professional Services',
    path: '/industries/legal',
    description: 'Legal, consulting and business services',
    icon: BookUser
  },
  {
    title: 'Marketing & Creative',
    path: '/industries/marketing',
    description: 'Brand building and creative tools',
    icon: PencilRuler
  },
  {
    title: 'Startups & Growth',
    path: '/industries/startups',
    description: 'Scaling and growth solutions',
    icon: TrendingUp
  }
];

export const allIndustries = [
  { id: 'it-cloud', name: 'IT & Cloud Services' },
  { id: 'finance', name: 'Financial Services' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'retail', name: 'Retail & E-Commerce' },
  { id: 'restaurants', name: 'Restaurants & Hospitality' },
  { id: 'real-estate', name: 'Real Estate' },
  { id: 'transport', name: 'Transport & Logistics' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'legal', name: 'Professional Services' },
  { id: 'marketing', name: 'Marketing & Creative' },
  { id: 'startups', name: 'Startups & Growth' }
];

export const serviceIndustries = {
  // Active services
  'bi-digital-transformation': ['finance', 'healthcare', 'retail'],
  'core-data-cloud': ['it-cloud', 'finance', 'retail'],
  'business-consulting': ['finance', 'healthcare', 'manufacturing'],
  'market-research': ['retail', 'finance', 'healthcare'],
  
  // Pilot services
  'consumer-voice': ['retail', 'restaurants', 'healthcare'],
  'employee-solutions': ['manufacturing', 'healthcare', 'it-cloud'],
  
  // Under development
  'digital-twin': ['manufacturing', 'smart-cities'],
  'ai-automation': ['finance', 'healthcare'],
  
  // Upcoming services
  'cybersecurity': ['healthcare', 'finance', 'it-cloud'],
  'software-development': ['it-cloud', 'finance', 'healthcare'],
  'iot-solutions': ['manufacturing', 'agriculture', 'retail'],
  'training': ['education', 'healthcare', 'it-cloud'],
  'bookkeeping': ['small-business', 'startups']
};

export const serviceIndustriesDetailed = {

  'cybersecurity': {
    current: [
      {
        name: 'Healthcare',
        challenges: ['Patient data protection', 'HIPAA compliance', 'IoT device security'],
        solutions: ['Healthcare-specific security assessments', 'Compliance frameworks', 'Secure healthcare IoT'],
        caseStudy: 'Implemented comprehensive security framework for a hospital network that prevented data breaches and ensured HIPAA compliance'
      },
      {
        name: 'Financial Services',
        challenges: ['Fraud prevention', 'Transaction security', 'Customer data protection'],
        solutions: ['Fraud detection systems', 'Secure transaction processing', 'Data encryption'],
        caseStudy: 'Deployed advanced threat protection system that reduced fraud attempts by 85% for an online payment provider'
      }
    ],
    potential: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Cloud security posture', 'Identity management', 'DevSecOps integration'],
        solutions: ['Cloud security assessment', 'IAM solutions', 'Security automation'],
        caseStudy: 'Integrated security automation into the CI/CD pipeline of a cloud service provider, reducing vulnerability exposure by 75%'
      }
    ]
  },
  
  'bi-digital-transformation': {
    current: [
      {
        name: 'Financial Services',
        challenges: ['Manual reporting', 'Data silos', 'Customer behavior prediction'],
        solutions: ['Automated BI reporting', 'Data integration solutions', 'Predictive analytics'],
        caseStudy: 'Built a real-time dashboard for a financial firm, reducing reporting time by 60%'
      },
      {
        name: 'Healthcare',
        challenges: ['Patient flow optimization', 'Data visualization gaps'],
        solutions: ['Custom healthcare BI dashboards', 'Operational efficiency reporting'],
        caseStudy: 'Enabled hospital management to reduce patient wait times by 30% through data insights'
      },
      {
        name: 'Retail & E-Commerce',
        challenges: ['Inventory mismanagement', 'Poor customer segmentation'],
        solutions: ['Sales trend analytics', 'Customer behavior BI models'],
        caseStudy: 'Helped a retail chain boost seasonal sales by 25% using advanced analytics'
      }
    ],
    potential: [
      {
        name: 'Education',
        challenges: ['Student performance tracking', 'Resource optimization'],
        solutions: ['Educational performance dashboards', 'Enrollment forecasting'],
        caseStudy: 'Developed BI systems for a university to improve student retention by 15%'
      }
    ]
  },

  'core-data-cloud': {
    current: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Cloud migration complexity', 'Data storage optimization'],
        solutions: ['Cloud-native infrastructure setup', 'Scalable cloud storage'],
        caseStudy: 'Migrated a legacy system to AWS cloud, reducing operational costs by 40%'
      },
      {
        name: 'Financial Services',
        challenges: ['Secure financial data storage', 'Real-time transaction processing'],
        solutions: ['Financial cloud data warehousing', 'Secure transaction cloud setup'],
        caseStudy: 'Set up secure multi-region cloud for a fintech company, ensuring 99.99% uptime'
      },
      {
        name: 'Retail & E-Commerce',
        challenges: ['Managing large product catalogs', 'Website downtime'],
        solutions: ['Cloud-based catalog systems', 'Auto-scaling e-commerce hosting'],
        caseStudy: 'Enabled an e-commerce platform to handle Black Friday traffic with zero downtime'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['IoT data management', 'Production monitoring'],
        solutions: ['Cloud data lakes for IoT', 'Real-time production dashboards'],
        caseStudy: 'Deployed IoT cloud solutions reducing manufacturing defects by 18%'
      }
    ]
  },

  'business-consulting': {
    current: [
      {
        name: 'Financial Services',
        challenges: ['Strategic growth planning', 'Risk management'],
        solutions: ['Business strategy consulting', 'Financial risk assessment'],
        caseStudy: 'Helped a mid-sized bank expand into two new regions with a robust risk plan'
      },
      {
        name: 'Healthcare',
        challenges: ['Operational inefficiency', 'Patient engagement strategies'],
        solutions: ['Operational consulting', 'Patient outreach programs'],
        caseStudy: 'Streamlined operations for a hospital group, improving service delivery time by 20%'
      },
      {
        name: 'Manufacturing',
        challenges: ['Production inefficiencies', 'Supply chain disruptions'],
        solutions: ['Lean manufacturing consulting', 'Supply chain optimization'],
        caseStudy: 'Reduced production cycle time by 22% for a machinery manufacturer'
      }
    ],
    potential: [
      {
        name: 'Startups & Growth',
        challenges: ['Scaling operations', 'Go-to-market strategies'],
        solutions: ['Startup business modeling', 'Launch strategy consulting'],
        caseStudy: 'Assisted a tech startup to secure Series A funding through structured business planning'
      }
    ]
  },

  'market-research': {
    current: [
      {
        name: 'Retail & E-Commerce',
        challenges: ['Consumer behavior prediction', 'Market competition analysis'],
        solutions: ['Customer journey mapping', 'Competitor benchmarking'],
        caseStudy: 'Provided insights leading to 20% increased market share for a clothing brand'
      },
      {
        name: 'Financial Services',
        challenges: ['Market entry challenges', 'Product acceptance'],
        solutions: ['Industry trend analysis', 'Product-market fit research'],
        caseStudy: 'Supported a financial services firm to launch a new investment product successfully'
      },
      {
        name: 'Healthcare',
        challenges: ['New treatment market acceptance', 'Patient demographics study'],
        solutions: ['Healthcare market research', 'Patient needs analysis'],
        caseStudy: 'Helped a pharmaceutical company plan a new drug launch based on patient segmentation'
      }
    ],
    potential: [
      {
        name: 'Agriculture',
        challenges: ['New technology adoption', 'Crop trend forecasting'],
        solutions: ['Farmer behavior studies', 'Agri-product trend analysis'],
        caseStudy: 'Enabled an agri-tech startup to penetrate rural markets faster with product adjustments'
      }
    ]
  },

  'consumer-voice': {
    current: [
      {
        name: 'Retail & E-Commerce',
        challenges: ['Low customer retention', 'Poor feedback utilization'],
        solutions: ['Sentiment analysis', 'Feedback loop integration'],
        caseStudy: 'Increased loyalty program engagement by 30% through targeted feedback action plans'
      },
      {
        name: 'Restaurants & Hospitality',
        challenges: ['Negative reviews', 'Customer satisfaction tracking'],
        solutions: ['Reputation management', 'Real-time feedback systems'],
        caseStudy: 'Helped a restaurant chain improve online ratings by 1.5 stars in 6 months'
      },
      {
        name: 'Healthcare',
        challenges: ['Patient satisfaction monitoring', 'Service feedback handling'],
        solutions: ['Patient voice analytics', 'Experience optimization strategies'],
        caseStudy: 'Improved patient satisfaction scores by 20% for a multispecialty clinic'
      }
    ],
    potential: [
      {
        name: 'Marketing & Creative',
        challenges: ['Campaign performance tracking', 'Audience sentiment prediction'],
        solutions: ['Voice of customer analysis for campaigns', 'Audience emotion tracking'],
        caseStudy: 'Optimized ad campaigns leading to a 25% increase in engagement for a media agency'
      }
    ]
  },

  'employee-solutions': {
    current: [
      {
        name: 'Manufacturing',
        challenges: ['Workforce shortage', 'Shift management'],
        solutions: ['Employee scheduling systems', 'Workforce analytics'],
        caseStudy: 'Improved employee satisfaction by 18% through better shift scheduling'
      },
      {
        name: 'Healthcare',
        challenges: ['Nursing staff shortages', 'Burnout management'],
        solutions: ['Healthcare workforce planning', 'Burnout prediction models'],
        caseStudy: 'Reduced nurse turnover by 12% with predictive scheduling models'
      },
      {
        name: 'IT & Cloud Services',
        challenges: ['Talent acquisition', 'Remote workforce management'],
        solutions: ['Remote collaboration tools', 'Skill-based hiring models'],
        caseStudy: 'Enabled a tech company to scale remote hiring by 3x post-pandemic'
      }
    ],
    potential: [
      {
        name: 'Education',
        challenges: ['Faculty workload balancing', 'Adjunct faculty management'],
        solutions: ['Academic workforce planning', 'Smart course load distribution'],
        caseStudy: 'Optimized teaching loads improving academic performance scores'
      }
    ]
  },


 'cybersecurity': {
    current: [
      {
        name: 'Healthcare',
        challenges: ['Patient data protection', 'HIPAA compliance', 'IoT device security'],
        solutions: ['Healthcare-specific security assessments', 'Compliance frameworks', 'Secure healthcare IoT'],
        caseStudy: 'Implemented comprehensive security framework for a hospital network that prevented data breaches and ensured HIPAA compliance'
      },
      {
        name: 'Financial Services',
        challenges: ['Fraud prevention', 'Transaction security', 'Customer data protection'],
        solutions: ['Fraud detection systems', 'Secure transaction processing', 'Data encryption'],
        caseStudy: 'Deployed advanced threat protection system that reduced fraud attempts by 85% for an online payment provider'
      }
    ],
    potential: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Cloud security posture', 'Identity management', 'DevSecOps integration'],
        solutions: ['Cloud security assessment', 'IAM solutions', 'Security automation'],
        caseStudy: 'Integrated security automation into the CI/CD pipeline of a cloud service provider, reducing vulnerability exposure by 75%'
      }
    ]
  },
  'ai-ml': {
    current: [
      {
        name: 'Healthcare',
        challenges: ['Diagnostic accuracy', 'Patient outcome prediction', 'Treatment optimization'],
        solutions: ['Medical image analysis AI', 'Patient outcome models', 'Clinical decision support systems'],
        caseStudy: 'Developed an AI-based diagnostic tool that improved early disease detection by 28% and reduced false positives by 35%'
      },
      {
        name: 'Financial Services',
        challenges: ['Fraud detection', 'Risk assessment', 'Customer insights'],
        solutions: ['AI fraud detection systems', 'Predictive risk models', 'Customer behavior analysis'],
        caseStudy: 'Implemented ML-based fraud detection that identified 95% of fraudulent transactions while reducing false positives by 60%'
      },
      {
        name: 'IT & Cloud Services',
        challenges: ['Infrastructure optimization', 'Predictive maintenance', 'Operational intelligence'],
        solutions: ['AI-driven resource allocation', 'Predictive failure analysis', 'Intelligent operations'],
        caseStudy: 'Created a predictive maintenance system that reduced cloud infrastructure downtime by 78% and optimized resource utilization'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['Quality control', 'Process optimization', 'Predictive maintenance'],
        solutions: ['Computer vision QC systems', 'AI-optimized manufacturing', 'Equipment failure prediction'],
        caseStudy: 'Deployed a computer vision system for quality control that reduced defect rates by 42% and inspection costs by 30%'
      }
    ]
  },
  'business-consulting': {
    current: [
      {
        name: 'Financial Services',
        challenges: ['Digital transformation', 'Operational efficiency', 'Market positioning'],
        solutions: ['Digital strategy development', 'Process optimization', 'Competitive analysis'],
        caseStudy: 'Guided a mid-sized financial firm through digital transformation, resulting in 35% increased efficiency and 28% revenue growth'
      },
      {
        name: 'Healthcare',
        challenges: ['Operational efficiency', 'Patient experience', 'Cost reduction'],
        solutions: ['Healthcare operations analysis', 'Patient journey mapping', 'Cost optimization strategies'],
        caseStudy: 'Redesigned patient intake process for a clinic network, reducing wait times by 45% and improving patient satisfaction scores'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['Supply chain optimization', 'Digital transformation', 'Market expansion'],
        solutions: ['Supply chain analysis', 'Industry 4.0 roadmaps', 'Market entry strategies'],
        caseStudy: 'Developed a digital transformation roadmap for a manufacturer that led to 22% efficiency gain and new market opportunities'
      }
    ]
  },
  'market-research': {
    current: [
      {
        name: 'Retail',
        challenges: ['Customer preferences', 'Competitive landscape', 'Market trends'],
        solutions: ['Consumer behavior analysis', 'Competitor research', 'Trend forecasting'],
        caseStudy: 'Conducted comprehensive market analysis for a retailer entering new territory, resulting in successful market entry and 20% above-projected sales'
      },
      {
        name: 'Financial Services',
        challenges: ['Product development', 'Customer segmentation', 'Market positioning'],
        solutions: ['Financial product research', 'Customer segment analysis', 'Brand positioning studies'],
        caseStudy: 'Performed detailed customer segmentation that guided development of new financial products with 40% higher adoption rates'
      }
    ],
    potential: [
      {
        name: 'Healthcare',
        challenges: ['Patient needs assessment', 'Service offering optimization', 'Regional market analysis'],
        solutions: ['Patient needs research', 'Service portfolio analysis', 'Geographic expansion studies'],
        caseStudy: 'Researched patient needs in underserved communities, informing a clinic network expansion that addressed critical healthcare gaps'
      }
    ]
  },
  'consumer-voice': {
    current: [
      {
        name: 'Retail',
        challenges: ['Customer feedback collection', 'Brand perception', 'Service improvement'],
        solutions: ['Voice of customer programs', 'Brand perception analysis', 'Experience improvement'],
        caseStudy: 'Implemented a comprehensive VoC program for a retail chain that led to specific improvements increasing customer satisfaction by 32%'
      },
      {
        name: 'Restaurants',
        challenges: ['Dining experience optimization', 'Menu development', 'Service quality'],
        solutions: ['Dining experience analysis', 'Menu testing and optimization', 'Service quality monitoring'],
        caseStudy: 'Gathered customer insights that guided menu redesign for a restaurant chain, increasing average check size by 18% and customer satisfaction by 25%'
      }
    ],
    potential: [
      {
        name: 'Healthcare',
        challenges: ['Patient experience', 'Service quality perception', 'Loyalty drivers'],
        solutions: ['Patient experience monitoring', 'Healthcare service evaluation', 'Loyalty program development'],
        caseStudy: 'Designed patient feedback system that identified key drivers of satisfaction, guiding improvements that reduced patient churn by 35%'
      }
    ]
  },
  'workforce-solutions': {
    current: [
      {
        name: 'Manufacturing',
        challenges: ['Skills gaps', 'Workforce efficiency', 'Knowledge transfer'],
        solutions: ['Skills assessment and training', 'Workflow optimization', 'Knowledge management systems'],
        caseStudy: 'Implemented comprehensive workforce development program for a manufacturer that increased productivity by 23% and reduced errors by 40%'
      },
      {
        name: 'Healthcare',
        challenges: ['Staff shortages', 'Burnout prevention', 'Specialized training'],
        solutions: ['Healthcare workforce planning', 'Wellbeing programs', 'Clinical training solutions'],
        caseStudy: 'Developed specialized training and wellbeing program that reduced staff turnover by 28% at a large hospital network'
      }
    ],
    potential: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Technical talent acquisition', 'Skills development', 'Remote work optimization'],
        solutions: ['Tech talent strategies', 'Continuous learning programs', 'Remote work frameworks'],
        caseStudy: 'Created technical upskilling program that enabled a tech company to fill 65% of senior positions through internal promotion'
      }
    ]
  },



  
  'software-development': {
    current: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Legacy system integration', 'Rapid digital transformation', 'Scalable architecture design'],
        solutions: ['Custom software development', 'API integration services', 'Microservices architecture'],
        caseStudy: 'Developed a custom CRM solution for a tech firm that improved customer tracking by 45% and reduced response times by 30%'
      },
      {
        name: 'Healthcare',
        challenges: ['Patient data security', 'Interoperability between systems', 'Regulatory compliance'],
        solutions: ['HIPAA-compliant applications', 'Healthcare systems integration', 'Patient management software'],
        caseStudy: 'Built integrated EMR system that reduced administrative workload by 35% and improved patient data accessibility'
      }
    ],
    potential: [
      {
        name: 'Financial Services',
        challenges: ['Regulatory compliance', 'Legacy system modernization', 'Digital customer experience'],
        solutions: ['Financial reporting systems', 'Digital banking platforms', 'Compliance monitoring tools'],
        caseStudy: 'Modernized legacy banking platform reducing transaction processing time by 65% while ensuring full compliance'
      }
    ]
  },
  'cloud-infrastructure': {
    current: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Scalability issues', 'Security concerns', 'Cost optimization'],
        solutions: ['Cloud architecture design', 'Migration services', 'Managed cloud services'],
        caseStudy: 'Migrated on-premise infrastructure to AWS for a SaaS provider, reducing operational costs by 40% and improving uptime to 99.99%'
      },
      {
        name: 'Financial Services',
        challenges: ['Data security', 'Compliance requirements', 'High availability needs'],
        solutions: ['Secure cloud infrastructure', 'Compliance-ready deployments', 'Disaster recovery solutions'],
        caseStudy: 'Implemented secure cloud environment for a financial institution that passed all regulatory audits while improving performance'
      }
    ]
  },
 
  'training-development': {
    current: [
      {
        name: 'Education',
        challenges: ['Curriculum relevance', 'Learning engagement', 'Outcomes measurement'],
        solutions: ['Curriculum design services', 'Interactive learning development', 'Learning analytics'],
        caseStudy: 'Redesigned online learning curriculum for a university that improved completion rates by 45% and student satisfaction by 60%'
      },
      {
        name: 'Healthcare',
        challenges: ['Clinical skills development', 'Compliance training', 'Continuous education'],
        solutions: ['Clinical simulation programs', 'Compliance learning systems', 'Professional development frameworks'],
        caseStudy: 'Developed specialized clinical training program that reduced procedural errors by 35% and improved patient outcomes'
      }
    ],
    potential: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Technical skills gaps', 'Rapid technology changes', 'Knowledge retention'],
        solutions: ['Technical training programs', 'Technology adoption training', 'Knowledge base development'],
        caseStudy: 'Created comprehensive cloud certification program that increased team capabilities and customer satisfaction with implementations'
      }
    ]
  },
  'iot-solutions': {
    future: [
      {
        name: 'Manufacturing',
        challenges: ['Equipment monitoring', 'Production optimization', 'Quality assurance'],
        solutions: ['Connected factory solutions', 'Real-time monitoring systems', 'IoT-enabled quality control'],
        futureOutlook: 'Smart manufacturing with fully connected production lines that self-optimize and predict maintenance needs'
      },
      {
        name: 'Agriculture',
        challenges: ['Crop monitoring', 'Resource optimization', 'Yield prediction'],
        solutions: ['Smart farming systems', 'Precision agriculture', 'Harvest optimization'],
        futureOutlook: 'Precision farming enabled by IoT sensors and analytics, optimizing resource use and maximizing yields sustainably'
      }
    ],
    potential: [
      {
        name: 'Retail',
        challenges: ['Inventory management', 'Customer experience', 'Supply chain visibility'],
        solutions: ['Smart inventory systems', 'Connected retail experiences', 'End-to-end supply tracking'],
        futureOutlook: 'Fully connected retail environments that personalize shopping experiences and optimize operations in real-time'
      }
    ]
  }
};

export const serviceNamesToIds = {
// Active
  'Business Intelligence & Digital Transformation': 'bi-digital-transformation',
  'Core Data and Cloud Services': 'core-data-cloud',
  'Business Consulting': 'business-consulting',
  'Market Research': 'market-research',
  
  // Pilot
  'Consumer Voice Services': 'consumer-voice',
  'Employee Solutions': 'employee-solutions',
  
  // Under Development
  'Digital Twin Consulting': 'digital-twin',
  'AI Automation': 'ai-automation',
  
  // Upcoming
  'Cybersecurity': 'cybersecurity',
  'Software Development': 'software-development',
  'IoT Solutions': 'iot-solutions',
  'Training and Development': 'training',
  'Bookkeeping and Taxation': 'bookkeeping'
};