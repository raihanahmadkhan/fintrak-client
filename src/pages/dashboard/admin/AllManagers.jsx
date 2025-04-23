import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Avatar, Divider, CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { getManagers } from '../../../api';

const AllManagers = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getManagers()
      .then(data => {
        setManagers(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load managers');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error" align="center">{error}</Typography>;

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 600,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        All Managers
      </Typography>
      
      <Divider sx={{ mb: 4 }} />
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%', 
          overflow: 'auto',
          background: 'rgba(45, 45, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ '& th': { fontWeight: 'bold', fontSize: '1rem', backgroundColor: 'rgba(30, 30, 30, 0.6)' } }}>
              <TableCell>Profile</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {managers.map(m => (
              <TableRow 
                key={m._id}
                sx={{ 
                  '&:hover': { 
                    backgroundColor: 'rgba(66, 66, 66, 0.3)' 
                  },
                  transition: 'background-color 0.2s'
                }}
              >
                <TableCell>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: 36, 
                      height: 36 
                    }}
                  >
                    {m.name?.charAt(0) || <PersonIcon />}
                  </Avatar>
                </TableCell>
                <TableCell sx={{ fontWeight: 'medium' }}>{m.name}</TableCell>
                <TableCell>{m.email}</TableCell>
                <TableCell>{m.phone || '-'}</TableCell>
                <TableCell align="center">
                  <Box 
                    sx={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      bgcolor: 'primary.dark',
                      color: 'white',
                      px: 2,
                      py: 0.5,
                      borderRadius: 4,
                      fontSize: '0.8rem',
                      fontWeight: 'medium'
                    }}
                  >
                    <PersonIcon sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                    {m.role}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllManagers;
