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

// Helper function to create optimized Cloudinary URLs
const optimizedImage = (imageId: string) => 
  `https://res.cloudinary.com/dsf4d41i8/image/upload/f_auto,q_auto,w_auto,dpr_auto,c_scale/${imageId}`;

export const servicesDropdown: DropdownItem[] = [
  // Active Services (Fully launched and available)
  {
    title: 'Cloud & Data Engineering',
    path: '/service-detail/core-data-cloud',
    description: 'Comprehensive data management and cloud solutions for modern enterprises.',
    description2: "End-to-end data management, migration, cleansing, ETL pipelines, and scalable cloud infrastructure for secure and efficient operations.",
    icon: Cloud,
    stage: 'active',
    image: optimizedImage("v1753058193/cloud1_flgxbn.jpg"),
    homepageContent: "Enterprise data management & cloud infrastructure solutions for scalable growth.",
    servicePageContent: "Comprehensive data management and cloud migration services that transform your data into a strategic asset. We handle data warehousing, ETL pipelines, and cloud infrastructure setup.",
    detailPageContent: "Transform your raw data into a powerful strategic asset with our comprehensive data management and cloud infrastructure solutions. We provide end-to-end services from data migration and cleansing to scalable cloud deployment, ensuring your data ecosystem drives business intelligence and operational efficiency."
  },

  {
    title: 'Business Intelligence',
    path: '/service-detail/business-intelligence',
    description: 'Transforming raw data into actionable intelligence, BI dashboards, apps, and digital strategies.',
    description2: "Transforming raw data into actionable intelligence, Power BI dashboards, KPI tools, data modeling, and real-time analytics that empower better business decisions through actionable insights.",
    icon: BarChart3,
    stage: 'active',
    image: optimizedImage("v1753058194/bi1_resvzt.png"),
    homepageContent: "Actionable insights and BI dashboards for data-driven decision making.",
    servicePageContent: "Transform raw data into strategic insights with custom BI dashboards, KPI tracking, and data visualization tools that empower smarter business decisions.",
    detailPageContent: "Unlock the full potential of your business data with our comprehensive Business Intelligence solutions. We specialize in creating intuitive dashboards, real-time analytics, and data visualization tools that transform complex information into clear, actionable insights for strategic decision-making."
  },

  {
    title: 'Digital Transformation',
    path: '/service-detail/digital-transformation',
    description: 'Reimagine your business in the digital age with our transformation services and custom software solutions.',
    description2: "Reimagine your business in the digital age with our transformation services and custom software solutions. From modern websites to integrated CRM/ERP systems, we help digitize your business journey for improved efficiency and growth.",
    icon: Code,
    stage: 'active',
    image: optimizedImage("v1753058194/digital5_sq9kim.jpg"),
    homepageContent: "Modernize operations with end-to-end digital transformation strategies.",
    servicePageContent: "Guide your business through complete digital evolution with custom software solutions, process automation, and technology integration services.",
    detailPageContent: "Navigate the digital landscape with confidence through our comprehensive Digital Transformation services. We help businesses modernize operations, implement custom software solutions, and integrate new technologies to drive efficiency, innovation, and sustainable growth in today's competitive market."
  },

  {
    title: 'Business Consulting',
    path: '/service-detail/business-consulting',
    description: 'Strategic business advice and planning',
    icon: Building2,
    stage: 'active',
    image: optimizedImage("v1753058238/business1_har4mw.jpg"),
    homepageContent: "Strategic guidance and growth planning for business optimization.",
    servicePageContent: "Expert business consulting services that provide strategic guidance, operational improvements, and growth planning to optimize your business performance.",
    detailPageContent: "Navigate complex business challenges with our expert Business Consulting services. We provide strategic guidance, operational optimization, and growth planning to help your organization achieve its full potential in today's dynamic market environment."
  },

  {
    title: 'Market Research and Trends',
    path: '/service-detail/market-research',
    description: 'Informed decisions through competitor analysis and market insights.',
    icon: Search,
    stage: 'active',
    image: optimizedImage("v1753058237/ai2_xzyvd1.jpg"),
    homepageContent: "Data-driven market insights and competitive intelligence analysis.",
    servicePageContent: "Gain competitive advantage with comprehensive market research, trend analysis, and consumer behavior insights that inform strategic decisions.",
    detailPageContent: "Stay ahead of market trends with our in-depth Market Research and Analysis services. We provide comprehensive competitor intelligence, consumer behavior insights, and trend forecasting to inform your strategic decisions and identify new growth opportunities."
  },

  {
    title: 'Consumer Voice Services',
    path: '/service-detail/consumer-voice',
    description: 'Customer feedback and sentiment analysis to understand and improve customer experience',
    icon: MessageSquare,
    stage: 'active',
    image: optimizedImage("v1753058238/business3_ptwbct.jpg"),
    homepageContent: "Customer feedback analysis and sentiment tracking for experience optimization.",
    servicePageContent: "Understand and improve customer experience through comprehensive feedback analysis, sentiment tracking, and voice of customer programs.",
    detailPageContent: "Transform customer feedback into actionable improvements with our Consumer Voice Services. We specialize in sentiment analysis, feedback collection systems, and customer experience optimization to help you build stronger relationships and drive loyalty."
  },

  {
    title: 'Workforce Solutions',
    path: '/service-detail/workforce-solutions',
    description: 'Staffing, training, workforce planning, management and optimization through data-driven HR solutions',
    icon: Users,
    stage: 'active',
    pilotDetails: 'Piloting with 2 retail organizations',
    image: optimizedImage("v1753058291/stock_vyj7lb.jpg"),
    homepageContent: "Data-driven HR solutions for workforce optimization and talent management.",
    servicePageContent: "Optimize your workforce with data-driven HR solutions including talent management, workforce planning, and performance optimization strategies.",
    detailPageContent: "Build and optimize your workforce with our comprehensive Workforce Solutions. We provide data-driven HR strategies, talent management systems, and workforce planning services to help you attract, develop, and retain top talent while maximizing operational efficiency."
  },

  // Pilot Services (developed and in testing with clients)
  {
    title: 'AI & Machine Learning',
    path: '/service-detail/aI-&-machine-Learning',
    description: 'Intelligent solutions for business problems',
    icon: BrainCircuit,
    stage: 'pilot',
    image: optimizedImage("v1753058289/help_uubtjx.jpg"),
    homepageContent: "Intelligent AI/ML solutions for automation and predictive analytics.",
    servicePageContent: "Implement cutting-edge AI and Machine Learning solutions for process automation, predictive analytics, and intelligent decision-making systems.",
    detailPageContent: "Harness the power of artificial intelligence with our advanced AI and Machine Learning services. We develop intelligent solutions for process automation, predictive analytics, and data-driven decision-making that transform how your business operates and competes."
  },

  {
    title: 'DevOps & Cloud Automation',
    path: '/service-detail/devops',
    description: 'Seamless CI/CD pipelines and infrastructure automation for tech agility.',
    icon: Lock,
    stage: 'pilot',
    image: optimizedImage("v1753058289/dev1_pda1jf.jpg"),
    homepageContent: "CI/CD automation and cloud infrastructure optimization for development agility.",
    servicePageContent: "Accelerate development cycles with DevOps automation, CI/CD pipelines, and cloud infrastructure optimization services for faster deployment.",
    detailPageContent: "Streamline your development and deployment processes with our DevOps and Cloud Automation services. We implement robust CI/CD pipelines, infrastructure as code, and automation frameworks that accelerate delivery cycles and enhance operational reliability."
  },

  // Under Development (In development, not yet released)
  {
    title: 'AI Automation',
    path: '/service-detail/ai-automation',
    description: 'Advanced AI automation services to streamline business processes',
    icon: BotIcon,
    stage: 'development',
    developmentPhase: 'Prototype phase',
    estimatedLaunch: 'Q4 2025',
    image: optimizedImage("v1753058629/ai3_mvzwgu.jpg"),
    homepageContent: "Advanced AI-driven automation for business process optimization.",
    servicePageContent: "Revolutionize operations with AI-powered automation solutions that streamline workflows, reduce manual tasks, and enhance productivity.",
    detailPageContent: "Transform your business operations with our cutting-edge AI Automation services. We develop intelligent automation solutions that streamline workflows, reduce manual intervention, and enhance productivity through advanced artificial intelligence technologies."
  },

  // Upcoming Services (Planned future offerings)
  {
    title: 'Cybersecurity',
    path: '/service-detail/cybersecurity',
    description: 'Protect your business from digital threats',
    icon: Lock,
    stage: 'upcoming',
    releaseDate: 'Q2 2026',
    image: optimizedImage("v1753058324/cyber3_nq6sfk.jpg"),
    homepageContent: "Comprehensive cybersecurity solutions for digital threat protection.",
    servicePageContent: "Secure your digital assets with enterprise-grade cybersecurity solutions including threat detection, risk assessment, and security frameworks.",
    detailPageContent: "Protect your digital ecosystem with our comprehensive Cybersecurity services. We provide enterprise-grade security solutions, threat detection systems, and risk management frameworks to safeguard your business from evolving digital threats and ensure regulatory compliance."
  },

  {
    title: 'IoT Solutions',
    path: '/service-detail/iot-solutions',
    description: 'Connected device ecosystems',
    icon: Zap,
    stage: 'upcoming',
    releaseDate: 'Q3 2026',
    image: optimizedImage("v1753059296/iot_emcuvk.jpg"),
    homepageContent: "Connected IoT ecosystems and smart device integration solutions.",
    servicePageContent: "Build and manage connected device ecosystems with IoT solutions for data collection, device management, and smart system integration.",
    detailPageContent: "Connect and optimize your physical assets with our comprehensive IoT Solutions. We design and implement connected device ecosystems that enable real-time data collection, remote management, and intelligent automation across your operations."
  },

  {
    title: 'Bookkeeping and Taxation',
    path: '/service-detail/bookkeeping',
    description: 'Financial management services for accurate accounting',
    icon: Calculator,
    stage: 'upcoming',
    releaseDate: 'Q4 2026',
    image: optimizedImage("v1753058324/business2_tjqeqr.jpg"),
    homepageContent: "Accurate financial management and tax compliance services.",
    servicePageContent: "Ensure financial accuracy and compliance with professional bookkeeping, accounting, and taxation services for businesses of all sizes.",
    detailPageContent: "Maintain financial integrity and compliance with our professional Bookkeeping and Taxation services. We provide accurate accounting, financial reporting, and tax preparation services to help your business manage finances efficiently while meeting all regulatory requirements."
  }
];

