import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab, 
  TextField, 
  Button, 
  Grid, 
  Avatar, 
  Switch, 
  FormControlLabel, 
  Divider, 
  IconButton, 
  Alert, 
  Snackbar,
  useTheme 
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateProfile } from '../api';

const AccountSettings = ({ user }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [activeTab, setActiveTab] = useState(0);
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Profile state
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    position: user?.position || 'Employee',
    department: user?.department || 'Finance'
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    
    // Clear error when user types
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: ''
      });
    }
  };
  
  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSaveProfile = async () => {
    try {
      const res = await updateProfile({ name: profileData.name });
      setSuccessMessage('Profile updated successfully!');
      setSuccess(true);
      // Update user in localStorage (and in app state if needed)
      const storedUser = JSON.parse(localStorage.getItem('fintrak_user'));
      if (storedUser) {
        storedUser.name = profileData.name;
        localStorage.setItem('fintrak_user', JSON.stringify(storedUser));
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setSuccessMessage(err.message || 'Profile update failed');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (validatePassword()) {
      try {
        await updateProfile({ password: passwordData.newPassword });
        setSuccessMessage('Password updated successfully!');
        setSuccess(true);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setSuccessMessage(err.message || 'Password update failed');
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar user={user} />
      
      <Box sx={{ 
        maxWidth: 1000, 
        mx: 'auto', 
        p: { xs: 2, sm: 4 },
        mt: { xs: '64px', sm: '72px' } 
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            mb: 4, 
            fontWeight: 700,
            color: mode === 'dark' ? 'primary.light' : 'primary.dark'
          }}
        >
          Account Settings
        </Typography>
        
        <Paper 
          elevation={0} 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            overflow: 'hidden',
            border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            sx={{
              backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
              borderBottom: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            }}
          >
            <Tab 
              icon={<AccountCircleIcon />} 
              label="Profile" 
              sx={{ py: 2 }}
            />
            <Tab 
              icon={<LockIcon />} 
              label="Password" 
              sx={{ py: 2 }}
            />
          </Tabs>
          
          <Box sx={{ p: { xs: 2, sm: 4 } }}>
            {/* Profile Tab */}
            {activeTab === 0 && (
              <Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                  <Avatar 
                    src={user?.avatar}
                    alt={profileData.name}
                    sx={{ 
                      width: 120, 
                      height: 120,
                      mb: 2,
                      bgcolor: 'primary.main',
                      fontSize: '3rem'
                    }}
                  >
                    {profileData.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ position: 'relative', mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="avatar-upload"
                      type="file"
                    />
                    <label htmlFor="avatar-upload">
                      <IconButton 
                        color="primary" 
                        component="span"
                        sx={{ 
                          border: `2px solid ${theme.palette.primary.main}`,
                          bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.9)'
                        }}
                      >
                        <PhotoCameraIcon />
                      </IconButton>
                    </label>
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {profileData.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {profileData.position} • {profileData.department}
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      name="position"
                      value={profileData.position}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Department"
                      name="department"
                      value={profileData.department}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={handleSaveProfile}
                        sx={{ 
                          px: 4,
                          py: 1.2,
                          fontWeight: 600,
                          boxShadow: mode === 'dark'
                            ? '0 4px 14px 0 rgba(32, 101, 209, 0.24)'
                            : '0 4px 14px 0 rgba(32, 101, 209, 0.18)'
                        }}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Password Tab */}
            {activeTab === 1 && (
              <Box component="form" onSubmit={handleChangePassword}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Change Password
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Current Password"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.currentPassword}
                      helperText={passwordErrors.currentPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.newPassword}
                      helperText={passwordErrors.newPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      error={!!passwordErrors.confirmPassword}
                      helperText={passwordErrors.confirmPassword}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                      <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        sx={{ 
                          px: 4,
                          py: 1.2,
                          fontWeight: 600,
                          boxShadow: mode === 'dark'
                            ? '0 4px 14px 0 rgba(32, 101, 209, 0.24)'
                            : '0 4px 14px 0 rgba(32, 101, 209, 0.18)'
                        }}
                      >
                        Update Password
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
                
                <Divider sx={{ my: 4 }} />
                
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'error.main' }}>
                  Danger Zone
                </Typography>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.error.main}`,
                    mb: 2
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Delete Account
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Once you delete your account, there is no going back. Please be certain.
                      </Typography>
                    </Box>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      startIcon={<DeleteIcon />}
                      sx={{ fontWeight: 600 }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      
      <Snackbar
        open={success}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AccountSettings; 