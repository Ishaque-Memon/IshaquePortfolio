import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    const userData = localStorage.getItem('userData');
    
    if (token && tokenExpiry && userData) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(tokenExpiry)) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      } else {
        // Token expired
        logout();
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    setLoading(false);
  };

  const login = (token, userData, expiresIn = 86400000) => { // Default 24 hours
    const expiryTime = new Date().getTime() + expiresIn;
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    localStorage.setItem('userData', JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateUser = (updatedUserData) => {
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    setUser(updatedUserData);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
