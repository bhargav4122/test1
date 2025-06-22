
import type { LucideIcon } from 'lucide-react';

export interface DropdownItem {
  title: string;
  path: string;
  description?: string;
  isNew?: boolean;
  isComingSoon?: boolean;
  icon?: LucideIcon; // Explicitly specify LucideIcon
  stage?: 'active' | 'development' | 'upcoming' | 'pilot';
  releaseDate?: string;
  type?: 'separator';
  label?: string;
  id?: string;
  image?: string;
  category?: string;
  pilotDetails?: string;
  developmentPhase?: string;
  estimatedLaunch?: string;
  stats?: {
    value: string;
    label: string;
  }[];
  features?: string[];
  subService?: string[];
}



export interface TeamMember {
  role: string;
  count: number;
}

export interface IndustryDetail {
  name: string;
  challenges?: string[];
  solutions?: string[];
  caseStudy?: string;
  futureOutlook?: string;
  category?: string;
}

export interface ServicesSectionProps {
  subServices: SubService[];
  displayTitle: string;
}


export interface Project {
  client: string;
  description: string[];
  duration?: string;
  result?: string;
  status?: string;
  location?: string;
}

export interface TeamComposition {
  role: string;
  count: number;
}

export interface TimeFrame {
  averageDuration: string;
  ongoingSupport: string;
}

export interface TechCategories {
  [category: string]: string[];
}

export interface SubService {
  id: string;
  title: string;
  description: string;
  features: string[];
  projectCount: number;
  icon: string;
  technologies: string[];
  completedProjects: number;

}
