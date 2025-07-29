import { JobListing, CareerPath } from '../types/careers';

export const careerPaths: CareerPath[] = [
  {
    field: "Cloud Engineering",
    icon: "Cloud",
    description: "Master cloud technologies and infrastructure management",
    totalDuration: "4 Years",
    finalRole: "Cloud Solutions Architect",
    years: [
      {
        year: 1,
        title: "Cloud Fundamentals Trainee",
        description: "Learn cloud basics and support senior engineers",
        skills: ["AWS/Azure basics", "Linux fundamentals", "Networking concepts", "Basic scripting"],
        responsibilities: ["Shadow cloud engineers", "Document procedures", "Basic monitoring tasks", "Learn cloud services"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "Cloud training materials"],
        projects: ["Simple deployment tasks", "Documentation updates", "Basic monitoring"]
      },
      {
        year: 2,
        title: "Cloud Support Associate",
        description: "Handle cloud infrastructure support and basic deployments",
        skills: ["Infrastructure as Code", "Container basics", "CI/CD pipelines", "Cloud security basics"],
        responsibilities: ["Support cloud deployments", "Monitor infrastructure", "Handle basic incidents", "Assist in migrations"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "Cloud certification vouchers", "Hands-on lab access"],
        projects: ["Small deployment projects", "Infrastructure monitoring", "Basic automation scripts"]
      },
      {
        year: 3,
        title: "Junior Cloud Engineer",
        description: "Manage cloud projects and lead small infrastructure tasks",
        skills: ["Advanced AWS/Azure", "Kubernetes", "Terraform", "DevOps practices"],
        responsibilities: ["Lead small cloud projects", "Design basic architectures", "Mentor Year 1-2 students", "Handle client interactions"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "Advanced certifications", "Conference attendance"],
        projects: ["Medium-scale deployments", "Architecture design", "Team leadership"]
      },
      {
        year: 4,
        title: "Cloud Solutions Architect",
        description: "Design and implement enterprise cloud solutions",
        skills: ["Enterprise architecture", "Multi-cloud strategies", "Cost optimization", "Team leadership"],
        responsibilities: ["Design cloud architectures", "Lead project teams", "Client consultations", "Strategic planning"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "Leadership training"],
        projects: ["Enterprise migrations", "Architecture consulting", "Team management"]
      }
    ]
  },
  {
    field: "Data Science & Analytics",
    icon: "BarChart3",
    description: "Transform data into actionable business insights",
    totalDuration: "4 Years",
    finalRole: "Senior Data Scientist",
    years: [
      {
        year: 1,
        title: "Data Analysis Trainee",
        description: "Learn data fundamentals and basic analysis techniques",
        skills: ["Excel/Google Sheets", "SQL basics", "Python fundamentals", "Statistics basics"],
        responsibilities: ["Data cleaning tasks", "Basic reporting", "Learn data tools", "Support data team"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "Data tools access"],
        projects: ["Simple data cleaning", "Basic reports", "Dashboard maintenance"]
      },
      {
        year: 2,
        title: "Junior Data Analyst",
        description: "Perform data analysis and create visualizations",
        skills: ["Advanced SQL", "Python/R", "Tableau/Power BI", "Statistical analysis"],
        responsibilities: ["Create dashboards", "Perform analysis", "Generate insights", "Support data projects"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "Analytics software licenses", "Online courses"],
        projects: ["Business dashboards", "Trend analysis", "Customer insights"]
      },
      {
        year: 3,
        title: "Data Scientist",
        description: "Build predictive models and advanced analytics solutions",
        skills: ["Machine Learning", "Deep Learning", "Big Data tools", "Model deployment"],
        responsibilities: ["Build ML models", "Lead analytics projects", "Mentor juniors", "Present to clients"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "ML platform access", "Research opportunities"],
        projects: ["Predictive models", "ML pipelines", "Advanced analytics"]
      },
      {
        year: 4,
        title: "Senior Data Scientist",
        description: "Lead data science initiatives and strategic projects",
        skills: ["Advanced ML/AI", "MLOps", "Data strategy", "Team leadership"],
        responsibilities: ["Lead data strategy", "Manage data teams", "Client consulting", "Innovation projects"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "Research funding"],
        projects: ["AI solutions", "Data strategy", "Team leadership"]
      }
    ]
  },
  {
    field: "Business Intelligence",
    icon: "TrendingUp",
    description: "Drive business decisions through intelligent data analysis",
    totalDuration: "4 Years",
    finalRole: "BI Solutions Architect",
    years: [
      {
        year: 1,
        title: "BI Trainee",
        description: "Learn business intelligence fundamentals and reporting",
        skills: ["Business fundamentals", "Excel advanced", "Basic SQL", "Report creation"],
        responsibilities: ["Create basic reports", "Data entry tasks", "Learn BI tools", "Support BI team"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "BI tools training"],
        projects: ["Simple reports", "Data validation", "Dashboard updates"]
      },
      {
        year: 2,
        title: "BI Analyst",
        description: "Develop business reports and performance dashboards",
        skills: ["Advanced BI tools", "Data modeling", "KPI development", "Business analysis"],
        responsibilities: ["Build dashboards", "Analyze business metrics", "Support decision making", "Train end users"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "BI software licenses", "Business training"],
        projects: ["Executive dashboards", "Performance metrics", "Business analysis"]
      },
      {
        year: 3,
        title: "Senior BI Analyst",
        description: "Lead BI projects and strategic business analysis",
        skills: ["Advanced analytics", "Data warehousing", "ETL processes", "Business strategy"],
        responsibilities: ["Lead BI projects", "Strategic analysis", "Mentor team members", "Client presentations"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "Strategy workshops", "Leadership training"],
        projects: ["BI implementations", "Strategic analysis", "Process optimization"]
      },
      {
        year: 4,
        title: "BI Solutions Architect",
        description: "Design enterprise BI solutions and lead strategic initiatives",
        skills: ["Enterprise BI architecture", "Data governance", "Strategic planning", "Team leadership"],
        responsibilities: ["Design BI architecture", "Lead BI strategy", "Manage teams", "Executive consulting"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "Executive training"],
        projects: ["Enterprise BI solutions", "Strategic consulting", "Team management"]
      }
    ]
  },
  {
    field: "Cybersecurity",
    icon: "Shield",
    description: "Protect digital assets and ensure security compliance",
    totalDuration: "4 Years",
    finalRole: "Security Architect",
    years: [
      {
        year: 1,
        title: "Security Trainee",
        description: "Learn cybersecurity fundamentals and basic security practices",
        skills: ["Security basics", "Network fundamentals", "Basic tools", "Compliance basics"],
        responsibilities: ["Monitor security alerts", "Document procedures", "Learn security tools", "Support security team"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "Security training materials"],
        projects: ["Basic monitoring", "Documentation", "Tool familiarization"]
      },
      {
        year: 2,
        title: "Junior Security Analyst",
        description: "Perform security monitoring and incident response",
        skills: ["SIEM tools", "Incident response", "Vulnerability assessment", "Security frameworks"],
        responsibilities: ["Monitor security events", "Investigate incidents", "Vulnerability scanning", "Security reporting"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "Security certifications", "Lab environment access"],
        projects: ["Incident response", "Vulnerability assessments", "Security monitoring"]
      },
      {
        year: 3,
        title: "Security Analyst",
        description: "Lead security projects and advanced threat analysis",
        skills: ["Advanced threat hunting", "Penetration testing", "Security architecture", "Risk assessment"],
        responsibilities: ["Lead security projects", "Conduct security assessments", "Mentor juniors", "Client security consulting"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "Advanced certifications", "Security conferences"],
        projects: ["Security assessments", "Penetration testing", "Security implementations"]
      },
      {
        year: 4,
        title: "Security Architect",
        description: "Design enterprise security solutions and lead security strategy",
        skills: ["Enterprise security design", "Security governance", "Strategic planning", "Team leadership"],
        responsibilities: ["Design security architecture", "Lead security strategy", "Manage security teams", "Executive consulting"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "Security leadership training"],
        projects: ["Enterprise security design", "Strategic consulting", "Team management"]
      }
    ]
  },
  {
    field: "AI Engineering",
    icon: "Brain",
    description: "Build intelligent systems and AI-powered solutions",
    totalDuration: "4 Years",
    finalRole: "AI Solutions Architect",
    years: [
      {
        year: 1,
        title: "AI Trainee",
        description: "Learn AI fundamentals and basic programming",
        skills: ["Python basics", "Math fundamentals", "AI concepts", "Basic algorithms"],
        responsibilities: ["Learn AI tools", "Data preparation tasks", "Support AI team", "Basic coding tasks"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "AI learning resources"],
        projects: ["Simple AI tasks", "Data preparation", "Tool familiarization"]
      },
      {
        year: 2,
        title: "Junior AI Developer",
        description: "Develop basic AI models and support AI projects",
        skills: ["Machine Learning", "TensorFlow/PyTorch", "Data preprocessing", "Model evaluation"],
        responsibilities: ["Build simple models", "Support AI projects", "Data analysis", "Model testing"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "AI platform access", "Advanced courses"],
        projects: ["Basic ML models", "AI prototypes", "Data analysis"]
      },
      {
        year: 3,
        title: "AI Engineer",
        description: "Design and implement AI solutions for business problems",
        skills: ["Deep Learning", "NLP", "Computer Vision", "MLOps"],
        responsibilities: ["Lead AI projects", "Design AI solutions", "Mentor juniors", "Client AI consulting"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "AI research opportunities", "Conference attendance"],
        projects: ["AI solutions", "Advanced models", "AI implementations"]
      },
      {
        year: 4,
        title: "AI Solutions Architect",
        description: "Lead AI strategy and design enterprise AI systems",
        skills: ["AI architecture", "AI strategy", "Enterprise AI", "Team leadership"],
        responsibilities: ["Design AI architecture", "Lead AI strategy", "Manage AI teams", "Executive AI consulting"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "AI leadership training"],
        projects: ["Enterprise AI solutions", "AI strategy", "Team management"]
      }
    ]
  },
  {
    field: "Digital Transformation",
    icon: "Zap",
    description: "Drive organizational change through digital innovation",
    totalDuration: "4 Years",
    finalRole: "Digital Transformation Lead",
    years: [
      {
        year: 1,
        title: "Digital Trainee",
        description: "Learn digital technologies and transformation basics",
        skills: ["Digital literacy", "Process mapping", "Basic analytics", "Change management basics"],
        responsibilities: ["Support digital projects", "Document processes", "Learn digital tools", "Assist transformation team"],
        stipend: "₹6,000/month",
        benefits: ["University lunch", "Transport allowance", "Digital tools training"],
        projects: ["Process documentation", "Basic digital tasks", "Tool learning"]
      },
      {
        year: 2,
        title: "Digital Analyst",
        description: "Analyze business processes and support digital initiatives",
        skills: ["Process analysis", "Digital tools", "Project management", "Stakeholder management"],
        responsibilities: ["Analyze business processes", "Support digital projects", "Stakeholder coordination", "Change facilitation"],
        stipend: "₹10,000/month",
        benefits: ["All Year 1 benefits", "Project management training", "Digital certifications"],
        projects: ["Process improvement", "Digital implementations", "Change projects"]
      },
      {
        year: 3,
        title: "Digital Consultant",
        description: "Lead digital transformation projects and client consulting",
        skills: ["Digital strategy", "Change management", "Technology consulting", "Project leadership"],
        responsibilities: ["Lead digital projects", "Client consulting", "Strategy development", "Team coordination"],
        stipend: "₹15,000/month",
        benefits: ["All previous benefits", "Consulting training", "Strategy workshops"],
        projects: ["Digital transformations", "Client consulting", "Strategy projects"]
      },
      {
        year: 4,
        title: "Digital Transformation Lead",
        description: "Drive enterprise digital transformation strategy",
        skills: ["Enterprise transformation", "Strategic planning", "Leadership", "Innovation management"],
        responsibilities: ["Lead transformation strategy", "Manage transformation teams", "Executive consulting", "Innovation leadership"],
        stipend: "₹20,000/month + Bonuses",
        benefits: ["All previous benefits", "Full-time offer consideration", "Executive training"],
        projects: ["Enterprise transformations", "Strategic consulting", "Innovation leadership"]
      }
    ]
  }
];

