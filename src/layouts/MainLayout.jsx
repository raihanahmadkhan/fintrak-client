import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  Toolbar,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Drawer,
  AppBar,
  IconButton,
  Typography,
  Avatar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Menu,
  MenuItem,
  Tooltip,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ForwardIcon from '@mui/icons-material/Forward';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useThemeContext } from '../ThemeContext';
import Logo from '../components/Logo';

// Drawer width constants
const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 76;

// Styled components
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})(({ theme, open, collapsed }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!open && {
    marginLeft: collapsed ? COLLAPSED_DRAWER_WIDTH : 0,
    width: `calc(100% - ${collapsed ? COLLAPSED_DRAWER_WIDTH : 0}px)`,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'collapsed',
})(({ theme, open, collapsed }) => ({
  width: open ? DRAWER_WIDTH : (collapsed ? COLLAPSED_DRAWER_WIDTH : 0),
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.background.default 
        : theme.palette.background.paper,
      boxShadow: theme.palette.mode === 'dark'
        ? '0 2px 10px rgba(0, 0, 0, 0.08)'
        : '0 2px 10px rgba(0, 0, 0, 0.12)',
    },
  }),
  ...(!open && {
    '& .MuiDrawer-paper': {
      position: 'relative',
      width: collapsed ? COLLAPSED_DRAWER_WIDTH : 0,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.mode === 'dark' 
        ? theme.palette.background.default 
        : theme.palette.background.paper,
      boxShadow: theme.palette.mode === 'dark'
        ? '0 2px 10px rgba(0, 0, 0, 0.08)'
        : '0 2px 10px rgba(0, 0, 0, 0.12)',
    },
  }),
}));

