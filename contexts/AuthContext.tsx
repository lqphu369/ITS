import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

export type UserRole = 'user' | 'admin';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isUser: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Lấy user từ localStorage
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const role: UserRole = user?.role || 'user';

  useEffect(() => {
    // Lưu user vào localStorage khi thay đổi
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
    } else {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userRole');
    }
  }, [user]);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Import động để tránh circular dependency
    const { authenticateUser } = await import('../constants/users');
    const authenticatedUser = authenticateUser(username, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      return { success: true };
    } else {
      return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    role,
    login,
    logout,
    isAdmin: role === 'admin',
    isUser: role === 'user',
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

