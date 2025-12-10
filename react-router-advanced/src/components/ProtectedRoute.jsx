import React from 'react';
import { Navigate } from 'react-router-dom';

// Custom authentication hook (simulated)
const useAuth = () => {
  // In a real app, this would check context, localStorage, or make an API call
  // For this demo, we'll use a simple check
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return { isAuthenticated };
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Using useAuth hook

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;