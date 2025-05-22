import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬 스토리지에서 사용자 정보 복원
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // TODO: API 엔드포인트로 변경
    // const response = await fetch('/api/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });
    // const data = await response.json();
    
    // 임시 로직 (API 연결 전)
    if (username === "test" && password === "test") {
      const userData = {
        id: 1,
        username: "admin",
        role: "admin",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } else if (username === "user" && password === "user") {
      const userData = {
        id: 2,
        username: "user",
        role: "user",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    }
    throw new Error("Invalid credentials");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 