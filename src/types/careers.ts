export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: string;
  field?: string;
}

export interface CareerPathYear {
  year: number;
  title: string;
  description: string;
  skills: string[];
  responsibilities: string[];
  stipend: string;
  benefits: string[];
  projects: string[];
}

export interface CareerPath {
  field: string;
  icon: string;
  description: string;
  totalDuration: string;
  finalRole: string;
  years: CareerPathYear[];
}

export interface Application {
  jobId: string;
  applicantName: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  university?: string;
  graduationYear?: string;
  currentYear?: string;
  preferredField?: string;
}