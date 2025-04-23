import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, Divider, Button, useTheme, useMediaQuery, Container } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

// This should be replaced with actual user fetching logic (props, context, redux, etc.)
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Manager',
  joined: '2024-01-15',
};

const Profile = ({ user = mockUser, onLogout }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const handleEditProfile = () => {
    navigate('/account-settings');
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar user={user} onLogout={onLogout} />
      
      <Box
        sx={{
          flex: 1,
          width: '100%',
          background: mode === 'dark'
            ? 'linear-gradient(120deg, #23272f 0%, #1a2233 100%)'
            : 'linear-gradient(120deg, #f5f5f5 0%, #e0e0e0 100%)',
          pt: { xs: '56px', sm: '64px' }, // Space for navbar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}
      >
        <Container 
          maxWidth="lg" 
          sx={{ 
            flex: 1,
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            py: { xs: 4, sm: 6 },
            px: { xs: 2, sm: 3 }
          }}
        >
          <Card
            sx={{
              width: { xs: '100%', sm: '340px', md: '400px' },
              maxWidth: '100%',
              background: mode === 'dark'
                ? 'rgba(30,34,41,0.98)'
                : 'rgba(255,255,255,0.98)',
              borderRadius: { xs: 2, sm: 4 },
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
              color: mode === 'dark' ? '#fff' : '#212121',
            }}
          >
            <CardContent sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              p: { xs: 2, sm: 3, md: 4 }
            }}>
              <Avatar sx={{ 
                width: { xs: 64, sm: 80 }, 
                height: { xs: 64, sm: 80 }, 
                bgcolor: 'primary.main', 
                mb: { xs: 1.5, sm: 2 }, 
                boxShadow: '0 2px 10px rgba(33,150,243,0.12)' 
              }}>
                {user.name ? user.name.charAt(0).toUpperCase() : <AccountCircleIcon fontSize={isMobile ? "medium" : "large"} />}
              </Avatar>
              <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.125rem', sm: '1.5rem' } 
              }}>
                {user.name}
              </Typography>
              <Typography 
                variant="body1" 
                color={mode === 'dark' ? '#b0bec5' : '#616161'} 
                sx={{ 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '0.875rem', sm: '1rem' } 
                }}
              >
                {user.email}
              </Typography>
              <Divider sx={{ 
                width: '100%', 
                mb: { xs: 1.5, sm: 2 }, 
                bgcolor: mode === 'dark' ? '#222c36' : '#e0e0e0' 
              }} />
              <Box sx={{ width: '100%', mb: { xs: 1.5, sm: 2 } }}>
                <Typography 
                  variant="body2" 
                  color={mode === 'dark' ? '#90caf9' : '#2196f3'}
                  sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' }, mb: 0.75 }}
                >
                  Role: <span style={{ color: mode === 'dark' ? '#fff' : '#212121' }}>{user.role}</span>
                </Typography>
                <Typography 
                  variant="body2" 
                  color={mode === 'dark' ? '#90caf9' : '#2196f3'}
                  sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
                >
                  Joined: <span style={{ color: mode === 'dark' ? '#fff' : '#212121' }}>{user.joined}</span>
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ 
                  borderRadius: 2, 
                  mt: { xs: 1, sm: 1.5 },
                  py: { xs: 0.75, sm: 1 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
                size={isMobile ? "medium" : "large"}
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
