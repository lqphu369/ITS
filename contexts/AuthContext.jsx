import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Lấy user từ localStorage
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const role = user?.role || "user";

  useEffect(() => {
    // Lưu user vào localStorage khi thay đổi
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", user.role);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
    }
  }, [user]);

  const login = async (username, password) => {
    // Import động để tránh circular dependency
    const { authenticateUser } = await import("../constants/users.js");
    const authenticatedUser = authenticateUser(username, password);

    if (authenticatedUser) {
      setUser(authenticatedUser);
      return { success: true };
    } else {
      return {
        success: false,
        error: "Tên đăng nhập hoặc mật khẩu không đúng",
      };
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
    isAdmin: role === "admin",
    isUser: role === "user",
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
