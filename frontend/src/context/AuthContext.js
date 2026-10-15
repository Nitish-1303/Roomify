import React, { createContext, useState, useContext, useEffect } from 'react';
import api, { DEMO_MODE } from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  if (DEMO_MODE && !String(localStorage.getItem('token') || '').startsWith('demo-token-')) {
    localStorage.setItem('token', 'demo-token-u-1');
    localStorage.setItem('user', JSON.stringify({ _id: 'u-1', name: 'Priya Sharma', email: 'user@roomify.com', role: 'user' }));
  }
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    
    return user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (nextUser) => {
    localStorage.setItem('user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const value = {
    user,
    updateUser,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
