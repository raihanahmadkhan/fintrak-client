import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, ButtonGroup, Button, Divider, Stack, CircularProgress } from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupsIcon from '@mui/icons-material/Groups';
import DashboardLayout from '../../../components/DashboardLayout';
import DashboardCard from '../../../components/DashboardCard';
import { getAllExpenses, getAllEmployees } from '../../../api';

const CompanyOverview = () => {
  const [expenses, setExpenses] = useState([]);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAllExpenses(),
      getAllEmployees()
    ])
      .then(([expensesData, employeesData]) => {
        setExpenses(expensesData);
        setEmployeeCount(employeesData.length);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load company data');
        setLoading(false);
      });
  }, []);

  // Aggregate expenses by department, category, and month
  const departmentData = React.useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (!map[e.department]) map[e.department] = 0;
      map[e.department] += e.amount;
    });
    return Object.entries(map).map(([department, amount]) => ({ department, amount }));
  }, [expenses]);

  const categoryData = React.useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      if (!map[e.category]) map[e.category] = 0;
      map[e.category] += e.amount;
    });
    // Assign colors for pie chart (fallback to default if not enough)
    const colors = ['#26A6B5','#1976d2','#e91e63','#ff9800','#4caf50','#9c27b0','#ff5722','#607d8b'];
    return Object.entries(map).map(([name, value], i) => ({ name, value, fill: colors[i % colors.length] }));
  }, [expenses]);

  const monthlyData = React.useMemo(() => {
    const map = {};
    expenses.forEach(e => {
      const month = new Date(e.date).toLocaleString('default', { month: 'short' });
      if (!map[month]) map[month] = { expenses: 0, budget: 60000, month };
      map[month].expenses += e.amount;
    });
    return Object.values(map).sort((a, b) => new Date(`2025 ${a.month}`) - new Date(`2025 ${b.month}`));
  }, [expenses]);

  const totalExpenses = departmentData.reduce((sum, dept) => sum + dept.amount, 0);

  const summaryCards = [
    { 
      title: "Total Expenses", 
      value: `₹${(totalExpenses/1000).toFixed(0)}K`, 
      icon: <AccountBalanceWalletIcon fontSize="large" />, 
      color: "primary",
      subtitle: "Financial year 2025"
    },
    { 
      title: "Departments", 
      value: departmentData.length.toString(), 
      icon: <BusinessIcon fontSize="large" />, 
      color: "success",
      subtitle: "Active expense reporting"
    },
    { 
      title: "Total Employees", 
      value: employeeCount !== null ? employeeCount : '-', 
      icon: <GroupsIcon fontSize="large" />, 
      color: "info",
      subtitle: "Across all departments"
    },
    { 
      title: "Monthly Growth", 
      value: "+5%", 
      icon: <TrendingUpIcon fontSize="large" />, 
      color: "warning",
      subtitle: "Compared to last month"
    }
  ];

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <DashboardLayout 
      title="Company Overview" 
      subtitle="Financial insights and expense analytics across all departments"
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Company Overview', path: '/dashboard/company-overview' }
      ]}
    >
      {/* Summary Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>
      {/* Charts Section */}
      <Grid container spacing={3}>
        {/* Expenses by Department */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Expenses by Department
            </Typography>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical" margin={{ left: 5, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} fontSize={11} tickFormatter={v => `₹${(v/1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} fontSize={11} />
                  <RechartsTooltip formatter={value => [`₹${value.toLocaleString()}`,'Amount']} contentStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="amount" fill="#26A6B5" barSize={28} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        {/* Expenses by Category (Pie Chart) */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Expenses by Category
            </Typography>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={value => [`₹${value.toLocaleString()}`, 'Amount']} contentStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            {/* Legend below the chart */}
            <Box sx={{ width: '100%', mt: 1, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {categoryData.map((item, index) => (
                <Box key={index} sx={{ mx: 1.5, mb: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.fill }} />
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: '0.8rem' }}>{item.name}</Typography>
                  </Stack>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                    ₹{(item.value/1000).toFixed(0)}K ({totalExpenses ? Math.round(item.value/totalExpenses*100) : 0}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
        {/* Monthly Trends */}
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom sx={{ fontSize: '1rem' }}>
              Monthly Expense Trends
            </Typography>
            <Box height={320}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData} margin={{ top: 5, right: 20, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={value => `₹${value/1000}K`} fontSize={11} width={40} />
                  <RechartsTooltip formatter={value => [`₹${value.toLocaleString()}`, null]} contentStyle={{ fontSize: '11px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="expenses" stroke="#26A6B5" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} name="Actual Expenses" />
                  <Line type="monotone" dataKey="budget" stroke="#9e9e9e" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Budget" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default CompanyOverview;