export const industriesDropdown: DropdownItem[] = [
  {
    title: 'IT & Cloud Services',
    path: '/industries/it-cloud',
    description: 'Digital infrastructure and cloud services',
    icon: Cloud,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Financial Services',
    path: '/industries/finance',
    description: 'Solutions for banking and finance',
    icon: LineChart,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Healthcare',
    path: '/industries/healthcare',
    description: 'Digital healthcare transformation',
    icon: HeartPulse,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Education',
    path: '/industries/education',
    description: 'Edtech and learning platforms',
    icon: BookOpen,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Manufacturing',
    path: '/industries/manufacturing',
    description: 'Smart factory and industry 4.0',
    icon: Wrench,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Retail & E-Commerce',
    path: '/industries/retail',
    description: 'Online shopping and retail systems',
    icon: ShoppingBag,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Restaurants & Hospitality',
    path: '/industries/restaurants',
    description: 'Food service and customer experience',
    icon: Utensils,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Real Estate',
    path: '/industries/real-estate',
    description: 'Property management solutions',
    icon: Home,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Transport & Logistics',
    path: '/industries/transport',
    description: 'Supply chain and logistics solutions',
    icon: Truck,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Agriculture',
    path: '/industries/agriculture',
    description: 'Smart farming and agricultural tech',
    icon: LandPlot,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Professional Services',
    path: '/industries/legal',
    description: 'Legal, consulting and business services',
    icon: BookUser,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Marketing & Creative',
    path: '/industries/marketing',
    description: 'Brand building and creative tools',
    icon: PencilRuler,
    servicePageContent: '',
    detailPageContent: ''
  },
  {
    title: 'Startups & Growth',
    path: '/industries/startups',
    description: 'Scaling and growth solutions',
    icon: TrendingUp,
    servicePageContent: '',
    detailPageContent: ''
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
  'workforce-solutions': ['manufacturing', 'healthcare', 'it-cloud'],

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
  'Workforce Solutions': 'workforce-solutions',

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
