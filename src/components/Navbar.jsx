import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Menu, 
  MenuItem, 
  IconButton, 
  Button,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Badge
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../ThemeContext';

const Navbar = ({ user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [userMenu, setUserMenu] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClose = () => {
    setMobileOpen(false);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenu(null);
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <BarChartIcon />, requiresAuth: true },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Contact', path: '/contact', icon: <ContactMailIcon /> },
  ];

  const handleNavigation = (path, requiresAuth) => {
    if (requiresAuth && !user) {
      // If requires auth but user is not logged in, redirect to login
      window.location.href = '/login';
    } else {
      // Otherwise navigate normally
      window.location.href = path;
    }
    handleMenuClose();
  };

  const drawer = (
    <Box sx={{ width: 270 }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            component="div" 
            sx={{ 
              width: 36, 
              height: 36, 
              borderRadius: '50%', 
              bgcolor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1
            }}
          >
            <Box 
              component="div" 
              sx={{ 
                width: 20, 
                height: 20, 
                borderRadius: 1,
                bgcolor: 'white',
                transform: 'rotate(12deg)'
              }}
            />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            FinTrak
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      {user && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
              {user.name?.charAt(0) || "U"}
            </Avatar>
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user.name || "User"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {user.role || "Employee"}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Divider />
      <List>
        {menuItems.map((item) => (
          (!item.requiresAuth || (item.requiresAuth && user)) && (
            <ListItemButton 
              key={item.text} 
              onClick={() => handleNavigation(item.path, item.requiresAuth)}
              selected={isCurrentPage(item.path)}
              sx={{
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          )
        ))}
        
        {user && (
          <ListItemButton 
            onClick={() => {
              onLogout();
              handleMenuClose();
            }}
            sx={{
              borderRadius: 1,
              mx: 1,
              my: 0.5,
              color: 'error.main',
              '&:hover': {
                bgcolor: 'error.light',
                color: 'error.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'error.contrastText',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'error.main' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        )}
      </List>
      <Box sx={{ p: 2, mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="outlined" 
          size="small"
          onClick={toggleColorMode}
          startIcon={mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          sx={{ borderRadius: 6 }}
        >
          {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{
        borderBottom: 1, 
        borderColor: 'divider', 
        bgcolor: 'background.paper',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo and branding */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Box 
              component="div" 
              sx={{ 
                width: { xs: 32, sm: 36 }, 
                height: { xs: 32, sm: 36 }, 
                borderRadius: '50%', 
                bgcolor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}
            >
              <Box 
                component="div" 
                sx={{ 
                  width: { xs: 18, sm: 20 }, 
                  height: { xs: 18, sm: 20 }, 
                  borderRadius: 1,
                  bgcolor: 'white',
                  transform: 'rotate(12deg)'
                }}
              />
            </Box>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                display: { xs: 'none', sm: 'block' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              FinTrak
          </Typography>
        </Box>

          {/* Desktop navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {menuItems.map((item) => (
              (!item.requiresAuth || (item.requiresAuth && user)) && (
                <Button 
                  key={item.text}
                  onClick={() => handleNavigation(item.path, item.requiresAuth)}
                  color={isCurrentPage(item.path) ? 'primary' : 'inherit'}
                  sx={{ 
                    mx: 0.5,
                    fontWeight: isCurrentPage(item.path) ? 700 : 500,
                    borderBottom: isCurrentPage(item.path) ? 2 : 0,
                    borderColor: 'primary.main',
                    borderRadius: 0,
                    pb: 0.5
                  }}
                >
                  {item.text}
                </Button>
              )
            ))}
          </Box>
          
          {/* Right side actions */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={toggleColorMode} color="inherit" size="small" sx={{ ml: 1 }}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          
          {user ? (
            <>
              <Box sx={{ ml: 1.5, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>
                  {user.name}
                </Typography>
              <Avatar 
                  onClick={handleUserMenuOpen}
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.main',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.3)'
                    }
                  }}
              >
                {user.name?.charAt(0) || "U"}
              </Avatar>
              <Menu
                  anchorEl={userMenu}
                  open={Boolean(userMenu)}
                  onClose={handleUserMenuClose}
              PaperProps={{
                elevation: 3,
                    sx: { width: 200, mt: 1.5 }
                  }}
              >
                <MenuItem component={Link} to="/profile" onClick={handleUserMenuClose}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
              Profile
            </MenuItem>
            <Divider />
                <MenuItem onClick={() => { onLogout(); handleUserMenuClose(); }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
                  </ListItemIcon>
                  <Typography color="error.main">Logout</Typography>
            </MenuItem>
              </Menu>
              </Box>
            </>
          ) : (
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Button 
                  component={Link} 
                to="/login" 
                color="inherit"
                  sx={{ ml: 1 }}
              >
                Login
              </Button>
              <Button 
                  component={Link} 
                to="/signup" 
                variant="contained" 
                color="primary"
                  sx={{ ml: 1 }}
              >
                Sign Up
              </Button>
              </Box>
            )}
            
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
        </Box>
      </Toolbar>
      </Container>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 270 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
