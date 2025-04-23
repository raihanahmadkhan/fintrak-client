import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Button, 
  Divider, 
  Badge, 
  IconButton,
  Menu,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    type: 'approval',
    title: 'Expense Approved',
    description: 'Your expense report for ₹120 has been approved.',
    time: '10 minutes ago',
    read: false,
    icon: <CheckCircleIcon sx={{ color: 'success.main' }} />
  },
  {
    id: 2,
    type: 'rejection',
    title: 'Expense Rejected',
    description: 'Your travel expense claim was rejected. Please review comments.',
    time: '2 hours ago',
    read: false,
    icon: <ErrorIcon sx={{ color: 'error.main' }} />
  },
  {
    id: 3,
    type: 'info',
    title: 'New Policy Update',
    description: 'Company expense policy has been updated. Please review the changes.',
    time: '1 day ago',
    read: true,
    icon: <InfoIcon sx={{ color: 'info.main' }} />
  },
  {
    id: 4,
    type: 'report',
    title: 'Monthly Report Available',
    description: 'Your expense summary for June is now available for review.',
    time: '3 days ago',
    read: true,
    icon: <DescriptionIcon sx={{ color: 'primary.main' }} />
  }
];

const NotificationCenter = () => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeTab, setActiveTab] = useState(0);
  
  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // Mark all as seen when opening
    if (unreadCount > 0) {
      setTimeout(() => {
        markAllAsRead();
      }, 3000); // Auto mark as read after 3 seconds of viewing
    }
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const getFilteredNotifications = () => {
    if (activeTab === 0) return notifications; // All notifications
    if (activeTab === 1) return notifications.filter(n => !n.read); // Unread
    return notifications.filter(n => n.read); // Read
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    handleCloseMenu();
  };
  
  const handleNotificationClick = (id) => {
    // In a real app, this would mark notification as read and open relevant page
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
    
    // Close the notification panel
    setIsOpen(false);
  };
  
  const handleViewAll = () => {
    navigate('/notifications');
    handleCloseMenu();
  };
  
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="notifications"
        onClick={handleOpenMenu}
        aria-haspopup="true"
        sx={{ position: 'relative' }}
      >
        <Badge 
          badgeContent={unreadCount} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              right: -2,
              top: 4
            }
          }}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            borderRadius: 2,
            width: 320,
            maxHeight: 420,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: mode === 'dark' ? 'background.paper' : 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
          <Button 
            color="primary" 
            size="small" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            sx={{ fontWeight: 600, fontSize: '0.75rem' }}
          >
            Mark all read
          </Button>
        </Box>
        
        <Divider />
        
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth" 
          textColor="primary"
          indicatorColor="primary"
          sx={{ px: 1, pt: 1 }}
        >
          <Tab label="All" sx={{ fontSize: '0.75rem', minHeight: 36 }} />
          <Tab 
            label={`Unread (${unreadCount})`} 
            sx={{ fontSize: '0.75rem', minHeight: 36 }}
            disabled={unreadCount === 0}
          />
          <Tab 
            label="Read" 
            sx={{ fontSize: '0.75rem', minHeight: 36 }}
            disabled={notifications.filter(n => n.read).length === 0}
          />
        </Tabs>
        
        <List sx={{ py: 0, maxHeight: 260, overflow: 'auto' }}>
          {getFilteredNotifications().length > 0 ? (
            getFilteredNotifications().map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem 
                  button 
                  onClick={() => handleNotificationClick(notification.id)}
                  sx={{ 
                    px: 2, 
                    py: 1.5,
                    bgcolor: !notification.read ? (mode === 'dark' ? 'rgba(66, 165, 245, 0.08)' : 'rgba(66, 165, 245, 0.05)') : 'transparent',
                    '&:hover': {
                      bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{ 
                        bgcolor: 'transparent',
                        width: 36,
                        height: 36,
                        border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                      }}
                    >
                      {notification.icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: notification.read ? 400 : 600,
                          mb: 0.5
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            fontSize: '0.75rem',
                            lineHeight: 1.5,
                            display: 'block',
                            mb: 0.5
                          }}
                        >
                          {notification.description}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: 'text.disabled',
                            fontSize: '0.7rem'
                          }}
                        >
                          {notification.time}
                        </Typography>
                      </>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Box sx={{ py: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                No notifications to display
              </Typography>
            </Box>
          )}
        </List>
        
        <Box sx={{ p: 2, borderTop: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button 
              size="small" 
              variant="text"
              onClick={handleViewAll}
              sx={{ fontSize: '0.75rem' }}
            >
              View All
            </Button>
            <Button 
              size="small" 
              color="error" 
              onClick={clearAllNotifications}
              disabled={notifications.length === 0}
              sx={{ fontSize: '0.75rem' }}
            >
              Clear All
            </Button>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default NotificationCenter; 