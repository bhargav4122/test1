    //sub services part


    import { ServiceComponents } from './types';

    export const serviceComponents: ServiceComponents = {

    
  
  //Cybersecurity
  "cybersecurity": [
    {
      id: "cybersecurity-network",
      title: "Network Security",
      description: "Comprehensive protection for your network infrastructure",
      features: ["Firewall Management", "Intrusion Detection", "VPN Solutions", "Network Monitoring", "Threat Prevention"],
      projectCount: 24,
      icon: "settings",
      technologies: ["Cisco", "Palo Alto", "Fortinet", "Check Point", "Juniper Networks"],
      completedProjects: 17,
      techCategories: {
        "Security Tools": ["Cisco ASA", "Palo Alto NGFW", "Fortinet FortiGate", "Wireshark", "Snort"],
        "Protocols": ["IPsec", "SSL/TLS", "SIEM", "IDS/IPS", "Zero Trust"]
      },
      projects: {
        completed: [
          {
            client: "International Finance Group",
            description: [
              "Implemented multi-layered security architecture",
              "Deployed advanced threat detection systems",
              "Established secure remote access solutions"
            ],
            duration: "8 months",
            result: "Reduced security incidents by 76%"
          },
          {
            client: "Healthcare Provider Network",
            description: [
              "Developed HIPAA-compliant security infrastructure",
              "Implemented network segmentation for patient data",
              "Created automated threat response system"
            ],
            duration: "6 months",
            result: "Achieved complete regulatory compliance"
          }
        ],
        current: [
          {
            client: "Government Agency",
            description: [
              "Upgrading legacy firewall systems",
              "Implementing zero-trust architecture",
              "Enhancing incident response capabilities"
            ],
            status: "In progress (Month 3 of 7)"
          }
        ]
      },
      teamComposition: [
        { role: "Security Engineer", count: 4 },
        { role: "Network Specialist", count: 2 },
        { role: "Compliance Expert", count: 1 },
        { role: "Project Manager", count: 1 }
      ],
      timeFrame: {
        averageDuration: "4 to 8 months",
        ongoingSupport: "24/7 monitoring and quarterly assessments"
      }
    },
    {
      id: "cybersecurity-endpoint",
      title: "Endpoint Protection",
      description: "Secure all devices that connect to your network",
      features: ["Anti-malware", "Device Control", "Threat Hunting", "Data Loss Prevention", "Encryption"],
      projectCount: 18,
      icon: "server",
      technologies: ["CrowdStrike", "Carbon Black", "SentinelOne", "Microsoft Defender", "Symantec"],
      completedProjects: 12,
      techCategories: {
        "Protection Tools": ["CrowdStrike Falcon", "Carbon Black", "SentinelOne", "Microsoft Defender ATP"],
        "Methodologies": ["EDR", "XDR", "MDR", "Zero-Day Protection"]
      },
      projects: {
        completed: [
          {
            client: "Multinational Retail Corporation",
            description: [
              "Deployed endpoint protection across 5,000+ devices",
              "Implemented device encryption and control policies",
              "Created incident response playbooks"
            ],
            duration: "5 months",
            result: "99.8% protection coverage with 65% fewer alerts"
          }
        ],
        current: [
          {
            client: "Financial Services Provider",
            description: [
              "Implementing advanced threat hunting capabilities",
              "Enhancing data loss prevention controls",
              "Integrating with SIEM solution"
            ],
            status: "In progress (Month 2 of 4)"
          }
        ]
      },
      teamComposition: [
        { role: "Endpoint Security Specialist", count: 3 },
        { role: "Threat Hunter", count: 2 },
        { role: "Deployment Engineer", count: 2 },
        { role: "Project Manager", count: 1 }
      ],
      timeFrame: {
        averageDuration: "3 to 6 months",
        ongoingSupport: "Continuous monitoring with monthly updates"
      }
    }
  ],


  "ai-ml-solutions": [
    {
      id: "ai-ml-analytics",
      title: "Predictive Analytics",
      description: "Turn data into actionable future insights",
      features: ["Pattern Recognition", "Trend Analysis", "Decision Support", "Anomaly Detection", "Forecasting Models"],
      projectCount: 15,
      icon: "database",
  
  
    
    },
    {
      id: "ai-ml-computer-vision",
      title: "Computer Vision",
      description: "Advanced image and video analysis solutions",
      features: ["Object Detection", "Facial Recognition", "Scene Analysis", "Image Classification", "Video Analytics"],
      projectCount: 8,
      icon: "code",
      technologies: ["OpenCV", "YOLO", "MediaPipe", "TensorFlow Vision", "PyTorch Vision"],
      completedProjects: 5,
      
    }
  ],







  
  "digital-strategy": [
    {
      id: "digital-transformation",
      title: "Digital Transformation",
      description: "Comprehensive strategy to digitize business processes",
      features: ["Process Automation", "Legacy Modernization", "Digital Roadmap", "Change Management", "Digital Culture"],
      projectCount: 16,
      icon: "settings",
      technologies: ["Agile", "DevOps", "Design Thinking", "Lean", "Six Sigma"],
      completedProjects: 12,
      
    },
    {
      id: "customer-experience",
      title: "Customer Experience Design",
      description: "Create seamless digital experiences for your customers",
      features: ["UX Research", "Journey Mapping", "Service Design", "Usability Testing", "Digital Experience Platforms"],
      projectCount: 14,
      icon: "layers",
      technologies: ["Adobe XD", "Figma", "InVision", "Sketch", "Axure"],
      completedProjects: 10,
      
    }
  ],
  "custom-software-development": [
    {
      id: "web-applications",
      title: "Web Application Development",
      description: "Custom web solutions for complex business needs",
      features: ["Responsive Design", "API Integration", "Progressive Web Apps", "SPA/MPA", "Enterprise Portals"],
      projectCount: 28,
      icon: "code",
      technologies: ["React", "Angular", "Node.js", "Vue", "Next.js"],
      completedProjects: 22,
      
      
    },
    {
      id: "mobile-applications",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
      features: ["iOS Development", "Android Development", "Cross-platform", "Offline Functionality", "Push Notifications"],
      projectCount: 19,
      icon: "server",
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Xamarin"],
      completedProjects: 14,
     
    }
  ]
};