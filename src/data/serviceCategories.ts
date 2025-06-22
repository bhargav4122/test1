
import { 
  Database, 
  BarChart, 
  BrainCircuit, 
  Search, 
  MessageSquare,
  Users,
  GraduationCap,
  Sparkles,
  LucideIcon,
  FileCode,
  Shield,
  Server,
  Smartphone,
  Globe,
  PenTool,
  Cpu,
  Network,
  Building2
} from "lucide-react";

export interface ServiceCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  services: string[];
}

// Map service detail IDs to their corresponding category objects
export const serviceIdToCategoryMap: Record<string, string> = {
  "cybersecurity": "technology-solutions",
  "software-development": "technology-solutions",
  "ai-ml": "technology-solutions",
  "cloud-infrastructure": "technology-solutions",
  "mobile-development": "technology-solutions",
  "web-development": "technology-solutions",
  "ui-ux-design": "technology-solutions",
  "iot-solutions": "technology-solutions",
  "blockchain": "technology-solutions",
  "data-analytics": "technology-solutions",
  "digital-marketing": "technology-solutions",
  "data-storage": "data-management",
  "data-protection": "data-management",
  "data-backup": "data-management",
  "data-capturing": "data-management",
  "data-integration": "data-management",
  "core-data-cloud": "data-management",
  "bi-digital-transformation": "bi-digital-transformation",
  "strategic-planning": "business-consulting",
  "operational-efficiency": "business-consulting",
  "financial-modeling": "business-consulting",
  "risk-assessment": "business-consulting",
  "business-consulting": "business-consulting",
  "competitor-analysis": "market-research",
  "industry-trends": "market-research",
  "consumer-behavior": "market-research",
  "product-feasibility": "market-research",
  "market-research": "market-research",
  "customer-feedback": "consumer-voice",
  "sentiment-analysis": "consumer-voice",
  "loyalty-programs": "consumer-voice",
  "consumer-voice": "consumer-voice",
  "motivation-training": "workforce-solutions",
  "skill-development": "workforce-solutions",
  "employee-retention": "workforce-solutions",
  "manpower-planning": "workforce-solutions",
  "workforce-solutions": "workforce-solutions",
  "leadership-training": "training-development",
  "technical-skills": "training-development",
  "soft-skills": "training-development",
  "industry-certifications": "training-development",
  "training-development": "training-development"
};

// Additional service categories to match what's in serviceDetails.ts
const additionalCategories: ServiceCategory[] = [
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    icon: Shield,
    description: "Comprehensive cybersecurity solutions to protect your business from digital threats.",
    services: [
      "Security Assessments",
      "Threat Detection and Response",
      "Data Protection",
      "Security Training",
      "Compliance Management"
    ]
  },
  {
    id: "software-development",
    title: "Software Development",
    icon: FileCode,
    description: "Custom software solutions tailored to your business needs.",
    services: [
      "Custom Software Development",
      "Software Integration",
      "API Development",
      "Legacy System Modernization",
      "Software Maintenance"
    ]
  },
  {
    id: "ai-ml",
    title: "AI and Machine Learning",
    icon: BrainCircuit,
    description: "Advanced AI and ML solutions to transform your business.",
    services: [
      "Predictive Analytics",
      "Natural Language Processing",
      "Computer Vision",
      "Recommendation Systems",
      "Automated Decision Making"
    ]
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    icon: Server,
    description: "Robust cloud infrastructure solutions for scalable and reliable operations.",
    services: [
      "Cloud Migration",
      "Cloud Architecture Design",
      "Hybrid Cloud Solutions",
      "Multi-Cloud Management",
      "Cloud Cost Optimization"
    ]
  },
  {
    id: "mobile-development",
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Native and cross-platform mobile applications for enhanced user engagement.",
    services: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Development",
      "Mobile App Design",
      "App Maintenance & Support"
    ]
  },
  {
    id: "web-development",
    title: "Web Development",
    icon: Globe,
    description: "Modern web applications designed for performance and usability.",
    services: [
      "Frontend Development",
      "Backend Development",
      "Progressive Web Apps",
      "E-commerce Solutions",
      "CMS Implementation"
    ]
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: PenTool,
    description: "User-centered design solutions to create exceptional digital experiences.",
    services: [
      "User Interface Design",
      "User Experience Research",
      "Information Architecture",
      "Wireframing & Prototyping",
      "Usability Testing"
    ]
  },
  {
    id: "iot-solutions",
    title: "IoT Solutions",
    icon: Cpu,
    description: "Connected device solutions to transform your physical operations.",
    services: [
      "IoT Strategy & Architecture",
      "IoT Device Management",
      "Edge Computing",
      "IoT Data Analytics",
      "Industrial IoT Solutions"
    ]
  },
  {
    id: "blockchain",
    title: "Blockchain Solutions",
    icon: Network,
    description: "Secure and transparent blockchain solutions for modern business challenges.",
    services: [
      "Blockchain Strategy & Consulting",
      "Smart Contract Development",
      "Distributed Ledger Technology",
      "Tokenization Solutions",
      "Blockchain Integration"
    ]
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    icon: Building2,
    description: "Strategic consulting services to optimize operations and drive growth.",
    services: [
      "Strategic Planning",
      "Operational Efficiency",
      "Financial Modeling",
      "Risk Assessment"
    ]
  },
  {
    id: "market-research",
    title: "Market Research",
    icon: Search,
    description: "Data-driven insights to inform strategic business decisions.",
    services: [
      "Competitor Analysis",
      "Industry Trends",
      "Consumer Behavior",
      "Product Feasibility"
    ]
  },
  {
    id: "consumer-voice",
    title: "Consumer Voice",
    icon: MessageSquare,
    description: "Understand and engage with your customers effectively.",
    services: [
      "Customer Feedback",
      "Sentiment Analysis",
      "Loyalty Programs",
      "Customer Engagement"
    ]
  },
  {
    id: "workforce-solutions",
    title: "Workforce Solutions",
    icon: Users,
    description: "Optimize workforce management and employee productivity.",
    services: [
      "Motivation Training",
      "Skill Development",
      "Employee Retention",
      "Manpower Planning"
    ]
  },
  {
    id: "training-development",
    title: "Training & Development",
    icon: GraduationCap,
    description: "Enhance skills and capabilities across your organization.",
    services: [
      "Leadership Training",
      "Technical Skills",
      "Soft Skills",
      "Industry Certifications"
    ]
  }
];

