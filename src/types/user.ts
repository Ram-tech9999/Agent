export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  university?: string;
  major?: string;
  graduationYear?: string;
  skills: string[];
  bio?: string;
  resume?: string;
  profileImage?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
