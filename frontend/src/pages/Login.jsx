import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { useAuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import * as authApi from '../api/authApi';
import { checkAdminIP } from '../api/authApi';
import { toast } from '../Components/ui/sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthContext();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      const { token, admin } = response.data.data;

      const expiresIn = 7 * 24 * 60 * 60 * 1000;

      login(token, admin, expiresIn);
      toast.success('Login successful!');
      navigate('/admin');
    } catch (err) {
      // Extract error message from response or use default
      const errorMessage = err.response?.data?.message || 'Invalid username or password. Please try again.';
      
      // Show error in both toast and UI
      setError(errorMessage);
      
      // Show a prominent error toast
      toast.error(errorMessage, {
        duration: 5000,
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if admin IP is allowed
  React.useEffect(() => {
    checkAdminIP()
      .catch(() => {
        toast.error("Sorry ,you are not allowed to access this page.");
        navigate('/');
      });
  }, [navigate]);


  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
    }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <Card className={`relative w-full max-w-md ${isDarkMode ? 'border-neutral-800' : ''}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">
            <span className="gradient-text">Admin</span> Login
          </CardTitle>
          <CardDescription>
            Sign in to manage your portfolio
          </CardDescription>
        </CardHeader>

        {error && (
          <div className="px-6 py-3 mx-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Admin Access Only"
              />
            </div>

            {/* Password Field */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-sm underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-row gap-3">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-accent-500"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              ← Back to Home
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;