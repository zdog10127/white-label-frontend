import { ReactNode } from "react";

export interface User {
  email: string;
  avatar?: string;
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
