
import { 
  Database, 
  BarChart, 
  BrainCircuit, 
  Search, 
  MessageSquare,
  Users,
  GraduationCap,
  Sparkles,
  Shield, 
  LineChart, 
  Server,
  LucideIcon
} from "lucide-react";

export interface MediaContent {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface IndustrySpecificInfo {
  challenges: string[];
  benefits: string[];
  useCases: string[];
  media: MediaContent;
}

export interface ServiceData {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  recentProjects: {
    title: string;
    description: string;
    status: "completed" | "ongoing" | "upcoming";
    client?: string;
    date?: string;
    image?: string;
  }[];
  industrySpecific: {
    [key: string]: IndustrySpecificInfo;
  };
}

const services: ServiceData[] = [
  // Core Data and Cloud Services
  {
    id: "data-integration",
    icon: Database,
    title: "Data Integration",
    description: "Unify disparate data sources into a centralized platform. Our ETL processes ensure data consistency and quality while maintaining real-time synchronization.",
    features: ["Multi-source connectors", "Real-time ETL pipelines", "Data quality validation", "Automated sync scheduling"],
    recentProjects: [
      {
        title: "Healthcare Data Unification",
        description: "Integrated patient data across 12 different systems to create a unified view for a major hospital network.",
        status: "completed",
        client: "Regional Healthcare Network",
        date: "2023",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        title: "Financial Services Data Lake",
        description: "Building a comprehensive data lake solution for a multinational financial services company.",
        status: "ongoing",
        client: "Global Financial Corp",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      },
      {
        title: "Retail Omnichannel Integration",
        description: "Upcoming project to unify online and offline retail data for personalized customer experiences.",
        status: "upcoming",
        client: "National Retail Chain",
        date: "Q3 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Fragmented patient data across multiple systems",
          "Compliance with HIPAA and other regulations", 
          "Real-time access to critical patient information",
          "Integration of legacy systems with modern platforms"
        ],
        benefits: [
          "Complete patient records across departments",
          "Improved diagnostic accuracy and speed",
          "Enhanced regulatory compliance and reporting",
          "Reduced administrative burden and costs"
        ],
        useCases: [
          "Patient 360° view across all medical touchpoints",
          "Real-time clinical decision support systems",
          "Automated insurance eligibility verification",
          "Predictive analytics for hospital resource allocation"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          alt: "Healthcare professionals reviewing integrated data"
        }
      },
      finance: {
        challenges: [
          "Siloed data across trading, risk, and compliance systems",
          "Real-time transaction monitoring requirements",
          "Complex regulatory reporting frameworks",
          "Legacy system integration with modern platforms"
        ],
        benefits: [
          "Unified customer and transaction data",
          "Real-time fraud detection capabilities",
          "Automated regulatory reporting",
          "Faster time-to-market for new products"
        ],
        useCases: [
          "Customer 360° view across all financial products",
          "Real-time transaction monitoring and fraud detection",
          "Automated compliance reporting for regulations",
          "Investment portfolio optimization and risk assessment"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
          alt: "Financial data visualization dashboard"
        }
      },
      retail: {
        challenges: [
          "Disconnected online and offline customer journeys",
          "Product inventory synchronization across channels",
          "Personalization at scale across touchpoints",
          "Supply chain visibility and optimization"
        ],
        benefits: [
          "Unified view of customer interactions",
          "Real-time inventory management",
          "Personalized customer experiences",
          "Optimized supply chain operations"
        ],
        useCases: [
          "Omnichannel customer experience platform",
          "Real-time inventory management across locations",
          "Personalized recommendation engines",
          "Supply chain optimization and forecasting"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
          alt: "Retail analytics dashboard showing integrated data"
        }
      },
      manufacturing: {
        challenges: [
          "Disconnected operational technology (OT) and IT systems",
          "Real-time production monitoring requirements",
          "Supply chain transparency and traceability",
          "Predictive maintenance data integration"
        ],
        benefits: [
          "End-to-end visibility across production processes",
          "Improved operational efficiency and reduced downtime",
          "Better demand forecasting and inventory optimization",
          "Enhanced quality control and reduced waste"
        ],
        useCases: [
          "IoT sensor data integration for production monitoring",
          "Digital twin integration for simulation and testing",
          "Supply chain visibility and tracking platform",
          "Predictive maintenance scheduling systems"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Manufacturing process optimization through data integration"
        }
      }
    }
  },
  {
    id: "advanced-analytics",
    icon: LineChart,
    title: "Advanced Analytics",
    description: "Transform raw data into actionable insights with our advanced analytics solutions. Visualize trends, identify patterns, and make data-driven decisions.",
    features: ["Trend analysis", "Custom dashboards", "Anomaly detection", "Automated reporting"],
    recentProjects: [
      {
        title: "Healthcare Outcomes Analytics",
        description: "Developed predictive models for patient outcomes, reducing readmission rates by 23%.",
        status: "completed",
        client: "University Medical Center",
        date: "2023",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        title: "Financial Risk Analytics Platform",
        description: "Building a comprehensive risk analytics platform with real-time monitoring capabilities.",
        status: "ongoing",
        client: "Investment Banking Group",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
      },
      {
        title: "Retail Customer Behavior Analysis",
        description: "Planned project to analyze and predict customer behavior across multiple retail channels.",
        status: "upcoming",
        client: "Fashion Retail Chain",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Converting massive clinical data into actionable insights",
          "Understanding patient outcomes across populations",
          "Identifying early warning signals for patient deterioration",
          "Cost-effective resource allocation"
        ],
        benefits: [
          "Improved clinical outcomes through data-driven decisions",
          "Reduced readmission rates through predictive models",
          "Optimized staff and resource allocation",
          "Enhanced population health management"
        ],
        useCases: [
          "Clinical outcome prediction models",
          "Population health trend analysis",
          "Hospital resource optimization dashboards",
          "Pandemic spread prediction and response planning"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          alt: "Healthcare analytics dashboard"
        }
      },
      finance: {
        challenges: ["Complex risk assessment", "Fraud detection at scale", "Market trend prediction", "Regulatory compliance monitoring"],
        benefits: ["Enhanced risk management", "Early fraud detection", "Improved investment strategies", "Automated compliance reporting"],
        useCases: ["Credit risk scoring", "Real-time fraud detection", "Market sentiment analysis", "Regulatory compliance monitoring"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
          alt: "Financial analytics dashboard"
        }
      },
      retail: {
        challenges: ["Customer behavior prediction", "Inventory optimization", "Price optimization", "Campaign effectiveness measurement"],
        benefits: ["Increased customer loyalty", "Reduced inventory costs", "Optimized pricing strategies", "Higher marketing ROI"],
        useCases: ["Customer segmentation", "Demand forecasting", "Dynamic pricing models", "Marketing campaign optimization"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          alt: "Retail analytics dashboard"
        }
      },
      manufacturing: {
        challenges: ["Quality control at scale", "Equipment failure prediction", "Production optimization", "Supply chain visibility"],
        benefits: ["Reduced defect rates", "Minimized downtime", "Increased production efficiency", "Optimized supply chain"],
        useCases: ["Predictive maintenance", "Quality assurance analytics", "Production line optimization", "Supply chain analytics"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          alt: "Manufacturing analytics dashboard"
        }
      }
    }
  },
  {
    id: "cloud-infrastructure",
    icon: Server,
    title: "Cloud Infrastructure",
    description: "Build on a scalable, reliable foundation with our cloud infrastructure services. Optimize performance and reduce costs while maintaining flexibility.",
    features: ["Scalable architecture", "Performance optimization", "Cost management", "Disaster recovery"],
    recentProjects: [
      {
        title: "Healthcare Cloud Migration",
        description: "Successfully migrated a healthcare system's infrastructure to a HIPAA-compliant cloud environment.",
        status: "completed",
        client: "Regional Medical Center",
        date: "2023",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        title: "Financial Services Hybrid Cloud",
        description: "Implementing a hybrid cloud solution for a financial services organization.",
        status: "ongoing",
        client: "National Banking Group",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      },
      {
        title: "Retail E-Commerce Cloud Scaling",
        description: "Planning a cloud infrastructure upgrade to handle seasonal traffic spikes for a major retailer.",
        status: "upcoming",
        client: "E-Commerce Retail Chain",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: ["Scaling for growing patient data", "High availability requirements", "Compliance in the cloud", "Legacy system integration"],
        benefits: ["Scalable infrastructure for growing needs", "Improved system availability", "Cost-effective storage solutions", "Enhanced disaster recovery"],
        useCases: ["HIPAA-compliant cloud hosting", "Medical imaging storage solutions", "Elastic compute for research workloads", "Disaster recovery for critical systems"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
          alt: "Healthcare cloud infrastructure"
        }
      },
      finance: {
        challenges: ["High-performance trading platforms", "Regulatory compliance", "Disaster recovery requirements", "Cost optimization"],
        benefits: ["Ultra-low latency infrastructure", "Regulatory-compliant cloud", "Robust disaster recovery", "Optimized operational costs"],
        useCases: ["High-frequency trading platforms", "Regulatory-compliant data lakes", "Global financial service delivery", "Hybrid cloud deployments"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
          alt: "Financial cloud infrastructure"
        }
      },
      retail: {
        challenges: ["Seasonal scaling demands", "Global availability", "E-commerce performance", "Omnichannel integration"],
        benefits: ["Elastic scaling for demand spikes", "Global service delivery", "High-performance customer experiences", "Integrated omnichannel systems"],
        useCases: ["Elastic e-commerce platforms", "Global content delivery networks", "Microservices for retail applications", "Hybrid cloud for retail systems"],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail cloud infrastructure"
        }
      },
      manufacturing: {
        challenges: ["IoT data processing at scale", "Edge computing needs", "Global manufacturing systems", "Cost-effective storage"],
        benefits: ["Scalable IoT data processing", "Optimized edge-to-cloud architecture", "Global system integration", "Cost-effective data management"],
        useCases: ["IoT data processing platforms", "Edge computing for factory floors", "Global manufacturing execution systems", "Digital twin hosting"],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          alt: "Manufacturing cloud infrastructure"
        }
      }
    }
  },
  
  // BI and Digital Transformation category
  {
    id: "data-analytics-bi",
    icon: BarChart,
    title: "Data Analytics & BI Solutions",
    description: "Transform your raw data into actionable business insights with our comprehensive analytics and BI solutions tailored to your specific industry needs.",
    features: ["Interactive dashboards", "Real-time analytics", "Predictive modeling", "Custom KPI tracking"],
    recentProjects: [
      {
        title: "Retail Sales Performance Dashboard",
        description: "Created an end-to-end BI solution for a national retailer, increasing sales visibility and enabling data-driven decisions.",
        status: "completed",
        client: "National Retail Chain",
        date: "2023",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
      },
      {
        title: "Healthcare Operational Analytics",
        description: "Developing comprehensive analytics platform to optimize hospital operations and resource allocation.",
        status: "ongoing",
        client: "Regional Hospital Network",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        title: "Financial Services Risk Dashboard",
        description: "Planning a real-time risk assessment dashboard for investment portfolio management.",
        status: "upcoming",
        client: "Investment Management Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Fragmented patient and operational data",
          "Complex compliance and reporting requirements",
          "Resource allocation optimization",
          "Clinical outcome improvement"
        ],
        benefits: [
          "Comprehensive patient and operational visibility",
          "Automated regulatory reporting",
          "Optimized staffing and resource allocation",
          "Improved clinical outcomes through data-driven decisions"
        ],
        useCases: [
          "Clinical performance dashboards",
          "Patient flow optimization",
          "Resource utilization tracking",
          "Quality metrics reporting"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
          alt: "Healthcare analytics dashboard"
        }
      },
      finance: {
        challenges: [
          "Complex data from multiple financial systems",
          "Real-time risk assessment needs",
          "Regulatory reporting requirements",
          "Customer behavior analysis"
        ],
        benefits: [
          "Integrated financial data visibility",
          "Improved risk management",
          "Automated compliance reporting",
          "Enhanced customer insights"
        ],
        useCases: [
          "Risk assessment dashboards",
          "Portfolio performance tracking",
          "Customer segmentation and analysis",
          "Fraud detection analytics"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          alt: "Financial analytics dashboard"
        }
      },
      retail: {
        challenges: [
          "Multi-channel sales data integration",
          "Inventory optimization",
          "Customer behavior analysis",
          "Promotional effectiveness measurement"
        ],
        benefits: [
          "Unified sales and customer insights",
          "Optimized inventory levels",
          "Enhanced customer targeting",
          "Improved promotional ROI"
        ],
        useCases: [
          "Sales performance dashboards",
          "Inventory optimization analytics",
          "Customer segmentation and analysis",
          "Promotional campaign tracking"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
          alt: "Retail analytics dashboard"
        }
      },
      manufacturing: {
        challenges: [
          "Production efficiency tracking",
          "Quality control analysis",
          "Supply chain visibility",
          "Equipment performance monitoring"
        ],
        benefits: [
          "Improved production efficiency",
          "Enhanced quality control",
          "Optimized supply chain",
          "Reduced equipment downtime"
        ],
        useCases: [
          "Production performance dashboards",
          "Quality metrics tracking",
          "Supply chain analytics",
          "Equipment maintenance analytics"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
          alt: "Manufacturing analytics dashboard"
        }
      }
    }
  },
  {
    id: "website-mobile-development",
    icon: LineChart,
    title: "Website & Mobile App Development",
    description: "Create powerful digital experiences with our custom website and mobile application development services, built with modern technologies and user-centric design.",
    features: ["Responsive designs", "Custom CMS solutions", "E-commerce integration", "Progressive web apps"],
    recentProjects: [
      {
        title: "Healthcare Patient Portal",
        description: "Developed a comprehensive patient portal with secure access to medical records and appointment scheduling.",
        status: "completed",
        client: "Regional Medical Group",
        date: "2023",
        image: "https://images.unsplash.com/photo-1586880244406-556ebe35f282"
      },
      {
        title: "Retail Mobile Shopping App",
        description: "Building a native mobile shopping application with AR product visualization and seamless checkout.",
        status: "ongoing",
        client: "Fashion Retailer",
        image: "https://images.unsplash.com/photo-1551972251-12070d63502a"
      },
      {
        title: "Financial Services Dashboard",
        description: "Planning a comprehensive financial management dashboard with real-time data integration.",
        status: "upcoming",
        client: "Wealth Management Firm",
        date: "Q3 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Patient data security compliance",
          "Seamless system integration",
          "User-friendly patient interfaces",
          "Cross-platform compatibility"
        ],
        benefits: [
          "Enhanced patient engagement",
          "Streamlined administrative processes",
          "Improved appointment adherence",
          "Secure medical information access"
        ],
        useCases: [
          "Patient portals and telehealth platforms",
          "Provider communication systems",
          "Medical record access applications",
          "Appointment scheduling systems"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1586880244406-556ebe35f282",
          alt: "Healthcare mobile application"
        }
      },
      finance: {
        challenges: [
          "Secure transaction processing",
          "Regulatory compliance",
          "Real-time data integration",
          "Intuitive interfaces for complex products"
        ],
        benefits: [
          "Increased customer engagement",
          "Reduced operational costs",
          "Enhanced service delivery",
          "Improved customer retention"
        ],
        useCases: [
          "Mobile banking applications",
          "Investment portfolio dashboards",
          "Financial planning tools",
          "Secure payment gateways"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1563986768609-322da13575f3",
          alt: "Financial mobile application"
        }
      },
      retail: {
        challenges: [
          "Seamless shopping experience",
          "Inventory integration",
          "Personalization at scale",
          "Mobile payment security"
        ],
        benefits: [
          "Increased conversion rates",
          "Higher average order value",
          "Improved customer loyalty",
          "Enhanced brand experience"
        ],
        useCases: [
          "E-commerce platforms",
          "Loyalty program applications",
          "AR shopping experiences",
          "Omnichannel retail solutions"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail mobile application"
        }
      },
      manufacturing: {
        challenges: [
          "Complex workflow digitization",
          "Integration with ERP systems",
          "Field service management",
          "Supply chain visibility"
        ],
        benefits: [
          "Streamlined operations",
          "Improved field service efficiency",
          "Enhanced supply chain visibility",
          "Better customer service capabilities"
        ],
        useCases: [
          "Inventory management systems",
          "Field service applications",
          "Supply chain tracking tools",
          "Quality control applications"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1551972251-12070d63502a",
          alt: "Manufacturing mobile application"
        }
      }
    }
  },
  {
    id: "digital-marketing",
    icon: LineChart,
    title: "Digital Marketing",
    description: "Drive business growth with our comprehensive digital marketing services, including SEO, social media, and PPC campaigns tailored to your industry and audience.",
    features: ["Search engine optimization", "Social media management", "Pay-per-click advertising", "Content marketing"],
    recentProjects: [
      {
        title: "Healthcare Provider SEO Campaign",
        description: "Increased organic traffic by 156% for a regional healthcare provider through targeted SEO strategies.",
        status: "completed",
        client: "Medical Services Group",
        date: "2023",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07"
      },
      {
        title: "Retail Social Media Campaign",
        description: "Implementing a comprehensive social media strategy for a national retail chain.",
        status: "ongoing",
        client: "Fashion Retailer",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf"
      },
      {
        title: "Financial Services Lead Generation",
        description: "Planning a targeted PPC campaign to generate qualified leads for wealth management services.",
        status: "upcoming",
        client: "Investment Services Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Strict content regulations",
          "Patient privacy concerns",
          "Complex service offerings",
          "Local competition visibility"
        ],
        benefits: [
          "Increased patient acquisition",
          "Improved brand reputation",
          "Enhanced local visibility",
          "Better patient education"
        ],
        useCases: [
          "Provider local SEO",
          "Patient education content marketing",
          "Service-specific PPC campaigns",
          "Reputation management"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07",
          alt: "Healthcare digital marketing"
        }
      },
      finance: {
        challenges: [
          "Regulatory compliance in marketing",
          "Building trust in digital channels",
          "Complex product education",
          "High-value conversion optimization"
        ],
        benefits: [
          "Qualified lead generation",
          "Improved trust and credibility",
          "Higher conversion rates",
          "Stronger brand positioning"
        ],
        useCases: [
          "Financial education content marketing",
          "High-value service PPC campaigns",
          "Thought leadership development",
          "Trust-building social strategies"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1611926653458-09294b3142bf",
          alt: "Financial digital marketing"
        }
      },
      retail: {
        challenges: [
          "Competitive market positioning",
          "Shopping campaign optimization",
          "Omnichannel messaging consistency",
          "Social commerce integration"
        ],
        benefits: [
          "Increased traffic and sales",
          "Improved brand awareness",
          "Higher customer engagement",
          "Better ROI on ad spend"
        ],
        useCases: [
          "Shopping campaigns and product ads",
          "Social commerce strategies",
          "Influencer marketing campaigns",
          "Loyalty program promotion"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e",
          alt: "Retail digital marketing"
        }
      },
      manufacturing: {
        challenges: [
          "Complex B2B buying cycles",
          "Technical content creation",
          "Lead qualification",
          "Industry-specific targeting"
        ],
        benefits: [
          "Quality lead generation",
          "Shortened sales cycles",
          "Improved industry positioning",
          "Stronger channel partnerships"
        ],
        useCases: [
          "B2B lead generation campaigns",
          "Technical content marketing",
          "Industry conference digital promotion",
          "Channel partner co-marketing"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1533750516457-a7f992034fec",
          alt: "Manufacturing digital marketing"
        }
      }
    }
  },
  
  // Business Consulting category
  {
    id: "strategic-planning",
    icon: BrainCircuit,
    title: "Strategic Planning for Business Growth",
    description: "Develop comprehensive growth strategies tailored to your business goals, market position, and competitive landscape. Our approach combines industry expertise with data-driven insights.",
    features: ["Market opportunity analysis", "Competitive positioning", "Growth roadmap development", "Implementation planning"],
    recentProjects: [
      {
        title: "Healthcare Provider Expansion Strategy",
        description: "Developed a 5-year growth plan for a regional healthcare provider, resulting in successful market expansion.",
        status: "completed",
        client: "Regional Medical Group",
        date: "2023",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978"
      },
      {
        title: "Retail Digital Transformation Strategy",
        description: "Creating a comprehensive digital transformation roadmap for a traditional retailer.",
        status: "ongoing",
        client: "National Retail Chain",
        image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
      },
      {
        title: "Financial Services Market Expansion",
        description: "Planning a strategic market entry for a wealth management firm into new geographic regions.",
        status: "upcoming",
        client: "Investment Management Company",
        date: "Q3 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Regulatory constraints on growth",
          "Complex stakeholder alignment",
          "Capital-intensive expansion",
          "Technology integration planning"
        ],
        benefits: [
          "Clear expansion roadmap",
          "Improved market positioning",
          "Optimized resource allocation",
          "Better stakeholder alignment"
        ],
        useCases: [
          "Practice expansion planning",
          "Service line development",
          "Merger and acquisition strategy",
          "Technology implementation roadmaps"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          alt: "Healthcare strategic planning"
        }
      },
      finance: {
        challenges: [
          "Regulatory compliance planning",
          "Fintech disruption response",
          "Customer acquisition strategies",
          "Digital transformation roadmaps"
        ],
        benefits: [
          "Clear competitive positioning",
          "Innovation integration pathway",
          "Improved market differentiation",
          "Optimized growth investments"
        ],
        useCases: [
          "Digital banking transformation",
          "Wealth management growth strategies",
          "Fintech partnership roadmaps",
          "Branch network optimization"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f",
          alt: "Financial strategic planning"
        }
      },
      retail: {
        challenges: [
          "Omnichannel integration planning",
          "E-commerce competitive pressures",
          "Store network optimization",
          "Supply chain restructuring"
        ],
        benefits: [
          "Clear digital transformation roadmap",
          "Optimized channel strategy",
          "Improved customer experience planning",
          "Better investment prioritization"
        ],
        useCases: [
          "Omnichannel retail strategy",
          "Store network optimization",
          "E-commerce growth planning",
          "Brand positioning and differentiation"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail strategic planning"
        }
      },
      manufacturing: {
        challenges: [
          "Supply chain resilience planning",
          "Digital factory transformation",
          "Global market entry strategy",
          "Product portfolio optimization"
        ],
        benefits: [
          "Clear modernization roadmap",
          "Improved operational efficiency",
          "Better market positioning",
          "Optimized investment planning"
        ],
        useCases: [
          "Industry 4.0 transformation planning",
          "Supply chain resilience strategy",
          "Product portfolio optimization",
          "Market expansion roadmaps"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34",
          alt: "Manufacturing strategic planning"
        }
      }
    }
  },
  {
    id: "operational-efficiency",
    icon: BrainCircuit,
    title: "Operational Efficiency Optimization",
    description: "Streamline your business operations, reduce costs, and improve productivity with our comprehensive efficiency optimization services tailored to your industry needs.",
    features: ["Process reengineering", "Workflow automation", "Cost reduction strategies", "Performance metrics development"],
    recentProjects: [
      {
        title: "Healthcare Provider Workflow Optimization",
        description: "Redesigned clinical workflows resulting in 34% increase in patient throughput and improved satisfaction scores.",
        status: "completed",
        client: "Regional Hospital System",
        date: "2023",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
      },
      {
        title: "Retail Supply Chain Optimization",
        description: "Implementing comprehensive supply chain redesign to reduce costs and improve inventory turns.",
        status: "ongoing",
        client: "National Retailer",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c"
      },
      {
        title: "Manufacturing Process Improvement",
        description: "Planning a factory-wide operational excellence program with lean manufacturing principles.",
        status: "upcoming",
        client: "Industrial Manufacturer",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Clinical workflow inefficiencies",
          "Administrative overhead",
          "Resource allocation optimization",
          "Regulatory compliance burden"
        ],
        benefits: [
          "Improved patient throughput",
          "Reduced administrative costs",
          "Enhanced staff utilization",
          "Better patient experience"
        ],
        useCases: [
          "Clinical workflow optimization",
          "Patient flow improvement",
          "Administrative process automation",
          "Resource scheduling optimization"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
          alt: "Healthcare operational efficiency"
        }
      },
      finance: {
        challenges: [
          "Complex approval workflows",
          "Manual compliance processes",
          "Fragmented customer journeys",
          "Legacy system inefficiencies"
        ],
        benefits: [
          "Accelerated processing times",
          "Reduced operational costs",
          "Improved customer experience",
          "Enhanced compliance efficiency"
        ],
        useCases: [
          "Loan processing optimization",
          "Compliance workflow automation",
          "Customer onboarding streamlining",
          "Back-office process reengineering"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1589666564459-93cdd3ab856c",
          alt: "Financial operational efficiency"
        }
      },
      retail: {
        challenges: [
          "Inventory management inefficiencies",
          "Store operations variability",
          "Supply chain complexity",
          "Omnichannel fulfillment costs"
        ],
        benefits: [
          "Reduced inventory carrying costs",
          "Improved store productivity",
          "Optimized fulfillment costs",
          "Enhanced customer experience"
        ],
        useCases: [
          "Inventory optimization",
          "Store operations standardization",
          "Fulfillment process redesign",
          "Return process streamlining"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1553413077-190dd305871c",
          alt: "Retail operational efficiency"
        }
      },
      manufacturing: {
        challenges: [
          "Production line inefficiencies",
          "Quality control process gaps",
          "Excess inventory buffers",
          "Manual data collection"
        ],
        benefits: [
          "Increased production throughput",
          "Reduced quality issues",
          "Lower inventory costs",
          "Improved visibility and control"
        ],
        useCases: [
          "Lean manufacturing implementation",
          "Production line balancing",
          "Quality process optimization",
          "Inventory reduction programs"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122",
          alt: "Manufacturing operational efficiency"
        }
      }
    }
  },
  
  // Market Research category
  {
    id: "competitor-analysis",
    icon: Search,
    title: "Competitor Analysis",
    description: "Gain deep insights into your competition with our comprehensive analysis services. We identify market positioning, strategies, strengths, and weaknesses to help you gain competitive advantage.",
    features: ["Competitive positioning maps", "SWOT analysis", "Digital presence evaluation", "Product/service comparison"],
    recentProjects: [
      {
        title: "Healthcare Market Competitive Analysis",
        description: "Conducted comprehensive analysis of regional healthcare providers to identify market opportunities and threats.",
        status: "completed",
        client: "Healthcare System",
        date: "2023",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
      },
      {
        title: "Retail E-commerce Competitor Benchmarking",
        description: "Developing detailed competitive analysis of online retailers to identify differentiation opportunities.",
        status: "ongoing",
        client: "Fashion E-commerce Brand",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312"
      },
      {
        title: "Financial Services Competitive Landscape",
        description: "Planning comprehensive analysis of wealth management competitive offerings and positioning.",
        status: "upcoming",
        client: "Investment Management Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Complex service offering comparison",
          "Provider network analysis",
          "Quality metrics benchmarking",
          "Reputation and patient experience assessment"
        ],
        benefits: [
          "Clear competitive positioning",
          "Service gap identification",
          "Improved differentiation strategy",
          "Tactical competitive response planning"
        ],
        useCases: [
          "Regional provider competitive mapping",
          "Service line competitive analysis",
          "Patient experience benchmarking",
          "Digital health competitive landscape"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
          alt: "Healthcare competitor analysis"
        }
      },
      finance: {
        challenges: [
          "Product feature comparison complexity",
          "Fee structure analysis",
          "Digital banking capabilities assessment",
          "Customer service benchmarking"
        ],
        benefits: [
          "Clear product differentiation opportunities",
          "Fee optimization strategies",
          "Digital experience enhancement roadmap",
          "Targeted competitive advantages"
        ],
        useCases: [
          "Banking product competitive analysis",
          "Wealth management offering comparison",
          "Fintech disruption assessment",
          "Customer experience benchmarking"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          alt: "Financial competitor analysis"
        }
      },
      retail: {
        challenges: [
          "Omnichannel experience comparison",
          "Pricing strategy analysis",
          "Product assortment benchmarking",
          "Customer loyalty program assessment"
        ],
        benefits: [
          "Clear price positioning strategy",
          "Optimized product assortment",
          "Enhanced customer experience",
          "Improved loyalty program design"
        ],
        useCases: [
          "E-commerce competitive analysis",
          "Price positioning assessment",
          "Loyalty program benchmarking",
          "Customer journey competitive mapping"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail competitor analysis"
        }
      },
      manufacturing: {
        challenges: [
          "Product specification comparison",
          "Production capability assessment",
          "Supply chain benchmarking",
          "Innovation pipeline analysis"
        ],
        benefits: [
          "Clear product differentiation strategy",
          "Manufacturing capacity optimization",
          "Supply chain competitive advantage",
          "R&D investment prioritization"
        ],
        useCases: [
          "Product line competitive analysis",
          "Manufacturing capability benchmarking",
          "Technology adoption comparison",
          "Industry 4.0 readiness assessment"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
          alt: "Manufacturing competitor analysis"
        }
      }
    }
  },
  
  // Consumer Voice Services
  {
    id: "customer-feedback",
    icon: MessageSquare,
    title: "Customer Feedback Collection and Analysis",
    description: "Capture valuable customer insights through comprehensive feedback collection and analysis, turning opinions into actionable strategies for product and service improvement.",
    features: ["Multi-channel feedback collection", "Sentiment analysis", "Trend identification", "Priority recommendation engine"],
    recentProjects: [
      {
        title: "Healthcare Patient Experience Program",
        description: "Implemented comprehensive patient feedback system resulting in 28% improvement in satisfaction scores.",
        status: "completed",
        client: "Regional Hospital Network",
        date: "2023",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
      },
      {
        title: "Retail Customer Journey Feedback",
        description: "Developing an omnichannel customer feedback program to identify experience improvement opportunities.",
        status: "ongoing",
        client: "Fashion Retailer",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
      },
      {
        title: "Financial Services Voice of Customer",
        description: "Planning implementation of comprehensive VoC program for wealth management services.",
        status: "upcoming",
        client: "Investment Services Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Patient reluctance to provide feedback",
          "Complex service experience journeys",
          "Multiple touchpoint integration",
          "Regulatory compliance in feedback process"
        ],
        benefits: [
          "Improved patient experience",
          "Reduced readmission rates",
          "Enhanced reputation and referrals",
          "Better HCAHPS scores"
        ],
        useCases: [
          "Patient satisfaction monitoring",
          "Clinical care feedback",
          "Facility and amenities assessment",
          "Staff interaction improvement"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
          alt: "Healthcare customer feedback"
        }
      },
      finance: {
        challenges: [
          "Low engagement with feedback requests",
          "Complex product experience assessment",
          "Multiple channel journey mapping",
          "Sensitive issue handling"
        ],
        benefits: [
          "Improved product design",
          "Enhanced customer retention",
          "Reduced service complaints",
          "Better digital experience"
        ],
        useCases: [
          "Banking app experience assessment",
          "Wealth management service feedback",
          "Branch experience monitoring",
          "Customer support quality assessment"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1543286386-2e659306cd6c",
          alt: "Financial customer feedback"
        }
      },
      retail: {
        challenges: [
          "Feedback collection across channels",
          "Survey fatigue management",
          "Real-time response capability",
          "Contextual feedback relevance"
        ],
        benefits: [
          "Improved product selection",
          "Enhanced shopping experience",
          "Higher customer loyalty",
          "Reduced returns and complaints"
        ],
        useCases: [
          "Post-purchase feedback",
          "In-store experience assessment",
          "Website usability testing",
          "Product quality monitoring"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d",
          alt: "Retail customer feedback"
        }
      },
      manufacturing: {
        challenges: [
          "B2B feedback complexity",
          "Product performance assessment",
          "Technical feedback interpretation",
          "Distributor vs. end-user insights"
        ],
        benefits: [
          "Improved product design",
          "Reduced warranty claims",
          "Enhanced customer specifications",
          "Better channel partner relationships"
        ],
        useCases: [
          "Product performance assessment",
          "Technical support effectiveness",
          "Distribution partner feedback",
          "Installation and service quality"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5",
          alt: "Manufacturing customer feedback"
        }
      }
    }
  },
  
  // Workforce Solutions
  {
    id: "employee-retention",
    icon: Users,
    title: "Employee Retention Strategies",
    description: "Develop comprehensive strategies to improve employee engagement, reduce turnover, and create a thriving workplace culture that attracts and retains top talent.",
    features: ["Engagement assessment", "Retention program design", "Culture development", "Manager effectiveness training"],
    recentProjects: [
      {
        title: "Healthcare Staff Retention Program",
        description: "Implemented a comprehensive retention strategy reducing nurse turnover by 34% within one year.",
        status: "completed",
        client: "Regional Hospital System",
        date: "2023",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef"
      },
      {
        title: "Retail Employee Experience Transformation",
        description: "Developing store-level employee engagement program to reduce turnover and improve customer experience.",
        status: "ongoing",
        client: "National Retail Chain",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c"
      },
      {
        title: "Financial Services Talent Retention",
        description: "Planning comprehensive strategy to retain high-performing advisors and support staff.",
        status: "upcoming",
        client: "Wealth Management Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Clinical staff burnout",
          "Competitive recruitment environment",
          "24/7 operational demands",
          "High-stress working conditions"
        ],
        benefits: [
          "Reduced turnover costs",
          "Improved patient care continuity",
          "Enhanced team collaboration",
          "Better patient satisfaction"
        ],
        useCases: [
          "Nurse retention programs",
          "Physician engagement strategies",
          "Clinical team development",
          "Support staff career pathing"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef",
          alt: "Healthcare employee retention"
        }
      },
      finance: {
        challenges: [
          "High-performer retention",
          "Competitive compensation landscape",
          "Work-life balance expectations",
          "Career path visibility"
        ],
        benefits: [
          "Improved client relationship continuity",
          "Enhanced productivity and performance",
          "Reduced replacement costs",
          "Better team knowledge retention"
        ],
        useCases: [
          "Wealth advisor retention",
          "Banking talent development",
          "Operations team engagement",
          "Leadership succession planning"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
          alt: "Financial employee retention"
        }
      },
      retail: {
        challenges: [
          "High industry turnover rates",
          "Scheduling flexibility demands",
          "Competitive wage pressure",
          "Limited advancement perception"
        ],
        benefits: [
          "Reduced training costs",
          "Improved customer experience",
          "Enhanced team productivity",
          "Better store knowledge retention"
        ],
        useCases: [
          "Store associate retention",
          "Management development programs",
          "Flexible scheduling solutions",
          "Career path development"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail employee retention"
        }
      },
      manufacturing: {
        challenges: [
          "Skilled labor shortages",
          "Physical work environment",
          "Shift work challenges",
          "Technology skills transitions"
        ],
        benefits: [
          "Preserved technical knowledge",
          "Improved production quality",
          "Enhanced safety outcomes",
          "Reduced training and recruitment costs"
        ],
        useCases: [
          "Production team retention",
          "Technical skills development",
          "Safety culture enhancement",
          "Cross-training programs"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          alt: "Manufacturing employee retention"
        }
      }
    }
  },
  
  // Training and Development
  {
    id: "leadership-training",
    icon: GraduationCap,
    title: "Leadership and Management Training",
    description: "Develop strong leaders at all levels of your organization with our comprehensive leadership training programs customized to your industry challenges and business goals.",
    features: ["Skills assessment", "Customized development plans", "Experiential learning", "Ongoing coaching support"],
    recentProjects: [
      {
        title: "Healthcare Clinical Leadership Program",
        description: "Implemented comprehensive leadership development for clinical directors, improving team performance metrics by 29%.",
        status: "completed",
        client: "Regional Healthcare System",
        date: "2023",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998"
      },
      {
        title: "Retail Store Management Academy",
        description: "Developing multi-level leadership program for store managers to enhance performance and employee engagement.",
        status: "ongoing",
        client: "National Retail Chain",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
      },
      {
        title: "Financial Services Leadership Development",
        description: "Planning comprehensive leadership pipeline program from advisor to executive levels.",
        status: "upcoming",
        client: "Wealth Management Firm",
        date: "Q2 2024"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Clinical expertise vs. leadership skills",
          "Matrix reporting relationships",
          "High-stakes decision making",
          "Regulatory compliance oversight"
        ],
        benefits: [
          "Improved team performance",
          "Enhanced patient satisfaction",
          "Reduced staff turnover",
          "More effective change management"
        ],
        useCases: [
          "Clinical director development",
          "Physician leadership training",
          "Nursing leadership programs",
          "Department manager coaching"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1531482615713-2afd69097998",
          alt: "Healthcare leadership training"
        }
      },
      finance: {
        challenges: [
          "Technical expertise vs. people leadership",
          "Remote team management",
          "Regulatory oversight responsibilities",
          "High-performance culture balance"
        ],
        benefits: [
          "Improved team productivity",
          "Enhanced client satisfaction",
          "Stronger regulatory compliance",
          "Better talent development and retention"
        ],
        useCases: [
          "Branch manager development",
          "Wealth advisor leadership",
          "Operations team leadership",
          "Executive coaching programs"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1553484771-047a44eee7b5",
          alt: "Financial leadership training"
        }
      },
      retail: {
        challenges: [
          "High-volume people management",
          "Customer conflict resolution",
          "Multi-unit supervision",
          "Cross-functional collaboration"
        ],
        benefits: [
          "Improved store performance",
          "Enhanced customer experience",
          "Reduced employee turnover",
          "Better inventory and cost management"
        ],
        useCases: [
          "Store manager development",
          "District leadership programs",
          "Department supervisor training",
          "High-potential development"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
          alt: "Retail leadership training"
        }
      },
      manufacturing: {
        challenges: [
          "Production efficiency vs. people development",
          "Safety leadership requirements",
          "Union relationship management",
          "Technical team leadership"
        ],
        benefits: [
          "Improved production performance",
          "Enhanced safety outcomes",
          "Stronger labor relations",
          "Better quality management"
        ],
        useCases: [
          "Production supervisor development",
          "Plant manager leadership",
          "Safety leadership training",
          "Technical team management"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978",
          alt: "Manufacturing leadership training"
        }
      }
    }
  },
  
  // Upcoming Services
  {
    id: "ai-automation",
    icon: Sparkles,
    title: "AI Automation and Testing",
    description: "Leverage cutting-edge artificial intelligence to automate processes, enhance testing capabilities, and drive efficiency across your business operations.",
    features: ["Process automation", "AI-driven testing", "Intelligent workflow optimization", "Predictive analytics"],
    recentProjects: [
      {
        title: "Healthcare Claims Processing Automation",
        description: "Developing intelligent automation solution to streamline claims processing and reduce errors.",
        status: "ongoing",
        client: "Regional Insurance Provider",
        image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a"
      },
      {
        title: "Retail Inventory Forecasting AI",
        description: "Creating AI-powered system for demand forecasting and inventory optimization.",
        status: "ongoing",
        client: "National Retail Chain",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
      },
      {
        title: "Financial Services Document Processing",
        description: "Planning AI-based document processing system for loan applications and verification.",
        status: "upcoming",
        client: "Banking Institution",
        date: "Q2 2024",
        image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d"
      }
    ],
    industrySpecific: {
      healthcare: {
        challenges: [
          "Complex medical document processing",
          "Clinical decision support requirements",
          "Regulatory compliance assurance",
          "Patient data security concerns"
        ],
        benefits: [
          "Reduced administrative burden",
          "Improved diagnostic support",
          "Enhanced regulatory compliance",
          "More efficient resource allocation"
        ],
        useCases: [
          "Medical claims processing automation",
          "Clinical documentation improvement",
          "Predictive patient flow management",
          "Virtual health assistants"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
          alt: "Healthcare AI automation"
        }
      },
      finance: {
        challenges: [
          "Complex transaction monitoring",
          "Document verification requirements",
          "Risk assessment automation",
          "Regulatory compliance validation"
        ],
        benefits: [
          "Faster transaction processing",
          "Improved fraud detection",
          "Enhanced customer onboarding",
          "More accurate risk assessment"
        ],
        useCases: [
          "Automated loan underwriting",
          "AML transaction monitoring",
          "Intelligent document processing",
          "Customer service chatbots"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d",
          alt: "Financial AI automation"
        }
      },
      retail: {
        challenges: [
          "Demand forecasting complexity",
          "Inventory optimization at scale",
          "Personalization requirements",
          "Supply chain variability"
        ],
        benefits: [
          "Optimized inventory levels",
          "Enhanced customer experience",
          "Reduced operational costs",
          "More accurate forecasting"
        ],
        useCases: [
          "Demand forecasting systems",
          "Personalized recommendation engines",
          "Visual search capabilities",
          "Intelligent pricing optimization"
        ],
        media: {
          type: "video",
          src: "https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4",
          alt: "Retail AI automation"
        }
      },
      manufacturing: {
        challenges: [
          "Production quality variability",
          "Equipment maintenance optimization",
          "Supply chain disruption prediction",
          "Process optimization complexity"
        ],
        benefits: [
          "Improved product quality",
          "Reduced equipment downtime",
          "Enhanced production efficiency",
          "More resilient supply chain"
        ],
        useCases: [
          "Predictive maintenance systems",
          "Visual quality inspection",
          "Production optimization AI",
          "Supply chain disruption prediction"
        ],
        media: {
          type: "image",
          src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
          alt: "Manufacturing AI automation"
        }
      }
    }
  }
];

