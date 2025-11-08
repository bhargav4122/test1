// This file contains detailed information about each service
export const serviceDetails = {
  
  
  
   // Active Services (Fully launched and available)
    //title: 'Core Data and Cloud Services'
    // ID: 'core-data-cloud',
    
    "core-data-cloud": {
    
    title: "Core Data and Cloud Services",
    subtitle: "Enterprise-grade data engineering, AI-ready infrastructure, and cloud innovation—built for growth.",  
    overview: "Our Cloud Infrastructure services provide scalable, secure, and flexible cloud solutions that help businesses optimize their operations, reduce costs, and increase agility. We offer comprehensive cloud architecture design, migration strategies, and ongoing management to ensure your cloud environment meets your specific business requirements.",
    description: "At Business and Data Solutions Ltd., we help businesses unlock the full potential of their data with scalable, secure, and future-proof cloud solutions. Whether you need real-time analytics, AI integration, or seamless cloud migration, we design systems that reduce costs, boost efficiency, and drive smarter decisions.",
   
    benefits: [
      "📈 Trusted by companies scaling their data infrastructure",
      "🛠️ End-to-end implementation—from strategy to automation",
      "🔐 Built with security, compliance, and governance in mind",
      "Reduced operational costs through optimized resource allocation",
      "Enhanced scalability to handle varying workloads",
      "Improved disaster recovery and business continuity",
      "Increased security through advanced protection measures",
      "Simplified IT management and maintenance"
    ],
    subServices:[
      {
        "id": "modern-data-pipelines",
        "title": "1️⃣ Modern Data Pipelines – Faster, Smarter Analytics",
        "description": "Eliminate bottlenecks with automated, real-time data flows.",
        "features": [
          " Real-time & batch processing (Kafka, Spark, Fabric Pipelines)",
          " Low-code ETL/ELT (Azure Data Factory, dbt, Databricks)",
          " ML-integrated workflows (feature engineering, model deployment)",
          " Proactive monitoring & alerts (Data Dog, OpenTelemetry)"
        ],
        "testimonial": "🚀 *\"Reduced pipeline delays by 70% for a retail client using Fabric real-time streaming.\"*"
      },
      {
        "id": "data-integration",
        "title": "2️⃣ Seamless Data Integration – One Source of Truth",
        "description": "Connect all your data sources without the chaos.",
        "features": [
          "  Microsoft Fabric & OneLake (unify data across clouds)",
          "  CDC & real-time sync (Debezium, GoldenGate)",
          "  Auto-ingestion for databases, APIs, IoT",
          "  Governed data sharing (Unity Catalog, Purview)"
        ],
        "testimonial": "🚀 *\"Integrated 20+ ERP/CRM systems for a financial firm, cutting reporting time by 50%.\"*"
      },
      {
        "id": "data-warehousing",
        "title": "3️⃣ Cloud Data Warehousing & Lakehouses – Analytics at Scale",
        "description": "Query petabytes in seconds with a future-proof setup.",
        "features": [
          "  Lakehouse architecture (Delta Lake, Fabric, Databricks)",
          "  Serverless & cost-optimized (Snowflake, BigQuery, Synapse)",
          "  AI-ready semantic models (Power BI Direct Lake, dbt metrics)"
        ],
        "testimonial": "🚀 *\"Cut data warehouse costs by 40% while improving query speed for a healthcare client.\"*"
      },
      {
        "id": "ai-ml-engineering",
        "title": "4️⃣ AI & ML Data Engineering – Power Your Models",
        "description": "Build, deploy, and scale AI with production-ready data.",
        "features": [
          "  Feature stores & vector DBs (Hopsworks, Pinecone)",
          "  LLM & RAG pipelines (Azure AI Search, Databricks)",
          "  MLOps automation (MLflow, Vertex AI)"
        ],
        "testimonial": "🚀 *\"Deployed a fraud detection model with 95% accuracy for a fintech startup.\"*"
      },
      {
        "id": "data-governance",
        "title": "5️⃣ Data Governance & Quality – Trust Your Data",
        "description": "Automated checks, lineage, and compliance.",
        "features": [
          "  Fabric Data Activator (anomaly detection)",
          "  Data contracts & policy-as-code (Great Expectations, OPA)",
          "  GDPR/HIPAA-ready security (Purview, Immuta)"
        ],
        "testimonial": "🚀 *\"Achieved 100% compliance audit success for a global e-commerce firm.\"*"
      },
      {
        "id": "cloud-migration",
        "title": "6️⃣ Cloud Migration & Optimization – Do More, Spend Less",
        "description": "Modernize without downtime.",
        "features": [
          "  Zero-downtime migrations (Snowflake, Fabric, AWS)",
          "  FinOps & cost monitoring (CloudHealth, Azure Cost Mgmt)",
          "  Green cloud strategies (carbon-aware computing)"
        ]
      }],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "AWS",
        description: "Full suite of Amazon Web Services including EC2, S3, Lambda, and more",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
          
      },
      {
        name: "Microsoft Azure",
        description: "Azure Virtual Machines, Azure Storage, Azure Functions, and more",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg"
      },
      {
        name: "Google Cloud Platform",
        description: "GCP Compute Engine, Cloud Storage, BigQuery, and more",
        logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original-wordmark.svg"
      },
      {
        name: "Kubernetes",
        description: "Container orchestration for automated deployment and scaling",
        logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original-wordmark.svg"
          

      },
      {
        name: "Docker",
        description: "Containerization platform for consistent deployments",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
      },
      {
        name: "Terraform",
        description: "Infrastructure as Code for automated provisioning",
        logo:"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original-wordmark.svg"
      }
    ],
    projects: {
      completed: [
        {
          title: "Financial Services Cloud Migration",
          description: "Successfully migrated a major financial institution's entire infrastructure to a hybrid cloud solution, reducing operational costs by 40%.",
          image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80",
          tags: ["AWS", "Hybrid Cloud", "Security", "Financial Services"]
        },
        {
          title: "E-commerce Platform Scaling",
          description: "Redesigned cloud architecture for an e-commerce platform to handle 10x traffic spikes during sales events without downtime.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
          tags: ["GCP", "Kubernetes", "Auto-scaling", "Retail"]
        },

        {
          title: "Manufacturing Data Hub",
          client: "Auto Parts Manufacturer",
          challenge: "Siloed data across 12 legacy systems",
          solution: [
              "Designed Azure Data Lake architecture",
              "Implemented Type 2 SCDs in Synapse",
              "Built Power BI semantic layer"
          ],
          "outcomes": [
              "Unified 2.3B records into single source",
              "Reduced reporting latency from days → minutes",
              "Enabled predictive maintenance"
          ],
          "image": "https://res.cloudinary.com/dsf4d41i8/image/upload/v1753060632/datahub_nscrgo.png",
          "tags": ["Data Lake", "SCD", "Semantic Layer"]
      },
      {
          "title": "Customer 360 Migration",
          "client": "National Bank",
          "challenge": "On-prem Teradata → Snowflake migration",
          "solution": [
              "Converted BTEQ scripts to dbt models",
              "Implemented data vault architecture",
              "Automated sensitive data masking"
          ],
          "outcomes": [
              "Migrated 58TB in 9 weekend windows",
              "Improved query performance 18x",
              "Achieved PCI DSS compliance"
          ],
          "image": "https://res.cloudinary.com/dsf4d41i8/image/upload/v1753060631/migration_10404445_dknvcj.png",
          "tags": ["Snowflake", "Data Vault", "Migration"]
      }
      ],
      ongoing: [
        {
          "title": "Real-Time Inventory Modeling",
          "client": "E-Commerce Giant",
          "challenge": "Hourly inventory discrepancies",
          "solution": [
              "Kafka → Flink streaming pipeline",
              "Dynamic pricing model in Databricks",
              "Redis caching layer for hot data"
          ],
          "outcomes": [
              "99.8% inventory accuracy",
              "Automated markdown decisions",
              "Real-time SKU tracking"
          ],
          "image": "https://images.unsplash.com/photo-1574170604718-5b5a3b5d914c?auto=format&fit=crop&q=80",
          "tags": ["Streaming", "ML Models", "Redis"],
          "progress": 75
      },
        {
          title: "Healthcare Data Platform",
          description: "Building a HIPAA-compliant cloud platform for healthcare data analytics and patient information management.",
          progress: 65,
          tags: ["Azure", "HIPAA Compliance", "Data Security", "Healthcare"]
        },
        {
          title: "Global Manufacturing IoT Hub",
          description: "Developing a centralized IoT hub in the cloud to connect manufacturing facilities across three continents.",
          progress: 40,
          tags: ["AWS IoT", "Edge Computing", "Real-time Analytics", "Manufacturing"]
        }
      ],
      upcoming: [
        {
          title: "Government Agency Cloud Transformation",
          description: "Comprehensive cloud transformation for a government agency, focusing on security and regulatory compliance.",
          startDate: "Q1 2025",
          tags: ["FedRAMP", "Hybrid Cloud", "Government", "Security"]
        },
        {
          title: "Multi-Cloud Strategy Implementation",
          description: "Implementing a sophisticated multi-cloud strategy for a Fortune 500 company to optimize costs and performance.",
          startDate: "Q2 2025",
          tags: ["Multi-Cloud", "Cost Optimization", "Enterprise"]
        }
      ]
    },

    case_studies: [
      {
          "title": "Dirty Data Cleanup",
          "challenge": "40% defect rate in CRM data",
          "solution": "Fuzzy matching + ML-based deduplication",
          "outcome": "99.1% clean customer records",
          "image": "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ba?auto=format&fit=crop&q=80"
      },
      {
          "title": "Legacy Model Transformation",
          "challenge": "Monolithic SAS models failing",
          "solution": "Modernized to PySpark ML pipelines",
          "outcome": "12x faster predictions",
          "image": "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80"
      }
   ],

    blogPosts: [
      {
        title: "The Future of Cloud Infrastructure: Trends to Watch",
        excerpt: "Explore the emerging trends shaping cloud infrastructure, including edge computing, serverless architectures, and AI integration.",
        image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80"
      },
      {
        title: "Securing Your Cloud: Best Practices for Modern Businesses",
        excerpt: "Implementing robust security measures in cloud environments requires a comprehensive approach. Learn about the latest security best practices.",
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80"
      },
      {
        title: "Cost Optimization Strategies for Cloud Infrastructure",
        excerpt: "Discover how to minimize cloud spending without sacrificing performance or reliability through effective resource management.",
        image: "https://images.unsplash.com/photo-1541323484797-549d5c0a9438?auto=format&fit=crop&q=80"
      }
    ]
  },

  //'Business Intelligence & Digital Transformation': 'bi-digital-transformation'
 
  "business-intelligence": {
    "title": "Business Intelligence & Analytics",
    "subtitle": "Transform data into actionable insights that drive growth",
    "overview": "Our BI services empower organizations to make data-driven decisions through powerful visualization, advanced analytics, and intelligent reporting. We bridge the gap between raw data and strategic action.",
    "description": "At Business and Data Solutions Ltd., we build enterprise-grade BI solutions that turn complex data into clear insights. From executive dashboards to embedded analytics, we create systems that improve decision velocity and operational efficiency across your organization.",
    
    "benefits": [
      "📊 Real-time visibility into business performance",
      "🔍 Self-service analytics for business users",
      "📈 Predictive insights through AI/ML integration",
      "🔄 Automated reporting that saves 80%+ time",
      "📱 Mobile-optimized dashboards for on-the-go access",
      "🔗 Embedded analytics for seamless application integration",
      "🛡️ Enterprise-grade security and governance",
      "📉 Cost reduction through data-driven optimization"
    ],
    
    "subServices": [
      {
        "id": "interactive-dashboards",
        "title": "1️⃣ Interactive Dashboards - Visualize What Matters",
        "description": "Custom-built dashboards tailored to your key metrics and workflows.",
        "features": [
          "Power BI, Tableau, or Looker implementation",
          "Executive-level KPI scorecards",
          "Department-specific operational views",
          "Drill-down capabilities for root cause analysis",
          "Automated data refresh schedules",
          "White-labeling for client-facing reports"
        ],
        "testimonial": "🚀 *\"Reduced monthly reporting time from 40 hours to 2 hours with automated dashboards for a manufacturing client.\"*"
      },
      {
        "id": "advanced-analytics",
        "title": "2️⃣ Advanced Analytics - Predict and Optimize",
        "description": "Go beyond basic reporting with predictive and prescriptive analytics.",
        "features": [
          "Forecasting models for demand planning",
          "What-if scenario analysis",
          "Anomaly detection systems",
          "Root cause analysis frameworks",
          "Statistical modeling (R, Python integration)",
          "AI-powered recommendations"
        ],
        "testimonial": "🚀 *\"Improved inventory accuracy by 35% through our demand forecasting models for a retail chain.\"*"
      },
      {
        "id": "embedded-analytics",
        "title": "3️⃣ Embedded Analytics - Insights Where You Work",
        "description": "Integrate analytics directly into your business applications.",
        "features": [
          "White-labeled analytics portals",
          "Application-native visualizations",
          "Secure data access controls",
          "Custom API integrations",
          "User-specific data filtering",
          "Actionable insight workflows"
        ],
        "testimonial": "🚀 *\"Increased platform engagement by 60% after embedding analytics into our client's SaaS product.\"*"
      },
      {
        "id": "data-storytelling",
        "title": "4️⃣ Data Storytelling - Communicate with Impact",
        "description": "Transform numbers into compelling narratives that drive action.",
        "features": [
          "Executive briefing packages",
          "Automated report distribution",
          "Annotation and commentary systems",
          "Presentation-ready data visualizations",
          "Collaborative analysis environments",
          "Mobile-friendly story formats"
        ],
        "testimonial": "🚀 *\"Helped a nonprofit secure $2M in additional funding through improved data storytelling of their impact metrics.\"*"
      }
    ],
    
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    
    "technologies": [
      {
        "name": "Power BI",
        "description": "Microsoft's leading business analytics platform",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powerbi/powerbi-original.svg"
      },
      {
        "name": "Tableau",
        "description": "Interactive data visualization software",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tableau/tableau-original.svg"
      },
      {
        "name": "Looker",
        "description": "Google Cloud's BI and data visualization platform",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
      },
      {
        "name": "SQL",
        "description": "Standard language for relational database management",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg"
      },
      {
        "name": "Python",
        "description": "Programming language for advanced analytics",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
      },
      {
        "name": "Databricks",
        "description": "Unified data analytics platform",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/databricks/databricks-original.svg"
      }
    ],
    
    "projects": {
      "completed": [
        {
          "title": "Retail Performance Dashboard Suite",
          "description": "Developed a comprehensive set of 15+ dashboards tracking sales, inventory, and customer metrics across 200 stores.",
          "image": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80",
          "tags": ["Retail", "Power BI", "Inventory Optimization"]
        },
        {
          "title": "Healthcare Provider Analytics Portal",
          "description": "Built a HIPAA-compliant analytics platform serving 5,000+ medical professionals with real-time patient data insights.",
          "image": "https://images.unsplash.com/photo-1579165466740-5041e0e49b28?auto=format&fit=crop&q=80",
          "tags": ["Healthcare", "Tableau", "Clinical Analytics"]
        }
      ],
      "ongoing": [
        {
          "title": "Financial Services Predictive Analytics",
          "description": "Implementing ML models to predict customer churn and lifetime value for a regional bank.",
          "progress": 65,
          "tags": ["Banking", "Machine Learning", "Customer Analytics"]
        }
      ],
      "upcoming": [
        {
          "title": "Manufacturing Quality Intelligence",
          "description": "Developing real-time defect detection analytics for an automotive parts supplier.",
          "startDate": "Q3 2025",
          "tags": ["IIoT", "Quality Control", "Real-time Analytics"]
        }
      ]
    },
    
    "caseStudies": [
      {
        "title": "Global Logistics: Fleet Optimization Analytics",
        "challenge": "Inefficient routing costing $1.2M annually in fuel waste",
        "solution": "Implemented geospatial analytics with live traffic data integration",
        "outcome": "18% reduction in fuel costs, 22% faster deliveries",
        "image": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80"
      }
    ],
    
    "blogPosts": [
      {
        "title": "The Art of Dashboard Design: Principles for Maximum Impact",
        "excerpt": "How we design executive dashboards that get results, not just glances.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
      }
    ]
  },

  "digital-transformation": {
    "title": "Digital Transformation Services",
    "subtitle": "Modernize your business for the digital age",
    "overview": "We guide organizations through comprehensive digital transformation journeys - from strategy development to technology implementation and change management. Our approach balances innovation with practical execution.",
    "description": "At Business and Data Solutions Ltd., we help enterprises reinvent their operations, customer experiences, and business models through strategic technology adoption. Whether modernizing legacy systems or building new digital capabilities, we ensure transformations deliver measurable value.",
    
    "benefits": [
    "⚡ 24-hour AI website deployment",
        "🤖 Custom chatbots deployed in 48 hours",
        "📱 WhatsApp Business integration ready in 72h",
        "💸 Market's lowest-cost rapid deployment",
        "🔄 Dual-track: quick wins + long-term strategy",
        "🌐 Complete digital footprint solutions",
        "📈 Enterprise modernization roadmaps",
        "🔌 Plug-and-play digital storefronts",
        "🔐 Enterprise-grade security",
        "🛠️ Custom solution development",
        "📊 Advanced analytics integration",
        "🤝 Dedicated account management"
    ],
    
    "subServices": [
      {
        "id": "digital-strategy",
        "title": "1️⃣ Digital Strategy & Roadmapping",
        "description": "Create a clear path from current state to digital future.",
        "features": [
          "Digital maturity assessments",
          "Technology landscape analysis",
          "Business case development",
          "Prioritization frameworks",
          "Investment roadmaps",
          "Transformation OKRs"
        ],
        "testimonial": "🚀 *\"Helped a 100-year-old manufacturer identify $15M in digital opportunities through our strategic assessment.\"*"
      },
      {
      "id": "ai-website-factory",
      "title": "2️⃣ AI Website Factory - Live in 24 Hours",
      "description": "AI-generated business websites with human refinement.",
      "features": [
        "AI site builder with 1000+ templates",
        "1-day deployment guarantee",
        "Mobile-optimized design",
        "SEO pre-configured",
        "Basic hosting included",
        "Content generation tools",
        "E-commerce ready (Shopify Lite)",
        "Analytics dashboard",
        "£499 launch special (normally £1,500)"
      ],
      "testimonial": "🚀 *\"Had a professional website live before our first sales call - game changer!\" - Startup Founder*",
      "deliveryTime": "24-48 hours",
      "priceRange": "£499-£1,999"
    },
    {
      "id": "chatbot-factory",
      "title": "3️⃣ AI Chatbot Factory - Deploy in 48 Hours",
      "description": "Custom AI assistants for your business.",
      "features": [
        "WhatsApp Business integration",
        "Website chat widget",
        "Facebook Messenger connector",
        "24/7 customer queries handling",
        "Basic FAQ training included",
        "Human handoff capability",
        "Monthly performance reports",
        "£299 setup (then £99/month)"
      ],
      "testimonial": "🚀 *\"Handles 80% of customer queries before they reach our team.\" - E-commerce Store*",
      "deliveryTime": "48-72 hours",
      "priceRange": "£299 setup + £99/month"
    },
      {
      "id": "digital-presence-kit",
      "title": "4️⃣ Complete Digital Presence Kit",
      "description": "Everything needed to go digital in one week.",
      "features": [
        "AI-generated website",
        "Google Business profile setup",
        "Basic SEO implementation",
        "Social media auto-posting",
        "Email marketing setup",
        "Review management system",
        "Analytics dashboard",
        "£1,799 all-inclusive package"
      ],
      "testimonial": "🚀 *\"Went from zero to complete digital presence in 5 business days.\" - Local Service Business*",
      "deliveryTime": "5-7 days",
      "priceRange": "£1,799 one-time"
    },
       {
      "id": "process-automation",
      "title": "5️⃣ Intelligent Process Automation",
      "description": "Eliminate manual work through RPA and AI.",
      "features": [
        "Process discovery assessment",
        "RPA bot development",
        "Document processing AI",
        "Workflow orchestration",
        "Exception handling",
        "Center of Excellence setup",
        "Continuous improvement"
      ],
      "testimonial": "🚀 *\"Automated 85% of invoice processing, reducing errors by 95%.\" - Logistics Client*"
    },
    {
      "id": "data-modernization",
      "title": "6️⃣ Data Modernization",
      "description": "Unlock value from your data assets.",
      "features": [
        "Data architecture redesign",
        "Modern data platform implementation",
        "Data governance framework",
        "Real-time analytics enablement",
        "AI/ML readiness assessment",
        "Data monetization strategies"
      ],
      "testimonial": "🚀 *\"Reduced time-to-insight from weeks to minutes with our modern data platform.\" - Healthcare Provider*"
    },
    {
      "id": "enterprise-mobility",
      "title": "7️⃣ Enterprise Mobility",
      "description": "Empower your workforce with mobile solutions.",
      "features": [
        "Field service applications",
        "Mobile asset tracking",
        "Offline-capable apps",
        "Mobile device management",
        "Location-based services",
        "Augmented reality interfaces",
        "Mobile security solutions"
      ],
      "testimonial": "🚀 *\"Field technicians complete 30% more jobs daily with our mobile work order system.\" - Utility Company*"
    },
    {
      "id": "ecommerce-solutions",
      "title": "8️⃣ E-Commerce Transformation",
      "description": "Build digital commerce capabilities.",
      "features": [
        "Platform selection",
        "Headless commerce architecture",
        "Payment gateway integration",
        "Personalization engines",
        "Omnichannel fulfillment",
        "Subscription models",
        "Marketplace integrations"
      ],
      "testimonial": "🚀 *\"Online sales grew 210% in first year post-transformation.\" - Specialty Retailer*"
    },
  
    {
      "id": "change-management",
      "title": "9️⃣ Change Management & Adoption",
      "description": "Ensure successful transformation outcomes.",
      "features": [
        "Impact assessment",
        "Stakeholder alignment",
        "Training programs",
        "Communication plans",
        "Adoption metrics",
        "Continuous feedback loops",
        "Benefits realization"
      ],
      "testimonial": "🚀 *\"Achieved 98% user adoption on our new platform through comprehensive change management.\" - Insurance Provider*"
    }
    
   
    
    ],
    
    "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80",
    
    "technologies": [
      {
        "name": "Cloud Platforms",
        "description": "AWS, Azure, GCP for scalable infrastructure",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg"
      },
     
      {
        "name": "Low-Code",
        "description": "OutSystems, Mendix for rapid application development",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mendix/mendix-original.svg"
      },
      {
        "name": "ERP/CRM",
        "description": "SAP, Salesforce, Dynamics 365 modernization",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/salesforce/salesforce-original.svg"
      },
      
      {
        "name": "IoT",
        "description": "Connected devices and edge computing",
        "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg"
      },
       {
      "name": "AI Website Builders",
      "description": "Durable, Wix ADI, Framer AI",
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ai/ai-original.svg"
    },
    {
      "name": "Chatbot Platforms",
      "description": "Dialogflow, ManyChat, Landbot",
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chatbot/chatbot-original.svg"
    },
    {
      "name": "WhatsApp Business API",
      "description": "Cloud-based messaging",
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/whatsapp/whatsapp-original.svg"
    },
    
    {
      "name": "RPA",
      "description": "UiPath, Automation Anywhere, Power Automate",
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/uipath/uipath-original.svg"
    },
    {
      "name": "React/React Native",
      "description": "Modern web and mobile development",
      "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
   
  
  
        {
          "name": "Shopify",
          "useCase": "E-commerce storefronts",
          "logo": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg"
        }
    ],
    
    "projects": {
      "completed": [
        {
          "title": "Banking Digital Transformation",
          "description": "Modernized core banking systems and launched AI-powered chatbots serving 500K+ customers.",
          "image": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80",
          "tags": ["Core Banking", "Chatbots", "Process Automation"]
        },
        {
        "title": "100 Websites in 100 Days",
        "description": "Special initiative delivering AI-built sites to SMBs in under 24h each",
        "results": [
          "Avg. launch time: 18 hours",
          "Cost: 60% below market",
          "Client satisfaction: 4.9/5"
        ],
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      }
      ],
      "ongoing": [
        {
          "title": "Manufacturing 4.0 Initiative",
          "description": "Implementing IoT and digital twin technology across 5 production facilities.",
          "progress": 55,
          "tags": ["Industry 4.0", "Digital Twin", "Smart Factory"]
        }
      ],
      "upcoming": [
        {
          "title": "Healthcare Digital Front Door",
          "description": "Creating unified patient experience across web, mobile, and kiosk touchpoints.",
          "startDate": "Q4 2025",
          "tags": ["Patient Experience", "Omnichannel", "Healthcare"]
        }
      ]
    },
    
    "caseStudies": [
      {
        "title": "Insurance Claims Automation",
        "challenge": "Manual claims processing taking 7+ days per claim",
        "solution": "Implemented RPA + AI document processing",
        "outcome": "Reduced processing to <24 hours with 99% accuracy",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      },

      {
      "title": "Local Restaurant Digital Makeover",
      "challenge": "No online presence, losing to competitors",
      "solution": [
        "AI website deployed in 18 hours",
        "WhatsApp ordering bot in 3 days",
        "Google Business optimization"
      ],
      "outcome": [
        "Online orders increased by 300%",
        "80% of reservations via chatbot",
        "Recovered investment in 2 weeks"
      ],
      "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
    },
     {
      "title": "Insurance Claims Automation",
      "challenge": "Manual processing taking 7+ days per claim",
      "solution": "Implemented RPA + AI document processing",
      "outcome": "Reduced processing to <24 hours with 99% accuracy",
      "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
    },
     {
        "category": "Rapid Deployment",
        "title": "Local Restaurant Chain Digital Launch",
        "challenge": "No online ordering system, losing to competitors",
        "solution": [
          "AI website with menu/ordering (24h)",
          "WhatsApp ordering bot (48h)",
          "Google Business optimization"
        ],
        "results": [
          "Online orders: 0 → 35% of revenue",
          "80% of reservations via chatbot",
          "ROI in 11 days"
        ],
        "image": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80"
      },
      {
        "category": "Enterprise",
        "title": "Banking Customer Service Transformation",
        "challenge": "High call center volumes, long wait times",
        "solution": [
          "AI chatbot handling 65% of queries",
          "Voice-enabled virtual assistant",
          "CRM integration"
        ],
        "results": [
          "Call center costs reduced by 40%",
          "Customer satisfaction +25 NPS",
          "98% chatbot accuracy rate"
        ],
        "image": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80"
      }
    ],
    
    "blogPosts": [
      {
        "title": "The Human Side of Digital Transformation",
        "excerpt": "Why 70% of transformations fail (and how to avoid it)",
        "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
      }
      
    ]
  },

//'Business Consulting': 'business-consulting',

  "business-consulting": {
    "overview": "Our Business Consulting services help organizations navigate complex challenges, optimize operations, and drive sustainable growth. We combine industry expertise, data-driven insights, and proven methodologies to deliver tailored solutions that transform businesses and create competitive advantages.",
    "benefits": [
      "Strategic clarity and actionable roadmaps",
      "Operational efficiency improvements",
      "Market expansion and growth strategies",
      "Organizational restructuring expertise",
      "Risk mitigation and change management",
      "Performance measurement frameworks"
    ],
    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",




    subServices: [
      {
        "id": "strategy-consulting",
        "title": "1️⃣ Business Strategy Consulting – Future-Proof Your Growth",
        "description": "Data-driven strategic planning to outperform competitors and adapt to market changes.",
        "features": [
          "  Market analysis & competitive intelligence",
          "  Business model innovation frameworks",
          "  Scenario planning & risk assessment",
          "  Digital transformation roadmaps",
          "  M&A due diligence support",
          "  OKR/KPI alignment workshops"
        ],
        "technologies": ["McKinsey Strategy Tools", "BCG Matrix", "SWOT AI", "Tableau Strategy Dashboards", "Gartner Insights"],
        "projectCount": 36,
        "completedProjects": 28,
        "projects": {
          "completed": [
            {
              "client": "Mid-Market Retail Chain",
              "description": [
                "Conducted full market positioning analysis",
                "Redesigned omnichannel strategy",
                "Implemented balanced scorecard framework"
              ],
              "duration": "5 months",
              "result": "Achieved 22% revenue growth in Year 1 post-implementation"
            }
          ],
          "current": [
            {
              "client": "Healthcare Startup",
              "description": [
                "Developing market entry strategy for EU expansion",
                "Building investor pitch materials",
                "Designing partnership ecosystem"
              ],
              "status": "Phase 2 of 3"
            }
          ]
        },
        "testimonial": "🚀 *\"Our market share grew from 12% to 19% in 18 months following their strategic recommendations.\"*"
      },
      {
        "id": "operational-excellence",
        "title": "2️⃣ Operational Excellence – Streamline for Efficiency",
        "description": "Eliminate waste and optimize processes across your organization.",
        "features": [
          "  End-to-end process mapping (VSM)",
          "  Lean Six Sigma implementation",
          "  Supply chain optimization",
          "  Digital workflow automation",
          "  Center of Excellence setup",
          "  Continuous improvement programs"
        ],
        "technologies": ["Celonis Process Mining", "UiPath Automation", "SAP Signavio", "Microsoft Process Advisor", "Minitab"],
        "projectCount": 29,
        "completedProjects": 23,
        "projects": {
          "completed": [
            {
              "client": "Manufacturing Firm",
              "description": [
                "Identified $1.2M in annual waste through process mining",
                "Implemented TPM program across 3 plants",
                "Automated 15 legacy workflows"
              ],
              "duration": "7 months",
              "result": "28% improvement in OEE (Overall Equipment Effectiveness)"
            }
          ]
        },
        "testimonial": "🚀 *\"Reduced production lead time by 40% while maintaining quality standards.\"*"
      },
      {
        "id": "change-management",
        "title": "3️⃣ Change Management – Drive Successful Adoption",
        "description": "Ensure smooth transitions during transformations with people-first approaches.",
        "features": [
          "  Change impact assessments",
          "  Stakeholder alignment workshops",
          "  Leadership coaching",
          "  Training program development",
          "  Adoption metrics dashboards",
          "  Resistance management strategies"
        ],
        "technologies": ["Prosci ADKAR", "Kotter 8-Step", "Microsoft Viva Insights", "WalkMe", "Whatfix"],
        "projectCount": 18,
        "completedProjects": 14,
        "projects": {
          "completed": [
            {
              "client": "Financial Services",
              "description": [
                "Managed ERP migration impacting 1,200+ users",
                "Developed role-specific learning paths",
                "Created change champion network"
              ],
              "duration": "6 months",
              "result": "Achieved 92% user adoption within first quarter"
            }
          ]
        },
        "testimonial": "🚀 *\"Their change management plan helped us avoid $500K+ in productivity losses during our SAP rollout.\"*"
      },
      {
        "id": "financial-advisory",
        "title": "4️⃣ Financial Advisory – Optimize Your Fiscal Health",
        "description": "Data-powered insights for smarter financial decisions.",
        "features": [
          "  FP&A process improvement",
          "  Cost reduction analysis",
          "  Investment prioritization",
          "  M&A financial modeling",
          "  Risk management frameworks",
          "  Cash flow optimization"
        ],
        "technologies": ["Anaplan", "Adaptive Insights", "Power BI Finance", "Tableau CRM", "SAP BPC"],
        "projectCount": 21,
        "completedProjects": 17,
        "testimonial": "🚀 *\"Identified $2.8M in annual cost savings opportunities we hadn't recognized.\"*"
      },
      {
        "id": "tech-advisory",
        "title": "5️⃣ Technology Advisory – Right-Size Your Tech Stack",
        "description": "Align technology investments with business outcomes.",
        "features": [
          "  IT roadmap development",
          "  Vendor selection & RFP support",
          "  Cloud strategy assessment",
          "  Data governance frameworks",
          "  Cybersecurity risk assessments",
          "  Tech ROI modeling"
        ],
        "technologies": ["Microsoft Cloud Adoption Framework", "AWS Well-Architected", "Gartner Magic Quadrant", "Forrester Tech Radar", "ISO 27001"],
        "projectCount": 24,
        "completedProjects": 19,
    "testimonial": "🚀 *\"Their vendor-neutral advice saved us from a $1.2M misguided ERP selection.\"*"
      },
      { 
        "id": "org-design",
        "title": "6️⃣ Organizational Design – Build for Agility",
        "description": "Create structures that enable innovation and efficiency.",
        "features": [
          "  Operating model redesign",
          "  Span-of-control optimization",
          "  Hybrid work strategy",
          "  Talent capability mapping",
          "  Agile team structuring",
          "  DEI integration"
        ]
   
      }
    ],
   
    "technologies": [
      {
        "name": "SWOT Analysis",
        "description": "Comprehensive evaluation of strengths, weaknesses, opportunities, and threats"
      },
      {
        "name": "OKR Framework",
        "description": "Objectives and Key Results methodology for goal-setting and execution"
      },
      {
        "name": "Business Process Reengineering",
        "description": "Radical redesign of core processes for dramatic improvements"
      },
      {
        "name": "Digital Maturity Assessment",
        "description": "Evaluation of technology adoption and transformation readiness"
      },
      {
        "name": "Scenario Planning",
        "description": "Strategic forecasting for multiple future possibilities"
      },
      {
        "name": "Value Chain Analysis",
        "description": "End-to-end examination of operational value creation"
      }
    ],
    "projects": {
      "completed": [
        {
          "title": "Global Retailer Turnaround Strategy",
          "description": "Developed and implemented a 3-year transformation plan that reversed declining sales, resulting in 12% revenue growth and 20% cost reduction.",
          "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
          "tags": ["Turnaround", "Retail", "Cost Optimization"]
        },
        {
          "title": "Healthcare Provider Operational Overhaul",
          "description": "Redesigned patient flow and staffing models across 8 hospitals, reducing wait times by 35% and increasing staff productivity by 22%.",
          "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
          "tags": ["Healthcare", "Process Improvement", "Lean Methodology"]
        }
      ],
      "ongoing": [
        {
          "title": "Manufacturing Company Market Expansion",
          "description": "Developing and executing Asia-Pacific entry strategy for industrial equipment manufacturer.",
          "progress": 60,
          "tags": ["Market Entry", "Manufacturing", "Globalization"]
        },
        {
          "title": "Financial Services Digital Transformation",
          "description": "Guiding a regional bank through core banking modernization and customer experience redesign.",
          "progress": 40,
          "tags": ["Banking", "Digital Strategy", "CX Design"]
        }
      ],
      "upcoming": [
        {
          "title": "Sustainability Strategy for Energy Company",
          "description": "Creating decarbonization roadmap and circular economy initiatives for oil/gas client.",
          "startDate": "Q3 2025",
          "tags": ["ESG", "Energy Transition", "Circular Economy"]
        },
        {
          "title": "Post-Merger Integration for Tech Firms",
          "description": "Facilitating cultural and operational integration of $2B acquisition.",
          "startDate": "Q4 2025",
          "tags": ["M&A", "Integration", "Change Management"]
        }
      ]
    },
    "blogPosts": [
      {
        "title": "The Consultant's Toolkit: Essential Frameworks for Modern Businesses",
        "excerpt": "An overview of the most valuable business analysis frameworks and when to apply them for maximum impact.",
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
      },
      {
        "title": "Navigating Disruption: How Consultants Add Value in Uncertain Times",
        "excerpt": "Case studies demonstrating how strategic consulting creates resilience during market shifts.",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      },
      {
        "title": "From Strategy to Execution: Bridging the Gap",
        "excerpt": "Why 70% of strategies fail in implementation and how to overcome common pitfalls.",
        "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
      }
    ],
    "caseStudies": [
      {
        "title": "Consumer Goods Company: Supply Chain Transformation",
        "results": "Reduced inventory costs by 28% while improving fulfillment rates",
        "image": "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80"
      },
      {
        "title": "Professional Services Firm: Partnership Model Redesign",
        "results": "Increased partner productivity by 35% and reduced conflicts",
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
      }
    ],
    "specializations": [
      {
        "name": "Strategy Consulting",
        "icon": "📈"
      },
      {
        "name": "Operations Excellence",
        "icon": "⚙️"
      },
      {
        "name": "Organizational Design",
        "icon": "🏛️"
      },
      {
        "name": "Change Management",
        "icon": "🔄"
      },
      {
        "name": "Due Diligence",
        "icon": "🔍"
      }
    ]
  },
//'Market Research': 'market-research',


  "market-research": {
    "overview": "Decode Your Market, Define Your Future\n\nIn an era of rapid change, gut instinct isn’t enough. Our market research services deliver the intelligence you need to outmaneuver competitors and capture opportunities. We combine cutting-edge analytics with human-centric insights to reveal what’s happening now – and what’s coming next.",
    "benefits": [
      "Evidence-based strategy development",
      "Competitor benchmarking with predictive modeling",
      "Customer sentiment analysis at scale",
      "Emerging trend identification",
      "Product-market fit validation",
      "Regulatory and geopolitical risk assessment"
    ],
    "image": "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80",
    
      subServices: [
        {
          "id": "market-intelligence",
          "title": "1️⃣ Market Intelligence – Data-Driven Decision Making",
          "description": "Comprehensive market analysis to identify opportunities, threats, and competitive positioning.",
          "features": [
            "  Market sizing & segmentation analysis",
            "  Competitor benchmarking & profiling",
            "  Customer needs & pain point mapping",
            "  Emerging trend identification",
            "  Regulatory impact assessments",
            "  Market entry feasibility studies"
          ],
          "technologies": ["Statista", "Euromonitor", "Mintel", "CB Insights", "SEMrush", "SimilarWeb"],
          "projectCount": 42,
          "completedProjects": 35,
          "projects": {
            "completed": [
              {
                "client": "CPG Brand",
                "description": [
                  "Conducted 12-market comparative analysis",
                  "Identified 3 untapped customer segments",
                  "Mapped competitor product roadmaps"
                ],
                "duration": "4 months",
                "result": "Client launched 2 new products capturing 8% market share"
              }
            ],
            "current": [
              {
                "client": "Fintech Startup",
                "description": [
                  "Analyzing APAC market regulations",
                  "Developing competitor SWOT matrix",
                  "Modeling adoption curves for digital wallets"
                ],
                "status": "Phase 1 of 3"
              }
            ]
          },
          "testimonial": "🚀 *\"Their market sizing model helped us secure $15M in Series B funding with precise TAM calculations.\"*"
        },
        {
          "id": "consumer-insights",
          "title": "2️⃣ Consumer Insights – Understand Your Buyers",
          "description": "Deep dive into customer behaviors, preferences, and decision journeys.",
          "features": [
            "  Ethnographic field studies",
            "  Focus groups & in-depth interviews",
            "  Sentiment & social listening",
            "  Customer journey mapping",
            "  Pricing sensitivity analysis",
            "  Brand perception tracking"
          ],
          "technologies": ["Qualtrics", "Hotjar", "Brandwatch", "Nielsen IQ", "Dovetail", "Lookback"],
          "projectCount": 38,
          "completedProjects": 32,
          "projects": {
            "completed": [
              {
                "client": "Luxury Automotive",
                "description": [
                  "Conducted 50+ premium buyer interviews",
                  "Mapped emotional decision triggers",
                  "Identified under-served needs in EV segment"
                ],
                "duration": "6 months",
                "result": "Redesigned showroom experience increased conversions by 27%"
              }
            ]
          },
          "testimonial": "🚀 *\"Discovered our #1 customer complaint wasn't product quality - but confusing warranty terms!\"*"
        },
        {
          "id": "product-validation",
          "title": "3️⃣ Product Validation – Test Before You Invest",
          "description": "Reduce launch risk with rigorous concept testing and prototyping.",
          "features": [
            "  Concept viability scoring",
            "  Feature prioritization (Kano model)",
            "  MVP testing frameworks",
            "  A/B & multivariate testing",
            "  Packaging & naming studies",
            "  Price elasticity modeling"
          ],
          "technologies": ["UserTesting", "Optimal Workshop", "UsabilityHub", "PricingHub", "Figma Prototyping", "Conjoint.ly"],
          "projectCount": 29,
          "completedProjects": 24,
          "projects": {
            "completed": [
              {
                "client": "IoT Device Manufacturer",
                "description": [
                  "Tested 3 industrial design variants",
                  "Validated critical use cases",
                  "Identified must-have vs. nice-to-have features"
                ],
                "duration": "3 months",
                "result": "Avoided $2M tooling costs by eliminating low-value features"
              }
            ]
          },
          "testimonial": "🚀 *\"Their testing revealed our 'killer feature' ranked 7th in importance - saved us 9 months of R&D!\"*"
        },
        {
          "id": "trend-forecasting",
          "title": "4️⃣ Trend Forecasting – Stay Ahead of the Curve",
          "description": "Anticipate market shifts before they become mainstream.",
          "features": [
            "  Macro trend analysis (STEEP framework)",
            "  Early signal detection",
            "  Scenario planning workshops",
            "  Innovation opportunity mapping",
            "  Cultural trend decoding",
            "  Disruption risk assessment"
          ],
          "technologies": ["Gartner Hype Cycle", "CB Insights Trends", "WGSN", "Springwise", "Delphi Method", "Future Today Institute"],
          "projectCount": 19,
          "completedProjects": 15,
          "testimonial": "🚀 *\"Predicted the work-from-home tech surge 14 months before COVID hit.\"*"
        },
        {
          "id": "competitive-benchmarking",
          "title": "5️⃣ Competitive Benchmarking – Know Your Position",
          "description": "Systematic comparison against industry standards and rivals.",
          "features": [
            "  Feature-by-feature product teardowns",
            "  Pricing strategy analysis",
            "  Marketing message audits",
            "  Customer review mining",
            "  Patent & IP landscaping",
            "  Talent poaching analysis"
          ],
          "technologies": ["Crayon", "Kompyte", "SimilarWeb", "PatentSight", "Glassdoor Insights", "G2 Crowd"],
          "projectCount": 27,
          "completedProjects": 22,
          "testimonial": "🚀 *\"Identified 14 competitor weaknesses we exploited to gain 5 market share points.\"*"
        },
        {
          "id": "ux-research",
          "title": "6️⃣ UX Research – Optimize the Experience",
          "description": "Evidence-based improvements to digital and physical interactions.",
          "features": [
            "  Usability testing labs",
            "  Eye-tracking studies",
            "  Accessibility audits",
            "  Cognitive walkthroughs",
            "  Emotional response measurement",
            "  Multichannel experience mapping"
          ],
          "technologies": ["UserZoom", "Maze", "Hotjar", "Figma Mirror", "WebAIM", "Tobii Pro"],
          "projectCount": 31,
          "completedProjects": 26,
          "projects": {
            "completed": [
              {
                "client": "E-commerce Platform",
                "description": [
                  "Identified checkout friction points",
                  "Redesigned product discovery flow",
                  "Optimized mobile touch targets"
                ],
                "duration": "5 months",
                "result": "Increased conversion rate by 18% and reduced support tickets by 35%"
              }
            ]
          },
          "testimonial": "🚀 *\"Found the 'hidden' 47% cart abandonment reason our analytics couldn't detect.\"*"
        }
      ],
    


    "technologies": [
       
          {
            "name": "Neuromarketing Studies",
            "description": "Biometric testing (eye-tracking, EEG) for subconscious consumer reactions",
            "icon": "🧠"
          },
          {
            "name": "Ethnographic Research",
            "description": "In-context behavioral observation for unspoken needs",
            "icon": "👥"
          },
          {
            "name": "Conjoint Analysis",
            "description": "Trade-off modeling for product feature prioritization",
            "icon": "⚖️"
          },
          {
            "name": "Market Sizing",
            "description": "TAM/SAM/SOM analysis with scenario planning",
            "icon": "📊"
          },
          {
            "name": "Social Listening",
            "description": "AI-powered analysis of 50M+ unstructured data points",
            "icon": "👂"
          },
          {
            "name": "Competitor Intel",
            "description": "Dark web monitoring and patent tracking",
            "icon": "🕵️"
          },
          {
            "name": "Predictive Market Simulation",
            "description": "AI models that forecast adoption rates under different economic scenarios",
            "icon": "🎮"
          },
          {
            "name": "Blockchain Sentiment Tracking",
            "description": "Analyzing crypto/NFT communities for early trend signals",
            "icon": "⛓️"
          },
          {
            "name": "VR Focus Groups",
            "description": "Immersive product testing in digital twin environments",
            "icon": "👓"
          }
        ],

    "projects": {
      "completed": [
        {
      "title": "Market Opportunity Blueprint",
      "client": "Global Tech Inc.",
      "challenge": "Identifying untapped market segments in emerging economies",
      "solution": [
        "Developed machine learning models to analyze 5 years of market data",
        "Conducted field research in 12 target countries",
        "Created interactive visualization tools for decision makers"
      ],
      "outcomes": [
        "Identified $2.3B market opportunity in Southeast Asia",
        "Reduced market entry risk by 42%",
        "Accelerated go-to-market timeline by 9 months"
      ],
      "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      "tags": ["Market Analysis", "Data Visualization", "Machine Learning"]
    },
    {
      "title": "Customer Avatar Profiles",
      "client": "E-Commerce Platform",
      "challenge": "Lack of personalized marketing approach",
      "solution": [
        "Analyzed 500,000 customer journeys",
        "Developed 12 detailed persona models",
        "Created 3D-rendered visual representations"
      ],
      "outcomes": [
        "Increased conversion rate by 28%",
        "Reduced customer acquisition cost by 35%",
        "Won 2023 Digital Marketing Excellence Award"
      ],
      "image": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80",
      "tags": ["Customer Segmentation", "Persona Development", "3D Modeling"]
    },
      {
        "name":"competitive_intelligence",
         "title": "Beverage Market Disruption Analysis",
          "client": "Fortune 500 Drink Manufacturer",
          "challenge": "Identify emerging threats from startup competitors",
          "solution": [
            "Mapped 120+ DTC beverage launches using Crunchbase and Shopify API",
            "Analyzed 50K social mentions for sentiment shifts",
            "Conducted undercover product testing"
          ],
          "outcomes": [
            "Discovered 3 stealth competitors gaining 15% market share",
            "Recommended acquisition target (purchased for $320M)",
            "Redesigned flagship product based on startup packaging trends"
          ],
          "image": "https://images.unsplash.com/photo-1551029506-0807df4e2031?auto=format&fit=crop&q=80",
          "tags": ["Competitor Analysis", "DTC Trends", "M&A Strategy"]
        }
    ],
   "ongoing":[

   {
     "name":"competitive_intelligence",
     "title": "Beverage Market Disruption Analysis",
      "client": "Fortune 500 Drink Manufacturer",
      "challenge": "Identify emerging threats from startup competitors",
      "solution": [
        "Mapped 120+ DTC beverage launches using Crunchbase and Shopify API",
        "Analyzed 50K social mentions for sentiment shifts",
        "Conducted undercover product testing"
      ],
      "outcomes": [
        "Discovered 3 stealth competitors gaining 15% market share",
        "Recommended acquisition target (purchased for $320M)",
        "Redesigned flagship product based on startup packaging trends"
      ],
      "image": "https://images.unsplash.com/photo-1551029506-0807df4e2031?auto=format&fit=crop&q=80",
      "tags": ["Competitor Analysis", "DTC Trends", "M&A Strategy"],
      "timeline": {
        "phases": [
          {
            "name": "Market Research",
            "progress": 20,
            "completed": true,
            "description": "Competitor analysis completed"
          },
          {
            "name": "Product Testing",
            "progress": 40,
            "completed": true,
            "description": "3/5 tests completed"
          },
          {
            "name": "Consumer Surveys",
            "progress": 60,
            "current": true,
            "description": "Launching nationwide survey"
          },
          {
            "name": "Final Report",
            "progress": 80
          },
          {
            "name": "Client Presentation",
            "progress": 100
          }
        ],
        "currentProgress": 55 // Overall project %
      }
   
     },
     {
      
      "name": "market_trends",
      "title": "Green Energy Adoption Predictions",
      "client": "European Utility Provider",
      "challenge": "Forecast residential solar adoption for grid planning",
      "solution": [
        "Analyzed 15 years of policy changes and weather patterns",
        "Deployed AI to correlate energy prices with installation rates",
        "Surveyed 2,000 households with conjoint analysis"
      ],
      "outcomes": [
        "Predicted adoption within 2% accuracy of actuals",
        "Identified 3 underserved regional markets",
        "Informed $200M infrastructure investment"
      ],
      "image": "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80",
      "tags": ["Trend Forecasting", "Energy", "AI Modeling"],
      "progress": 40,
      "timeline": "Q1 2024 - Q4 2025",
    },
  
  
    {
      "name":"product_launch",
      "title": "Medical Device Market Entry",
      "client": "US MedTech Startup",
      "challenge": "Validate pricing for new surgical robot",
      "solution": [
        "Simulated purchase decisions with 300 surgeons",
        "Benchmarked against 17 competitor devices",
        "Mapped reimbursement codes across 8 countries"
      ],
      "outcomes": [
        "Identified optimal price band ($145K-$159K)",
        "Discovered untapped outpatient clinic segment",
        "Achieved 92% forecast accuracy for Year 1 sales"
      ],
      "image": "https://images.unsplash.com/photo-1579165466740-5041e0e49b28?auto=format&fit=crop&q=80",
      "tags": ["Pricing Strategy", "Healthcare", "Global Expansion"],
      "progress": 20,
      "timeline": "Q1 2025 - Q4 2026",
    }
   ],
    "upcoming": [
    {
      "title": "Future AI Implementation",
      "description": "Planned AI integration project",
      "startDate": "Q1 2026",
      "image": "https://images.unsplash.com/random?ai",
      "tags": ["AI", "Automation"]
    }
   ]
 

   },

    "case_studies": [
      {
        "title": "Beverage Category Disruption",
        "challenge": "A startup needed to identify whitespace in the crowded energy drink market",
        "solution": "Conducted biometric taste tests + social listening across 8 countries",
        "outcome": "Discovered untapped demand for adaptogen-infused drinks, leading to a $23M product line",
        "image": "https://images.unsplash.com/photo-1551029506-0807df4e2031?auto=format&fit=crop&q=80"
      },
      {
        "title": "Medical Device Market Entry",
        "challenge": "European manufacturer expanding to Asia-Pacific needed regulatory intelligence",
        "solution": "Mapped 142 local compliance requirements with reimbursement forecasts",
        "outcome": "Optimized market sequencing, avoiding 2 high-risk countries",
        "image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
      }
    ],

 

    "blogPosts": [
      {
        "title": "The Dark Data Goldmine: What Your CRM Isn’t Telling You",
        "excerpt": "How we uncovered a $4M opportunity in unused customer service logs",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      },
      {
        "title": "When Big Data Fails: Why We Still Need Human Researchers",
        "excerpt": "Case study: How ethnographic research corrected AI’s cultural blind spots",
        "image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80"
      }
    ]
  },

  //title: 'Consumer Voice Services'
// ID:'consumer-voice',

"consumer-voice": {
  overview: "Our Consumer Voice services help businesses understand and respond to customer feedback more effectively. We employ advanced analytics and sentiment analysis to capture authentic customer experiences, enabling you to make customer-centric improvements to your products and services.",
  benefits: [
    "Enhanced understanding of customer needs and expectations",
    "Identification of improvement opportunities in products and services",
    "Reduced customer churn through proactive issue resolution",
    "Competitive advantage through customer-driven innovation",
    "Stronger brand loyalty and customer advocacy"
  ],
  image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&q=80",
subServices: [
      {
        "id": "mystery-shopping",
        "title": "1️⃣ Ghost Inspector Program – Undercover Experience Audits",
        "description": "Trained evaluators document real customer journeys with forensic detail across all touchpoints.",
        "features": [
          "  Anonymous service quality assessments",
          "  Compliance checks (health/safety standards)",
          "  Staff performance benchmarking",
          "  Competitive cross-checks",
          "  Emergency scenario testing",
          "  Accessibility compliance audits"
        ],
        "methodologies": [
          "ISO 22488 Mystery Shopping Standards",
          "ServQual Framework",
          "Discreet Audio/Video Capture",
          "Behavioral Scoring Matrix",
          "Time-Motion Studies"
        ],
        "technologies": [
          "Custom Encrypted Reporting App",
          "AI-Powered Voice Tone Analysis",
          "Discreet Body Cameras",
          "Real-Time GPS Check-Ins",
          "Blockchain-Verified Reports"
        ],
        "projectCount": 87,
        "completedProjects": 76,
        "caseStudies": [
          {
            "client": "International Hotel Chain",
            "findings": [
              "27% variance in check-in experience across locations",
              "Housekeeping compliance gaps in 40% of rooms",
              "15min avg. wait time for restaurant seating"
            ],
            "actions": [
              "Redesigned staff training modules",
              "Implemented RFID room cleanliness verification",
              "Deployed digital queue management"
            ],
            "result": "Achieved 22% higher TripAdvisor ratings in 6 months"
          }
        ],
        "testimonial": "🕵️♂️ *\"Your ghost testers caught our concierge recommending competitors - something no survey would ever reveal.\"*"
      },
      {
        "id": "sentiment-mining",
        "title": "2️⃣ Emotional Pulse Tracking – Beyond Star Ratings",
        "description": "AI-driven analysis of verbal/non-verbal cues across feedback channels.",
        "features": [
          "  Call center voice stress analysis",
          "  Facial expression coding (for in-person feedback)",
          "  Complaint escalation pattern detection",
          "  Silent customer churn prediction",
          "  Emotive language decoding"
        ],
        "technologies": [
          "Affectiva Emotion AI",
          "CallMiner Eureka",
          "Medallia Speech Analytics",
          "IBM Watson Tone Analyzer",
          "Clarabridge NLP"
        ],
        "hospitalityInsights": {
          "restaurants": [
            "Detect menu item disappointment before complaints",
            "Server empathy scoring",
            "Noise level impact analysis"
          ],
          "hotels": [
            "True pillow preference mapping",
            "Turndown service sentiment",
            "Pool area frustration points"
          ]
        },
        "healthcareApplications": [
          "ER wait time stress indicators",
          "Discharge instruction confusion detection",
          "Empathy gap identification in patient interactions"
        ]
      },
      {
        "id": "real-time-feedback",
        "title": "3️⃣ Moment-of-Truth Capture – Instant Experience Sampling",
        "description": "Micro-feedback at critical journey points via discreet methods.",
         "features": [
          "  Contextual SMS/App Pulse Surveys",
          "  Post-Call IVR Snapshot",
          "  In-App Behavioral Nudges",
          "  Transactional Email Micro-Surveys",
          "  IoT-Triggered Feedback"
        ],
        "feedbackDevices": [
          {
            "type": "Tabletop NFC Tappers",
            "useCase": "Restaurant dish rating (3-second tap)"
          },
          {
            "type": "Bathroom Mirror Sensors",
            "useCase": "Hotel cleanliness satisfaction (smile/frown detection)"
          },
          {
            "type": "Disposable Wristband Buttons",
            "useCase": "Hospital pain management feedback"
          }
        ],
        "responseRates": "82% (vs. 14% for email surveys)",
        "sampleProject": {
          "client": "Airport Lounge",
          "implementation": [
            "Installed 150+ seat sensors detecting fidgeting (discomfort proxy)",
            "Mini-feedback kiosks at premium drink stations",
            "Toilet stall emergency alert buttons"
          ],
          "outcome": "Reduced complaint escalation by 63% through immediate service recovery"
        }
      },
      {
        "id": "employee-feedback",
        "title": "4️⃣ Frontline Intelligence – Staff-Reported Insights",
        "description": "Structured channels for service teams to surface customer truths.",
        "features": [
          "Anonymous staff observation reporting",
          "Customer Quote of the Day programs",
          "Shift handover insight logs",
          "AI-powered suggestion boxing",
          "Whistleblower protection protocols"
        ],
        "hospitalityCase": {
          "client": "Casino Resort",
          "findings": [
            "High rollers disliked birthday acknowledgments",
            "VIP guests preferred invisible service",
            "Complaints peaked during shift changes"
          ],
          "impact": "Redesigned 57 high-touch service protocols"
        },
        "healthcareCase": {
          "client": "Children's Hospital",
          "findings": [
            "Parents avoided complaining about rude staff",
            "Siblings felt excluded in patient rooms",
            "Discharge instructions caused anxiety"
          ],
          "impact": "Created family advocate role and visual discharge comics"
        }
      },
      {
        "id": "predictive-complaints",
        "title": "5️⃣ Complaint Forecasting – Prevent Issues Before They Happen",
        "description": "Machine learning models predicting likely feedback based on operational data.",
         "features": [
          "Operational Data Fusion Engine",
          "Pre-Complaint Alert System",
          "Root Cause Propensity Modeling",
          "At-Risk Customer Identification",
          "Proactive Resolution Orchestration"
        ],
        "predictiveModels": [
          {
            "name": "Restaurant Complaint Predictor",
            "inputs": [
              "Kitchen ticket times",
              "Server shift length",
              "Menu item 86'ing frequency",
              "Party size variance"
            ],
            "accuracy": "89% in predicting 1-star reviews"
          },
          {
            "name": "Hotel Noise Complaint Engine",
            "inputs": [
              "Elevator usage patterns",
              "Convention group arrivals",
              "Room proximity matrices",
              "HVAC maintenance logs"
            ],
            "accuracy": "76% prediction rate 3hrs in advance"
          }
        ],
        "interventionProtocols": [
          "Preemptive dessert comps for delayed meals",
          "Automatic room moves before noise complaints",
          "Just-in-time staff reinforcements"
        ]
      }
    ],
    "specialCapabilities": {
      "regulatoryCompliance": [
        "HIPAA-compliant healthcare feedback",
        "GDPR-safe emotion tracking",
        "TABC alcohol service monitoring"
      ],
      "covertTechnologies": [
        "Lip-reading AI for noisy environments",
        "Stealth thermal sensors (beverage temp checks)",
        "Augmented reality menu defect reporting"
      ],
      "certifications": [
        "CXPA Certified Feedback Professionals",
        "FDA-compliant medical experience auditing",
        "Michelin Inspector-trained evaluators"
      ],
  technologies: [
    {
      name: "Sentiment Analysis",
      description: "AI-powered tools to understand emotional content in feedback"
    },
    {
      name: "Natural Language Processing",
      description: "Automated analysis of text-based customer feedback"
    },
    {
      name: "Speech Analytics",
      description: "Voice data analysis for call center interactions"
    },
    {
      name: "Survey Tools",
      description: "Customized feedback collection across multiple channels"
    },
    {
      name: "CX Platforms",
      description: "Comprehensive customer experience management solutions"
    },
    {
      name: "Social Listening",
      description: "Monitoring and analysis of social media conversations"
    }
  ],
  projects: {
    completed: [
      {
        title: "Retail Customer Feedback Transformation",
        description: "Implemented an omnichannel feedback system for a retail chain, resulting in a 22% increase in customer satisfaction.",
        image: "https://images.unsplash.com/photo-1512203492609-972c16baa28b?auto=format&fit=crop&q=80",
        tags: ["Retail", "Omnichannel", "Customer Satisfaction"]
      },
      {
        title: "Hospitality Voice of Customer Program",
        description: "Developed a comprehensive VoC program for a hotel chain, increasing guest retention by 18% and positive reviews by 35%.",
        image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&q=80",
        tags: ["Hospitality", "Guest Experience", "Sentiment Analysis"]
      }
    ],
    ongoing: [
      {
        title: "Banking Customer Journey Mapping",
        description: "Creating detailed customer journey maps with feedback integration points for a major financial institution.",
        progress: 60,
        tags: ["Financial Services", "Journey Mapping", "CX Design"]
      },
      {
        title: "Healthcare Patient Voice Platform",
        description: "Building a HIPAA-compliant platform to collect and analyze patient feedback across multiple touchpoints.",
        progress: 45,
        tags: ["Healthcare", "Patient Experience", "Compliance"]
      },
      {
        title: "AI Complaint Resolution",
        client: "Telecom Giant",
        challenge: "1.2M monthly support calls",
        solution: [
            "Azure Speech-to-Text conversion",
            "Automatic ticket categorization",
            "Proactive service recovery bots"
        ],
        outcomes: [
            "38% reduction in call volume",
            "91% automated resolution rate",
            "$4.2M annual savings"
        ],
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ba?auto=format&fit=crop&q=80",
        tags: ["Telecom", "AI", "Automation"],
        progress: 80
    }
    ],
    upcoming: [
      
      {
        title: "Airline Passenger Experience Initiative",
        description: "Comprehensive voice of customer program for an international airline focusing on real-time feedback and service recovery.",
        startDate: "Q1 2025",
        tags: ["Travel", "Real-time Feedback", "Service Recovery"]
      },
      {
        title: "Telecom Customer Retention Strategy",
        description: "Data-driven customer retention strategy based on voice of customer insights and predictive churn analysis.",
        startDate: "Q2 2025",
        tags: ["Telecommunications", "Churn Reduction", "Predictive Analytics"]
      },
      {
        title: "Metaverse Feedback System",
        description: "Collecting voice data in VR environments",
        startDate: "Q3 2024",
        image: "https://images.unsplash.com/photo-1589652717521-10c0d09dea59?auto=format&fit=crop&q=80",
        tags: ["VR", "Web3", "CX"]
    }
]
},


  blogPosts: [
    {
      title: "When Customers Lie",
      excerpt: "How voice biomarkers reveal hidden truths in surveys",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
  },
  {
      title: "The Whisper Index",
      excerpt: "Predicting recessions from support call anxiety levels",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  },
    {
      title: "The Evolution of Consumer Voice in Business Strategy",
      excerpt: "How customer feedback has evolved from suggestion boxes to strategic business intelligence driving organizational decisions.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80"
    },
    {
      title: "From Feedback to Action: Closing the Loop",
      excerpt: "Strategies for effectively translating customer feedback into meaningful business improvements and communicating changes back to customers.",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80"
    },
    {
      title: "Measuring the ROI of Voice of Customer Programs",
      excerpt: "Practical approaches to quantifying the business impact of consumer voice initiatives and securing ongoing organizational support.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80"
    }
  ]
},

},
  //title: 'Workforce Solutions', 'Employee Solutions': 'employee-solutions',

"workforce-solutions": {
    "overview": "Strategic Staffing & Talent Acquisition Solutions\n\nWe provide end-to-end workforce solutions that help businesses attract, recruit, and retain top talent. From AI-powered recruitment to flexible staffing models, we deliver the right people with the right skills to drive your business growth.",
    "benefits": [
      "40% faster hiring cycle times",
      "30% reduction in recruitment costs",
      "Access to pre-vetted qualified candidates",
      "Flexible staffing for changing business needs",
      "Reduced employee turnover by 35%",
      "Improved workforce productivity and engagement"
    ],
    "image": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
    
    "subServices": [
      {
        "id": "talent-acquisition",
        "title": "1️⃣ AI-Powered Recruitment",
        "description": "End-to-end talent acquisition with intelligent candidate matching and screening.",
        "features": [
          "AI-driven candidate sourcing",
          "Automated resume screening",
          "Skills-based matching algorithms",
          "High-volume recruitment capabilities",
          "Candidate experience optimization",
          "Diversity and inclusion focused hiring"
        ],
        "technologies": ["Eightfold AI", "Phenom", "Beamery", "SeekOut", "Greenhouse", "Lever"],
        "projectCount": 67,
        "completedProjects": 58,
        "projects": {
          "completed": [
            {
              "client": "Tech Scale-Up",
              "description": [
                "Recruited 45 engineers in 3 months",
                "Implemented AI screening for technical roles",
                "Reduced time-to-hire from 42 to 16 days"
              ],
              "duration": "3 months",
              "result": "Saved $280K in recruitment costs"
            }
          ],
          "current": [
            {
              "client": "Healthcare Network",
              "description": [
                "Staffing 200+ clinical positions",
                "Implementing credential verification system",
                "Creating talent pipeline for specialized roles"
              ],
              "status": "Phase 2 of 4"
            }
          ]
        },
        "testimonial": "🚀 *\"They filled our critical tech roles in half the time with 40% better retention rates.\"*"
      },
      {
        "id": "flexible-staffing",
        "title": "2️⃣ Flexible Staffing Solutions",
        "description": "Agile workforce models for project-based and temporary staffing needs.",
        "features": [
          "Contract-to-hire placements",
          "Temporary staffing solutions",
          "Project-based team deployment",
          "Seasonal workforce management",
          "Specialized skill contractors",
          "Rapid scaling capabilities"
        ],
        "technologies": ["Upwork Enterprise", "Toptal", "Gigster", "Andela", "Gloat", "PRO Unlimited"],
        "projectCount": 52,
        "completedProjects": 45,
        "projects": {
          "completed": [
            {
              "client": "Retail Chain Expansion",
              "description": [
                "Staffed 15 new locations in 6 months",
                "Provided 200+ temporary retail staff",
                "Managed seasonal hiring peaks"
              ],
              "duration": "8 months",
              "result": "Enabled 30% faster market expansion"
            }
          ]
        },
        "testimonial": "🚀 *\"Their flexible staffing allowed us to scale for holiday season without permanent overhead.\"*"
      },
      {
        "id": "executive-search",
        "title": "3️⃣ Executive & Leadership Recruitment",
        "description": "Specialized search for leadership and hard-to-fill positions.",
        "features": [
          "C-level and director recruitment",
          "Competency-based assessment",
          "Cultural fit evaluation",
          "Market mapping and talent intelligence",
          "Discreet search capabilities",
          "Onboarding and integration support"
        ],
        "technologies": ["LinkedIn Recruiter", "HiredScore", "TalentWall", "Entelo", "SuccessFactors", "Workday"],
        "projectCount": 38,
        "completedProjects": 34,
        "testimonial": "🚀 *\"Found our perfect CTO in 6 weeks when other firms took 6 months with no results.\"*"
      },
      {
        "id": "recruitment-process",
        "title": "4️⃣ Recruitment Process Optimization",
        "description": "Streamline and enhance your hiring infrastructure and operations.",
        "features": [
          "Hiring process redesign",
          "Candidate journey mapping",
          "Interview training and calibration",
          "Employer branding enhancement",
          "Recruitment marketing strategy",
          "Analytics and performance tracking"
        ],
        "technologies": ["Ashby", "Lever", "Greenhouse", "Workable", "JazzHR", "Breezy HR"],
        "projectCount": 41,
        "completedProjects": 36,
        "projects": {
          "completed": [
            {
              "client": "Manufacturing Company",
              "description": [
                "Redesigned complete hiring workflow",
                "Trained 25 hiring managers",
                "Implemented candidate scoring system"
              ],
              "duration": "4 months",
              "result": "Reduced time-to-fill by 55%"
            }
          ]
        }
      },
      {
        "id": "workforce-planning",
        "title": "5️⃣ Strategic Workforce Planning",
        "description": "Data-driven workforce strategy and talent pipeline development.",
        "features": [
          "Workforce demand forecasting",
          "Skills gap analysis",
          "Talent pipeline development",
          "Succession planning",
          "Compensation benchmarking",
          "Market intelligence reports"
        ],
        "technologies": ["Visier", "ChartHop", "OneModel", "Orgnostic", "SAP SuccessFactors", "Oracle HCM"],
        "projectCount": 29,
        "completedProjects": 24,
        "testimonial": "🚀 *\"Their workforce planning helped us avoid a 40% skills gap during digital transformation.\"*"
      },
      {
        "id": "employer-branding",
        "title": "6️⃣ Employer Branding & Attraction",
        "description": "Build compelling employer value proposition to attract top talent.",
        "features": [
          "Employer brand strategy",
          "Career site optimization",
          "Recruitment marketing campaigns",
          "Employee value proposition development",
          "Social media recruitment strategy",
          "Candidate experience design"
        ],
        "technologies": ["LinkedIn Talent Insights", "Glassdoor", "Indeed", "Hootsuite", "HubSpot", "Google Analytics"],
        "caseStudy": {
          "client": "Financial Services Firm",
          "impact": "Increased qualified applications by 300% and reduced cost-per-hire by 65%"
        }
      }
    ],
    "emergingPractices": {
      "talentInnovation": [
        "Skills-based hiring implementation",
        "AI interview coaching",
        "Predictive retention modeling"
      ],
      "recruitmentAnalytics": [
        "Candidate sourcing channel optimization",
        "Time-to-fill predictive analytics",
        "Quality-of-hire measurement frameworks"
      ]
    
  },
    
    "technologies": [
        {
            "name": "AI-Powered Talent Matching",
            "description": "Neural networks analyzing 57 parameters beyond resumes",
            "icon": "🤖"
        },
        {
            "name": "Competency Architecture",
            "description": "3D skill mapping for future-proof role design",
            "icon": "🗺️"
        },
        {
            "name": "Neuro-Assessments",
            "description": "Cognitive and emotional intelligence benchmarking",
            "icon": "🧪"
        },
        {
            "name": "VR Onboarding",
            "description": "Immersive cultural assimilation experiences",
            "icon": "👓"
        },
        {
            "name": "Sentiment Sonars",
            "description": "Real-time engagement tracking via digital exhaust",
            "icon": "📡"
        },
        {
            "name": "Mentorship Matrix",
            "description": "Algorithmic pairing for maximum growth impact",
            "icon": "📈"
        },
        {
            "name": "Microlearning Engine",
            "description": "AI-curated skill bites based on performance gaps",
            "icon": "🎓"
        },
        {
            "name": "Succession Simulator",
            "description": "Risk analysis for leadership pipeline vulnerabilities",
            "icon": "♟️"
        },
        {
            "name": "Exit Autopsy",
            "description": "Blockchain-verified turnover root cause analysis",
            "icon": "🔍"
        }
    ],

    "projects": {
        "completed": [
            {
                "title": "Global Talent Pipeline Overhaul",
                "client": "Fortune 100 Tech Giant",
                "challenge": "48% attrition in critical engineering roles",
                "solution": [
                    "Deployed predictive attrition models",
                    "Redesigned competency frameworks for AI era",
                    "Built internal mobility marketplace"
                ],
                "outcomes": [
                    "Reduced hiring costs by $18M annually",
                    "Increased internal promotions by 63%",
                    "Won Best Employer in Tech 2024"
                ],
                "image": "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80",
                "tags": ["Talent Strategy", "Predictive Analytics", "Workforce Planning"]
            },
            {
                "title": "Leadership Accelerator Program",
                "client": "Global Bank",
                "challenge": "Succession crisis for C-suite retirement wave",
                "solution": [
                    "360-degree neuroleadership assessments",
                    "War-gaming simulations for 12 future scenarios",
                    "Cross-industry mentorship pairings"
                ],
                "outcomes": [
                    "Promoted 15 ready-now leaders in 18 months",
                    "95% retention of high-potential candidates",
                    "30% faster decision-making in crisis tests"
                ],
                "image": "https://images.unsplash.com/photo-1560264357-8d9202250f21?auto=format&fit=crop&q=80",
                "tags": ["Leadership Development", "Succession Planning", "Assessment"]
            }
        ],
        "ongoing": [
            {
                "title": "Gig Workforce Integration",
                "client": "Healthcare Conglomerate",
                "challenge": "Managing 40% contingent workforce",
                "solution": [
                    "Blockchain credential verification",
                    "AI-powered project team formation",
                    "Liquid workforce analytics dashboards"
                ],
                "outcomes": [
                    "83% faster project staffing",
                    "47% reduction in contractor disputes",
                    "First to market with hybrid workforce model"
                ],
                "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80",
                "tags": ["Future of Work", "Contingent Workforce", "Blockchain"],
                "progress": 65
            }
        ],
        "upcoming": [
            {
                "title": "Metaverse Onboarding",
                "description": "Building VR-native employee induction programs",
                "startDate": "Q3 2024",
                "image": "https://images.unsplash.com/photo-1589652717521-10c0d09dea59?auto=format&fit=crop&q=80",
                "tags": ["VR Training", "Web3", "Onboarding"]
            }
        ]
    },

    "case_studies": [
        {
            "title": "Manufacturing Upskilling Revolution",
            "challenge": "Automation displaced 60% of workforce",
            "solution": "AR-guided reskilling + growth mindset conditioning",
            "outcome": "92% transitioned to higher-value roles within 18 months",
            "image": "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80"
        },
        {
            "title": "Gen Z Engagement Turnaround",
            "challenge": "42% turnover in first-year hires",
            "solution": "Purpose mapping + micro-credentialing system",
            "outcome": "Increased retention by 68% with 35% productivity gain",
            "image": "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&q=80"
        }
    ],

    "blogPosts": [
        {
            "title": "Why Your Top Performer is Quiet Quitting",
            "excerpt": "Neural signature patterns of disengagement - and how to reverse them",
            "image": "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&q=80"
        },
        {
            "title": "The Dark Side of People Analytics",
            "excerpt": "Ethical boundaries in AI-driven talent management",
            "image": "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80"
        }
    ]
},

   
 // Pilot Services (developed and in testing with clients)
   // title: 'AI & Machine Learning',
    
//AI- ML service

"ai-ml": {
  overview: "Our Artificial Intelligence and Machine Learning services help organizations harness the power of advanced algorithms and data-driven insights. We develop custom AI solutions that automate processes, uncover hidden patterns, and enable predictive capabilities to drive innovation and competitive advantage.",
  benefits: [
    "Enhanced decision-making through predictive insights",
    "Automated processes that reduce costs and human error",
    "Personalized customer experiences that increase engagement",
    "Optimization of operations through data-driven insights",
    "Identification of new opportunities and business models"
  ],
  image: "https://images.unsplash.com/photo-1677442135136-760c813159b7?auto=format&fit=crop&q=80",

    "subServices": [
      {
        "id": "predictive-modeling",
        "title": "1️⃣ Enterprise-Grade Predictive Analytics",
        "description": "Production-ready ML models that deliver actionable forecasts with explainable insights.",
        "features": [
          "  Time-series forecasting engines",
          "  Causal inference modeling",
          "  Automated feature engineering",
          "  What-if scenario simulation",
          "  Drift detection & retraining",
          "  Business impact attribution"
        ],
        "technologies": ["DataRobot", "H2O.ai", "SageMaker", "Azure ML", "Databricks MLflow"],
        "projectCount": 89,
        "completedProjects": 76,
        "projects": {
          "completed": [
            {
              "client": "Fortune 500 Retailer",
              "description": [
                "Built SKU-level demand prediction (2.4M products)",
                "Integrated weather & social sentiment signals",
                "Automated retraining with market shocks detection"
              ],
              "duration": "6 months",
              "result": "Reduced overstock by 37% while improving fill rate to 98.6%"
            }
          ],
          "current": [
            {
              "client": "National Healthcare Provider",
              "description": [
                "Developing readmission risk scores",
                "Incorporating genomic data into patient pathways",
                "Building physician explanation interfaces"
              ],
              "status": "Phase 3 of 4"
            }
          ]
        },
        "testimonial": "🚀 *\"Our inventory AI predicted the supply chain crisis 11 weeks before our human analysts.\"*"
      },
      {
        "id": "computer-vision",
        "title": "2️⃣ Industrial Vision Systems",
        "description": "Mission-critical visual inspection and analysis pipelines.",
        "features": [
          "  Defect detection (6σ accuracy)",
          "  Real-time object tracking",
          "  3D point cloud processing",
          "  Multispectral image fusion",
          "  Synthetic data generation",
          "  Augmented quality control"
        ],
        "technologies": ["NVIDIA Metropolis", "AWS Lookout for Vision", "OpenMMLab", "CVAT", "Label Studio"],
        "projectCount": 64,
        "completedProjects": 58,
        "caseStudy": {
          "client": "Automotive Manufacturer",
          "solution": "AI-powered weld inspection system",
          "metrics": [
            "99.991% detection accuracy",
            "230ms inference time",
            "Zero false negatives in production"
          ]
        }
      },
      {
        "id": "nlp-engines",
        "title": "3️⃣ Language Intelligence Platforms",
        "description": "Enterprise NLP systems that understand domain-specific semantics.",
        "features": [
          "  Domain-adapted LLMs (legal/medical/technical)",
          "  Knowledge graph integration",
          "  Sentiment & intent decoding",
          "  Automated document summarization",
          "  Multilingual transfer learning",
          "  Ethical content moderation"
        ],
        "technologies": ["spaCy", "Hugging Face", "Stanford CoreNLP", "AllenNLP", "LlamaIndex"],
        "projectCount": 72,
        "completedProjects": 65,
        "projects": {
          "completed": [
            {
              "client": "Global Law Firm",
              "description": [
                "Built contract anomaly detection system",
                "Trained on 1.3M legal documents",
                "Integrated with DocuSign CLM"
              ],
              "result": "Reduced M&A due diligence time by 83%"
            }
          ]
        },
        "testimonial": "🚀 *\"Found 14 critical clauses our junior associates missed in a $2B acquisition.\"*"
      },
      {
        "id": "recommendation-systems",
        "title": "4️⃣ Adaptive Personalization Engines",
        "description": "AI that learns individual preferences and market dynamics in real-time.",
        "features": [
          "  Multi-armed bandit optimization",
          "  Cold-start mitigation",
          "  Session-aware ranking",
          "  Explainable recommendations",
          "  Anti-filter bubble mechanisms",
          "  Cross-channel harmonization"
        ],
        "technologies": ["TensorFlow Recommenders", "Amazon Personalize", "Google Recommendations AI", "Recombee", "Constructor"],
        "projectCount": 47,
        "completedProjects": 42,
        "caseStudy": {
          "client": "Premium Streaming Service",
          "impact": "Increased viewer engagement by 31% with adaptive episode sequencing",
          "technical": [
            "Real-time watch session modeling",
            "Content embedding with visual features",
            "A/B tested with 12 algorithms"
          ]
        }
      },
      {
        "id": "anomaly-detection",
        "title": "5️⃣ Autonomous Threat Intelligence",
        "description": "AI systems that detect and respond to outliers in complex environments.",
        "features": [
          "  Multivariate anomaly scoring",
          "  Adaptive thresholding",
          "  Root cause tracing",
          "  Fraud pattern evolution tracking",
          "  Dark web monitoring integration",
          "  Automated SAR generation"
        ],
        "technologies": ["PyOD", "Anodot", "Splunk MLTK", "Rapid7 InsightIDR", "Darktrace"],
        "projectCount": 53,
        "completedProjects": 49,
        "testimonial": "🚀 *\"Identified a $4.7M procurement fraud scheme our auditors missed for years.\"*"
      },
      {
        "id": "reinforcement-learning",
        "title": "6️⃣ Strategic Decision Optimization",
        "description": "AI agents that master complex operational environments through simulation.",
        "features": [
          "  Digital twin training arenas",
          "  Multi-agent collaboration",
          "  Human preference alignment",
          "  Safe exploration frameworks",
          "  Transfer learning to production",
          "  Explainable policy extraction"
        ],
        "technologies": ["Ray RLlib", "Unity ML-Agents", "AWS DeepRacer", "Google Dopamine", "IBM AIF360"],
        "certifications": [
          "ISO/IEC 23053 (ML system standards)",
          "NIST AI Risk Management Framework",
          "EU AI Act Compliance"
        ]
      }
    ],
    "mlOps": {
      "productionization": [
        "Model version control",
        "A/B testing infrastructure",
        "Shadow mode deployment"
      ],
      "monitoring": [
        "Data drift detection",
        "Concept drift alerts",
        "Prediction quality SLAs"
      ]
    },


  technologies: [
    {
      name: "Deep Learning",
      description: "Neural network architectures for complex pattern recognition"
    },
    {
      name: "Natural Language Processing",
      description: "Text understanding, generation, and conversational AI"
    },
    {
      name: "Computer Vision",
      description: "Image and video analysis capabilities"
    },
    {
      name: "Predictive Analytics",
      description: "Statistical modeling for future outcomes prediction"
    },
    {
      name: "MLOps",
      description: "Machine learning operations for model deployment and management"
    },
    {
      name: "Reinforcement Learning",
      description: "Algorithms that learn optimal actions through environment interaction"
    }
  ],
  projects: {
    completed: [
      {
        title: "Retail Demand Forecasting System",
        description: "Implemented an AI-powered demand forecasting system for a retail chain, reducing inventory costs by 23% while maintaining product availability.",
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80",
        tags: ["Forecasting", "Retail", "Supply Chain"]
      },
      {
        title: "Healthcare Diagnostic Assistant",
        description: "Developed an AI system that assists radiologists in diagnosing conditions from medical images, improving accuracy by 19%.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
        tags: ["Computer Vision", "Healthcare", "Diagnostics"]
      }
    ],
    ongoing: [
      {
        title: "Financial Fraud Detection Platform",
        description: "Building an advanced machine learning system to detect fraudulent transactions in real-time for a major financial institution.",
        progress: 75,
        tags: ["Fraud Detection", "Banking", "Real-time Analytics"]
      },
      {
        title: "Manufacturing Predictive Maintenance",
        description: "Developing an AI solution that predicts equipment failures before they occur, reducing downtime and maintenance costs.",
        progress: 60,
        tags: ["Predictive Maintenance", "IoT", "Manufacturing"]
      }
    ],
    upcoming: [
      {
        title: "Personalized Education Platform",
        description: "Creating an AI-driven platform that adapts learning content and pace to individual student needs and learning styles.",
        startDate: "Q1 2025",
        tags: ["Education", "Personalization", "Adaptive Learning"]
      },
      {
        title: "Autonomous Supply Chain Optimization",
        description: "Implementing a reinforcement learning system that continuously optimizes complex supply chain decisions.",
        startDate: "Q2 2025",
        tags: ["Reinforcement Learning", "Supply Chain", "Optimization"]
      }
    ]
  },
  blogPosts: [
    {
      title: "Responsible AI: Balancing Innovation with Ethics",
      excerpt: "Exploring the ethical considerations of AI development and implementation, including fairness, transparency, and accountability.",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80"
    },
    {
      title: "From Proof of Concept to Production: Scaling AI Solutions",
      excerpt: "Key strategies for successfully moving AI projects from experimental phases to enterprise-wide implementation.",
      image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80"
    },
    {
      title: "The Business Impact of Generative AI",
      excerpt: "How large language models and other generative AI technologies are transforming industries and creating new possibilities.",
      image: "https://images.unsplash.com/photo-1511203466129-824e631920d7?auto=format&fit=crop&q=80"
    }
  ]
},
  
    //title: 'DevOps & Cloud Automation',

      "devops": {
        "overview": "**Accelerate Innovation with Autonomous Cloud Operations**\n\nWe engineer self-healing, scalable cloud ecosystems that deploy code 100x faster while maintaining military-grade security. Our full-stack DevOps automation transforms infrastructure from cost center to competitive advantage.",
        "benefits": [
          "90% faster deployment cycles",
          "Zero-downtime blue/green deployments",
          "Infrastructure-as-Code (IaC) at scale",
          "Real-time cost optimization",
          "Unified observability across hybrid clouds",
          "Policy-as-Code security enforcement"
        ],
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80",

        
          "subServices": [
            {
              "id": "cloud-native-transformation",
              "title": "1️⃣ Cloud-Native Architecture",
              "description": "End-to-end modernization for scalable, resilient systems.",
              "features": [
                "  Multi-cloud deployment blueprints",
                "  Immutable infrastructure design",
                "  Serverless migration pathways",
                "  Cloud cost optimization engines",
                "  Zero-trust security frameworks",
                "  Carbon footprint monitoring"
              ],
              "technologies": ["AWS Well-Architected", "Microsoft Cloud Adoption", "Google Anthos", "Terraform", "Pulumi"],
              "projectCount": 94,
              "completedProjects": 86,
              "projects": {
                "completed": [
                  {
                    "client": "Financial Services Inc.",
                    "description": [
                      "Migrated 287 legacy apps to Azure/AWS",
                      "Implemented auto-scaling for core banking",
                      "Built cloud cost anomaly detection"
                    ],
                    "duration": "9 months",
                    "result": "40% TCO reduction with 99.99% SLA"
                  }
                ],
                "current": [
                  {
                    "client": "E-commerce Platform",
                    "description": [
                      "Converting monolith to microservices",
                      "Implementing service mesh",
                      "Building chaos engineering framework"
                    ],
                    "status": "Phase 2 of 5"
                  }
                ]
              },
              "testimonial": "🚀 *\"Our disaster recovery time dropped from 8 hours to 11 minutes post-migration.\"*",
              "referenceArchitecture": {
                "diagram": "cloud-native-ref-arch-v3.2",
                "components": ["API Gateway", "Kubernetes Cluster", "Service Mesh", "Observability Stack"],
                "compliance": ["SOC2", "PCI-DSS", "HIPAA"]
              }
            },
            {
              "id": "gitops-automation",
              "title": "2️⃣ Autonomous Infrastructure",
              "description": "Declarative infrastructure managed through code repositories.",
              "features": [
                "  Policy-as-code enforcement",
                "  Drift detection & self-healing",
                "  Environment parity controls",
                "  PR-based provisioning",
                "  Secrets rotation automation",
                "  Binary authorization"
              ],
              "technologies": ["ArgoCD", "Flux", "Crossplane", "OPA Gatekeeper", "HashiCorp Vault"],
              "projectCount": 76,
              "completedProjects": 68,
              "caseStudy": {
                "client": "IoT Platform Provider",
                "implementation": [
                  "200+ edge locations managed via Git",
                  "Automated canary rollouts",
                  "Cryptographic signing of all manifests"
                ],
                "outcome": "Zero configuration drift incidents in 18 months"
              }
            },
            {
              "id": "observability-stack",
              "title": "3️⃣ Full-Stack Telemetry",
              "description": "Unified monitoring across applications, infrastructure, and business metrics.",
              "features": [
                "  Distributed tracing",
                "  eBPF-based network observability",
                "  Anomaly detection with forecasting",
                "  Business metric correlation",
                "  AIOps incident root cause",
                "  SLO/SLI management"
              ],
              "technologies": ["OpenTelemetry", "Grafana Mimir", "Datadog", "New Relic", "Splunk Observability"],
              "projectCount": 63,
              "completedProjects": 57,
              "testimonial": "🚀 *\"Identified a $250K/month cloud waste pattern our finance team missed.\"*",
              "metricsFramework": {
                "goldenSignals": ["Latency", "Traffic", "Errors", "Saturation"],
                "customMetrics": ["Cart abandonment rate", "Payment success correlation"],
                "retentionPeriods": {
                  "highRes": "30 days",
                  "aggregated": "13 months"
                }
              }
            },
            {
              "id": "platform-engineering",
              "title": "4️⃣ Internal Developer Platforms",
              "description": "Curated abstractions that accelerate product teams.",
              "features": [
                "  Self-service environment provisioning",
                "  Golden path templates",
                "  RBAC/IAM integration",
                "  Cost attribution tagging",
                "  Preview environments",
                "  Policy guardrails"
              ],
              "technologies": ["Backstage", "Humanitec", "Port", "Internal Developer Portal", "Crossplane"],
              "projectCount": 49,
              "completedProjects": 42,
              "projects": {
                "completed": [
                  {
                    "client": "Healthcare SaaS",
                    "description": [
                      "Built clinician-facing deployment UI",
                      "Standardized 23 microservice templates",
                      "Integrated compliance checks"
                    ],
                    "result": "Reduced new service setup from 3 weeks to 2 hours"
                  }
                ]
              }
            },
            {
              "id": "chaos-engineering",
              "title": "5️⃣ Resilience Validation",
              "description": "Proactive failure injection to harden systems.",
              "features": [
                "  GameDay simulations",
                "  Steady-state verification",
                "  Automated blast radius control",
                "  Multi-region failure modes",
                "  Dependency failure mapping",
                "  Recovery time objectives"
              ],
              "technologies": ["Gremlin", "Chaos Mesh", "Litmus", "AWS Fault Injection", "Resilience Hub"],
              "projectCount": 37,
              "completedProjects": 31,
              "testimonial": "🚀 *\"Discovered our 'highly available' system had 7 single points of failure.\"*",
              "failureCatalog": {
                "testedScenarios": ["AZ Failure", "Database CPU Spike", "DNS Outage", "Secret Rotation"],
                "meanTimeToDetection": "43 seconds",
                "meanTimeToRecovery": "2.7 minutes"
              }
            },
            {
              "id": "secure-supply-chain",
              "title": "6️⃣ Software Supply Chain Security",
              "description": "End-to-end artifact integrity and provenance.",
              "features": [
                "  SBOM generation & analysis",
                "  SLSA compliance automation",
                "  Sigstore signing",
                "  Vulnerability prioritization",
                "  Build integrity attestations",
                "  Dependency firewalling"
              ],
              "technologies": ["Sigstore", "Syft", "Grype", "SLSA Framework", "Artifact Registry"],
              "certifications": ["NIST SSDF", "CISA Secure By Design", "OpenSSF Scorecard"],
              "projectCount": 28,
              "completedProjects": 22
            }
          ],
          "emergingPractices": {
            "platformCoOps": [
              "Shared ownership models",
              "Product-team embedded SREs",
              "Cost transparency dashboards"
            ],
            "aiForDevOps": [
              "Anomaly-driven scaling",
              "PR risk prediction",
              "Incident matching engine"
            ]
          },
        




    
        "technologies": [
            {
              "name": "Terraform++",
              "description": "Our enhanced Terraform with predictive scaling and drift prevention",
              "icon": "🛠️",
              "use_case": "Multi-cloud Kubernetes provisioning"
            },
            {
              "name": "GitOps Factory",
              "description": "ArgoCD + Flux automation with security gates",
              "icon": "🔁",
              "use_case": "Compliant financial services deployments"
            },
         
            {
              "name": "Kubernetes Sentinel",
              "description": "AI-driven autoscaling with cost-awareness",
              "icon": "⚖️",
              "use_case": "E-commerce traffic spike handling"
            },
            {
              "name": "Serverless Cybernetics",
              "description": "Lambda/Functions optimization using ML",
              "icon": "🚀",
              "use_case": "IoT data processing pipelines"
            }
          ],
      
    
        "signature_projects": [
          {
            "title": "FinTech Cloud Migration",
            "client": "NASDAQ-listed payments company",
            "challenge": "Move 147 microservices to AWS with zero regulatory violations",
            "solution": [
              "Built compliant deployment pipelines with automated audit trails",
              "Implemented real-time cost governance using CloudHealth",
              "Trained AI model to predict PCI-DSS configuration drift"
            ],
            "outcomes": [
              "43% reduction in cloud spend",
              "100% compliance during SEC audit",
              "Deployment frequency increased from weekly to 60/day"
            ],
            "image": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80",
            "tags": ["AWS", "PCI-DSS", "GitOps"]
          },
          {
            "title": "Autonomous Retail Scaling",
            "client": "Global fashion e-commerce platform",
            "challenge": "Handle 800% traffic surges during flash sales",
            "solution": [
              "Created predictive scaling engine using historical patterns",
              "Implemented spot instance orchestration with fallbacks",
              "Automated CDN rule generation for regional hotspots"
            ],
            "outcomes": [
              "Zero failed checkouts during Black Friday",
              "22% lower cloud costs than manual scaling",
              "Incident response time reduced from 47min to 2min"
            ],
            "image": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80",
            "tags": ["Azure", "Kubernetes", "MLOps"]
          }
        ],
    
        "innovation_spotlight": {
          "ai_ops": [
            {
              "name": "Anomaly Hunter",
              "description": "Proactively detects aberrant patterns in logs/metrics",
              "success_metric": "Reduced false positives by 78% vs traditional monitoring"
            },
            {
              "name": "Cost Clairvoyant",
              "description": "Forecasts cloud spend with 97% accuracy",
              "success_metric": "Saved $1.4M annually for logistics client"
            }
          ],
          "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80"
        },
    
        "enterprise_features": {
          "security": [
            "Automated penetration testing pipelines",
            "Runtime vulnerability scanning",
            "Secrets management with HashiCorp Vault"
          ],
          "compliance": [
            "SOC2/GDPR-ready deployment templates",
            "Policy-as-Code for 30+ regulatory frameworks",
            "Immutable audit trails"
          ]
        },
    
        "blogPosts": [
          {
            "title": "How We Built a Self-Healing Cloud for a Fortune 10 Company",
            "excerpt": "Architecture deep dive on our chaos engineering implementation",
            "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
          },
          {
            "title": "The 2025 Cloud Cost Apocalypse (And How to Avoid It)",
            "excerpt": "Why 60% of enterprises will overspend without AI-driven optimization",
            "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
          }
        ],
    
        "client_metrics": {
          "average_deployment_frequency": "83/day",
          "mean_recovery_time": "3.2 minutes",
          "cost_optimization": "22-45% savings"
        }
      },


 // Under Development (In development, not yet released)
   // title: 'AI Automation','AI Automation': 'ai-automation',
 
   "ai-automation": {
    "overview": "**Intelligent Automation for the Enterprise**\n\nWe transform business processes with AI-driven automation, combining robotic process automation (RPA), machine learning, and cognitive technologies to eliminate repetitive work, reduce errors, and unlock new capabilities. Our solutions deliver 24/7 operational excellence at scale.",
    "benefits": [
      "70-90% reduction in manual processes",
      "60% faster process cycle times",
      "Self-learning systems that improve over time",
      "Seamless integration with legacy systems",
      "Real-time process analytics and optimization",
      "Scalable digital workforce deployment"
    ],
    "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80",
      "subServices": [
        {
          "id": "process-intelligence",
          "title": "1️⃣ Cognitive Process Mining",
          "description": "AI-driven discovery and optimization of hidden workflow patterns across your enterprise.",
          "features": [
            "  Dark process discovery",
            "  Friction point heat mapping",
            "  Robot suitability scoring",
            "  Exception handling redesign",
            "  Cross-system dependency mapping",
            "  Continuous improvement loops"
          ],
          "technologies": ["Celonis EMS", "UiPath Process Mining", "SAP Signavio", "IBM Process Mining", "Minitab Discover"],
          "projectCount": 67,
          "completedProjects": 58,
          "projects": {
            "completed": [
              {
                "client": "Global Logistics Provider",
                "description": [
                  "Identified 47% redundant customs documentation steps",
                  "Automated exception handling for 89% of shipment delays",
                  "Built digital twin of entire freight workflow"
                ],
                "duration": "5 months",
                "result": "$12M annual savings and 94% on-time delivery rate"
              }
            ],
            "current": [
              {
                "client": "Healthcare Payer",
                "description": [
                  "Mapping prior authorization decision flows",
                  "Training AI on 1.2M historical claim exceptions",
                  "Designing autonomous denial appeal system"
                ],
                "status": "Phase 2 of 4"
              }
            ]
          },
          "testimonial": "🚀 *\"Found $6.8M in duplicate payments our auditors missed for years.\"*"
        },
        {
          "id": "hyperautomation",
          "title": "2️⃣ Autonomous Enterprise Engine",
          "description": "End-to-end automation combining RPA, AI and low-code orchestration.",
          "features": [
            "  Self-healing bots (computer vision + NLP)",
            "  Dynamic workload routing",
            "  No-code automation factories",
            "  Human-in-the-loop escalation",
            "  Process genome library",
            "  Real-time compliance guardrails"
          ],
          "technologies": ["UiPath Autopilot", "Microsoft Power Automate", "Automation Anywhere IQ Bot", "Pega Infinity", "Blue Prism Decipher"],
          "projectCount": 83,
          "completedProjects": 76,
          "caseStudy": {
            "client": "Multinational Bank",
            "impact": "Automated 93% of commercial loan processing (previously 187 manual steps)",
            "metrics": [
              "From 14 days to 47 minutes approval time",
              "300% capacity increase with same staff",
              "Zero regulatory findings post-automation"
            ]
          }
        },
        {
          "id": "conversational-ai",
          "title": "3️⃣ Empathic Digital Workforce",
          "description": "Human-like AI agents that understand context, emotion and intent.",
          "features": [
            "  Voice cloning with emotional resonance",
            "  Multimodal interaction (text/voice/gesture)",
            "  Knowledge graph-powered reasoning",
            "  Personality adaptation engines",
            "  Continuous learning from feedback",
            "  Ethical bias monitoring"
          ],
          "technologies": ["Google Dialogflow CX", "AWS Lex", "IBM Watson Assistant", "Kore.ai", "Soul Machines Digital People"],
          "projectCount": 52,
          "completedProjects": 47,
          "projects": {
            "completed": [
              {
                "client": "National Healthcare Provider",
                "description": [
                  "Deployed 24/7 multilingual symptom checker",
                  "Trained on 600K+ clinical interactions",
                  "Integrated with EHR systems"
                ],
                "result": "Reduced unnecessary ER visits by 31%"
              }
            ]
          },
          "testimonial": "🚀 *\"Our customer satisfaction with AI agents now surpasses human reps for routine inquiries.\"*"
        },
        {
          "id": "predictive-operations",
          "title": "4️⃣ Self-Optimizing Systems",
          "description": "AI that anticipates and prevents operational failures before they occur.",
          "features": [
            "  Anomaly detection with explainability",
            "  Prescriptive maintenance advisories",
            "  Automated root cause analysis",
            "  Scenario simulation engines",
            "  Closed-loop execution",
            "  Resilience stress testing"
          ],
          "technologies": ["Siemens MindSphere", "GE Digital Twin", "Splunk AIOps", "DataRobot MLOps", "C3 AI Suite"],
          "projectCount": 41,
          "completedProjects": 38,
          "caseStudy": {
            "client": "Energy Grid Operator",
            "solution": "Predictive line failure system using satellite imagery + IoT sensors",
            "impact": "Prevented 12 major outages last quarter"
          }
        },
        {
          "id": "document-cognition",
          "title": "5️⃣ Intelligent Document Processing",
          "description": "AI that reads, understands and acts on unstructured documents.",
          "features": [
            "  Handwriting recognition (98%+ accuracy)",
            "  Context-aware data extraction",
            "  Contract anomaly detection",
            "  Dynamic classification",
            "  Cross-document reasoning",
            "  Automated redaction"
          ],
          "technologies": ["AWS Textract", "Google Document AI", "IBM Datacap", "ABBYY Vantage", "Kofax TotalAgility"],
          "projectCount": 64,
          "completedProjects": 59,
          "testimonial": "🚀 *\"Processed 1.2M legacy paper records in 3 weeks - our team estimated 18 months.\"*"
        },
        {
          "id": "autonomous-decisions",
          "title": "6️⃣ AI Judgment Engines",
          "description": "Certified autonomous systems for complex business decisions.",
          "features": [
            "  Explainable AI frameworks",
            "  Regulatory approval packages",
            "  Human override protocols",
            "  Decision audit trails",
            "  Continuous ethics monitoring",
            "  Outcome-based learning"
          ],
          "technologies": ["FICO Decision Management", "Pega Decisioning", "SAS Intelligent Decisioning", "Provenir AI", "Equifax DecisionIQ"],
          "certifications": [
            "EU AI Act Compliance",
            "NIST AI RMF Ready",
            "FDA AI/ML Certification (for healthcare)"
          ]
        }
      ],
      "emergingCapabilities": {
        "neurosymbolicAI": [
          "Combining neural networks with business rules",
          "Dynamic policy adaptation",
          "Causal reasoning engines"
        ],
        "autonomousAgents": [
          "Self-directed process improvement",
          "Agent-to-agent negotiation",
          "Automated ROI justification"
        ]
      },

    "technology_stack": {
      "process_automation": [
        {
          "name": "Cognitive RPA",
          "description": "UiPath/Blue Prism bots with computer vision and NLP",
          "use_case": "Invoice processing with handwritten text recognition"
        },
        {
          "name": "Process Mining",
          "description": "Celonis-powered workflow discovery and optimization",
          "use_case": "Identifying automation candidates in ERP systems"
        }
      ],
      "ai_enhancements": [
        {
          "name": "Document AI",
          "description": "GPT-4 Vision + custom classifiers for complex documents",
          "use_case": "Contract analysis with clause extraction"
        },
        {
          "name": "Conversational AI",
          "description": "Voice-enabled virtual agents with emotional intelligence",
          "use_case": "Customer service dispute resolution"
        }
      ]
    },

    "projects": {
      "completed": [
        {
          "title": "Global Bank Loan Processing",
          "description": "Deployed 42 AI bots to automate 87% of SME loan approvals, reducing processing time from 72 hours to 19 minutes.",
          "image": "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&q=80",
          "metrics": [
            "92% accuracy in risk assessment",
            "$4.2M annual labor savings",
            "24/7 application processing"
          ],
          "tags": ["RPA", "NLP", "Banking"]
        },
        {
          "title": "Healthcare Claims Adjudication",
          "description": "AI system automating prior authorization with 98% compliance to 3,800+ payer rules.",
          "image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
          "metrics": [
            "78% reduction in denials",
            "14-day → 2-hour turnaround",
            "HIPAA-compliant audit trail"
          ],
          "tags": ["Healthcare", "Rules Engine", "OCR"]
        }
      ],
      "ongoing": [
        {
          "title": "Manufacturing Quality Control",
          "description": "Computer vision system detecting defects with 99.7% accuracy (vs human 92%).",
          "progress": 85,
          "technologies": ["YOLOv8", "Thermal Imaging"],
          "tags": ["Computer Vision", "Industry 4.0"]
        }
      ]
    },

    "industry_solutions": [
      {
        "sector": "Financial Services",
        "applications": [
          "Anti-money laundering (AML) monitoring",
          "Fraud detection with anomaly AI",
          "Automated wealth management"
        ]
      },
      {
        "sector": "Healthcare",
        "applications": [
          "Prior authorization automation",
          "Clinical documentation AI scribes",
          "Patient flow optimization"
        ]
      }
    ],

    "case_studies": [
      {
        "title": "Insurance Claims Catastrophe",
        "challenge": "30,000+ claims backlog after hurricane",
        "solution": "Deployed emergency AI workforce in 72 hours",
        "outcome": "Cleared backlog 17x faster than manual processing",
        "image": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
      }
    ],

    "blogPosts": [
      {
        "title": "When RPA Isn't Enough: The AI Automation Threshold",
        "excerpt": "How we helped a client achieve 300% ROI by adding machine learning to basic bots",
        "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80"
      }
    ],
"demo": {
"title": "Automation ROI Calculator",
"description": "Estimate your savings potential",
"link": "/tools/automation-roi"
},
"performance_benchmarks": {
"average_implementation": "6-9 weeks",
"error_rate_reduction": "89%",
"self_learning_improvement": "15% quarterly"
}
  },


// Upcoming Services (Planned future offerings)  
  title: 'Cybersecurity', 'Cybersecurity': 'cybersecurity',

  // Cybersecurity service
  "cybersecurity": {
    overview: "Our Cybersecurity services provide comprehensive protection for your organization's digital assets, networks, and sensitive information. We employ advanced threat detection, vulnerability management, and incident response capabilities to defend against evolving cyber threats in today's interconnected business environment.",
    benefits: [
      "Proactive protection against emerging cyber threats",
      "Reduced risk of data breaches and associated costs",
      "Enhanced compliance with industry regulations and standards",
      "Improved security posture across your technology stack",
      "Minimized downtime from security incidents"
    ],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80",

    
      "subServices": [
        {
          "id": "threat-management",
          "title": "1️⃣ Intelligent Threat Operations",
          "description": "AI-powered defense against advanced persistent threats and zero-day vulnerabilities.",
          "features": [
            "  24/7 SOC with threat hunting",
            "  MITRE ATT&CK alignment",
            "  Dark web monitoring",
            "  Threat intelligence fusion",
            "  Behavioral anomaly detection",
            "  Automated incident playbooks"
          ],
          "technologies": ["CrowdStrike Falcon", "Microsoft Sentinel", "Palo Alto Cortex", "IBM QRadar", "Splunk ES"],
          "projectCount": 118,
          "completedProjects": 109,
          "projects": {
            "completed": [
              {
                "client": "Global Bank",
                "description": [
                  "Deployed EDR across 28,000 endpoints",
                  "Built custom detection rules for FIN7 TTPs",
                  "Reduced alert fatigue by 73%"
                ],
                "duration": "11 months",
                "result": "Prevented $47M in potential fraud"
              }
            ],
            "current": [
              {
                "client": "Healthcare Provider",
                "description": [
                  "Implementing medical device segmentation",
                  "Deploying HIPAA-compliant logging",
                  "Training ML models on PHI access patterns"
                ],
                "status": "Phase 4 of 6"
              }
            ]
          },
          "testimonial": "🚀 *\"Neutralized a ransomware attack mid-encryption - saved 19TB of patient records.\"*",
          "threatCoverage": {
            "malware": 99.7,
            "phishing": 98.2,
            "insiderThreats": 95.4,
            "zeroDay": 89.3
          }
        },
        {
          "id": "identity-security",
          "title": "2️⃣ Zero Trust Access Architecture",
          "description": "Continuous authentication and least privilege enforcement.",
          "features": [
            "  Passwordless authentication",
            "  Privileged access management",
            "  UEBA anomaly scoring",
            "  Just-in-time elevation",
            "  SaaS access governance",
            "  Identity threat detection"
          ],
          "technologies": ["Okta", "Microsoft Entra", "CyberArk", "BeyondTrust", "SailPoint"],
          "projectCount": 92,
          "completedProjects": 86,
          "caseStudy": {
            "client": "Manufacturing Conglomerate",
            "solution": "Implemented FIDO2 across 53 factories",
            "metrics": [
              "Eliminated 100% of password resets",
              "Reduced breach surface by 68%",
              "MFA adoption reached 99.9%"
            ]
          }
        },
        {
          "id": "app-shielding",
          "title": "3️⃣ Runtime Application Protection",
          "description": "Self-defending software with embedded security controls.",
          "features": [
            "  RASP instrumentation",
            "  API security gateways",
            "  Secrets detection",
            "  Container signing",
            "  Memory protection",
            "  Anti-tampering"
          ],
          "technologies": ["Imperva", "Noname", "Aqua", "Signal Sciences", "Wallarm"],
          "projectCount": 76,
          "completedProjects": 68,
          "testimonial": "🚀 *\"Found 14 critical API vulnerabilities our pentesters missed.\"*",
          "protectionMetrics": {
            "OWASP Coverage": "100% Top 10",
            "WAF Bypass Prevention": 99.2,
            "API Abuse Detection": 97.8
          }
        },
        {
          "id": "data-protection",
          "title": "4️⃣ Cryptographic Control Plane",
          "description": "End-to-end encryption with centralized key governance.",
          "features": [
            "  BYOK/ HYOK implementations",
            "  Post-quantum readiness",
            "  Tokenization services",
            "  Homomorphic encryption",
            "  Data loss prevention",
            "  Enterprise key rotation"
          ],
          "technologies": ["Thales", "Fortanix", "AWS KMS", "Google Cloud HSM", "Virtru"],
          "projectCount": 64,
          "completedProjects": 57,
          "projects": {
            "completed": [
              {
                "client": "Payment Processor",
                "description": [
                  "Implemented FIPS 140-2 Level 3 HSMs",
                  "Designed crypto-agile architecture",
                  "Tokenized 230M card records"
                ],
                "result": "Achieved PCI DSS 4.0 compliance 18mo early"
              }
            ]
          }
        },
        {
          "id": "pentesting",
          "title": "5️⃣ Adversary Simulation",
          "description": "Elite red teaming that mirrors APT tactics.",
          "features": [
            "  Purple team exercises",
            "  Physical penetration testing",
            "  Cloud configuration audits",
            "  Social engineering campaigns",
            "  ICS/SCADA assessments",
            "  Bug bounty program design"
          ],
          "technologies": ["Metasploit", "Burp Suite", "Cobalt Strike", "BloodHound", "OSINT Framework"],
          "projectCount": 89,
          "completedProjects": 82,
          "testimonial": "🚀 *\"Gained domain admin in 17 minutes - showed us terrifying gaps.\"*",
          "attackSimulation": {
            "averageDetectionTime": "43 minutes",
            "criticalFindings": 8.2,
            "remediationRate": 94.7
          }
        },
        {
          "id": "compliance-automation",
          "title": "6️⃣ Regulatory Cyber Assurance",
          "description": "Continuous compliance monitoring and evidence collection.",
          "features": [
            "  Policy-as-code enforcement",
            "  Automated audit trails",
            "  Control mapping matrices",
            "  Third-party risk scoring",
            "  Compliance drift detection",
            "  Board-ready reporting"
          ],
          "technologies": ["Drata", "Vanta", "SecureFrame", "AWS Audit Manager", "Microsoft Compliance Manager"],
          "certifications": [
            "SOC 2 Type II",
            "ISO 27001",
            "NIST CSF",
            "GDPR",
            "HIPAA"
          ],
          "projectCount": 103,
          "completedProjects": 97
        }
      ],
      "cyberFusion": {
        "threatIntelFeeds": [
          "MISP",
          "Anomali",
          "Recorded Future",
          "Mandiant"
        ],
        "automationPlaybooks": [
          "Phishing Takedown",
          "Ransomware Containment",
          "Insider Threat Triage"
        ]
      },
    



    technologies: [
      {
        name: "SIEM",
        description: "Security information and event management for real-time monitoring"
      },
      {
        name: "EDR",
        description: "Endpoint detection and response for advanced threat protection"
      },
      {
        name: "Zero Trust",
        description: "Architecture that requires verification from everyone"
      },
      {
        name: "Penetration Testing",
        description: "Simulated cyber attacks to identify vulnerabilities"
      },
      {
        name: "Encryption",
        description: "Data protection technologies for information at rest and in transit"
      },
      {
        name: "Security Awareness",
        description: "Training programs to build a security-conscious culture"
      }
    ],
    projects: {
      completed: [
        {
          title: "Financial Services Security Transformation",
          description: "Implemented a comprehensive security program for a major bank, reducing security incidents by 65% and achieving regulatory compliance.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
          tags: ["Banking", "Compliance", "Threat Protection"]
        },
        {
          title: "Healthcare Data Protection Initiative",
          description: "Deployed advanced encryption and access controls for a healthcare network, securing patient data across 12 facilities.",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
          tags: ["Healthcare", "Data Privacy", "HIPAA"]
        }
      ],
      ongoing: [
        {
          title: "Global Manufacturing Security Operations Center",
          description: "Building a 24/7 security operations center for a multinational manufacturing corporation to monitor and respond to threats.",
          progress: 80,
          tags: ["SOC", "Manufacturing", "Incident Response"]
        },
        {
          title: "Retail Chain Zero Trust Implementation",
          description: "Transitioning a national retail organization to a Zero Trust security architecture to prevent lateral movement of threats.",
          progress: 65,
          tags: ["Zero Trust", "Retail", "Network Security"]
        }
      ],
      upcoming: [
        {
          title: "Government Agency Threat Intelligence Program",
          description: "Developing an advanced threat intelligence capability for a government agency to predict and prevent targeted attacks.",
          startDate: "Q1 2025",
          tags: ["Threat Intelligence", "Government", "Advanced Persistent Threats"]
        },
        {
          title: "Financial Technology Security Framework",
          description: "Creating a comprehensive security framework for fintech startups that balances innovation with robust protection.",
          startDate: "Q2 2025",
          tags: ["Fintech", "DevSecOps", "Compliance"]
        }
      ]
    },
    blogPosts: [
      {
        title: "Evolving Cybersecurity Threats: What Organizations Need to Know",
        excerpt: "An overview of emerging cyber threats and how organizations can adapt their security posture to address these challenges.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80"
      },
      {
        title: "Building a Security-First Culture in Your Organization",
        excerpt: "Strategies for embedding security awareness throughout your organization and making it everyone's responsibility.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
      },
      {
        title: "The ROI of Cybersecurity: Measuring Security Investment Value",
        excerpt: "How to calculate and communicate the return on investment for cybersecurity initiatives to key stakeholders.",
        image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?auto=format&fit=crop&q=80"
      }
    ]
  },

  //title: 'IoT Solutions', 'IoT Solutions': 'iot-solutions',
//IOT services
"iot-solutions": {
  overview: "Our IoT Solutions connect physical devices with digital systems to provide unprecedented visibility, control, and automation capabilities. We develop end-to-end IoT implementations that help businesses optimize operations, create new revenue streams, and enhance customer experiences through smart, connected products and environments.",
  benefits: [
    "Real-time visibility into operations and asset performance",
    "Predictive maintenance capabilities that reduce downtime",
    "Automated processes that increase efficiency and reduce costs",
    "Enhanced customer experiences through smart, connected products",
    "Data-driven insights that inform business decisions"
  ],
  image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80",

  
    "subServices": [
      {
        "id": "iot-platform",
        "title": "1️⃣ Enterprise IoT Orchestration",
        "description": "End-to-end platform for connecting, managing, and extracting value from IoT ecosystems.",
        "features": [
          "  Device lifecycle management",
          "  Over-the-air (OTA) updates",
          "  Edge-to-cloud data pipelines",
          "  Digital twin integration",
          "  Fleet optimization engines",
          "  Cross-vendor interoperability"
        ],
        "technologies": ["AWS IoT Core", "Azure Sphere", "Google Cloud IoT", "PTC ThingWorx", "Siemens MindSphere"],
        "projectCount": 68,
        "completedProjects": 59,
        "projects": {
          "completed": [
            {
              "client": "Smart City Municipality",
              "description": [
                "Connected 12,000+ municipal assets",
                "Implemented predictive maintenance",
                "Built public safety dashboards"
              ],
              "duration": "14 months",
              "result": "Reduced equipment downtime by 37%"
            }
          ],
          "current": [
            {
              "client": "Agricultural Tech Co.",
              "description": [
                "Deploying soil sensors across 8M acres",
                "Training yield prediction models",
                "Integrating with harvest robotics"
              ],
              "status": "Phase 3 of 5"
            }
          ]
        },
        "testimonial": "🚀 *\"Achieved 92% first-time-right repairs using our equipment digital twins.\"*",
        "connectivityMetrics": {
          "devicesManaged": "4.7M+",
          "messageThroughput": "2.1B/day",
          "uptime": "99.998%"
        }
      },
      {
        "id": "edge-intelligence",
        "title": "2️⃣ Autonomous Edge Processing",
        "description": "AI at the edge with minimal latency and bandwidth dependence.",
        "features": [
          "  Federated learning",
          "  TinyML deployments",
          "  Edge-native databases",
          "  Offline operation modes",
          "  Edge security enclaves",
          "  Distributed inference"
        ],
        "technologies": ["NVIDIA Jetson", "AWS Greengrass", "Azure Percept", "Google Coral", "Siemens Edge"],
        "projectCount": 53,
        "completedProjects": 47,
        "caseStudy": {
          "client": "Oil & Gas Company",
          "solution": "Deployed edge AI for pipeline monitoring",
          "metrics": [
            "Reduced bandwidth costs by 89%",
            "Anomaly detection in <200ms",
            "Operates in -40°C to 85°C"
          ]
        }
      },
      {
        "id": "industrial-iot",
        "title": "3️⃣ Mission-Critical OT Integration",
        "description": "Secure convergence of IT and operational technology systems.",
        "features": [
          "  SCADA modernization",
          "  PLC protocol translation",
          "  Safety system monitoring",
          "  Vibration analysis",
          "  Predictive maintenance",
          "  Hazardous area certifications"
        ],
        "technologies": ["Rockwell Automation", "Schneider EcoStruxure", "GE Digital", "OSIsoft PI", "SAP Digital Manufacturing"],
        "projectCount": 61,
        "completedProjects": 55,
        "testimonial": "🚀 *\"Cut unplanned downtime by 62% through real-time equipment health monitoring.\"*",
        "industryCertifications": [
          "ATEX Zone 1",
          "IEC 62443",
          "NEMA 4X",
          "UL HazLoc"
        ]
      },
      {
        "id": "smart-spaces",
        "title": "4️⃣ Context-Aware Environments",
        "description": "Intelligent buildings and spaces that adapt to human presence.",
        "features": [
          "  Occupancy analytics",
          "  Environmental optimization",
          "  Touchless interaction",
          "  Predictive cleaning",
          "  Energy harvesting",
          "  Space utilization"
        ],
        "technologies": ["Johnson Controls", "Honeywell Forge", "Siemens Desigo", "Cisco DNA Spaces", "Ubiquiti"],
        "projectCount": 47,
        "completedProjects": 42,
        "projects": {
          "completed": [
            {
              "client": "Corporate Campus",
              "description": [
                "Deployed 3,000 smart sensors",
                "Integrated HVAC/lighting/security",
                "Built workplace analytics dashboard"
              ],
              "result": "Achieved LEED Platinum with 31% energy savings"
            }
          ]
        }
      },
      {
        "id": "iot-security",
        "title": "5️⃣ Cyber-Physical Protection",
        "description": "End-to-end security for connected devices and operational networks.",
        "features": [
          "  Device identity lifecycle",
          "  Secure boot and attestation",
          "  Network micro-segmentation",
          "  Behavioral anomaly detection",
          "  Firmware integrity monitoring",
          "  Supply chain verification"
        ],
        "technologies": ["Arm PSA Certified", "Microsoft Azure Sphere", "Cisco Cyber Vision", "Claroty", "Nozomi Networks"],
        "projectCount": 58,
        "completedProjects": 51,
        "testimonial": "🚀 *\"Prevented a botnet attack targeting our 19,000 connected HVAC units.\"*",
        "securityPosture": {
          "vulnerabilitiesPatched": "100% critical CVEs",
          "incidentResponseTime": "<22 minutes",
          "certifications": ["IEC 62443-3-3", "NIST IR 8259"]
        }
      },
      {
        "id": "iot-analytics",
        "title": "6️⃣ Sensor Intelligence Fabric",
        "description": "Extracting actionable insights from IoT data streams.",
        "features": [
          "  Time-series forecasting",
          "  Spatial pattern recognition",
          "  Asset performance modeling",
          "  Root cause analysis",
          "  Prescriptive recommendations",
          "  Digital twin synchronization"
        ],
        "technologies": ["TimescaleDB", "InfluxDB", "Grafana", "Azure Digital Twins", "AWS TwinMaker"],
        "certifications": [
          "ISO 13374 Condition Monitoring",
          "ISO 18435 Industrial Analytics"
        ],
        "projectCount": 39,
        "completedProjects": 34
      }
    ],
    "emergingCapabilities": {
      "selfHealingNetworks": [
        "LoRaWAN adaptive routing",
        "Mesh network optimization",
        "Self-organizing edge nodes"
      ],
      "iotGenerativeAI": [
        "Sensor data synthesis",
        "Anomaly explanation generation",
        "Maintenance procedure generation"
      ]
    },
  

  
  technologies: [
    {
      name: "Arduino",
      description: "Open-source hardware and software for prototyping"
    },
    {
      name: "Raspberry Pi",
      description: "Single-board computers for IoT devices"
    },
    {
      name: "MQTT",
      description: "Lightweight messaging protocol for IoT communications"
    },
    {
      name: "AWS IoT",
      description: "Cloud platform for IoT device management"
    },
    {
      name: "Azure IoT Hub",
      description: "Microsoft's platform for IoT device connectivity"
    },
    {
      name: "LoRaWAN",
      description: "Low power, wide area networking protocol for IoT"
    }
  ],
  projects: {
    completed: [
      {
        title: "Smart Factory Implementation",
        description: "Deployed an IoT sensor network across a manufacturing plant, reducing downtime by 35% and maintenance costs by 25%.",
        image: "https://images.unsplash.com/photo-1565417296832-1c309d4220d9?auto=format&fit=crop&q=80",
        tags: ["Manufacturing", "Predictive Maintenance", "Industrial IoT"]
      },
      {
        title: "Smart Building Management System",
        description: "Implemented an integrated system for energy, security, and environmental management across a corporate campus.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80",
        tags: ["Smart Buildings", "Energy Efficiency", "Security"]
      }
    ],
    ongoing: [
      {
        title: "Agricultural Monitoring Network",
        description: "Building a comprehensive IoT solution for soil, crop, and equipment monitoring to optimize farming operations.",
        progress: 80,
        tags: ["Agriculture", "Environmental Monitoring", "Data Analytics"]
      },
      {
        title: "Smart City Infrastructure",
        description: "Developing connected infrastructure for traffic management, public safety, and resource optimization in an urban environment.",
        progress: 60,
        tags: ["Smart Cities", "Urban Planning", "Public Services"]
      }
    ],
    upcoming: [
      {
        title: "Healthcare Remote Monitoring",
        description: "Creating an IoT platform for remote patient monitoring with real-time alerts and telemedicine integration.",
        startDate: "Q1 2025",
        tags: ["Healthcare", "Remote Monitoring", "Telemedicine"]
      },
      {
        title: "Retail Smart Inventory System",
        description: "Implementing an automated inventory management system with real-time tracking and replenishment capabilities.",
        startDate: "Q2 2025",
        tags: ["Retail", "Inventory Management", "Supply Chain"]
      }
    ]
  },
  blogPosts: [
    {
      title: "The Future of IoT: From Connected Devices to Intelligent Ecosystems",
      excerpt: "How IoT is evolving beyond simple connectivity to create comprehensive, intelligent systems that transform industries.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80"
    },
    {
      title: "Securing the Internet of Things: Protecting Connected Systems",
      excerpt: "Essential security considerations and best practices for developing and deploying IoT solutions.",
      image: "https://images.unsplash.com/photo-1602078019624-593290bbaab3?auto=format&fit=crop&q=80"
    },
    {
      title: "Edge Computing and IoT: Processing Data Where It Matters",
      excerpt: "Why processing data closer to the source is becoming crucial for real-time IoT applications and bandwidth optimization.",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80"
    }
  ]
},

//title: 'Bookkeeping and Taxation', 'Bookkeeping and Taxation': 'bookkeeping'


  "bookkeeping": {
    "overview": "**Precision Finance Operations**\n\nWe transform accounting from a compliance obligation into a strategic asset. Our AI-enhanced bookkeeping and proactive tax planning deliver real-time financial visibility while minimizing liabilities. From startups to enterprises, we ensure every dollar is accounted for and optimized.",
    "benefits": [
      "95% automated transaction processing",
      "Real-time financial dashboards",
      "Tax liability reduction strategies",
      "Audit-ready documentation 24/7",
      "Integrations with 200+ banking/payment systems",
      "Global compliance (GAAP, IFRS, IRS, VAT)"
    ],
    "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80",

    "core_services": 
      [
        {
          "name": "AI Reconciler",
          "description": "Machine learning-powered transaction categorization with 99.4% accuracy",
          "icon": "🤖",
          "features": [
            "Auto-detection of duplicate payments",
            "Multi-currency auto-conversion",
            "Receipt-to-ledger automation"
          ]
        },
        {
          "name": "Live Financial Pulse",
          "description": "Interactive dashboards with cash flow forecasting",
          "icon": "📊",
          "features": [
            "30+ pre-built financial ratios",
            "Scenario modeling tools",
            "Custom executive views"
          ]
        },
      
        {
          "name": "Tax Navigator",
          "description": "Continuous liability monitoring across jurisdictions",
          "icon": "🧭",
          "features": [
            "R&D credit auto-qualification",
            "Sales tax nexus alerts",
            "Year-round estimated tax planning"
          ]
        },
        {
          "name": "Audit Shield",
          "description": "Automated documentation prep for 20+ audit triggers",
          "icon": "🛡️",
          "features": [
            "IRS audit success rate: 100%",
            "Real-time change tracking",
            "Blockchain-verified records"
          ]
        }
      ],
    

    "technologies": [{
      "name":"QuickBooks Online"}, 
      {"name":"Xero"}, 
      {"name":"Sage Intacct"
    },
        {
          "name": "Blockchain Notary",
          "description": "Immutable transaction recording on private ledger",
          "use_case": "Fraud prevention"
        },
        {
          "name": "Tax API Gateway",
          "description": "Real-time sync with 47 tax jurisdictions",
          "use_case": "Global e-commerce compliance"
        }
      ],
     

    "client_stories": [
      {
        "title": "E-Commerce Tax Maze Solved",
        "client": "$12M DTC brand expanding to EU/APAC",
        "challenge": "Manual VAT calculations causing 19% error rate",
        "solution": [
          "Automated tax engine with Avalara integration",
          "Real-time import duty calculations",
          "Localized invoice templates"
        ],
        "results": [
          "$217K recovered in overpaid taxes",
          "100% VAT compliance across 11 countries",
          "38 hours/week saved in manual work"
        ],
        "image": "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80",
        "tags": ["VAT", "Avalara", "Global Expansion"]
      },
      {
        "title": "Restaurant Chain Financial Turnaround",
        "client": "23-location casual dining group",
        "challenge": "Disparate POS systems causing 6-week book closing",
        "solution": [
          "Unified accounting automation hub",
          "AI-powered food cost variance alerts",
          "Tip compliance monitoring"
        ],
        "results": [
          "Daily P&L visibility",
          "15% food waste reduction",
          "$84K saved in DOL penalty avoidance"
        ],
        "image": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
        "tags": ["POS Integration", "AI Alerts", "Labor Compliance"]
      }],
  

    "compliance_framework": {
      "standards": ["GAAP", "IFRS", "FASB", "SOC 1/2"],
      "automation": [
        {
          "name": "Change Radar",
          "description": "AI monitoring 190+ regulatory updates daily"
        },
        {
          "name": "Policy Enforcer",
          "description": "Auto-updating chart of accounts per latest standards"
        }
      ],
      "image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80"
    },

    "blogPosts": [
      {
        "title": "How We Saved a Client $2.1M in Missed R&D Credits",
        "excerpt": "The engineering time tracking trick most startups miss",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
      },
      {
        "title": "The Coming Crypto Tax Storm: 2025 Compliance Guide",
        "excerpt": "How to prepare for IRS Form 1099-DA requirements",
        "image": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
      }
    ],

    "performance_metrics": {
      "transaction_accuracy": "99.87%",
      "audit_defense_success": "100%",
      "client_tax_savings": "Average 22% reduction"
    }
  },



/*sub services
  'Software Development': 'software-development',
  'Training and Development': 'training',*/

  //Additional/ future services
  "digital-marketing": {
    overview: "Our Digital Marketing services help businesses establish a strong online presence, attract qualified leads, and drive conversions. We create data-driven strategies that optimize your marketing spend and deliver measurable results across multiple digital channels.",
    benefits: [
      "Increased brand visibility across relevant digital channels",
      "Higher quality lead generation with improved conversion rates",
      "Measurable ROI through comprehensive analytics",
      "Enhanced customer engagement through personalized content",
      "Agile campaign optimization based on real-time data"
    ],
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "SEO",
        description: "Search engine optimization for organic visibility"
      },
      {
        name: "PPC",
        description: "Pay-per-click advertising across search and social"
      },
      {
        name: "Marketing Automation",
        description: "Workflow automation for nurturing and engagement"
      },
      {
        name: "CRM Integration",
        description: "Customer relationship management for lead tracking"
      },
      {
        name: "Analytics Platforms",
        description: "Comprehensive performance tracking and reporting"
      },
      {
        name: "Content Marketing",
        description: "Strategic content creation and distribution"
      }
    ],
    projects: {
      completed: [
        {
          title: "E-commerce Conversion Optimization",
          description: "Increased conversion rates by 35% for an online retailer through targeted digital marketing strategies and site optimization.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
          tags: ["E-commerce", "Conversion Optimization", "PPC"]
        },
        {
          title: "B2B Lead Generation Campaign",
          description: "Developed a comprehensive lead generation strategy for a SaaS company, increasing qualified leads by 45% and reducing CAC by 30%.",
          image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80",
          tags: ["B2B", "Lead Generation", "Content Marketing"]
        }
      ],
      ongoing: [
        {
          title: "Healthcare Provider Digital Presence",
          description: "Building a comprehensive digital marketing strategy for a healthcare network to increase patient acquisition.",
          progress: 75,
          tags: ["Healthcare", "Local SEO", "Reputation Management"]
        },
        {
          title: "Financial Services Content Strategy",
          description: "Developing an educational content marketing program for a financial services firm to establish thought leadership.",
          progress: 50,
          tags: ["Financial Services", "Content Marketing", "Thought Leadership"]
        }
      ],
      upcoming: [
        {
          title: "Retail Omnichannel Marketing Integration",
          description: "Creating a seamless marketing experience across digital and physical touchpoints for a retail brand.",
          startDate: "Q1 2025",
          tags: ["Retail", "Omnichannel", "Customer Experience"]
        },
        {
          title: "Sustainable Brand Launch Campaign",
          description: "Comprehensive digital marketing campaign for the launch of a new sustainable product line.",
          startDate: "Q2 2025",
          tags: ["Sustainability", "Brand Launch", "Social Media"]
        }
      ]
    },
    blogPosts: [
      {
        title: "Digital Marketing Trends Reshaping Business Strategy",
        excerpt: "Explore the latest digital marketing innovations and how they're transforming customer acquisition and retention strategies.",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80"
      },
      {
        title: "Building a Measurement Framework for Marketing Success",
        excerpt: "How to establish meaningful KPIs that align with business objectives and drive continuous improvement.",
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&q=80"
      },
      {
        title: "The Privacy-First Future of Digital Marketing",
        excerpt: "Strategies for effective digital marketing in an era of increased privacy regulations and changing consumer expectations.",
        image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&q=80"
      }
    ]
  },



  "mobile-development": {
    overview: "Our Mobile Development services deliver native and cross-platform applications that provide exceptional user experiences across iOS and Android devices. We combine cutting-edge technology with intuitive design to create mobile solutions that help businesses engage customers, streamline operations, and drive growth.",
    benefits: [
      "Consistent user experience across iOS and Android platforms",
      "Native performance with optimized code and responsive design",
      "Seamless integration with device features and third-party services",
      "Offline functionality and robust data synchronization",
      "Ongoing support and iterative improvement based on user feedback"
    ],
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "React Native",
        description: "Cross-platform framework for building native-like applications"
      },
      {
        name: "Swift",
        description: "Apple's programming language for iOS development"
      },
      {
        name: "Kotlin",
        description: "Modern language for Android application development"
      },
      {
        name: "Flutter",
        description: "Google's UI toolkit for building natively compiled applications"
      },
      {
        name: "Firebase",
        description: "Backend services for authentication, storage, and analytics"
      },
      {
        name: "GraphQL",
        description: "API query language for efficient data fetching"
      }
    ],
    projects: {
      completed: [
        {
          title: "Retail Shopping Application",
          description: "Developed a feature-rich shopping app for a major retail brand, resulting in a 40% increase in mobile sales.",
          image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80",
          tags: ["E-commerce", "iOS", "Android", "Payment Integration"]
        },
        {
          title: "Healthcare Patient Management",
          description: "Created a HIPAA-compliant mobile platform for patient appointment scheduling and health record access.",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80",
          tags: ["Healthcare", "Privacy", "User Experience", "Cross-platform"]
        }
      ],
      ongoing: [
        {
          title: "Fitness Tracking System",
          description: "Building a comprehensive fitness application with wearable device integration and personalized workout plans.",
          progress: 75,
          tags: ["Health & Fitness", "IoT Integration", "Personalization"]
        },
        {
          title: "Financial Services Mobile Banking",
          description: "Developing a secure mobile banking platform with advanced biometric authentication and transaction features.",
          progress: 60,
          tags: ["Fintech", "Security", "User Experience"]
        }
      ],
      upcoming: [
        {
          title: "Restaurant Ordering System",
          description: "Creating a contactless ordering and payment application for a restaurant chain with real-time kitchen integration.",
          startDate: "Q1 2025",
          tags: ["Food & Beverage", "Real-time", "Payment Processing"]
        },
        {
          title: "Smart Home Control Application",
          description: "Designing an intuitive mobile interface for managing smart home devices across multiple ecosystems.",
          startDate: "Q2 2025",
          tags: ["IoT", "Smart Home", "User Interface Design"]
        }
      ]
    },
    blogPosts: [
      {
        title: "Native vs. Cross-Platform: Making the Right Choice",
        excerpt: "Compare the advantages and considerations of native and cross-platform development approaches for your business needs.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80"
      },
      {
        title: "Mobile UX Best Practices for Higher User Engagement",
        excerpt: "Learn how thoughtful UX design principles can significantly improve user retention and engagement on mobile platforms.",
        image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80"
      },
      {
        title: "Optimizing Mobile App Performance for Global Markets",
        excerpt: "Discover strategies for ensuring your mobile application performs well across various device capabilities and network conditions.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80"
      }
    ]
  },

  
  
  "software-development": {
    overview: "Our Software Development services deliver custom applications tailored to your unique business requirements. We combine technical expertise with industry knowledge to create scalable, secure, and user-friendly software solutions that drive operational efficiency and competitive advantage.",
    benefits: [
      "Custom solutions aligned with your specific business needs",
      "Improved operational efficiency through automation",
      "Enhanced user experience and customer satisfaction",
      "Scalable architecture that grows with your business",
      "Ongoing support and continuous improvement"
    ],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "JavaScript/TypeScript",
        description: "Modern web application development with React, Angular, and Vue"
      },
      {
        name: "Python",
        description: "Backend, data processing, AI/ML applications"
      },
      {
        name: "Java/Spring",
        description: "Enterprise-grade applications with robust security"
      },
      {
        name: ".NET",
        description: "Microsoft ecosystem integration and enterprise solutions"
      },
      {
        name: "Mobile Development",
        description: "Native and cross-platform iOS and Android applications"
      },
      {
        name: "DevOps",
        description: "CI/CD pipelines, containerization, and automated testing"
      }
    ],
    projects: {
      completed: [
        {
          title: "Enterprise Resource Planning System",
          description: "Developed a custom ERP solution for a manufacturing company, integrating operations, finance, and supply chain management.",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80",
          tags: ["ERP", "Manufacturing", "Process Automation"]
        },
        {
          title: "Healthcare Patient Portal",
          description: "Built a HIPAA-compliant patient portal for a healthcare network that improved patient engagement and streamlined administrative processes.",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
          tags: ["Healthcare", "Patient Experience", "Security"]
        }
      ],
      ongoing: [
        {
          title: "Financial Services Mobile Application",
          description: "Developing a comprehensive mobile banking application with advanced security features and personalized user experience.",
          progress: 70,
          tags: ["Mobile Banking", "UX/UI", "Security"]
        },
        {
          title: "Logistics Management Platform",
          description: "Building an integrated logistics platform with real-time tracking, route optimization, and predictive analytics.",
          progress: 55,
          tags: ["Supply Chain", "IoT Integration", "Real-time Analytics"]
        }
      ],
      upcoming: [
        {
          title: "Retail AI Shopping Assistant",
          description: "Creating an AI-powered shopping assistant for a major retail chain to enhance the online and in-store experience.",
          startDate: "Q1 2025",
          tags: ["AI/ML", "Retail", "Omnichannel"]
        },
        {
          title: "Smart City Management Solution",
          description: "Developing an integrated platform for municipal management of resources, services, and infrastructure.",
          startDate: "Q2 2025",
          tags: ["IoT", "Public Sector", "Sustainability"]
        }
      ]
    },
    blogPosts: [
      {
        title: "The Future of Software Development: Trends and Technologies",
        excerpt: "Explore emerging patterns in software development including AI-assisted coding, low-code platforms, and edge computing.",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80"
      },
      {
        title: "Building Software That Scales: Architecture Best Practices",
        excerpt: "Key architectural patterns and practices for developing applications that can scale effectively with your business.",
        image: "https://images.unsplash.com/photo-1558050032-160f36233a07?auto=format&fit=crop&q=80"
      },
      {
        title: "The Human Side of Software: Creating User-Centric Applications",
        excerpt: "How to balance technical excellence with exceptional user experience in software development projects.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
      }
    ]
  },

