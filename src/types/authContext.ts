import { ReactNode } from "react";

export interface User {
  email: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  gender?: string;
  phone?: string;
  occupation?: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserAvatar: (avatar: string) => void;
  loading: boolean;
}
export interface AuthProviderProps {
  children: ReactNode;
}
