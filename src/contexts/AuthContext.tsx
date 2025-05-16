import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // 실제 구현에서는 API 호출을 통해 인증을 처리해야 합니다.
    // 여기서는 예시로 하드코딩된 사용자 정보를 사용합니다.
    if (username === 'admin' && password === 'admin123') {
      setUser({
        id: '1',
        username: 'admin',
        role: 'admin'
      });
    } else if (username === 'user' && password === 'user123') {
      setUser({
        id: '2',
        username: 'user',
        role: 'user'
      });
    } else {
      throw new Error('잘못된 로그인 정보입니다.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 