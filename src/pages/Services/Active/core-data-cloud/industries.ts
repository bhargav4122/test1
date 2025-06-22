// src/pages/services/core-data-cloud/industries.ts
import { IndustryDetail } from '@/types/navigation'; // Adjust path as needed

// Define a more specific type if needed

// ** NOTE: Replace this with the actual industry data for core-data-cloud **
// This is placeholder data based on project examples.
export const coreDataCloudIndustries: {
    current: IndustryDetail[];
    potential: IndustryDetail[];
    future: IndustryDetail[];
} = {
    current: [
        {
            name: "Financial Services",
            challenges: ["Regulatory compliance (PCI DSS, etc.)", "Legacy system integration", "Real-time fraud detection", "Secure data sharing"],
            solutions: ["Hybrid/Multi-cloud architecture", "Data Vault modeling", "Secure data masking & encryption", "Managed Kubernetes for critical apps"],
            caseStudy: "Migrated a national bank's 58TB Teradata warehouse to Snowflake, improving query performance 18x and ensuring PCI DSS compliance.",
        },
        {
            name: "Retail & E-commerce",
            challenges: ["Handling traffic spikes", "Real-time inventory management", "Personalization at scale", "Integrating online/offline data"],
            solutions: ["Auto-scaling cloud infrastructure (Kubernetes, Serverless)", "Streaming data pipelines (Kafka, Flink)", "Customer Data Platforms (CDPs)", "Cloud data warehousing (Snowflake, BigQuery)"],
            caseStudy: "Redesigned GCP architecture for an e-commerce platform using Kubernetes, enabling zero downtime during 10x traffic surges.",
        },
         {
            name: "Manufacturing",
            challenges: ["Connecting legacy OT systems", "Processing large IoT data volumes", "Predictive maintenance", "Supply chain visibility"],
            solutions: ["Azure/AWS IoT Hubs", "Edge computing (Greengrass, Azure IoT Edge)", "Cloud Data Lakes (ADLS, S3)", "Time-series databases"],
            caseStudy: "Built an Azure Data Lake for an auto parts manufacturer, unifying data from 12 systems and enabling predictive maintenance analytics.",
         }
    ],
    potential: [
        {
            name: "Healthcare",
            challenges: ["HIPAA compliance", "Interoperability (FHIR/HL7)", "Analyzing large imaging/genomic datasets", "Secure patient portals"],
            solutions: ["HIPAA-eligible cloud services (Azure, AWS, GCP)", "Secure data anonymization techniques", "Cloud-based PACS/DICOM solutions", "AI/ML for diagnostic support"],
            futureOutlook: "Increasing use of cloud for telemedicine, remote monitoring, and AI-driven diagnostics requires robust, compliant infrastructure."
        }
    ],
    future: [
       {
           name: "Government",
           challenges: ["Stringent security (FedRAMP, etc.)", "Modernizing legacy systems", "Citizen service delivery", "Budget constraints"],
           solutions: ["Government cloud offerings (Azure Gov, AWS GovCloud)", "Secure hybrid cloud models", "Infrastructure as Code for compliance", "Data analytics for policy making"],
           futureOutlook: "Ongoing push for digital transformation and secure cloud adoption to improve efficiency and citizen services."
       },
       {
           name: "Energy & Utilities",
           challenges: ["Smart grid data management", "Renewable energy integration", "Asset monitoring & maintenance", "Cybersecurity of critical infrastructure"],
           solutions: ["IoT platforms for sensor data", "Time-series databases", "Predictive analytics for grid stability", "SCADA system security in the cloud"],
           futureOutlook: "Transition to renewables and smart grids necessitates scalable and secure cloud platforms for data processing and control."
       }
    ]
};