// Main component
const MainLayout = ({ user, onLogout }) => {
  const theme = useTheme();
  const { mode, toggleColorMode } = useThemeContext();
  const location = useLocation();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const [open, setOpen] = useState(isDesktop);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState('');
  const [profileMenu, setProfileMenu] = useState(null);
  
  // Handle window resize
  useEffect(() => {
    if (isDesktop) {
      setCollapsed(true);
    } else {
      setOpen(false);
      setCollapsed(false);
    }
  }, [isDesktop]);
  
  // Handle drawer open/close
  const toggleDrawer = () => {
    if (isDesktop) {
      setOpen(!open);
    } else {
      setOpen(!open);
    }
  };
  
  // Handle menu expand/collapse
  const handleMenuExpand = (menu) => {
    setExpandedMenu(expandedMenu === menu ? '' : menu);
  };
  
  // Handle profile menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenu(event.currentTarget);
  };
  
  const handleProfileMenuClose = () => {
    setProfileMenu(null);
  };
  
  // Check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  // Navigation menu structure
  const navigationItems = [
    { 
      text: 'Home', 
      path: '/', 
      icon: <HomeIcon /> 
    },
    ...(user?.role === 'employee' ? [
      {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        submenu: [
          { text: 'Add Expense', path: '/dashboard/add-expense', icon: <AddIcon /> },
          { text: 'Manage Expenses', path: '/dashboard/manage-expenses', icon: <ReceiptIcon /> },
          { text: 'Analytics', path: '/dashboard/analytics', icon: <BarChartIcon /> },
        ]
      }
    ] : []),
    ...(user?.role === 'manager' ? [
      {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        submenu: [
          { text: 'Approve Expenses', path: '/dashboard/approve-expenses', icon: <CheckCircleIcon /> },
          { text: 'Expense History', path: '/dashboard/history', icon: <HistoryIcon /> },
          { text: 'Team Overview', path: '/dashboard/team-overview', icon: <GroupsIcon /> },
        ]
      }
    ] : []),
    ...(user?.role === 'admin' ? [
      {
        text: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardIcon />,
        submenu: [
          { text: 'Company Overview', path: '/dashboard/company-overview', icon: <BusinessIcon /> },
          { text: 'All Employees', path: '/dashboard/all-employees', icon: <PeopleIcon /> },
          { text: 'All Managers', path: '/dashboard/all-managers', icon: <GroupsIcon /> },
        ]
      }
    ] : []),
    { 
      text: 'Settings', 
      path: '/account-settings', 
      icon: <SettingsIcon /> 
    }
  ];
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', width: '100vw', maxWidth: '100%', overflowX: 'hidden' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <StyledAppBar position="fixed" open={open} collapsed={collapsed}>
        <Toolbar sx={{ pr: '24px' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            sx={{ marginRight: '36px' }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          
          <Typography 
            variant="h6" 
            component="h1" 
            sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', sm: 'block' }, 
              fontWeight: 600,
              color: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#1A202C'
            }}
          >
            {/* Dynamic page title based on route */}
            {location.pathname === '/' ? 'Home' : 
              location.pathname.includes('/dashboard/add-expense') ? 'Add Expense' :
              location.pathname.includes('/dashboard/manage-expenses') ? 'Manage Expenses' :
              location.pathname.includes('/dashboard/analytics') ? 'Analytics' :
              location.pathname.includes('/dashboard/approve-expenses') ? 'Approve Expenses' :
              location.pathname.includes('/dashboard/history') ? 'Expense History' :
              location.pathname.includes('/dashboard/team-overview') ? 'Team Overview' :
              location.pathname.includes('/dashboard/company-overview') ? 'Company Overview' :
              location.pathname.includes('/dashboard/all-employees') ? 'All Employees' :
              location.pathname.includes('/dashboard/all-managers') ? 'All Managers' :
              location.pathname.includes('/dashboard') ? 'Dashboard' :
              location.pathname.includes('/account-settings') ? 'Account Settings' :
              location.pathname.includes('/profile') ? 'Profile' :
              'FinTrak'
            }
          </Typography>
          
          {/* Theme toggle */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              onClick={toggleColorMode} 
              color="inherit" 
              sx={{ 
                ml: 1,
                color: theme.palette.mode === 'dark' ? 'inherit' : 'text.primary',
              }}
            >
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          
          {/* User profile */}
          <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                mr: 1, 
                display: { xs: 'none', sm: 'block' },
                color: theme.palette.mode === 'dark' ? 'inherit' : 'text.primary',
                fontWeight: 500
              }}
            >
              {user?.name || 'User'}
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ p: 0 }}
                aria-controls={Boolean(profileMenu) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(profileMenu) ? 'true' : undefined}
              >
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: theme.palette.primary.main,
                    border: theme.palette.mode === 'light' ? '1px solid rgba(0,0,0,0.12)' : 'none'
                  }}
                >
                  {user?.name ? user.name.charAt(0) : 'U'}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={profileMenu}
            id="account-menu"
            open={Boolean(profileMenu)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                mt: 1.5,
                width: 220,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {user?.name || 'User'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                {user?.role || 'Employee'}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleProfileMenuClose} component="a" href="/profile">
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose} component="a" href="/account-settings">
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem 
              onClick={() => {
                handleProfileMenuClose();
                onLogout();
              }}
            >
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      
      {/* Sidebar */}
      <StyledDrawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={open}
        collapsed={collapsed}
        onClose={toggleDrawer}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'space-between' : 'center',
            px: [1],
            py: 1.5,
          }}
        >
          {open ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  component="a" 
                  href="/" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  <Logo size={36} />
                  <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
                    FinTrak
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </>
          ) : (
            <Box 
              component="a" 
              href="/" 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <Logo size={32} />
            </Box>
          )}
        </Toolbar>
        <Divider />
        
        {/* User info in drawer */}
        {open && user && (
          <>
            <Box sx={{ px: 2, py: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 40, 
                    height: 40, 
                    bgcolor: theme.palette.primary.main,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}
                >
                  {user.name ? user.name.charAt(0) : 'U'}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.role}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider />
          </>
        )}
        
        {/* Navigation items */}
        <List 
          component="nav" 
          sx={{ 
            px: 1, 
            py: 1, 
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {navigationItems.map((item) => (
            item.submenu ? (
              <React.Fragment key={item.text}>
                <ListItemButton
                  onClick={() => handleMenuExpand(item.text)}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    mb: 0.5,
                    borderRadius: '8px',
                    justifyContent: open ? 'initial' : 'center',
                    ...(isActive(item.path) && {
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : 'auto',
                      justifyContent: 'center',
                      color: isActive(item.path) 
                        ? 'primary.contrastText' 
                        : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <>
                      <ListItemText 
                        primary={item.text} 
                        sx={{ 
                          color: isActive(item.path) 
                            ? 'primary.contrastText' 
                            : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                        }} 
                      />
                      {expandedMenu === item.text ? <ExpandLess /> : <ExpandMore />}
                    </>
                  )}
                </ListItemButton>
                {open && (
                  <Collapse in={expandedMenu === item.text} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((subitem) => (
                        <ListItemButton
                          key={subitem.text}
                          sx={{
                            pl: 4,
                            py: 1,
                            minHeight: 40,
                            borderRadius: '8px',
                            ml: 1,
                            mr: 1,
                            mb: 0.5,
                            ...(isActive(subitem.path) && {
                              bgcolor: 'primary.main',
                              color: 'primary.contrastText',
                              '&:hover': {
                                bgcolor: 'primary.dark',
                              },
                            }),
                          }}
                          component="a"
                          href={subitem.path}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: 2,
                              color: isActive(subitem.path) 
                                ? 'primary.contrastText' 
                                : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                            }}
                          >
                            {subitem.icon}
                          </ListItemIcon>
                          <ListItemText 
                            primary={subitem.text} 
                            sx={{ 
                              color: isActive(subitem.path) 
                                ? 'primary.contrastText' 
                                : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                            }} 
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ) : (
              <ListItemButton
                key={item.text}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  mb: 0.5,
                  borderRadius: '8px',
                  justifyContent: open ? 'initial' : 'center',
                  ...(isActive(item.path) && {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }),
                }}
                component="a"
                href={item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                    color: isActive(item.path) 
                      ? 'primary.contrastText' 
                      : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {open && <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    color: isActive(item.path) 
                      ? 'primary.contrastText' 
                      : (theme.palette.mode === 'dark' ? 'inherit' : 'text.primary'),
                  }} 
                />}
              </ListItemButton>
            )
          ))}
        </List>
        
        {/* Logout button at the bottom */}
        {open && (
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <ListItemButton
              onClick={onLogout}
              sx={{
                borderRadius: '8px',
                color: theme.palette.error.main,
                '&:hover': {
                  bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(244, 67, 54, 0.1)' 
                    : 'rgba(244, 67, 54, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: theme.palette.error.main }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </Box>
        )}
      </StyledDrawer>
      
      {/* Main content area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: { xs: 1, sm: 2, md: 3 }, 
          width: '100%',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout; 