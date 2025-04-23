import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Alert, useTheme, Snackbar, Container } from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = ({ user }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    let isValid = true;
    let errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
      isValid = false;
    }
    
    setErrors(errors);
    
    if (isValid) {
      // In a real app, this would submit data to a server
      // For demo purposes, we'll just show the success message
      
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden',
      position: 'relative',
      bgcolor: 'transparent',
      backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070)',
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
          ? 'rgba(0, 0, 0, 0.75)' 
          : 'rgba(255, 255, 255, 0.75)',
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
          Contact Us
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
          Have questions or feedback? We'd love to hear from you. Fill out the form below and our team will get back to you shortly.
        </Typography>
        
        <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={4} 
              sx={{ 
                p: { xs: 2, sm: 4 },
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      error={!!errors.subject}
                      helperText={errors.subject}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ 
                        py: 1.5,
                        fontWeight: 600,
                        bgcolor: '#26A6B5',
                        '&:hover': {
                          bgcolor: '#1e8a96'
                        },
                        boxShadow: '0 4px 14px 0 rgba(38, 166, 181, 0.24)'
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={4} 
              sx={{ 
                p: { xs: 2, sm: 4 },
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
              <Typography 
                variant="h5"
                component="h2"
                sx={{ 
                  mb: 4,
                  fontWeight: 600,
                  textAlign: { xs: 'center', md: 'left' },
                  color: mode === 'dark' ? '#fff' : 'text.primary'
                }}
              >
                Get in Touch
              </Typography>
              
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Our Location
                  </Typography>
                  <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'}>
                    XYZ Street<br />
                    India
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Email Address
                  </Typography>
                  <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'}>
                    support@fintrak.com<br />
                    info@fintrak.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Phone Number
                  </Typography>
                  <Typography color={mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'text.secondary'}>
                    +1 (555) 123-4567<br />
                    +1 (555) 765-4321
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact; 