import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Application } from '@/types/application';

interface ApplicationStore {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'appliedDate' | 'lastUpdated'>) => void;
  updateApplicationStatus: (id: string, status: Application['status']) => void;
  getApplicationById: (id: string) => Application | undefined;
  getApplicationsByStatus: (status: Application['status']) => Application[];
}

// Mock applications
const mockApplications: Application[] = [
  {
    id: '1',
    internshipId: '1',
    internshipTitle: 'Software Engineering Intern',
    company: 'TechCorp',
    status: 'interview',
    appliedDate: '2024-01-20',
    lastUpdated: '2024-01-25',
    matchScore: 92,
  },
  {
    id: '2',
    internshipId: '2',
    internshipTitle: 'Product Design Intern',
    company: 'DesignHub',
    status: 'reviewing',
    appliedDate: '2024-01-22',
    lastUpdated: '2024-01-23',
    matchScore: 85,
  },
  {
    id: '3',
    internshipId: '3',
    internshipTitle: 'Data Science Intern',
    company: 'DataVision',
    status: 'pending',
    appliedDate: '2024-01-25',
    lastUpdated: '2024-01-25',
    matchScore: 78,
  },
];

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
      applications: mockApplications,

      addApplication: (application) => {
        const newApplication: Application = {
          ...application,
          id: Date.now().toString(),
          appliedDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
        };

        set((state) => ({
          applications: [...state.applications, newApplication],
        }));
      },

      updateApplicationStatus: (id, status) => {
        set((state) => ({
          applications: state.applications.map((app) =>
            app.id === id
              ? { ...app, status, lastUpdated: new Date().toISOString() }
              : app
          ),
        }));
      },

      getApplicationById: (id) => {
        return get().applications.find((app) => app.id === id);
      },

      getApplicationsByStatus: (status) => {
        return get().applications.filter((app) => app.status === status);
      },
    }),
    {
      name: 'application-storage',
    }
  )
);
