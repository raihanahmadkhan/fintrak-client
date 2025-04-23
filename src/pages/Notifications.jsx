import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Divider, 
  Tabs, 
  Tab,
  useTheme,
  IconButton,
  Button,
  MenuItem,
  Menu,
  Chip,
  FormControl,
  InputLabel,
  Select,
  Container
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import Navbar from '../components/Navbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    type: 'approval',
    title: 'Expense Approved',
    description: 'Your expense report for ₹120 has been approved by your manager.',
    time: '10 minutes ago',
    read: false,
    icon: <CheckCircleIcon sx={{ color: 'success.main' }} />
  },
  {
    id: 2,
    type: 'rejection',
    title: 'Expense Rejected',
    description: 'Your travel expense claim was rejected. Please review the comments and submit a revised report.',
    time: '2 hours ago',
    read: false,
    icon: <ErrorIcon sx={{ color: 'error.main' }} />
  },
  {
    id: 3,
    type: 'info',
    title: 'New Policy Update',
    description: 'Company expense policy has been updated. Please review the changes before submitting your next report.',
    time: '1 day ago',
    read: true,
    icon: <InfoIcon sx={{ color: 'info.main' }} />
  },
  {
    id: 4,
    type: 'report',
    title: 'Monthly Report Available',
    description: 'Your expense summary for June is now available for review. You can download it from your dashboard.',
    time: '3 days ago',
    read: true,
    icon: <DescriptionIcon sx={{ color: 'primary.main' }} />
  },
  {
    id: 5,
    type: 'approval',
    title: 'Expense Approved',
    description: 'Your office supplies expense for ₹75 has been approved.',
    time: '1 week ago',
    read: true,
    icon: <CheckCircleIcon sx={{ color: 'success.main' }} />
  },
  {
    id: 6,
    type: 'info',
    title: 'Reminder: Submit Expenses',
    description: 'Don\'t forget to submit your expense reports before the end of the month.',
    time: '2 weeks ago',
    read: true,
    icon: <InfoIcon sx={{ color: 'info.main' }} />
  }
];

const Notifications = ({ user }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleFilterOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };
  
  const handleActionOpen = (event, notification) => {
    setActionAnchorEl(event.currentTarget);
    setSelectedNotification(notification);
    event.stopPropagation();
  };
  
  const handleActionClose = () => {
    setActionAnchorEl(null);
    setSelectedNotification(null);
  };
  
  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
    
    if (selectedNotification?.id === id) {
      handleActionClose();
    }
  };
  
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    
    if (selectedNotification?.id === id) {
      handleActionClose();
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };
  
  const deleteAllRead = () => {
    setNotifications(notifications.filter(notification => !notification.read));
  };
  
  const getFilteredNotifications = () => {
    // First filter by tab (all, unread, read)
    let filtered = [...notifications];
    if (activeTab === 1) {
      filtered = filtered.filter(n => !n.read);
    } else if (activeTab === 2) {
      filtered = filtered.filter(n => n.read);
    }
    
    // Then filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(n => n.type === typeFilter);
    }
    
    return filtered;
  };
  
  const getChipColor = (type) => {
    switch (type) {
      case 'approval':
        return 'success';
      case 'rejection':
        return 'error';
      case 'info':
        return 'info';
      case 'report':
        return 'primary';
      default:
        return 'default';
    }
  };
  
  const handleNotificationClick = (id) => {
    // In a real app, this would navigate to relevant page for the notification
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const filteredNotifications = getFilteredNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      width: '100vw',
      maxWidth: '100%',
      overflowX: 'hidden'
    }}>
      <Navbar user={user} />
      
      <Container maxWidth="md" sx={{ mt: { xs: '64px', sm: '72px' }, p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ fontWeight: 700 }}
          >
            Notifications
          </Typography>
          
          <Box>
            <IconButton onClick={handleFilterOpen} aria-label="filter notifications">
              <FilterListIcon />
            </IconButton>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5, minWidth: 200 }}>
                <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                  <InputLabel id="type-filter-label">Type</InputLabel>
                  <Select
                    labelId="type-filter-label"
                    value={typeFilter}
                    label="Type"
                    onChange={handleTypeFilterChange}
                  >
                    <MenuItem value="all">All Types</MenuItem>
                    <MenuItem value="approval">Approvals</MenuItem>
                    <MenuItem value="rejection">Rejections</MenuItem>
                    <MenuItem value="info">Information</MenuItem>
                    <MenuItem value="report">Reports</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}>
                  <Button 
                    size="small" 
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    startIcon={<CheckIcon />}
                  >
                    Mark All Read
                  </Button>
                  <Button 
                    size="small" 
                    color="error"
                    onClick={deleteAllRead}
                    disabled={notifications.filter(n => n.read).length === 0}
                    startIcon={<DeleteIcon />}
                  >
                    Clear Read
                  </Button>
                </Box>
              </Box>
            </Menu>
          </Box>
        </Box>
        
        <Paper elevation={0} sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth" 
            textColor="primary"
            indicatorColor="primary"
            sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)' }}
          >
            <Tab label={`All (${notifications.length})`} />
            <Tab label={`Unread (${unreadCount})`} disabled={unreadCount === 0} />
            <Tab 
              label={`Read (${notifications.filter(n => n.read).length})`} 
              disabled={notifications.filter(n => n.read).length === 0}
            />
          </Tabs>
          
          <Divider />
          
          <List>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <ListItem 
                    button 
                    onClick={() => handleNotificationClick(notification.id)}
                    sx={{ 
                      py: 2, 
                      px: 3,
                      bgcolor: !notification.read ? (mode === 'dark' ? 'rgba(66, 165, 245, 0.08)' : 'rgba(66, 165, 245, 0.05)') : 'transparent',
                      '&:hover': {
                        bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                      }
                    }}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        aria-label="actions"
                        onClick={(e) => handleActionOpen(e, notification)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{ 
                          bgcolor: 'transparent',
                          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                          width: 40,
                          height: 40
                        }}
                      >
                        {notification.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                          <Typography 
                            variant="subtitle1" 
                            component="span"
                            sx={{ 
                              fontWeight: notification.read ? 400 : 600
                            }}
                          >
                            {notification.title}
                          </Typography>
                          <Chip 
                            label={notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} 
                            size="small"
                            color={getChipColor(notification.type)}
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'text.secondary',
                              display: 'block',
                              mb: 0.5
                            }}
                          >
                            {notification.description}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            color="text.disabled"
                          >
                            {notification.time}
                          </Typography>
                        </>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                      sx={{ mr: 4 }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Box sx={{ py: 4, textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  No notifications to display
                </Typography>
              </Box>
            )}
          </List>
        </Paper>
      </Container>
      
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={handleActionClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {selectedNotification && !selectedNotification.read && (
          <MenuItem onClick={() => markAsRead(selectedNotification.id)}>
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <CheckIcon fontSize="small" />
            </ListItemAvatar>
            <ListItemText primary="Mark as read" />
          </MenuItem>
        )}
        <MenuItem onClick={() => deleteNotification(selectedNotification?.id)}>
          <ListItemAvatar sx={{ minWidth: 36 }}>
            <DeleteIcon fontSize="small" />
          </ListItemAvatar>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Notifications; 