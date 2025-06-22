import { type LucideIcon } from 'lucide-react';

export interface IndustryDetail {
  name: string;
  challenges: string[];
  solutions: string[];
  caseStudy?: string;
  futureOutlook?: string;
}

export interface ServiceIndustryDetails {
  current?: IndustryDetail[];
  potential?: IndustryDetail[];
  future?: IndustryDetail[];
}

export const serviceIndustriesDetailed: Record<string, ServiceIndustryDetails> = {
  'bi-digital-transformation': {
    current: [
      {
        name: 'Financial Services',
        challenges: ['Data fragmentation', 'Real-time analytics needs', 'Regulatory compliance'],
        solutions: ['Unified data platform', 'Real-time BI dashboards', 'Compliance reporting'],
        caseStudy: 'Implemented enterprise BI solution that reduced reporting time by 75% and improved decision accuracy by 40%'
      },
      {
        name: 'Healthcare',
        challenges: ['Patient data analysis', 'Operational efficiency', 'Resource allocation'],
        solutions: ['Healthcare analytics', 'Operational dashboards', 'Resource optimization'],
        caseStudy: 'Deployed analytics platform that improved resource utilization by 35% and patient outcomes by 25%'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['Production optimization', 'Supply chain visibility', 'Quality control'],
        solutions: ['Production analytics', 'Supply chain dashboards', 'Quality monitoring'],
        caseStudy: 'Implemented manufacturing analytics reducing defects by 45% and improving throughput by 30%'
      }
    ]
  },
  'core-data-cloud': {
    current: [
      {
        name: 'IT & Cloud Services',
        challenges: ['Data scalability', 'Integration complexity', 'Performance optimization'],
        solutions: ['Cloud data platform', 'API integration', 'Performance tuning'],
        caseStudy: 'Built scalable data platform handling 10x growth while reducing costs by 40%'
      },
      {
        name: 'Healthcare',
        challenges: ['Data security', 'Accessibility', 'Compliance'],
        solutions: ['Secure health data platform', 'Unified access', 'Compliance framework'],
        caseStudy: 'Deployed HIPAA-compliant platform reducing data access time by 60%'
      }
    ],
    potential: [
      {
        name: 'Education',
        challenges: ['Student data management', 'Analytics needs', 'Resource planning'],
        solutions: ['Education data platform', 'Learning analytics', 'Resource optimization'],
        caseStudy: 'Implemented education analytics improving student outcomes by 25%'
      }
    ]
  },
  'business-consulting': {
    current: [
      {
        name: 'Financial Services',
        challenges: ['Digital transformation', 'Operational efficiency', 'Market positioning'],
        solutions: ['Digital strategy development', 'Process optimization', 'Competitive analysis'],
        caseStudy: 'Guided digital transformation increasing efficiency by 35% and revenue by 28%'
      },
      {
        name: 'Healthcare',
        challenges: ['Operational efficiency', 'Patient experience', 'Cost reduction'],
        solutions: ['Healthcare operations analysis', 'Patient journey mapping', 'Cost optimization'],
        caseStudy: 'Redesigned patient processes reducing wait times by 45%'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['Supply chain optimization', 'Digital transformation', 'Market expansion'],
        solutions: ['Supply chain analysis', 'Industry 4.0 roadmaps', 'Market entry strategies'],
        caseStudy: 'Developed transformation roadmap achieving 22% efficiency gain'
      }
    ]
  },
  'market-research': {
    current: [
      {
        name: 'Retail',
        challenges: ['Customer preferences', 'Competitive landscape', 'Market trends'],
        solutions: ['Consumer behavior analysis', 'Competitor research', 'Trend forecasting'],
        caseStudy: 'Market analysis enabling successful expansion with 20% above-projected sales'
      },
      {
        name: 'Financial Services',
        challenges: ['Product development', 'Customer segmentation', 'Market positioning'],
        solutions: ['Financial product research', 'Customer segment analysis', 'Brand positioning'],
        caseStudy: 'Customer segmentation leading to 40% higher product adoption'
      }
    ],
    potential: [
      {
        name: 'Manufacturing',
        challenges: ['Market opportunity', 'Product validation', 'Competitive analysis'],
        solutions: ['Market opportunity assessment', 'Product testing', 'Competitor analysis'],
        caseStudy: 'Market research enabling successful product launch with 25% market share'
      }
    ]
  },
  'consumer-voice': {
    current: [
      {
        name: 'Retail',
        challenges: ['Customer feedback', 'Brand perception', 'Service quality'],
        solutions: ['Voice of customer programs', 'Brand monitoring', 'Service improvement'],
        caseStudy: 'VoC program increasing customer satisfaction by 32%'
      },
      {
        name: 'Hospitality',
        challenges: ['Guest experience', 'Service standards', 'Reputation management'],
        solutions: ['Guest feedback analysis', 'Service optimization', 'Reputation monitoring'],
        caseStudy: 'Feedback system improving guest satisfaction by 28%'
      }
    ],
    potential: [
      {
        name: 'Healthcare',
        challenges: ['Patient feedback', 'Service quality', 'Experience improvement'],
        solutions: ['Patient feedback system', 'Quality monitoring', 'Experience optimization'],
        caseStudy: 'Patient feedback program reducing complaints by 40%'
      }
    ]
  }
};