"data-analytics": {
    overview: "Our Data Analytics services help organizations transform raw data into actionable insights. We employ advanced analytics techniques, machine learning algorithms, and visualization tools to help you make more informed business decisions and gain a competitive edge.",
    benefits: [
      "Data-driven decision making across all organizational levels",
      "Identification of trends and patterns for strategic planning",
      "Improved operational efficiency through process optimization",
      "Enhanced customer insights leading to better experiences",
      "Predictive capabilities for proactive business management"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "Python",
        description: "Advanced data processing and machine learning libraries"
      },
      {
        name: "R",
        description: "Statistical computing and graphics for complex analysis"
      },
      {
        name: "Tableau",
        description: "Interactive data visualization and business intelligence"
      },
      {
        name: "Power BI",
        description: "Business analytics service for interactive visualizations"
      },
      {
        name: "SQL/NoSQL",
        description: "Database management for structured and unstructured data"
      },
      {
        name: "TensorFlow",
        description: "Machine learning framework for predictive analytics"
      }
    ],
    projects: {
      completed: [
        {
          title: "Retail Customer Segmentation",
          description: "Developed a sophisticated customer segmentation model for a national retail chain, increasing marketing ROI by 35%.",
          image: "https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&q=80",
          tags: ["Machine Learning", "Customer Analytics", "Retail"]
        },
        {
          title: "Manufacturing Process Optimization",
          description: "Implemented predictive maintenance analytics for a manufacturing plant, reducing downtime by 28% and maintenance costs by 15%.",
          image: "https://images.unsplash.com/photo-1581092921461-7d25da8b7f8f?auto=format&fit=crop&q=80",
          tags: ["Industrial IoT", "Predictive Analytics", "Manufacturing"]
        }
      ],
      ongoing: [
        {
          title: "Banking Fraud Detection System",
          description: "Building an AI-powered fraud detection system for a banking network to identify suspicious transactions in real-time.",
          progress: 70,
          tags: ["AI", "Financial Services", "Real-time Analytics"]
        },
        {
          title: "Healthcare Outcome Prediction",
          description: "Developing predictive models for patient outcomes to optimize treatment plans and resource allocation.",
          progress: 55,
          tags: ["Healthcare Analytics", "Predictive Modeling", "Machine Learning"]
        }
      ],
      upcoming: [
        {
          title: "Supply Chain Optimization Platform",
          description: "Creating a comprehensive analytics platform for supply chain optimization, incorporating demand forecasting and inventory management.",
          startDate: "Q1 2025",
          tags: ["Supply Chain", "Forecasting", "Logistics"]
        },
        {
          title: "Smart City Data Initiative",
          description: "Partnering with a major metropolitan area to develop a data analytics framework for urban planning and resource management.",
          startDate: "Q2 2025",
          tags: ["Smart Cities", "Urban Analytics", "Public Sector"]
        }
      ]
    },
    blogPosts: [
      {
        title: "From Data to Decisions: The Analytics Journey",
        excerpt: "Follow the path from raw data collection to actionable business insights through effective analytics strategies.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      },
      {
        title: "Ethical Considerations in Data Analytics",
        excerpt: "Exploring the ethical challenges in data collection, analysis, and application in the modern business environment.",
        image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80"
      },
      {
        title: "Real-time Analytics: Why Speed Matters",
        excerpt: "Discover how real-time analytics capabilities can transform business operations and customer experiences.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
      }
    ]
  },


  "web-development": {
    overview: "Our Web Development services create responsive, high-performance websites and web applications that deliver exceptional user experiences across all devices. We leverage modern technologies and frameworks to build scalable, secure, and SEO-friendly web solutions that align with your business objectives.",
    benefits: [
      "Responsive design that works flawlessly across all screen sizes",
      "Fast loading speeds and optimized performance metrics",
      "SEO-friendly architecture for improved search visibility",
      "Accessible interfaces that comply with WCAG standards",
      "Scalable architecture that accommodates business growth"
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "React.js",
        description: "Library for building interactive user interfaces"
      },
      {
        name: "Next.js",
        description: "React framework for server-side rendering and static sites"
      },
      {
        name: "TypeScript",
        description: "Typed JavaScript for more reliable code"
      },
      {
        name: "Node.js",
        description: "JavaScript runtime for server-side applications"
      },
      {
        name: "GraphQL",
        description: "Query language for APIs with efficient data loading"
      },
      {
        name: "AWS/Azure/GCP",
        description: "Cloud platforms for hosting and infrastructure"
      }
    ],
    projects: {
      completed: [
        {
          title: "E-commerce Platform Redesign",
          description: "Completely rebuilt an e-commerce site, resulting in 50% faster page loads and a 25% increase in conversion rates.",
          image: "https://images.unsplash.com/photo-1524749292158-7540c2494485?auto=format&fit=crop&q=80",
          tags: ["E-commerce", "Performance", "User Experience"]
        },
        {
          title: "Corporate Intranet Portal",
          description: "Developed a comprehensive intranet solution with document management and employee communication features.",
          image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&q=80",
          tags: ["Enterprise", "Collaboration", "Security"]
        }
      ],
      ongoing: [
        {
          title: "Real Estate Listing Platform",
          description: "Building a feature-rich property listing website with virtual tours and advanced search capabilities.",
          progress: 70,
          tags: ["Real Estate", "Search Functionality", "Media Integration"]
        },
        {
          title: "Educational Learning Management System",
          description: "Developing an interactive learning platform with course management and student progress tracking.",
          progress: 55,
          tags: ["Education", "User Management", "Content Delivery"]
        }
      ],
      upcoming: [
        {
          title: "Healthcare Provider Directory",
          description: "Creating a comprehensive healthcare provider search and appointment booking platform with insurance integration.",
          startDate: "Q1 2025",
          tags: ["Healthcare", "Search", "Booking System"]
        },
        {
          title: "Government Services Portal",
          description: "Designing an accessible citizen services platform with secure authentication and form submission.",
          startDate: "Q2 2025",
          tags: ["Government", "Accessibility", "Security"]
        }
      ]
    },
    blogPosts: [
      {
        title: "Core Web Vitals: The New Standard for Website Performance",
        excerpt: "Understanding Google's Core Web Vitals and how they impact your website's search ranking and user experience.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
      },
      {
        title: "Progressive Web Apps: The Future of Web Development",
        excerpt: "How PWAs are bridging the gap between web and mobile experiences with offline capabilities and native-like features.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80"
      },
      {
        title: "Accessibility-First Design: Building for Everyone",
        excerpt: "Best practices for creating web experiences that are truly accessible to users of all abilities.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
      }
    ]
  },

  "ui-ux-design": {
    overview: "Our UI/UX Design services create intuitive, engaging digital experiences that delight users and drive business results. We combine user research, interaction design, and visual aesthetics to craft interfaces that are both beautiful and functional, resulting in higher conversion rates and increased user satisfaction.",
    benefits: [
      "Increased user engagement and retention through intuitive interfaces",
      "Higher conversion rates with optimized user journeys",
      "Reduced development costs by identifying issues early in the design phase",
      "Consistent brand experience across all digital touchpoints",
      "Data-driven design decisions based on user testing and research"
    ],
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "Figma",
        description: "Collaborative interface design and prototyping tool"
      },
      {
        name: "Adobe XD",
        description: "Design and prototyping experience platform"
      },
      {
        name: "Sketch",
        description: "Digital design toolkit for Mac"
      },
      {
        name: "InVision",
        description: "Digital product design platform"
      },
      {
        name: "Maze",
        description: "User testing platform for rapid validation"
      },
      {
        name: "Storybook",
        description: "Tool for developing UI components in isolation"
      }
    ],
    projects: {
      completed: [
        {
          title: "Banking App Redesign",
          description: "Completely reimagined a major bank's mobile app, improving user satisfaction scores by 40% and increasing feature usage.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
          tags: ["Banking", "Mobile Design", "User Experience"]
        },
        {
          title: "E-commerce UX Optimization",
          description: "Redesigned the checkout process for an online retailer, resulting in a 28% reduction in cart abandonment.",
          image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80",
          tags: ["E-commerce", "Conversion Optimization", "Checkout Flow"]
        }
      ],
      ongoing: [
        {
          title: "Healthcare Patient Portal",
          description: "Designing an intuitive patient portal that simplifies appointment management, test results, and communication with providers.",
          progress: 65,
          tags: ["Healthcare", "Accessibility", "Information Architecture"]
        },
        {
          title: "Travel Booking Experience",
          description: "Reimagining the digital booking experience for a travel company with a focus on personalization and simplicity.",
          progress: 50,
          tags: ["Travel", "Personalization", "Multi-device Experience"]
        }
      ],
      upcoming: [
        {
          title: "Smart Home Control Interface",
          description: "Creating a unified control interface for managing multiple smart home devices with intuitive interactions.",
          startDate: "Q1 2025",
          tags: ["IoT", "Interface Design", "User Experience"]
        },
        {
          title: "Educational Platform for Children",
          description: "Designing an engaging and accessible learning platform tailored for young students with varying abilities.",
          startDate: "Q2 2025",
          tags: ["Education", "Accessibility", "Gamification"]
        }
      ]
    },
    blogPosts: [
      {
        title: "The Psychology of Color in UI Design",
        excerpt: "How strategic color choices can influence user perception and behavior in digital interfaces.",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80"
      },
      {
        title: "Microinteractions: Small Details, Big Impact",
        excerpt: "Why subtle interactive elements can dramatically improve the overall user experience of your digital product.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80"
      },
      {
        title: "Designing for Accessibility: Beyond Compliance",
        excerpt: "How inclusive design practices create better experiences for all users, not just those with disabilities.",
        image: "https://images.unsplash.com/photo-1573164713712-03790a178651?auto=format&fit=crop&q=80"
      }
    ]
  },

  "blockchain": {
    overview: "Our Blockchain services help organizations implement distributed ledger technologies to enhance transparency, security, and efficiency. We develop custom blockchain solutions for various use cases including supply chain traceability, digital identity, smart contracts, and secure record-keeping across multiple industries.",
    benefits: [
      "Enhanced security through cryptographic verification and immutability",
      "Increased transparency with shared, unalterable transaction records",
      "Improved efficiency by eliminating intermediaries and reducing friction",
      "Greater trust among participants with verifiable transactions",
      "Automated processes through smart contract implementation"
    ],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80",
    technologies: [
      {
        name: "Ethereum",
        description: "Platform for decentralized applications and smart contracts"
      },
      {
        name: "Hyperledger Fabric",
        description: "Enterprise-grade permissioned blockchain framework"
      },
      {
        name: "Solidity",
        description: "Programming language for writing smart contracts"
      },
      {
        name: "IPFS",
        description: "Distributed file system for storing and sharing data"
      },
      {
        name: "Web3.js",
        description: "JavaScript library for interacting with the Ethereum blockchain"
      },
      {
        name: "Consensus Algorithms",
        description: "Proof of Work, Proof of Stake, and other validation methods"
      }
    ],
    projects: {
      completed: [
        {
          title: "Supply Chain Traceability Solution",
          description: "Implemented a blockchain-based platform for a food distributor to track products from farm to table, increasing consumer trust.",
          image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?auto=format&fit=crop&q=80",
          tags: ["Supply Chain", "Food Industry", "Traceability"]
        },
        {
          title: "Digital Identity Verification",
          description: "Created a secure, self-sovereign identity solution for a financial institution, reducing KYC processing time by 70%.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
          tags: ["Digital Identity", "Financial Services", "Security"]
        }
      ],
      ongoing: [
        {
          title: "Real Estate Transaction Platform",
          description: "Building a blockchain platform to streamline property transactions with smart contracts for escrow and title transfers.",
          progress: 65,
          tags: ["Real Estate", "Smart Contracts", "Transaction Processing"]
        },
        {
          title: "Healthcare Data Exchange",
          description: "Developing a secure, HIPAA-compliant system for sharing patient data across healthcare providers while maintaining privacy.",
          progress: 45,
          tags: ["Healthcare", "Data Privacy", "Interoperability"]
        }
      ],
      upcoming: [
        {
          title: "Decentralized Energy Trading",
          description: "Creating a peer-to-peer platform for renewable energy producers and consumers to trade electricity directly.",
          startDate: "Q1 2025",
          tags: ["Energy", "P2P Trading", "Sustainability"]
        },
        {
          title: "Digital Voting System",
          description: "Implementing a secure, transparent voting solution with immutable record-keeping and voter privacy.",
          startDate: "Q2 2025",
          tags: ["Governance", "Security", "Transparency"]
        }
      ]
    },
    blogPosts: [
      {
        title: "Beyond Cryptocurrency: Enterprise Blockchain Applications",
        excerpt: "Exploring how blockchain technology is creating value in traditional business contexts beyond digital currencies.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80"
      },
      {
        title: "Smart Contracts: Automating Business Logic on the Blockchain",
        excerpt: "How self-executing contracts are streamlining processes and reducing the need for intermediaries across industries.",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80"
      },
      {
        title: "The Evolution of Blockchain Consensus Mechanisms",
        excerpt: "Comparing different approaches to achieving agreement in distributed networks and their implications for performance and security.",
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80"
      }
    ]
  }
};
