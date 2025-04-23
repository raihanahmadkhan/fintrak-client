import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  MenuItem, 
  Link, 
  useTheme, 
  useMediaQuery,
  Paper,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
  Grid
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Navbar from '../components/Navbar';
import { signup as apiSignup, setToken, getManagers } from '../api';

const roles = [
  { value: 'employee', label: 'Employee' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
];

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({ name: '', workId: '', email: '', phone: '', password: '', confirm: '', role: 'employee', manager: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (form.role === 'employee') {
      getManagers().then(setManagers).catch(() => setManagers([]));
    }
  }, [form.role]);

  // Calculate if final submission is valid
  const canSubmitFinal = 
    form.password && 
    form.password.length >= 6 && 
    form.confirm && 
    form.password === form.confirm &&
    (form.role !== 'employee' || form.manager);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Validate password
    if (name === 'password') {
      if (value && value.length < 6) {
        setPasswordError('Password must be at least 6 characters');
      } else {
        setPasswordError('');
      }
      
      // Also validate confirm if it has a value
      if (form.confirm && value !== form.confirm) {
        setConfirmError('Passwords do not match');
      } else if (form.confirm) {
        setConfirmError('');
      }
    }
    
    // Validate password confirmation
    if (name === 'confirm') {
      if (value && form.password !== value) {
        setConfirmError('Passwords do not match');
      } else {
        setConfirmError('');
      }
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeStep === 0) {
      handleNext();
    } else {
      setIsLoading(true);
      try {
        const { name, email, password, role, manager, phone } = form;
        const { user } = await apiSignup({ name, email, password, role, manager: role === 'employee' ? manager : undefined, phone });
        setUser(user);
        navigate('/dashboard');
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField 
              name="name" 
              label="Full Name" 
              value={form.name} 
              onChange={handleChange} 
              fullWidth 
              required 
              variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.01)',
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
                    borderColor: '#26A6B5',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#26A6B5'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
            />
            
                <TextField 
              name="workId" 
              label="Work ID" 
              value={form.workId} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.01)',
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
                    borderColor: '#26A6B5',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#26A6B5'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
                />
                
                <TextField 
                  name="email" 
                  label="Email" 
              type="email"
                  value={form.email} 
                  onChange={handleChange} 
                  fullWidth 
                  required 
                  variant="outlined"
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.01)',
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
                    borderColor: '#26A6B5',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#26A6B5'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              name="phone" 
              label="Phone Number" 
              value={form.phone} 
              onChange={handleChange} 
              fullWidth 
              required 
              variant="outlined"
              sx={{ 
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.01)',
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
                    borderColor: '#26A6B5',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#26A6B5'
                  }
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              select
              name="role"
              label="Role"
              value={form.role}
              onChange={handleChange}
              fullWidth
              required
              variant="outlined"
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  color: mode === 'dark' ? 'white' : 'text.primary',
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.03)' 
                    : 'rgba(0, 0, 0, 0.01)',
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
                    borderColor: '#26A6B5',
                  }
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  '&.Mui-focused': {
                    color: '#26A6B5'
                  }
                },
                '& .MuiSelect-icon': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'
                },
                '& .MuiMenuItem-root': {
                  color: 'text.primary'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkOutlineOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                  </InputAdornment>
                ),
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    bgcolor: mode === 'dark' ? '#1d2436' : '#fff',
                    '& .MuiMenuItem-root': {
                      color: mode === 'dark' ? 'white' : 'text.primary'
                    },
                    '& .MuiMenuItem-root:hover': {
                      bgcolor: mode === 'dark' ? 'rgba(38, 166, 181, 0.1)' : 'rgba(25, 118, 210, 0.1)'
                    },
                    '& .MuiMenuItem-root.Mui-selected': {
                      bgcolor: mode === 'dark' ? 'rgba(38, 166, 181, 0.2)' : 'rgba(25, 118, 210, 0.2)'
                    }
                  }
                }
              }}
            >
              {roles.map(role => (
                <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>
              ))}
            </TextField>
            
            {form.role === 'employee' && (
              <TextField
                select
                name="manager"
                label="Select Manager"
                value={form.manager}
                onChange={handleChange}
                fullWidth
                required
                variant="outlined"
                sx={{ 
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    color: mode === 'dark' ? 'white' : 'text.primary',
                    backgroundColor: mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.03)' 
                      : 'rgba(0, 0, 0, 0.01)',
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
                      borderColor: '#26A6B5',
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                    '&.Mui-focused': {
                      color: '#26A6B5'
                    }
                  },
                  '& .MuiSelect-icon': {
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'
                  },
                  '& .MuiMenuItem-root': {
                    color: 'text.primary'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeOutlinedIcon sx={{ color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)' }} />
                    </InputAdornment>
                  ),
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: mode === 'dark' ? '#1d2436' : '#fff',
                      '& .MuiMenuItem-root': {
                        color: mode === 'dark' ? 'white' : 'text.primary'
                      },
                      '& .MuiMenuItem-root:hover': {
                        bgcolor: mode === 'dark' ? 'rgba(38, 166, 181, 0.1)' : 'rgba(25, 118, 210, 0.1)'
                      },
                      '& .MuiMenuItem-root.Mui-selected': {
                        bgcolor: mode === 'dark' ? 'rgba(38, 166, 181, 0.2)' : 'rgba(25, 118, 210, 0.2)'
                      }
                    }
                  }
                }}
              >
                {managers.length === 0 ? (
                  <MenuItem value="" disabled>No managers found</MenuItem>
                ) : managers.map((mgr) => (
                  <MenuItem key={mgr._id} value={mgr._id}>{mgr.name} ({mgr.email})</MenuItem>
                ))}
              </TextField>
            )}
            
          </>
        );
      case 1:
        return (
          <>
            <TextField 
              fullWidth 
              autoComplete="new-password"
              name="password" 
              label="Password" 
              type={showPassword ? 'text' : 'password'}
              value={form.password} 
              onChange={handleChange} 
              sx={{
                mb: 2,
                input: {
                  color: mode === 'dark' ? 'white' : 'inherit',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                },
              }}
              error={!!passwordError}
              helperText={passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: mode === 'dark' ? 'white' : 'inherit' }}
                    >
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField 
              fullWidth
              autoComplete="new-password"
              name="confirm" 
              label="Confirm Password" 
              type={showConfirmPassword ? 'text' : 'password'}
              value={form.confirm} 
              onChange={handleChange} 
              sx={{
                mb: 2,
                input: {
                  color: mode === 'dark' ? 'white' : 'inherit',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'dark' ? 'white' : 'black',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'inherit',
                },
              }}
              error={!!confirmError}
              helperText={confirmError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: mode === 'dark' ? 'white' : 'inherit' }}
                    >
                      {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      default:
        return null;
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070)',
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
                      bgcolor: mode === 'dark' ? 'rgba(38, 166, 181, 0.2)' : 'rgba(25, 118, 210, 0.2)',
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
                        bgcolor: mode === 'dark' ? '#26A6B5' : '#1976d2',
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
                <Link component={RouterLink} to="/signup" className="active">
                  <PersonOutlineIcon sx={{ mr: 1.5 }} /> Sign Up
                </Link>
                <Link component={RouterLink} to="/login" className="">
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
                    textAlign: isSmallScreen ? 'center' : 'left',
                    fontWeight: 600, 
                    mb: 1.5,
                    fontSize: { xs: '1.75rem', sm: '2.25rem' },
                    color: mode === 'dark' ? 'white' : 'text.primary'
                  }}
                >
                  {activeStep === 0 ? 'Create an Account' : 'Complete Registration'}
                </Typography>

                <Typography 
                  variant="body1" 
                  color={mode === 'dark' ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"}
                  sx={{ 
                    textAlign: isSmallScreen ? 'center' : 'left',
                    mb: 4,
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  {activeStep === 0 ? 'Enter your personal information' : 'Set up your login credentials'}
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body2" color={mode === 'dark' ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)"} sx={{ mb: 1 }}>
                    Step {activeStep + 1} of 2
                  </Typography>
                  <Stepper 
                    activeStep={activeStep} 
                    alternativeLabel
                    sx={{
                      width: '100%',
                      mb: 4,
                      '& .MuiStepLabel-label': {
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                        '&.Mui-active': {
                          color: mode === 'dark' ? 'white' : 'text.primary',
                        },
                        '&.Mui-completed': {
                          color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        }
                      },
                      '& .MuiStepIcon-root': {
                        color: 'rgba(255, 255, 255, 0.3)',
                        '&.Mui-active': {
                          color: mode === 'dark' ? '#26A6B5' : '#1976d2',
                        },
                        '&.Mui-completed': {
                          color: mode === 'dark' ? '#26A6B5' : '#1976d2',
                        }
                      },
                      '& .MuiStepConnector-line': {
                        borderColor: 'rgba(255, 255, 255, 0.2)'
                      }
                    }}
                  >
                    <Step>
                      <StepLabel>Account Details</StepLabel>
                    </Step>
                    <Step>
                      <StepLabel>Security</StepLabel>
                    </Step>
                  </Stepper>
                </Box>
                
                <form onSubmit={handleSubmit}>
                  {renderStepContent(activeStep)}
                  
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      pt: 2,
                    }}
                  >
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ 
                        py: 1.5,
                        mr: 1,
                        color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                        borderColor: '#26A6B5',
                        '&:hover': {
                          color: mode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)',
                          backgroundColor: 'rgba(38, 166, 181, 0.05)'
                        }
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        py: 1.5,
                        borderRadius: '8px',
                        bgcolor: '#26A6B5',
                        '&:hover': {
                          bgcolor: '#1e8a96'
                        },
                        boxShadow: '0 4px 14px 0 rgba(38, 166, 181, 0.24)',
                        flexGrow: 1
                      }}
                      onClick={handleSubmit}
                      type="submit"
                      disabled={isLoading || (activeStep === 1 && !canSubmitFinal)}
                      startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                      {activeStep === 0 ? 'Next Step' : 'Create Account'}
                    </Button>
                  </Box>
                  
                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ color: mode === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                      Already have an account?{' '}
                      <Link 
                        component={RouterLink} 
                        to="/login" 
                        sx={{ 
                          ml: 0.5, 
                          fontWeight: 600,
                          color: '#26A6B5',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Log In
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

export default Signup;
