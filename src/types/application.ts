export type ApplicationStatus = 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';

export interface Application {
  id: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  status: ApplicationStatus;
  appliedDate: string;
  lastUpdated: string;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  matchScore?: number;
}

export interface ApplicationTimeline {
  id: string;
  status: ApplicationStatus;
  date: string;
  description: string;
}
