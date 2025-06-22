// src/pages/services/core-data-cloud/data.ts
import { Clock, FileCode, Check, BarChart } from "lucide-react";
import { Technology, BlogPost, WorkflowStep, ServiceDetailsData } from '@/types/navigation'; // Adjust path as needed

// Assuming LucideIcon type is available or imported correctly
import type { LucideIcon } from 'lucide-react';

// Interface specifically for this service's data might be useful
interface CoreDataCloudDetails extends ServiceDetailsData {
  subtitle?: string;
  // Add any other specific fields for this service
}

export const coreDataCloudData: CoreDataCloudDetails = {
  id: "core-data-cloud", // Add an ID for reference if needed
  title: "Data & Cloud Solutions That Scale With Your Business",
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
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80", // Make sure image paths are correct or use imports
  technologies: [
    { name: "AWS", description: "Full suite of Amazon Web Services including EC2, S3, Lambda, and more", icon: "☁️" }, // Added example icon
    { name: "Microsoft Azure", description: "Azure Virtual Machines, Azure Storage, Azure Functions, and more", icon: "☁️" },
    { name: "Google Cloud Platform", description: "GCP Compute Engine, Cloud Storage, BigQuery, and more", icon: "☁️" },
    { name: "Kubernetes", description: "Container orchestration for automated deployment and scaling", icon: "⚙️" },
    { name: "Docker", description: "Containerization platform for consistent deployments", icon: "📦" },
    { name: "Terraform", description: "Infrastructure as Code for automated provisioning", icon: "📜" }
  ] as Technology[], // Ensure type assertion if needed
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
  ] as BlogPost[], // Ensure type assertion if needed
  workflow: [ // Example: Use default or customize here
    { title: "Discovery & Strategy", description: "Align cloud goals with business objectives.", icon: Clock },
    { title: "Architecture Design", description: "Blueprint scalable and secure infrastructure.", icon: FileCode },
    { title: "Migration & Implementation", description: "Execute the transition seamlessly.", icon: Check },
    { title: "Optimization & Management", description: "Ensure performance and cost-efficiency.", icon: BarChart }
  ] as WorkflowStep[],
  // Include 'services' array if used for Key Features section
  services: [
    "Cloud Architecture Design",
    "Cloud Migration",
    "Managed Cloud Services",
    "Cloud Security",
    "Cost Optimization",
    "DevOps & Automation"
  ]
};