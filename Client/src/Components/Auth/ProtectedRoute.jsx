import { Navigate } from 'react-router-dom';
import useAuthStore from '../Store/AuthStore';
import React from 'react';

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { user, adminToken } = useAuthStore();

  if (isAdmin && !adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;