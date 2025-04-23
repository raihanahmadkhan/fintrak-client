import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeContextProvider } from './ThemeContext';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AccountSettings from './pages/AccountSettings.jsx';
import Notifications from './pages/Notifications.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
// Employee pages
import AddExpense from './pages/dashboard/employee/AddExpense.jsx';
import ManageExpenses from './pages/dashboard/employee/ManageExpenses.jsx';
import Analytics from './pages/dashboard/employee/Analytics.jsx';
// Manager pages
import ApproveExpenses from './pages/dashboard/manager/ApproveExpenses.jsx';
import ExpenseHistory from './pages/dashboard/manager/ExpenseHistory.jsx';
import TeamOverview from './pages/dashboard/manager/TeamOverview.jsx';
// Admin pages
import AllEmployees from './pages/dashboard/admin/AllEmployees.jsx';
import AllManagers from './pages/dashboard/admin/AllManagers.jsx';
import CompanyOverview from './pages/dashboard/admin/CompanyOverview.jsx';
import Profile from './pages/Profile.jsx';
import { Box } from '@mui/material';

function App() {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('fintrak_user');
    if (stored) {
      try {
        const parsedUser = JSON.parse(stored);
        setUserState(parsedUser);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('fintrak_user');
      }
    }
    setLoading(false);
  }, []);

  // Handle redirects based on authentication state
  useEffect(() => {
    if (!loading) {
      // If user is not authenticated and tries to access a protected route
      if (!user && location.pathname.includes('/dashboard')) {
        navigate('/login');
      }
    }
  }, [user, location.pathname, loading, navigate]);

  // Store user in localStorage
  const setUser = useCallback((u) => {
    setUserState(u);
    if (u) {
      localStorage.setItem('fintrak_user', JSON.stringify(u));
    } else {
      localStorage.removeItem('fintrak_user');
    }
  }, []);

  // Logout function
  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('/login');
  }, [navigate, setUser]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <ThemeContextProvider>
      <Box sx={{ width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>
        <Routes>
          <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/about" element={<About user={user} />} />
          <Route path="/contact" element={<Contact user={user} />} />
          
          <Route path="/profile" element={
            <ProtectedRoute user={user}>
              <Profile user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/account-settings" element={
            <ProtectedRoute user={user}>
              <AccountSettings user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <ProtectedRoute user={user}>
              <Notifications user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute user={user}>
              <MainLayout role={user?.role} onLogout={handleLogout} user={user} />
            </ProtectedRoute>
          }>
            {user?.role === 'employee' && (
              <>
                <Route path="add-expense" element={<AddExpense />} />
                <Route path="manage-expenses" element={<ManageExpenses />} />
                <Route path="analytics" element={<Analytics />} />
                <Route index element={<Navigate to="add-expense" replace />} />
              </>
            )}
            {user?.role === 'manager' && (
              <>
                <Route path="approve-expenses" element={<ApproveExpenses />} />
                <Route path="history" element={<ExpenseHistory />} />
                <Route path="team-overview" element={<TeamOverview />} />
                <Route index element={<Navigate to="approve-expenses" replace />} />
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <Route path="all-employees" element={<AllEmployees />} />
                <Route path="all-managers" element={<AllManagers />} />
                <Route path="company-overview" element={<CompanyOverview />} />
                <Route index element={<Navigate to="company-overview" replace />} />
              </>
            )}
          </Route>
          
          <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
