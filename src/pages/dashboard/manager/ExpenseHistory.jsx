import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { getTeamExpenses } from '../../../api';

const ExpenseHistory = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    getTeamExpenses().then(data => setHistory(Array.isArray(data) ? data : []));
  }, []);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Expense History</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map(e => (
            <TableRow key={e._id}>
              <TableCell>{e.employee?.name}</TableCell>
              <TableCell>{dayjs(e.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>₹{e.amount}</TableCell>
              <TableCell>{e.description}</TableCell>
              <TableCell>{e.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseHistory;
