import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for handling authentication
 * @returns {Object} { isAuthenticated, login, logout, checkAuth }
 */
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    
    if (token && tokenExpiry) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(tokenExpiry)) {
        setIsAuthenticated(true);
      } else {
        // Token expired
        logout();
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const login = (token, expiresIn = 86400000) => { // Default 24 hours
    const expiryTime = new Date().getTime() + expiresIn;
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth,
  };
};

export default useAuth;
