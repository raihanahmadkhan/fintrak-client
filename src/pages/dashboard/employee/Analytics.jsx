import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { getMyExpenses } from '../../../api';

const Analytics = () => {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    getMyExpenses().then(data => {
      setExpenses(data);
      setTotal(data.reduce((sum, e) => sum + e.amount, 0));
      const catMap = {};
      data.forEach(e => {
        catMap[e.category] = (catMap[e.category] || 0) + e.amount;
      });
      setCategoryData(Object.entries(catMap).map(([category, amount]) => ({ category, amount })));
    }).catch(() => {
      setExpenses([]);
      setTotal(0);
      setCategoryData([]);
    });
  }, []);

  return (
    <Box maxWidth={700} mx="auto" mt={3} display="flex" flexDirection="column" alignItems="center" width="100%">
      <Paper sx={{ p: 3, mb: 3, width: '100%' }}>
        <Typography variant="h6">Expense Analytics</Typography>
        <Typography>Total Spent: ₹{total}</Typography>
      </Paper>
      <Paper sx={{ p: 3, width: '100%' }}>
        <Typography variant="subtitle1" gutterBottom>Expenses by Category</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#1976d2" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Analytics;