export const complementaryServices = {
  "Data Integration": ["Advanced Analytics", "Cloud Infrastructure", "Data Security & Compliance"],
  "Advanced Analytics": ["Data Integration", "AI & Machine Learning", "Cloud Infrastructure"],
  "AI Automation and Testing": ["Data Integration", "Advanced Analytics", "Cloud Infrastructure"],
  "Cloud Infrastructure": ["Data Integration", "Advanced Analytics", "Data Security & Compliance"],
  "Data Analytics & BI Solutions": ["Data Integration", "Website & Mobile App Development", "Strategic Planning"],
  "Website & Mobile App Development": ["Digital Marketing", "Data Analytics & BI Solutions", "Customer Feedback"],
  "Digital Marketing": ["Website & Mobile App Development", "Market Research", "Customer Feedback"],
  "Strategic Planning for Business Growth": ["Operational Efficiency", "Market Research", "Data Analytics & BI Solutions"],
  "Operational Efficiency Optimization": ["Strategic Planning", "Employee Retention", "Leadership Training"],
  "Competitor Analysis": ["Industry Trends", "Strategic Planning", "Digital Marketing"],
  "Customer Feedback Collection and Analysis": ["Digital Marketing", "Loyalty Programs", "Operational Efficiency"],
  "Employee Retention Strategies": ["Leadership Training", "Operational Efficiency", "Skill Development"],
  "Leadership and Management Training": ["Employee Retention", "Skill Development", "Strategic Planning"]
};

export const workflowSteps = [
  {
    title: "Discovery & Assessment",
    description: "We assess your current data landscape, identify challenges, and define clear objectives.",
    icon: "1"
  },
  {
    title: "Solution Design",
    description: "Our experts design a tailored solution aligned with your specific industry challenges and goals.",
    icon: "2"
  },
  {
    title: "Implementation",
    description: "We implement the solution with minimal disruption to your operations, following best practices.",
    icon: "3"
  },
  {
    title: "Integration & Testing",
    description: "The solution is integrated into your existing systems and thoroughly tested for performance.",
    icon: "4"
  },
  {
    title: "Training & Deployment",
    description: "We train your team and deploy the solution to production, ensuring smooth adoption.",
    icon: "5"
  },
  {
    title: "Continuous Support",
    description: "Our ongoing support ensures your solution evolves with your business needs and technology advances.",
    icon: "6"
  }
];

export default services;