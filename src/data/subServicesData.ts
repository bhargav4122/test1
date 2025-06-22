import { SubService } from "@/types/navigation";
import { 
  Database, Server, Cloud, Code, FileText, Settings, 
  Layers, Grid2X2, Users, Briefcase, CheckCircle, Cpu, Timer 
} from "lucide-react";

export const iconMapping: Record<string, LucideIcon> = {
  database: Database,
  server: Server,
  cloud: Cloud,
  code: Code,
  file: FileText,
  settings: Settings,
  layers: Layers,
  grid: Grid2X2
};

export const defaultSubServices: SubService[] = [
  {
    id: "default-subservice-1",
    title: "Core Component",
    description: "Essential foundational elements of this service",
    features: ["Reliable", "Scalable", "Secure"],
    projectCount: 12,
    icon: Database,
    technologies: ["AWS", "Azure", "GCP"],
    completedProjects: 8
  },
  // ... paste the rest of defaultSubServices here
];

export const serviceComponentsData: Record<string, SubService[]> = {
  "cybersecurity": [
    {
      id: "cybersecurity-network",
      title: "Network Security",
      description: "Comprehensive protection for your network infrastructure",
      features: ["Firewall Management", "Intrusion Detection", "VPN Solutions"],
      // ... rest of the cybersecurity subservices
    },
    // ... paste all other service categories here
  ],
  // ... rest of service categories
};