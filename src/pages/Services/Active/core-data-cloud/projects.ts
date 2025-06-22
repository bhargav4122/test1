// src/pages/services/core-data-cloud/projects.ts
import { Project } from '@/types/navigation'; // Adjust path as needed

// Define a more specific Project type if needed, extending the base Project

export const coreDataCloudProjects: {
    completed: Project[];
    ongoing: Project[];
    upcoming: Project[];
} = {
    completed: [
        {
            title: "Financial Services Cloud Migration",
            description: "Successfully migrated a major financial institution's entire infrastructure to a hybrid cloud solution, reducing operational costs by 40%.",
            image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&q=80",
            tags: ["AWS", "Hybrid Cloud", "Security", "Financial Services"],
            challenge: "Aging on-premise infrastructure with high maintenance costs and limited scalability.",
            solution: [
                "Developed a phased migration strategy prioritizing critical applications.",
                "Implemented robust security controls using AWS security services.",
                "Established automated monitoring and alerting."
            ],
            outcomes: [
                "40% reduction in operational expenditure.",
                "Improved application performance and availability.",
                "Enhanced disaster recovery capabilities."
            ]
        },
        {
            title: "E-commerce Platform Scaling",
            description: "Redesigned cloud architecture for an e-commerce platform to handle 10x traffic spikes during sales events without downtime.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80",
            tags: ["GCP", "Kubernetes", "Auto-scaling", "Retail"],
            challenge: "Frequent downtime during peak sales periods impacting revenue.",
            solution: [
                "Migrated application to Google Kubernetes Engine (GKE).",
                "Implemented horizontal pod autoscaling.",
                "Optimized database connections and caching."
            ],
            outcomes: [
                "Zero downtime during Black Friday sales.",
                "Ability to handle 10x normal traffic load.",
                "Improved page load times by 30%."
            ]
        },
        {
            title: "Manufacturing Data Hub",
            client: "Auto Parts Manufacturer", // Optional client field
            challenge: "Siloed data across 12 legacy systems hindering unified reporting.",
            solution: [
                "Designed Azure Data Lake architecture using ADLS Gen2.",
                "Implemented data ingestion pipelines with Azure Data Factory.",
                "Built Power BI semantic layer for standardized reporting."
            ],
            outcomes: [
                "Unified 2.3 billion records into a single source of truth.",
                "Reduced reporting latency from days to minutes.",
                "Enabled predictive maintenance analytics, saving $500k annually."
            ],
            image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80",
            tags: ["Data Lake", "Azure", "Power BI", "Manufacturing"]
        },
        {
            title: "Customer 360 Migration",
            client: "National Bank",
            challenge: "Migrate large on-prem Teradata warehouse to Snowflake with minimal downtime.",
            solution: [
                "Converted complex BTEQ scripts to efficient dbt models.",
                "Implemented a data vault architecture in Snowflake for flexibility.",
                "Automated sensitive data masking for PCI DSS compliance."
            ],
            outcomes: [
                "Successfully migrated 58TB within planned weekend windows.",
                "Achieved an 18x improvement in average query performance.",
                "Passed PCI DSS audit for the new data platform."
            ],
            image: "https://images.unsplash.com/photo-1556741536508-17f38d3702be?auto=format&fit=crop&q=80",
            tags: ["Snowflake", "Data Vault", "Migration", "Banking", "Compliance"]
        }
    ],
    ongoing: [
        {
            title: "Real-Time Inventory Modeling",
            client: "E-Commerce Giant",
            challenge: "Hourly inventory discrepancies leading to stockouts and overstocking.",
            solution: [
                "Developing Kafka to Flink streaming pipeline for real-time updates.",
                "Building dynamic pricing model in Databricks based on inventory levels.",
                "Implementing Redis caching layer for fast access to hot SKU data."
            ],
            outcomes: [ // Expected outcomes
                "Targeting 99.8%+ inventory accuracy.",
                "Enabling automated markdown decisions.",
                "Providing real-time SKU tracking across warehouses."
            ],
            image: "https://images.unsplash.com/photo-1574170604718-5b5a3b5d914c?auto=format&fit=crop&q=80",
            tags: ["Streaming", "Kafka", "Flink", "Databricks", "Redis", "Retail"],
            progress: 75,
            timeline: { // Example timeline
                phases: [
                    { name: "Pipeline Dev", completed: true, description: "Kafka & Flink setup complete." },
                    { name: "Model Training", current: true, description: "Training pricing model." },
                    { name: "Integration", description: "Connecting to caching layer." },
                    { name: "Testing & Deployment", description: "End-to-end testing." }
                ],
                currentProgress: 75
            }
        },
        {
            title: "Healthcare Data Platform",
            description: "Building a HIPAA-compliant cloud platform for healthcare data analytics and patient information management.",
            progress: 65,
            tags: ["Azure", "HIPAA Compliance", "Data Security", "Healthcare"],
            challenge: "Securely aggregating and analyzing sensitive patient data from multiple sources.",
            solution: [ // In-progress solution steps
                "Implementing Azure Synapse Analytics for secure data warehousing.",
                "Developing data anonymization and masking procedures.",
                "Building role-based access controls."
            ],
            timeline: {
                phases: [
                    { name: "Architecture Design", completed: true },
                    { name: "Infrastructure Setup", completed: true },
                    { name: "Data Ingestion", current: true, progress: 70 },
                    { name: "Analytics Layer Dev", progress: 40 },
                    { name: "Compliance Validation" }
                ],
                currentProgress: 65
            }
        },
        {
            title: "Global Manufacturing IoT Hub",
            description: "Developing a centralized IoT hub in the cloud to connect manufacturing facilities across three continents.",
            progress: 40,
            tags: ["AWS IoT", "Edge Computing", "Real-time Analytics", "Manufacturing"],
            challenge: "Connecting diverse legacy equipment and handling large volumes of sensor data.",
            solution: [
                "Utilizing AWS IoT Core for device connectivity and management.",
                "Implementing AWS IoT Greengrass for edge processing.",
                "Designing a scalable data lake architecture on S3."
            ],
            timeline: {
                 phases: [
                    { name: "Platform Selection", completed: true },
                    { name: "Connectivity PoC", completed: true },
                    { name: "Hub Development", current: true, progress: 50 },
                    { name: "Edge Deployment Strategy" },
                    { name: "Pilot Rollout" }
                ],
                 currentProgress: 40
            }
        }
    ],
    upcoming: [
        {
            title: "Government Agency Cloud Transformation",
            description: "Comprehensive cloud transformation for a government agency, focusing on security and regulatory compliance (FedRAMP).",
            startDate: "Q1 2025",
            tags: ["FedRAMP", "Hybrid Cloud", "Government", "Security"],
            challenge: "Meeting stringent security requirements while modernizing legacy applications.",
            // High-level planned approach
            solution: ["Hybrid cloud architecture (Azure Gov + On-prem)", "Implementing strict access controls and monitoring", "Automated compliance reporting"]
        },
        {
            title: "Multi-Cloud Strategy Implementation",
            description: "Implementing a sophisticated multi-cloud strategy for a Fortune 500 company to optimize costs, avoid vendor lock-in, and leverage best-of-breed services.",
            startDate: "Q2 2025",
            tags: ["Multi-Cloud", "Cost Optimization", "Enterprise", "Cloud Governance"],
            challenge: "Managing complexity and ensuring interoperability across AWS, Azure, and GCP.",
            solution: ["Using Terraform for cross-cloud infrastructure provisioning", "Implementing a central cloud governance platform", "Developing cross-cloud cost monitoring dashboards"]
        }
    ]
};