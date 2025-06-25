import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserAvatar: (avatar: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserAvatar: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const usersDB = [
      {
        email: "admin@example.com",
        password: "1234",
      },
      {
        email: "jhonathancosta_dev@hotmail.com",
        password: "1234567890",
      },
      {
        email: "gabrielteles@example.com",
        password: "1234567890",
      },
    ];

    const matchedUser = usersDB.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      const { password: _, ...userData } = matchedUser;
      setUser(userData);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserAvatar = (avatar: string) => {
    if (user) {
      setUser({ ...user, avatar });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, updateUserAvatar }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
