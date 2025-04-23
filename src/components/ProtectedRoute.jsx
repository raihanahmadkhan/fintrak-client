import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protected Route component to secure routes based on authentication
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {object} props.user - User object (null if not authenticated)
 * @param {string} props.requiredRole - Role required to access the component (optional)
 * @returns {React.ReactNode} - The protected route component
 */
const ProtectedRoute = ({ children, user, requiredRole }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;