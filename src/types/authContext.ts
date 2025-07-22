export interface User {
  email: string;
  avatar?: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  occupation: string;

  id?: number;
  name?: string;
  cpf?: string;
  permissions?: string[];
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
  children: React.ReactNode;
}
