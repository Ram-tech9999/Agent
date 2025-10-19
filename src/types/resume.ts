export interface Resume {
  id: string;
  userId: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  fileSize: number;
  fileType: string;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  matchedSkills: string[];
  missingSkills: string[];
  sections: {
    education: number;
    experience: number;
    skills: number;
    formatting: number;
  };
}
