import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayoutWrapper from './pages/admin/index'; // Import your wrapper
import Dashboard from './pages/admin/Dashboard';
import Skills from './pages/admin/Skills';
import PersonalInfo from './pages/admin/PersonalInfo';
import Messages from './pages/admin/Messages';
import Education from './pages/admin/Education';
import Projects from './pages/admin/Projects';
import Certificates from './pages/admin/Certificates';
import Analytics from './pages/admin/Analytics';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './Components/common/ProtectedRoute';
import AdminIPProtectedRoute from './Components/common/AdminIPProtectedRoute';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: (
      <AdminIPProtectedRoute>
        <Login />
      </AdminIPProtectedRoute>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayoutWrapper />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'personal-info',
        element: <PersonalInfo />,
      },
      {
        path: 'skills',
        element: <Skills />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'certificates',
        element: <Certificates />,
      },
      {
        path: 'education',
        element: <Education />,
      },
      {
        path: 'messages',
        element: <Messages />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
    ],
  },
  {
    path: '/pagenotfound',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <Navigate to="/pagenotfound" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;