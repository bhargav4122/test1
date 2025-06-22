// src/pages/services/core-data-cloud/components.ts
import { Database, Server, Cloud, Code, Layers, Settings, Grid2X2 } from 'lucide-react'; // Add icons needed
import { SubService } from '@/types/navigation'; // Adjust path as needed

// Define more specific types if necessary, extending SubService

export const coreDataCloudComponents: SubService[] = [
    {
        id: "modern-data-pipelines",
        title: "1️⃣ Modern Data Pipelines",
        description: "Eliminate bottlenecks with automated, real-time data flows.",
        icon: Database, // Assign Lucide icon component
        features: [
            "Real-time & batch processing (Kafka, Spark, Fabric Pipelines)",
            "Low-code ETL/ELT (Azure Data Factory, dbt, Databricks)",
            "ML-integrated workflows (feature engineering, model deployment)",
            "Proactive monitoring & alerts (Data Dog, OpenTelemetry)"
        ],
        specializations: { // Example structure
            "Processing": ["Real-time", "Batch", "Streaming"],
            "Tools": ["Kafka", "Spark", "Azure Data Factory", "dbt"]
        },
        technologies: ["Kafka", "Spark", "Azure Data Factory", "dbt", "Databricks", "Data Dog", "OpenTelemetry"],
        testimonial: "🚀 *\"Reduced pipeline delays by 70% for a retail client using Fabric real-time streaming.\"*"
    },
    {
        id: "data-integration",
        title: "2️⃣ Seamless Data Integration",
        description: "Connect all your data sources without the chaos.",
        icon: Layers, // Assign Lucide icon component
        features: [
            "Microsoft Fabric & OneLake (unify data across clouds)",
            "CDC & real-time sync (Debezium, GoldenGate)",
            "Auto-ingestion for databases, APIs, IoT",
            "Governed data sharing (Unity Catalog, Purview)"
        ],
        technologies: ["Microsoft Fabric", "OneLake", "Debezium", "GoldenGate", "Unity Catalog", "Purview"],
        testimonial: "🚀 *\"Integrated 20+ ERP/CRM systems for a financial firm, cutting reporting time by 50%.\"*"
    },
    {
        id: "data-warehousing",
        title: "3️⃣ Cloud Data Warehousing & Lakehouses",
        description: "Query petabytes in seconds with a future-proof setup.",
        icon: Grid2X2, // Assign Lucide icon component
        features: [
            "Lakehouse architecture (Delta Lake, Fabric, Databricks)",
            "Serverless & cost-optimized (Snowflake, BigQuery, Synapse)",
            "AI-ready semantic models (Power BI Direct Lake, dbt metrics)"
        ],
        technologies: ["Delta Lake", "Microsoft Fabric", "Databricks", "Snowflake", "BigQuery", "Azure Synapse", "Power BI"],
        testimonial: "🚀 *\"Cut data warehouse costs by 40% while improving query speed for a healthcare client.\"*"
    },
    {
        id: "ai-ml-engineering",
        title: "4️⃣ AI & ML Data Engineering",
        description: "Build, deploy, and scale AI with production-ready data.",
        icon: Code, // Assign Lucide icon component
        features: [
            "Feature stores & vector DBs (Hopsworks, Pinecone)",
            "LLM & RAG pipelines (Azure AI Search, Databricks)",
            "MLOps automation (MLflow, Vertex AI)"
        ],
        technologies: ["Hopsworks", "Pinecone", "Azure AI Search", "Databricks", "MLflow", "Vertex AI"],
        testimonial: "🚀 *\"Deployed a fraud detection model with 95% accuracy for a fintech startup.\"*"
    },
    {
        id: "data-governance",
        title: "5️⃣ Data Governance & Quality",
        description: "Automated checks, lineage, and compliance.",
        icon: Settings, // Assign Lucide icon component
        features: [
            "Fabric Data Activator (anomaly detection)",
            "Data contracts & policy-as-code (Great Expectations, OPA)",
            "GDPR/HIPAA-ready security (Purview, Immuta)"
        ],
        technologies: ["Microsoft Fabric", "Great Expectations", "Open Policy Agent (OPA)", "Purview", "Immuta"],
        testimonial: "🚀 *\"Achieved 100% compliance audit success for a global e-commerce firm.\"*"
    },
    {
        id: "cloud-migration",
        title: "6️⃣ Cloud Migration & Optimization",
        description: "Modernize without downtime.",
        icon: Cloud, // Assign Lucide icon component
        features: [
            "Zero-downtime migrations (Snowflake, Fabric, AWS)",
            "FinOps & cost monitoring (CloudHealth, Azure Cost Mgmt)",
            "Green cloud strategies (carbon-aware computing)"
        ],
        technologies: ["AWS Migration Hub", "Azure Migrate", "Google Cloud Migration", "Snowflake", "Microsoft Fabric", "CloudHealth", "Azure Cost Management"],
        testimonial: "🚀 *\"Migrated a 10TB database seamlessly over a weekend.\"*" // Example testimonial
    }
];