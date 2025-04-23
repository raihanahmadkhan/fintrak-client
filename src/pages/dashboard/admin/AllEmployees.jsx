import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress } from '@mui/material';
import { getAllEmployees } from '../../../api';

const AllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllEmployees()
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load employees');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>All Employees</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(e => (
            <TableRow key={e._id}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>{e.phone || '-'}</TableCell>
              <TableCell>{e.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllEmployees;
