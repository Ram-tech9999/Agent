export interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  duration: string;
  stipend: string;
  category: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  postedDate: string;
  deadline: string;
  companyLogo?: string;
}

export type FilterType = 'all' | 'remote' | 'hybrid' | 'onsite';
export type CategoryType = 'all' | 'engineering' | 'design' | 'marketing' | 'data' | 'product';
