import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { getTeamExpenses } from '../../../api';

const TeamOverview = () => {
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    getTeamExpenses().then(data => {
      if (!Array.isArray(data)) return setTeamData([]);
      // Group expenses by employee
      const grouped = {};
      data.forEach(e => {
        const empId = e.employee?._id;
        if (!empId) return;
        if (!grouped[empId]) {
          grouped[empId] = {
            employee: e.employee?.name,
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0
          };
        }
        grouped[empId].total += e.amount;
        if (e.status === 'pending') grouped[empId].pending += 1;
        if (e.status === 'approved') grouped[empId].approved += 1;
        if (e.status === 'rejected') grouped[empId].rejected += 1;
      });
      setTeamData(Object.values(grouped));
    });
  }, []);
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>Team Overview</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Total Expenses</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Rejected</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamData.map(e => (
            <TableRow key={e.employee}>
              <TableCell>{e.employee}</TableCell>
              <TableCell>₹{e.total}</TableCell>
              <TableCell>{e.pending}</TableCell>
              <TableCell>{e.approved}</TableCell>
              <TableCell>{e.rejected}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamOverview;
