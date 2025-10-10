import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      // const response = await axiosInstance.post('/auth/login', { email, password });
      // const { token, expiresIn } = response.data;
      
      // Mock login for now
      if (email === 'admin@example.com' && password === 'password') {
        const mockToken = 'mock_jwt_token_' + Date.now();
        login(mockToken);
        navigate('/admin');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative w-full max-w-md p-8 rounded-2xl shadow-2xl ${
          isDarkMode ? 'bg-neutral-900' : 'bg-white'
        }`}
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Admin</span> Login
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Sign in to manage your portfolio
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              Email Address
            </label>
            <div className="relative">
              <FiMail className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-800 border-neutral-700 text-white focus:border-primary-500' 
                    : 'bg-white border-neutral-300 text-neutral-900 focus:border-primary-500'
                } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <FiLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
              }`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-10 pr-12 py-3 rounded-lg border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-800 border-neutral-700 text-white focus:border-primary-500' 
                    : 'bg-white border-neutral-300 text-neutral-900 focus:border-primary-500'
                } focus:outline-none focus:ring-2 focus:ring-primary-500/20`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-neutral-400 hover:text-neutral-300' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiLogIn />
                <span>Sign In</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className={`text-sm transition-colors duration-300 ${
              isDarkMode 
                ? 'text-neutral-400 hover:text-primary-400' 
                : 'text-neutral-600 hover:text-primary-600'
            }`}
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
