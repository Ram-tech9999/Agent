import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types/user';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  university?: string;
  major?: string;
}

// Mock user for demo purposes
const mockUser: User = {
  id: '1',
  email: 'demo@internhub.com',
  name: 'John Doe',
  phone: '+1 (555) 123-4567',
  university: 'Stanford University',
  major: 'Computer Science',
  graduationYear: '2025',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning'],
  bio: 'Passionate computer science student with a focus on full-stack development and AI.',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // For demo, accept any email/password
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const newUser: User = {
          id: Date.now().toString(),
          email: data.email,
          name: data.name,
          university: data.university,
          major: data.major,
          skills: [],
          createdAt: new Date().toISOString(),
        };

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (data: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
