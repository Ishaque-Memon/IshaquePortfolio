import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './pages/admin/index';
import Dashboard from './pages/admin/Dashboard';
import Skills from './pages/admin/Skills';
import PersonalInfo from './pages/admin/PersonalInfo';
import Messages from './pages/admin/Messages';
import Education from './pages/admin/Education';
import Projects from './pages/admin/Projects';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/common/ProtectedRoute';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
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
        element: <div className="p-6 text-xl">Certificates Management - Coming Soon</div>,
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
        element: <div className="p-6 text-xl">Analytics - Coming Soon</div>,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