const serviceCategories: ServiceCategory[] = [
  {
    id: "technology-solutions",
    title: "Technology Solutions",
    icon: Cpu,
    description: "Cutting-edge technology solutions to power your digital transformation.",
    services: [
      "Cybersecurity",
      "Software Development",
      "AI and Machine Learning",
      "Cloud Infrastructure",
      "Mobile App Development",
      "Web Development",
      "UI/UX Design",
      "IoT Solutions",
      "Blockchain Solutions"
    ]
  },
  {
    id: "data-management",
    title: "Data Management",
    icon: Database,
    description: "Comprehensive data management, storage, integration, and cloud infrastructure solutions.",
    services: [
      "Data Storage",
      "Data Protection",
      "Data Backup",
      "Data Capturing",
      "Data Integration",
      "Core Data & Cloud"
    ]
  },
  {
    id: "bi-digital-transformation",
    title: "BI and Digital Transformation",
    icon: BarChart,
    description: "Transform your business with cutting-edge analytics, BI solutions, and digital presence development.",
    services: [
      "Data Analytics and BI Solutions",
      "Website and Mobile App Development",
      "Digital Marketing"
    ]
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    icon: BrainCircuit,
    description: "Strategic consulting services to optimize operations, mitigate risks, and drive sustainable business growth.",
    services: [
      "Strategic Planning for Business Growth",
      "Operational Efficiency Optimization",
      "Financial and Revenue Modelling",
      "Risk Assessment and Mitigation"
    ]
  },
  {
    id: "market-research",
    title: "Market Research and Trends",
    icon: Search,
    description: "Gain valuable insights into market trends, consumer behavior, and competitive landscape to inform strategic decisions.",
    services: [
      "Competitor Analysis",
      "Industry Trends and Insights",
      "Consumer Behaviour Analysis",
      "Product Feasibility Studies"
    ]
  },
  {
    id: "consumer-voice",
    title: "Consumer Voice Services",
    icon: MessageSquare,
    description: "Capture, analyze, and leverage customer feedback to enhance products, services, and overall customer experience.",
    services: [
      "Customer Feedback Collection and Analysis",
      "Sentiment Analysis on Social Media",
      "Building Customer Loyalty Programs",
      "Personalized Marketing Strategies"
    ]
  },
  {
    id: "workforce-solutions",
    title: "Employee and Workforce Solutions",
    icon: Users,
    description: "Comprehensive workforce management solutions to optimize employee performance, retention, and satisfaction.",
    services: [
      "Motivation and Training Workshops",
      "Skill Development Programs",
      "Employee Retention Strategies",
      "Recruitment and Manpower Planning"
    ]
  },
  {
    id: "training-development",
    title: "Training and Development",
    icon: GraduationCap,
    description: "Tailored training programs to enhance leadership, technical, and soft skills across your organization.",
    services: [
      "Leadership and Management Training",
      "Technical Skills (IT Tools, Analytics, etc.)",
      "Soft Skills (Communication, Collaboration)",
      "Industry-Specific Certifications"
    ]
  },
  {
    id: "upcoming-services",
    title: "Upcoming Services",
    icon: Sparkles,
    description: "Stay ahead with our soon-to-be-launched innovative solutions designed to address evolving business needs.",
    services: [
      "AI Automation and Testing",
      "Bookkeeping and Taxation",
      "Salesforce Services",
      "SAP Consulting"
    ]
  }
];

// Merge the main categories with the additional ones
const allServiceCategories = [...serviceCategories, ...additionalCategories.filter(cat => 
  !serviceCategories.some(existingCat => existingCat.id === cat.id)
)];

export default allServiceCategories;