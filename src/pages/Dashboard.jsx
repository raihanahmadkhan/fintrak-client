import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  Chip,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useThemeContext } from '../ThemeContext';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BarChartIcon from '@mui/icons-material/BarChart';
import DateRangeIcon from '@mui/icons-material/DateRange';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import FlagIcon from '@mui/icons-material/Flag';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import Navbar from '../components/Navbar';
import { getMyExpenses } from '../api';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Meals', label: 'Meals & Entertainment' },
  { value: 'Office', label: 'Office Supplies' },
  { value: 'Software', label: 'Software & Subscriptions' },
  { value: 'Events', label: 'Events & Conferences' }
];

const statuses = [
  { value: 'all', label: 'All Statuses' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Rejected', label: 'Rejected' },
  { value: 'Flagged', label: 'Flagged' }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Approved': return 'success';
    case 'Pending': return 'warning';
    case 'Rejected': return 'error';
    case 'Flagged': return 'info';
    default: return 'default';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Approved': return <CheckCircleIcon fontSize="small" />;
    case 'Pending': return <PendingIcon fontSize="small" />;
    case 'Rejected': return <DoNotDisturbIcon fontSize="small" />;
    case 'Flagged': return <FlagIcon fontSize="small" />;
    default: return null;
  }
};

const Dashboard = ({ user, onLogout }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    getMyExpenses()
      .then(data => {
        console.log('Fetched expenses:', data);
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load expenses');
        setLoading(false);
      });
  }, []);

  const pendingCount = expenses.filter(e => e.status === 'Pending').length;
  const reimbursedTotal = expenses.filter(e => e.status === 'Approved').reduce((sum, e) => sum + e.amount, 0);
  const lastReimbursed = (() => {
    const approved = expenses.filter(e => e.status === 'Approved').sort((a, b) => new Date(b.date) - new Date(a.date));
    return approved.length ? `${Math.round((Date.now() - new Date(approved[0].date)) / (1000 * 60 * 60 * 24))} days ago` : '-';
  })();

  const summaryCards = [
    {
      title: 'Expenses',
      value: `₹${expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}`,
      subtitle: `${expenses.length} expenses submitted`,
      icon: <AttachMoneyIcon fontSize="large" />, color: 'primary'
    },
    {
      title: 'Pending Approvals',
      value: pendingCount,
      subtitle: 'Awaiting manager review',
      icon: <ReceiptLongIcon fontSize="large" />, color: 'warning'
    },
    {
      title: 'Reimbursed',
      value: `₹${reimbursedTotal.toLocaleString()}`,
      subtitle: `Last reimbursement: ${lastReimbursed}`,
      icon: <ReceiptLongIcon fontSize="large" />, color: 'success'
    }
  ];

  // Filtered expenses based on search and filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || expense.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          component="main" 
          sx={{ 
            flexGrow: 1, 
            pt: { xs: 8, sm: 9 },
            pb: { xs: 4, sm: 6 },
            px: { xs: 2, sm: 3 },
            bgcolor: mode === 'dark' ? 'background.default' : '#f8fafc'
          }}
        >
          <Container maxWidth="lg">
            {/* Summary Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {summaryCards.map((card, idx) => (
                <Grid item xs={12} md={4} key={idx}>
                  <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: `${card.color}.main`, color: 'white', minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="subtitle1" sx={{ opacity: 0.85 }}>{card.title}</Typography>
                        <Typography variant="h4" fontWeight={700} sx={{ my: 1 }}>{card.value}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>{card.subtitle}</Typography>
                      </Box>
                      <Box>{card.icon}</Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            {/* Page Header */}
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700, 
                  color: mode === 'dark' ? 'primary.light' : 'primary.dark',
                  mb: { xs: 2, sm: 0 }
                }}
              >
                Expense Dashboard
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ 
                  px: 3,
                  fontWeight: 600,
                  borderRadius: 2,
                  bgcolor: theme.palette.secondary.main,
                  '&:hover': {
                    bgcolor: theme.palette.secondary.dark
                  }
                }}
              >
                New Expense
              </Button>
            </Box>
            
            {/* Expense Table */}
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                border: 1,
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
              }}
            >
              {/* Table Header and Filters */}
              <Box 
                sx={{ 
                  p: { xs: 2, sm: 3 }, 
                  bgcolor: mode === 'dark' ? 'background.paper' : 'white',
                  borderBottom: 1,
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 1, md: 0 } }}>
                      Recent Expenses
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      placeholder="Search expenses..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.5}>
                    <TextField
                      select
                      fullWidth
                      label="Category"
                      value={categoryFilter}
                      onChange={handleCategoryChange}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    >
                      {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6} md={2.5}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      value={statusFilter}
                      onChange={handleStatusChange}
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                        }
                      }}
                    >
                      {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
              
              {/* Expenses Table */}
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="expenses table">
                  <TableHead>
                    <TableRow>
                      <TableCell width="40%">Description</TableCell>
                      <TableCell width="15%">Amount</TableCell>
                      <TableCell width="15%">Date</TableCell>
                      <TableCell width="15%">Category</TableCell>
                      <TableCell width="15%">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((expense) => (
                        <TableRow 
                          key={expense.id}
                          hover
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': {
                              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                            }
                          }}
                        >
                          <TableCell sx={{ fontWeight: 500 }}>{expense.description}</TableCell>
                          <TableCell>₹{expense.amount.toFixed(2)}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>
                            <Chip
                              icon={getStatusIcon(expense.status)}
                              label={expense.status}
                              color={getStatusColor(expense.status)}
                              variant="outlined"
                              size="small"
                              sx={{ fontWeight: 500 }}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                          <Box sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ReceiptLongIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
                            <Typography variant="body1" color="text.secondary">
                              No expenses found matching your filters
                            </Typography>
                            <Button 
                              variant="text" 
                              color="primary" 
                              sx={{ mt: 1 }}
                              onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('all');
                                setStatusFilter('all');
                              }}
                            >
                              Clear filters
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              
              {/* Table Footer */}
              <Box 
                sx={{ 
                  p: 2, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  borderTop: 1,
                  borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)'
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Showing {filteredExpenses.length} of {expenses.length} expenses
                </Typography>
                <Button 
                  variant="text" 
                  color="primary"
                  size="small"
                >
                  View All
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard; 