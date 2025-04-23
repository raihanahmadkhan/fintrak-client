import React, { useState } from 'react';
import { Button, Box, Typography, Paper, Grid, Container, Card, CardContent, useTheme, useMediaQuery, IconButton, TextField, Snackbar, Alert } from '@mui/material';
import Navbar from '../components/Navbar';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useThemeContext } from '../ThemeContext';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const FeatureCard = ({ icon, title, description }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: mode === 'dark' 
          ? '0 12px 20px rgba(0, 0, 0, 0.2)' 
          : '0 12px 20px rgba(0, 0, 0, 0.1)'
      },
      background: mode === 'dark' 
        ? 'linear-gradient(145deg, rgba(30,30,30,0.8) 0%, rgba(25,25,25,0.9) 100%)'
        : 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(245,245,245,1) 100%)',
      borderRadius: { xs: 2, sm: 3 }
    }}>
      <CardContent sx={{ 
        flexGrow: 1, 
        p: { xs: 1.5, sm: 2, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-start' } 
      }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: { xs: 1, sm: 1.5 },
          color: theme.palette.primary.main,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Box sx={{ mb: { xs: 0.5, sm: 0 } }}>
            {icon}
          </Box>
          <Typography 
            variant="h6" 
            component="h3" 
            sx={{ 
              ml: { xs: 0, sm: 1 }, 
              fontWeight: 600, 
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.875rem' },
            textAlign: { xs: 'center', sm: 'left' } 
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Home = ({ user, onLogout }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmall = useMediaQuery('(max-width:360px)');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [email, setEmail] = useState('');
  
  const handleSubscribe = () => {
    if (email) {
      // In a real app, you would submit the email to your newsletter service here
      setSnackbarOpen(true);
      setEmail(''); // Clear the email field after submission
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar user={user} onLogout={onLogout} />
      
      {/* Hero Section */}
      <Box sx={{
        pt: { xs: 6, sm: 8, md: 16 },
        pb: { xs: 6, sm: 8, md: 16 },
        background: mode === 'dark' 
          ? `linear-gradient(rgba(18, 18, 18, 0.8), rgba(30, 30, 30, 0.8)), url(https://images.unsplash.com/photo-1638913662584-731da41f5a59?q=80&w=2070)`
          : `linear-gradient(rgba(245, 245, 245, 0.9), rgba(255, 255, 255, 0.9)), url(https://images.unsplash.com/photo-1638913662584-731da41f5a59?q=80&w=2070)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        mt: { xs: '56px', sm: '64px' }, // Adjusted for responsive navbar
        width: '100%'
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <Grid container spacing={{ xs: 3, sm: 4, md: 8 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                  lineHeight: { xs: 1.3, md: 1.1 },
                  background: 'linear-gradient(90deg, #64b5f6 0%, #2196f3 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 10px rgba(33, 150, 243, 0.3)',
                  wordBreak: 'break-word',
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                Track & Manage Expenses with Ease
              </Typography>
              <Typography 
                variant={isMobile ? "body1" : "h5"} 
                color="text.secondary" 
                sx={{ 
                  mb: { xs: 3, sm: 4 }, 
                  maxWidth: 600, 
                  lineHeight: 1.5,
                  fontSize: { xs: '0.875rem', sm: '1.25rem' },
                  px: { xs: 1, sm: 0 },
                  textAlign: { xs: 'center', sm: 'left' }
                }}
              >
                FinTrak helps teams manage expenses, approve requests, and analyze spending patterns in one place.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 }, 
                flexWrap: isExtraSmall ? 'wrap' : 'nowrap',
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}>
                <Button 
                  variant="contained" 
                  size={isMobile ? "medium" : "large"} 
                  component={user ? RouterLink : Link}
                  to={user ? "/dashboard" : "/login"}
                  href={user ? "/dashboard" : "/login"}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: '30px', 
                    px: { xs: 1.5, sm: 3, md: 4 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.8125rem', sm: '1rem' },
                    boxShadow: '0 4px 14px rgba(33, 150, 243, 0.4)',
                    width: isExtraSmall ? '100%' : 'auto',
                    mb: isExtraSmall ? 1 : 0
                  }}
                >
                  {user ? 'Go to Dashboard' : 'Get Started'}
                </Button>
                {!user && (
                  <Button 
                    variant="outlined" 
                    size={isMobile ? "medium" : "large"} 
                    href="/signup"
                    sx={{ 
                      borderRadius: '30px', 
                      px: { xs: 1.5, sm: 3, md: 4 },
                      py: { xs: 1, sm: 1.5 },
                      fontSize: { xs: '0.8125rem', sm: '1rem' },
                      borderColor: theme.palette.primary.main,
                      width: isExtraSmall ? '100%' : 'auto'
                    }}
                  >
                    Sign Up
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'block', sm: 'block' }, mb: { xs: 2, md: 0 } }}>
              <Box 
                sx={{ 
                  position: 'relative',
                  maxWidth: { xs: '100%', sm: '450px', md: '100%' },
                  mx: 'auto',
                  px: { xs: 2, sm: 0 },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    right: -20,
                    bottom: -20,
                    background: 'radial-gradient(circle, rgba(33, 150, 243, 0.1) 0%, rgba(33, 150, 243, 0) 70%)',
                    borderRadius: '50%',
                    zIndex: 0,
                  }
                }}
              >
                <Paper 
                  elevation={24} 
                  sx={{ 
                    borderRadius: { xs: 3, md: 4 }, 
                    overflow: 'hidden',
                    transform: { xs: 'none', md: 'perspective(1500px) rotateY(-15deg) rotateX(5deg)' },
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: { 
                      xs: '0 10px 30px rgba(0,0,0,0.2), 0 0 20px rgba(33, 150, 243, 0.15)',
                      md: '0 25px 50px rgba(0,0,0,0.3), 0 0 30px rgba(33, 150, 243, 0.2)'
                    },
                    background: mode === 'dark' ? '#1a1a1a' : '#ffffff',
                    border: mode === 'dark' 
                      ? '1px solid rgba(255,255,255,0.1)' 
                      : '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  {/* Dashboard Mockup Content */}
                  <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
                    {/* Header with app logo */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      pb: { xs: 1.5, sm: 2 }, 
                      borderBottom: 1, 
                      borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' 
                    }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: theme.palette.primary.main,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        fontSize: { xs: '0.9rem', sm: '1.25rem' }
                      }}>
                        <Box component="span" sx={{ 
                          width: { xs: 16, sm: 20 }, 
                          height: { xs: 16, sm: 20 },  
                          borderRadius: '50%', 
                          bgcolor: theme.palette.primary.main,
                          display: 'inline-block' 
                        }}/>
                        FinTrak Dashboard
                      </Typography>
                    </Box>
                    
                    {/* Dashboard content */}
                    <Box sx={{ display: 'flex', mt: { xs: 1.5, sm: 2 }, gap: { xs: 1.5, sm: 2 }, flexDirection: 'column' }}>
                      {/* Summary cards */}
                      <Box sx={{ 
                        display: 'flex', 
                        gap: { xs: 1, sm: 2 }, 
                        flexWrap: 'wrap', 
                        justifyContent: { xs: 'space-between', sm: 'flex-start' }
                      }}>
                        {[
                          { label: 'Total Expenses', value: '₹2,450', color: theme.palette.primary.main },
                          { label: 'Pending', value: '₹350', color: theme.palette.warning.main },
                          { label: 'Approved', value: '₹2,100', color: theme.palette.success.main }
                        ].map((item, index) => (
                          <Box key={index} sx={{ 
                            p: { xs: 1, sm: 1.5 }, 
                            borderRadius: 2, 
                            flexGrow: { xs: 0, sm: 1 },
                            flexBasis: { xs: 'calc(33% - 8px)', sm: 'auto' },
                            bgcolor: mode === 'dark' ? 'rgba(30,30,30,0.6)' : 'rgba(245,245,245,0.8)',
                            border: '1px solid',
                            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            minWidth: { xs: 'auto', sm: '28%' },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: { xs: 'center', sm: 'flex-start' }
                          }}>
                            <Typography variant="caption" sx={{ 
                              display: 'block', 
                              mb: 0.5,
                              color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                              fontSize: { xs: '0.65rem', sm: '0.75rem' }
                            }}>
                              {item.label}
                            </Typography>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 700, 
                              color: item.color,
                              fontSize: { xs: '0.875rem', sm: '1.25rem' } 
                            }}>
                              {item.value}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      
                      {/* Recent expenses */}
                      <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
                        <Typography variant="subtitle2" sx={{ 
                          mb: { xs: 0.75, sm: 1 }, 
                          fontWeight: 600,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                          Recent Expenses
                        </Typography>
                        <Box sx={{ 
                          borderRadius: 2, 
                          overflow: 'hidden',
                          border: '1px solid',
                          borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                        }}>
                          {[
                            { desc: 'Business Lunch', amount: '₹75', date: 'Today', status: 'Pending' },
                            { desc: 'Office Supplies', amount: '₹120', date: 'Yesterday', status: 'Approved' },
                            { desc: 'Travel Expense', amount: '₹350', date: '25/04/2023', status: 'Approved' }
                          ].map((expense, index) => (
                            <Box key={index} sx={{ 
                              p: { xs: 1, sm: 1.5 }, 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              alignItems: { xs: 'flex-start', sm: 'center' },
                              flexDirection: { xs: index === 2 ? 'column' : 'row', sm: 'row' },
                              borderBottom: index < 2 ? '1px solid' : 'none',
                              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                              bgcolor: index % 2 === 0 ? 
                                (mode === 'dark' ? 'rgba(30,30,30,0.4)' : 'rgba(245,245,245,0.6)') : 'transparent',
                              gap: { xs: 0.5, sm: 0 }
                            }}>
                              <Box>
                                <Typography variant="body2" sx={{ 
                                  fontWeight: 500,
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' } 
                                }}>
                                  {expense.desc}
                                </Typography>
                                <Typography variant="caption" sx={{ 
                                  opacity: 0.7,
                                  fontSize: { xs: '0.65rem', sm: '0.75rem' } 
                                }}>
                                  {expense.date}
                                </Typography>
                              </Box>
                              <Box sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: { xs: 0.5, sm: 1 },
                                mt: { xs: index === 2 ? 0.5 : 0, sm: 0 },
                                alignSelf: { xs: index === 2 ? 'flex-end' : 'auto', sm: 'auto' }
                              }}>
                                <Typography variant="body2" sx={{ 
                                  fontWeight: 600,
                                  fontSize: { xs: '0.75rem', sm: '0.875rem' } 
                                }}>
                                  {expense.amount}
                                </Typography>
                                <Box sx={{ 
                                  px: { xs: 0.75, sm: 1 }, 
                                  py: { xs: 0.2, sm: 0.3 }, 
                                  borderRadius: 5,
                                  fontSize: { xs: '0.65rem', sm: '0.7rem' },
                                  bgcolor: expense.status === 'Approved' ? 
                                    (mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(76, 175, 80, 0.1)') :
                                    (mode === 'dark' ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 152, 0, 0.1)'),
                                  color: expense.status === 'Approved' ? 
                                    theme.palette.success.main : theme.palette.warning.main,
                                  border: '1px solid',
                                  borderColor: expense.status === 'Approved' ? 
                                    'rgba(76, 175, 80, 0.3)' : 'rgba(255, 152, 0, 0.3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  minWidth: { xs: 45, sm: 60 }
                                }}>
                                  {expense.status}
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box 
        sx={{ 
          py: { xs: 4, sm: 6, md: 10 }, 
          backgroundImage: {
            xs: 'none',
            md: mode === 'dark' 
              ? `linear-gradient(rgba(18, 18, 18, 0.95), rgba(30, 30, 30, 0.95)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073)`
              : `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073)`
          },
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: { md: 3 },
          maxWidth: { xs: '100%', md: '1200px' },
          boxShadow: { md: '0 8px 40px rgba(0,0,0,0.12)' },
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography 
          variant={isMobile ? "h4" : "h3"} 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ 
            mb: { xs: 3, sm: 4, md: 6 }, 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2.25rem' },
            position: 'relative',
            px: { xs: 1, sm: 0 },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: { xs: 50, sm: 80 },
              height: { xs: 3, sm: 4 },
              borderRadius: 2,
              backgroundColor: theme.palette.primary.main,
            }
          }}
        >
          Powerful Features
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center" sx={{ mb: { xs: 2, sm: 0 } }}>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<ReceiptLongIcon fontSize={isMobile ? "small" : "medium"} />}
              title="Expense Management"
              description="Submit, track, and manage all your expenses in one place. Get real-time updates on approval status."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard 
              icon={<BarChartIcon fontSize={isMobile ? "small" : "medium"} />}
              title="Analytics & Reporting"
              description="Gain insights into spending patterns with powerful analytics and customizable reports."
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} sx={{ mx: { xs: 'auto', sm: 0 } }}>
            <FeatureCard 
              icon={<GroupsIcon fontSize={isMobile ? "small" : "medium"} />}
              title="Team Collaboration"
              description="Streamline approvals between employees, managers, and finance teams with role-based access."
            />
          </Grid>
        </Grid>
        
        {/* Feature highlights with animation */}
        <Box sx={{ mt: { xs: 4, sm: 6, md: 10 } }}>
          <Grid container spacing={{ xs: 3, sm: 4, md: 8 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                position: 'relative',
                maxWidth: { xs: '100%', md: '90%' },
                mx: 'auto'
              }}>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -30, 
                    left: -30, 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #2196f3, #64b5f6)',
                    opacity: 0.6,
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: -20, 
                    right: -20, 
                    width: 40, 
                    height: 40, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(45deg, #f50057, #ff4081)',
                    opacity: 0.6,
                    display: { xs: 'none', md: 'block' }
                  }} 
                />
                <Paper 
                  elevation={6} 
                  sx={{ 
                    borderRadius: { xs: 3, sm: 4 }, 
                    overflow: 'hidden',
                    position: 'relative',
                    zIndex: 1,
                    p: { xs: 2, sm: 3 },
                    border: mode === 'dark' 
                      ? '1px solid rgba(255,255,255,0.1)' 
                      : '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  <Typography variant="h5" sx={{ 
                    mb: { xs: 1.5, sm: 2 }, 
                    fontWeight: 600, 
                    color: theme.palette.primary.main,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    textAlign: 'center'
                  }}>
                    Why Choose FinTrak?
                  </Typography>
                  
                  {[
                    { title: "User-Friendly Interface", desc: "Intuitive design that requires minimal training" },
                    { title: "Secure & Compliant", desc: "Enterprise-grade security with role-based permissions" },
                    { title: "Time-Saving Automation", desc: "Automate approval workflows and notifications" },
                    { title: "Comprehensive Reports", desc: "Generate detailed reports with custom filters" },
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', mb: { xs: 2, sm: 2.5 } }}>
                      <Box 
                        sx={{ 
                          minWidth: { xs: 20, sm: 24 }, 
                          height: { xs: 20, sm: 24 }, 
                          borderRadius: '50%', 
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: { xs: '0.7rem', sm: '0.8rem' },
                          fontWeight: 'bold',
                          mr: { xs: 1.5, sm: 2 },
                          mt: 0.5
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                          {item.desc}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{
                maxWidth: { xs: '100%', md: '90%' },
                mx: 'auto'
              }}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: { xs: 2, sm: 3 },
                    fontSize: { xs: '1.3rem', sm: '1.5rem', md: '2rem' },
                    textAlign: 'center'
                  }}
                >
                  Simplify Your Expense Management
                </Typography>
                <Typography variant="body1" sx={{ 
                  mb: { xs: 2, sm: 3 }, 
                  color: 'text.secondary',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  textAlign: 'center',
                  px: { xs: 1, sm: 0 }
                }}>
                  FinTrak helps businesses of all sizes streamline their expense tracking and approval processes. Our platform reduces manual work and improves visibility into company spending.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: { xs: 3, md: 5 }, 
          mt: 'auto',
          borderTop: mode === 'dark' 
            ? '1px solid rgba(255,255,255,0.05)' 
            : '1px solid rgba(0,0,0,0.05)',
          bgcolor: 'background.paper'
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 3, md: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: { xs: 1, sm: 2 },
                color: mode === 'dark' ? 'primary.light' : 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}>
                <Box component="span" sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: theme.palette.primary.main,
                  display: 'inline-block' 
                }}/>
                FinTrak
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 2,
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Simplifying expense management for businesses of all sizes.
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={4}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Quick Links
              </Typography>
              <Box component="ul" sx={{ 
                p: 0, 
                m: 0, 
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-start' }
              }}>
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Dashboard', path: '/dashboard' },
                  { name: 'Login', path: '/login' },
                  { name: 'Sign Up', path: '/signup' }
                ].map(item => (
                  <Box component="li" key={item.name} sx={{ mb: { xs: 0.75, sm: 1 } }}>
                    <Link 
                      component={RouterLink} 
                      to={item.path}
                      underline="hover"
                      sx={{ 
                        color: 'text.secondary',
                        textDecoration: 'none',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {item.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ mt: { xs: 1, sm: 0 } }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 600, 
                mb: { xs: 1, sm: 2 },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}>
                Stay Updated
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: { xs: 1.5, sm: 2 },
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                px: { xs: 2, sm: 0 }
              }}>
                Subscribe to our newsletter for tips and product updates.
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1,
                px: { xs: 2, sm: 0 },
                maxWidth: { xs: '100%', sm: '100%', md: '100%' }
              }}>
                <TextField
                  placeholder="Your email"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ 
                    flexGrow: 1,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '20px 0 0 20px',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }
                  }}
                />
                <Button 
                  variant="contained" 
                  sx={{ 
                    borderRadius: '0 20px 20px 0',
                    boxShadow: 'none',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    py: { xs: 0.5, sm: 'auto' },
                    onClick: handleSubscribe
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Box 
            sx={{ 
              mt: { xs: 3, sm: 5 }, 
              pt: { xs: 2, sm: 3 }, 
              borderTop: 1, 
              borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              © {new Date().getFullYear()} FinTrak. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          Thank you for subscribing!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
