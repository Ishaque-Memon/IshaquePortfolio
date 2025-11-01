import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAdminIP } from '../../api/authApi';

/**
 * AdminIPProtectedRoute - Only allows access from admin IP addresses
 * Used to protect the login page from being accessed by non-admin IPs
 */
const AdminIPProtectedRoute = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null); // null = loading, true = allowed, false = denied
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAdminIP = async () => {
      try {
        await checkAdminIP();
        setIsAllowed(true);
      } catch (error) {
        setIsAllowed(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdminIP();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if IP is not allowed
  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }

  // Render children if IP is allowed
  return children;
};

export default AdminIPProtectedRoute;
