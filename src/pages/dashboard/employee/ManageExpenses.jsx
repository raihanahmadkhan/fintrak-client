import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { getMyExpenses } from '../../../api';

const ManageExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMyExpenses()
      .then(data => {
        console.log('Fetched employee expenses:', data); // Debug log
        setExpenses(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        setExpenses([]);
        setError('Could not load expenses.');
      });
  }, []);

  if (error) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>{error}</Typography>;

  if (!Array.isArray(expenses)) return <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>Expenses data is invalid.</Typography>;

  const handleDelete = (id) => setExpenses(expenses.filter(e => e._id !== id)); // For future API delete

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>My Expenses</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map(e => (
            <TableRow key={e._id}>
              <TableCell>{dayjs(e.date).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{e.category}</TableCell>
              <TableCell>₹{e.amount}</TableCell>
              <TableCell>{e.description}</TableCell>
              <TableCell>{e.status}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(e._id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageExpenses;
