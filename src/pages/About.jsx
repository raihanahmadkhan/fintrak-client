import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Divider, useTheme, Container } from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import InfoIcon from '@mui/icons-material/Info';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import BarChartIcon from '@mui/icons-material/BarChart';
import Navbar from '../components/Navbar';

const About = ({ user }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: 'transparent',
      backgroundImage: 'url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 0
      }
    }}>
      <Navbar user={user} />
      
      <Container maxWidth="lg" sx={{ 
        position: 'relative', 
        zIndex: 1, 
        pt: { xs: 10, sm: 12 },
        pb: 6
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            mb: 2, 
            fontWeight: 700,
            color: mode === 'dark' ? '#fff' : 'primary.dark',
            textAlign: 'center',
            maxWidth: '90%',
            mx: 'auto'
          }}
        >
          About FinTrak
        </Typography>
        
        <Typography 
          variant="h6" 
          color={mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'text.secondary'}
          sx={{ 
            mb: 6,
            maxWidth: 800,
            textAlign: 'center',
            mx: 'auto'
          }}
        >
          Your comprehensive expense management solution designed to streamline financial tracking for businesses of all sizes.
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8, justifyContent: 'center' }}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={4}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: mode === 'dark' 
                  ? 'rgba(10, 25, 41, 0.8)' 
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                  : '0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: '#fff',
                    mr: 2
                  }}
                >
                  <InfoIcon />
                </Avatar>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Our Mission
                </Typography>
              </Box>
              <Typography paragraph>
                FinTrak was founded with a clear mission: to simplify expense management for businesses and their employees. We believe financial transparency and efficient tracking are essential for every successful organization.
              </Typography>
              <Typography>
                Our platform enables businesses to manage, approve, and analyze expenses in real-time, saving valuable time and resources while providing accurate financial insights.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={4}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: mode === 'dark' 
                  ? 'rgba(10, 25, 41, 0.8)' 
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.5)',
                boxShadow: mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                  : '0 8px 32px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Box sx={{ display: 'flex', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    color: '#fff',
                    mr: 2
                  }}
                >
                  <HistoryIcon />
                </Avatar>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                  Our Story
                </Typography>
              </Box>
              <Typography paragraph>
                Founded in 2025, FinTrak emerged from the frustration of manual expense reporting processes. Our founders experienced firsthand the inefficiencies of traditional expense management systems.
              </Typography>
              <Typography>
                After consulting with businesses of various sizes, we developed FinTrak to address common pain points and create a user-friendly solution that works for employees, managers, and administrators alike.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 4, 
            fontWeight: 600,
            textAlign: 'center',
            color: mode === 'dark' ? '#fff' : 'text.primary',
          }}
        >
          Key Features
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: mode === 'dark' 
                  ? 'rgba(10, 25, 41, 0.7)' 
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BarChartIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Comprehensive Analytics
                </Typography>
              </Box>
              <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'text.secondary'}>
                Gain valuable insights into spending patterns with detailed analytics and customizable reports.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3, 
                height: '100%',
                borderRadius: 2,
                background: mode === 'dark' 
                  ? 'rgba(10, 25, 41, 0.7)' 
                  : 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: mode === 'dark'
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Secure Data Protection
                </Typography>
              </Box>
              <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'text.secondary'}>
                Your financial data is protected with enterprise-grade security and compliant with industry standards.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Divider sx={{ mb: 6, borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'} sx={{ mb: 1 }}>
            © 2025 FinTrak. All rights reserved.
          </Typography>
          <Typography variant="body2" color={mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'text.secondary'}>
            Version 1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 