export const jobListings: JobListing[] = [
  // Full-time positions
  {
    id: "senior-fullstack-dev",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Hybrid (India)",
    type: "Full-time",
    experience: "4+ years",
    description: "Lead development of cutting-edge web applications and mentor our growing team of developers.",
    requirements: [
      "4+ years of full-stack development experience",
      "Strong proficiency in React, Node.js, and modern frameworks",
      "Experience with cloud platforms (AWS/Azure)",
      "Strong problem-solving and communication skills",
      "Experience mentoring junior developers"
    ],
    responsibilities: [
      "Architect and develop scalable web applications",
      "Mentor junior developers and university program participants",
      "Lead project teams and coordinate deliverables",
      "Collaborate with international clients",
      "Implement best practices and code standards"
    ],
    benefits: [
      "Competitive salary package",
      "Performance bonuses",
      "Health insurance for family",
      "Flexible working arrangements",
      "International travel opportunities"
    ],
    salary: "₹10-18 LPA"
  },
  {
    id: "data-scientist-ft",
    title: "Senior Data Scientist",
    department: "Data & Analytics",
    location: "Remote/Hybrid",
    type: "Full-time",
    experience: "3+ years",
    description: "Lead data science initiatives and build AI-powered solutions for our global clients.",
    requirements: [
      "3+ years of data science experience",
      "Strong proficiency in Python, R, and ML frameworks",
      "Experience with big data technologies",
      "PhD/Masters in relevant field preferred",
      "Experience with cloud ML platforms"
    ],
    responsibilities: [
      "Lead data science projects and initiatives",
      "Build and deploy machine learning models",
      "Mentor university program data science track",
      "Collaborate with business teams on analytics strategy",
      "Research and implement cutting-edge AI solutions"
    ],
    benefits: [
      "Competitive salary with equity options",
      "Research and conference budget",
      "Latest hardware and software tools",
      "Flexible remote work options",
      "Professional development opportunities"
    ],
    salary: "₹12-20 LPA"
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist",
    department: "Security",
    location: "On-site (India)",
    type: "Full-time",
    experience: "3+ years",
    description: "Protect our infrastructure and client data while building our security practice.",
    requirements: [
      "3+ years of cybersecurity experience",
      "Security certifications (CISSP, CEH, etc.)",
      "Experience with security tools and frameworks",
      "Knowledge of compliance standards",
      "Incident response experience"
    ],
    responsibilities: [
      "Design and implement security solutions",
      "Conduct security assessments and audits",
      "Lead incident response activities",
      "Mentor security track university students",
      "Develop security policies and procedures"
    ],
    benefits: [
      "Competitive salary package",
      "Security certification reimbursement",
      "Latest security tools and training",
      "Conference and training opportunities",
      "Career advancement in growing security practice"
    ],
    salary: "₹8-15 LPA"
  },

  // Part-time positions
  {
    id: "ui-designer-pt",
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Part-time",
    experience: "2+ years",
    description: "Create exceptional user experiences for our client projects on a flexible schedule.",
    requirements: [
      "2+ years of UI/UX design experience",
      "Proficiency in Figma, Adobe Creative Suite",
      "Strong portfolio demonstrating design thinking",
      "Available 20-25 hours per week",
      "Experience with design systems"
    ],
    responsibilities: [
      "Design user interfaces and experiences",
      "Collaborate with development teams",
      "Maintain design systems and guidelines",
      "Conduct user research and testing",
      "Mentor design track university students"
    ],
    benefits: [
      "Flexible working hours",
      "Competitive hourly rates",
      "Latest design tools and software",
      "Creative freedom and autonomy",
      "Opportunity to transition to full-time"
    ],
    salary: "₹25-40/hour"
  },
  {
    id: "business-analyst-pt",
    title: "Business Analyst",
    department: "Strategy",
    location: "Hybrid",
    type: "Part-time",
    experience: "2+ years",
    description: "Analyze business requirements and support our consulting projects part-time.",
    requirements: [
      "2+ years of business analysis experience",
      "Strong analytical and problem-solving skills",
      "Experience with requirement gathering",
      "Available 15-20 hours per week",
      "Excellent communication skills"
    ],
    responsibilities: [
      "Gather and analyze business requirements",
      "Support consulting projects",
      "Create project documentation",
      "Coordinate between teams and clients",
      "Mentor business track university students"
    ],
    benefits: [
      "Flexible schedule",
      "Competitive hourly compensation",
      "Client interaction opportunities",
      "Professional development support",
      "Path to full-time opportunities"
    ],
    salary: "₹20-35/hour"
  },

  // Internship positions
  {
    id: "software-intern",
    title: "Software Development Intern",
    department: "Engineering",
    location: "Hybrid (India)",
    type: "Internship",
    experience: "Students/Fresh graduates",
    description: "3-6 month internship program for aspiring developers to gain real-world experience.",
    requirements: [
      "Currently pursuing or recently completed degree",
      "Basic programming knowledge",
      "Eagerness to learn and adapt",
      "Available for 3-6 months",
      "Strong problem-solving skills"
    ],
    responsibilities: [
      "Work on real client projects under supervision",
      "Learn modern development practices",
      "Collaborate with experienced developers",
      "Contribute to open-source projects",
      "Present project outcomes"
    ],
    benefits: [
      "Hands-on industry experience",
      "Mentorship from senior developers",
      "Certificate of completion",
      "Potential for full-time offer",
      "Networking opportunities"
    ],
    salary: "₹15,000-25,000/month"
  },
  {
    id: "data-intern",
    title: "Data Analytics Intern",
    department: "Data & Analytics",
    location: "Remote/Hybrid",
    type: "Internship",
    experience: "Students/Fresh graduates",
    description: "Learn data science and analytics through hands-on projects with real datasets.",
    requirements: [
      "Basic knowledge of Python or R",
      "Understanding of statistics",
      "Currently pursuing relevant degree",
      "Available for 3-6 months",
      "Analytical mindset"
    ],
    responsibilities: [
      "Work on data analysis projects",
      "Learn advanced analytics tools",
      "Create data visualizations",
      "Support data science team",
      "Present findings to stakeholders"
    ],
    benefits: [
      "Real-world data science experience",
      "Access to premium analytics tools",
      "Mentorship from data scientists",
      "Portfolio project development",
      "Industry networking"
    ],
    salary: "₹12,000-20,000/month"
  },

  // Freelance positions
  {
    id: "content-writer-fl",
    title: "Technical Content Writer",
    department: "Marketing",
    location: "Remote",
    type: "Freelance",
    experience: "1+ years",
    description: "Create technical content and documentation for our projects on a project basis.",
    requirements: [
      "1+ years of technical writing experience",
      "Understanding of technology concepts",
      "Excellent English writing skills",
      "Available for project-based work",
      "Portfolio of technical writing samples"
    ],
    responsibilities: [
      "Write technical documentation",
      "Create blog posts and articles",
      "Develop user guides and manuals",
      "Edit and review content",
      "Collaborate with technical teams"
    ],
    benefits: [
      "Project-based flexibility",
      "Competitive per-project rates",
      "Remote work opportunity",
      "Diverse project exposure",
      "Long-term collaboration potential"
    ],
    salary: "₹500-1500/article"
  },
  {
    id: "digital-marketer-fl",
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "Remote",
    type: "Freelance",
    experience: "2+ years",
    description: "Drive digital marketing campaigns for our clients on a project basis.",
    requirements: [
      "2+ years of digital marketing experience",
      "Experience with Google Ads, Facebook Ads",
      "SEO and content marketing knowledge",
      "Analytics and reporting skills",
      "Portfolio of successful campaigns"
    ],
    responsibilities: [
      "Plan and execute digital campaigns",
      "Manage social media presence",
      "Optimize SEO and content strategy",
      "Analyze campaign performance",
      "Report on marketing metrics"
    ],
    benefits: [
      "Project-based flexibility",
      "Performance-based bonuses",
      "Access to premium marketing tools",
      "Diverse client exposure",
      "Potential for retainer agreements"
    ],
    salary: "₹15,000-50,000/project"
  },

  // University Program
  {
    id: "university-talent-program",
    title: "University Talent Development Program",
    department: "Talent Development",
    location: "Multiple Locations",
    type: "Internship",
    experience: "Students (Year 1-4)",
    description: "A strategic talent acquisition program for skilled students. Work part-time while studying and transition to full-time roles upon graduation.",
    requirements: [
      "Currently enrolled in any degree program",
      "Demonstrated skills in technology/relevant field",
      "No specific academic background required",
      "Strong problem-solving abilities",
      "Willingness to learn and adapt"
    ],
    responsibilities: [
      "Participate in skills-based training programs",
      "Support live projects in various capacities",
      "Learn from experienced team members",
      "Progress through increasing responsibility levels",
      "Balance work commitments with academic schedule"
    ],
    benefits: [
      "Progressive stipend structure (₹6K to ₹20K+)",
      "University benefits (free lunch, transport)",
      "Practical industry experience",
      "Mentorship from senior professionals",
      "Direct pathway to full-time employment"
    ],
    field: "Multiple Tracks Available"
  }
];