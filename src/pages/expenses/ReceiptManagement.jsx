import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Breadcrumbs,
  Link,
  Alert,
  Snackbar,
  IconButton
} from '@mui/material';
import { useThemeContext } from '../../ThemeContext';
import ReceiptUploader from '../../components/ReceiptUploader';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import InfoIcon from '@mui/icons-material/Info';

const ReceiptManagement = () => {
  const { mode } = useThemeContext();
  const [receipts, setReceipts] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle receipt upload
  const handleUpload = (newReceipts) => {
    setReceipts(prev => [...prev, ...newReceipts]);
    setNotification({
      open: true,
      message: `Successfully uploaded ${newReceipts.length} receipt${newReceipts.length > 1 ? 's' : ''}`,
      severity: 'success'
    });
  };

  // Handle receipt deletion
  const handleDelete = (id) => {
    setReceipts(prev => prev.filter(receipt => receipt.id !== id));
    setNotification({
      open: true,
      message: 'Receipt deleted successfully',
      severity: 'info'
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          href="#" 
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          Expenses
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <ReceiptIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Receipt Management
        </Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          Receipt Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload and manage receipts for your expense reports
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <ReceiptUploader 
            receipts={receipts}
            onUpload={handleUpload}
            onDelete={handleDelete}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          {/* Info Panel */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
              mb: 3
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <InfoIcon sx={{ mr: 1, color: 'info.main' }} />
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                Receipt Tips
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              Clear and legible receipts help your expense reports get approved faster.
            </Typography>

            <Box component="ul" sx={{ pl: 2, mt: 2 }}>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Ensure the date, amount, and vendor are clearly visible
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                Capture the entire receipt in one image
              </Typography>
              <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                PDF format is preferred for digital receipts
              </Typography>
              <Typography component="li" variant="body2">
                Attach receipts to the corresponding expense entry
              </Typography>
            </Box>
          </Paper>

          {/* Stats Panel */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.01)',
            }}
          >
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
              Receipt Stats
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Receipts
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                {receipts.length}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Storage Used
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {receipts.reduce((acc, curr) => acc + curr.size, 0) > 0 
                  ? (receipts.reduce((acc, curr) => acc + curr.size, 0) / (1024 * 1024)).toFixed(2) + ' MB'
                  : '0 MB'
                }
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Remaining Capacity
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {5 - receipts.length} files
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ReceiptManagement; 