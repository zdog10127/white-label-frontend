import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  AuthContextType,
  AuthProviderProps,
} from "../../types/authContext";

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
  updateUserAvatar: () => {},
  loading: true,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const usersDB = [
      { email: "admin@example.com", password: "1234" },
      { email: "jhonathancosta_dev@hotmail.com", password: "1234567890" },
      { email: "gabrielteles@example.com", password: "1234567890" },
    ];

    const matchedUser = usersDB.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      const profileData = localStorage.getItem(`user-profile-data-${email}`);
      let extraFields = {};

      if (profileData) {
        const parsed = JSON.parse(profileData);
        extraFields = {
          firstName: parsed.firstName || "",
          lastName: parsed.lastName || "",
          phone: parsed.phone || "",
          city: parsed.city || "",
          state: parsed.state || "",
          occupation: parsed.occupation || "",
        };
      }

      const avatar = localStorage.getItem(`user-profile-image-${email}`);

      const userData: User = {
        email,
        avatar: avatar || undefined,
        ...extraFields,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserAvatar = (avatar: string) => {
    if (user) {
      const updatedUser = { ...user, avatar };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUserAvatar,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
