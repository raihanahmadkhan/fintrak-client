import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook to handle authentication across the application
 * @param {string} requiredRole - Role required to access the component (optional)
 * @returns {object} - The current user object and initialization state
 */
export const useAuth = (requiredRole) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem('fintrak_user');
      
      if (!storedUser) {
        // If no user is found and we're trying to access a protected route, redirect to login
        if (location.pathname.includes('/dashboard') || 
            location.pathname.includes('/profile') || 
            location.pathname.includes('/account-settings') || 
            location.pathname.includes('/notifications')) {
          // Preserve the intended destination for a redirect after login
          navigate('/login', { state: { from: location.pathname } });
        }
        setInitialized(true);
        return null;
      }
      
      try {
        // Parse the user data
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // If a specific role is required, check if user has that role
        if (requiredRole && parsedUser.role !== requiredRole) {
          // Redirect to dashboard if user doesn't have required role
          navigate('/dashboard');
        }
        
        setInitialized(true);
        return parsedUser;
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('fintrak_user');
        navigate('/login');
        setInitialized(true);
        return null;
      }
    };
    
    checkAuth();
  }, [navigate, requiredRole, location.pathname]);
  
  return { user, initialized };
};

export default useAuth; 