import React, { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  MenuItem, 
  Link, 
  Container, 
  useTheme, 
  useMediaQuery,
  Grid,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Navbar from '../components/Navbar';
import { login as apiLogin, setToken } from '../api';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get redirect path from location state or default to dashboard
  const from = location.state?.from || '/dashboard';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await apiLogin(form.email, form.password);
      setToken(token);
      setUser(user);
      navigate(from);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar user={null} />
      <Box 
        sx={{ 
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          width: '100vw',
          maxWidth: '100%',
          margin: 0,
          padding: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          mt: '64px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)',
            zIndex: 0
          }
        }}
      >
        <Box
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            width: '100%',
            py: 4,
            px: { xs: 2, sm: 4 },
            zIndex: 1,
            position: 'relative'
          }}
        >
          <Paper
            elevation={8}
            sx={{
              overflow: 'hidden',
              borderRadius: { xs: 2, md: 3 },
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              mx: 'auto',
              background: mode === 'dark' 
                ? 'rgba(10, 25, 41, 0.35)' 
                : 'rgba(255, 255, 255, 0.35)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.4)'
                : '0 8px 32px rgba(0, 0, 0, 0.15)',
              border: mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.1)'
                : '1px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            {/* Left sidebar */}
            <Box
              sx={{
                bgcolor: mode === 'dark' 
                  ? 'rgba(10, 37, 56, 0.4)' 
                  : 'rgba(25, 118, 210, 0.5)',
                color: 'white',
                width: { xs: '100%', md: '35%' },
                display: 'flex', 
                flexDirection: 'column',
                position: 'relative',
                pb: 4,
                pt: 3,
                px: 3
              }}
            >
              <Box sx={{ mb: 6 }}>
                <Link 
                  component={RouterLink} 
                  to="/" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                    mb: 1,
                    textDecoration: 'none'
                  }}
                >
                  <Box 
                    component="div" 
                sx={{
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5
                    }}
                  >
                    <Box 
                      component="div" 
                      sx={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 1,
                        bgcolor: 'white',
                        transform: 'rotate(12deg)'
                      }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, letterSpacing: 0.5, color: 'white' }}>
                    FinTrak
              </Typography>
                </Link>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                justifyContent: 'center',
                '& a': {
                  color: 'white',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  py: 1.5,
                  px: 2,
                  borderRadius: 2,
                  mb: 1,
                  fontSize: '1.125rem',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  '&:hover, &.active': {
                    bgcolor: 'rgba(255,255,255,0.15)'
                  }
                }
              }}>
                <Link component={RouterLink} to="/signup" className="">
                  <PersonOutlineIcon sx={{ mr: 1.5 }} /> Sign Up
                </Link>
                <Link component={RouterLink} to="/login" className="active">
                  <ArrowForwardIcon sx={{ mr: 1.5 }} /> Log In
                </Link>
              </Box>
            </Box>

            {/* Content area */}
            <Box 
              sx={{ 
                px: { xs: 3, sm: 6 },
                py: { xs: 4, sm: 6 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: { xs: '100%', md: '65%' },
                bgcolor: mode === 'dark' 
                  ? 'rgba(15, 28, 38, 0.25)' 
                  : 'rgba(255, 255, 255, 0.25)',
                color: mode === 'dark' ? 'white' : 'text.primary',
              }}
            >
              <Box 
                sx={{ 
                  maxWidth: 500, 
                  width: '100%', 
                  mx: 'auto'
                }}
              >
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    color: mode === 'dark' ? 'white' : 'text.primary'
                  }}
                >
                  Log In
                </Typography>

                  <Typography 
                  variant="body1" 
                  color={mode === 'dark' ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"}
                    sx={{ 
                    mb: 4,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Enter your credentials to access your account
              </Typography>
              
              <form onSubmit={handleLogin}>
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={form.email}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon sx={{ color: mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </InputAdornment>
                    )
                  }}
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.03)' 
                        : 'rgba(0, 0, 0, 0.01)',
                      color: mode === 'dark' ? 'white' : 'text.primary',
                      backdropFilter: 'blur(5px)',
                      WebkitBackdropFilter: 'blur(5px)',
                      '& fieldset': {
                        borderColor: mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s ease'
                      },
                      '&:hover fieldset': {
                        borderColor: mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: mode === 'dark' ? '#26A6B5' : '#1976d2',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                      '&.Mui-focused': {
                        color: mode === 'dark' ? '#26A6B5' : '#1976d2'
                      }
                    }
                  }}
                />
                
                <TextField 
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: mode === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
                        >
                          {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.03)' 
                        : 'rgba(0, 0, 0, 0.01)',
                      color: mode === 'dark' ? 'white' : 'text.primary',
                      backdropFilter: 'blur(5px)',
                      WebkitBackdropFilter: 'blur(5px)',
                      '& fieldset': {
                        borderColor: mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)',
                        transition: 'border-color 0.3s ease'
                      },
                      '&:hover fieldset': {
                        borderColor: mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.2)' 
                          : 'rgba(0, 0, 0, 0.2)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: mode === 'dark' ? '#26A6B5' : '#1976d2',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      color: mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)',
                      '&.Mui-focused': {
                        color: mode === 'dark' ? '#26A6B5' : '#1976d2'
                      }
                    }
                  }}
                />
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ 
                      py: 1.5, 
                      borderRadius: '8px',
                    fontWeight: 'bold',
                      fontSize: '1rem',
                      textTransform: 'none',
                      bgcolor: '#26A6B5',
                    '&:hover': {
                      bgcolor: '#1e8a96'
                    }
                  }}
                    size="large"
                >
                    Login
                </Button>
              
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                  Don't have an account?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/signup" 
                    sx={{ 
                          fontWeight: 600,
                          color: mode === 'dark' ? '#26A6B5' : '#1976d2',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
                  </Box>
                </form>
              </Box>
              </Box>
            </Paper>
          </Box>
      </Box>
    </>
  );
};

export default Login;
