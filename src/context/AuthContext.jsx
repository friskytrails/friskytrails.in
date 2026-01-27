// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token || token === 'none') {
        if (isMounted) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        const response = await axiosInstance.get('/api/v1/user/me');
        const userData = response?.data?.user;

        if (isMounted) {
          if (userData) {
            setUser(userData);
            setIsAdmin(userData?.admin === true);
          } else {
            setUser(null);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
          setIsAdmin(false);
          // Token invalid hai toh hata do
          localStorage.removeItem('token');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData?.admin === true);
  };

  const logout = async () => {
    try {
      // API call to logout from backend
      await axiosInstance.post('/api/v1/user/logout');
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      // FIX: Token ko localStorage se remove karna zaroori hai
      localStorage.removeItem('token'); 
      
      // Reset State
      setUser(null);
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};