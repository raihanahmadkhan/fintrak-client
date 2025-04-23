import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  MenuItem, 
  Alert, 
  IconButton, 
  Stack, 
  Grid, 
  Divider,
  InputAdornment 
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DescriptionIcon from '@mui/icons-material/Description';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../../../components/DashboardLayout';
import DashboardCard from '../../../components/DashboardCard';
import { createExpense, getMyExpenses } from '../../../api';
import { useNavigate } from 'react-router-dom';

const categories = ['Travel', 'Supplies', 'Meals', 'Office Equipment', 'Software', 'Other'];

// Styled component for file input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddExpense = () => {
  const [form, setForm] = useState({ date: dayjs(), category: '', amount: '', desc: '' });
  const [success, setSuccess] = useState(false);
  const [amountError, setAmountError] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getMyExpenses()
      .then(data => {
        console.log('Fetched employee dashboard expenses:', data); // Debug log
        setExpenses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setExpenses([]);
        setError('Could not load expenses.');
        setLoading(false);
      });
  }, []);

  const pendingCount = expenses.filter(e => e.status && e.status.toLowerCase() === 'pending').length;
  const reimbursedTotal = expenses.filter(e => e.status && e.status.toLowerCase() === 'approved').reduce((sum, e) => sum + e.amount, 0);
  const lastReimbursed = (() => {
    const approved = expenses.filter(e => e.status && e.status.toLowerCase() === 'approved').sort((a, b) => new Date(b.date) - new Date(a.date));
    if (!approved.length) return '-';
    const daysAgo = Math.round((Date.now() - new Date(approved[0].date)) / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  })();

  const summaryCards = [
    {
      title: 'Expenses',
      value: `₹${expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}`,
      subtitle: `${expenses.length} expenses submitted`,
      icon: <CurrencyRupeeIcon fontSize="large" />, color: 'primary'
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

  const handleChange = e => {
    if (e.target.name === 'amount') {
      const val = e.target.value;
      if (!/^\d*\.?\d*$/.test(val)) return; // Only allow positive numbers
      setForm({ ...form, amount: val });
      setAmountError(val && Number(val) <= 0 ? 'Amount must be positive' : '');
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleDateChange = value => setForm({ ...form, date: value });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      // Check file type
      const fileType = selectedFile.type;
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      
      if (!validTypes.includes(fileType)) {
        setFileError('Please upload a valid image (JPEG, PNG, GIF) or PDF file');
        setFile(null);
        return;
      }
      
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setFileError('File size should not exceed 5MB');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
      setFileError('');
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return <ImageIcon color="primary" />;
    } else if (file.type === 'application/pdf') {
      return <PictureAsPdfIcon color="error" />;
    } else {
      return <AttachFileIcon color="action" />;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(form.amount) <= 0) {
      setAmountError('Amount must be positive');
      return;
    }

    try {
      await createExpense({
        date: form.date.toISOString(),
        category: form.category,
        amount: Number(form.amount),
        description: form.desc
      });
      setSuccess(true);
      setForm({ date: dayjs(), category: '', amount: '', desc: '' });
      setFile(null);
      setTimeout(() => setSuccess(false), 1000);
      setTimeout(() => navigate('/dashboard/employee/manage-expenses'), 1200);
    } catch (err) {
      setAmountError(err.message || 'Failed to submit expense');
    }
  };

  const isFormValid = form.date && form.category && form.amount > 0;

  return (
    <DashboardLayout 
      title="Add New Expense" 
      subtitle="Fill out the form below to submit a new expense for approval"
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Add Expense', path: '/dashboard/add-expense' }
      ]}
    >
      {success && (
        <Alert 
          severity="success" 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setSuccess(false)}
        >
          Expense has been submitted successfully!
        </Alert>
      )}

      {/* Summary Cards */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {summaryCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Expense form */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          maxWidth: 800,
          mx: 'auto',
          width: '100%'
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
          Expense Details
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={form.date}
                  onChange={handleDateChange}
                  format="DD/MM/YYYY"
                  enableAccessibleFieldDOMStructure={false}
                  slots={{
                    textField: (params) => (
                      <TextField 
                        {...params} 
                        fullWidth 
                        required 
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <DateRangeIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    ),
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField 
                name="category" 
                label="Category" 
                select 
                value={form.category} 
                onChange={handleChange} 
                fullWidth 
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon />
                    </InputAdornment>
                  ),
                }}
              >
                {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
              </TextField>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                name="amount"
                label="Amount"
                value={form.amount}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ 
                  inputMode: 'decimal', 
                  pattern: '^\\d*\\.?\\d*$', 
                  min: 1, 
                  style: { MozAppearance: 'textfield' } 
                }}
                error={!!amountError}
                helperText={amountError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField 
                name="desc" 
                label="Description" 
                value={form.desc} 
                onChange={handleChange} 
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Typography variant="subtitle2" gutterBottom fontWeight={600} sx={{ my: 2 }}>
                Receipt/Invoice
              </Typography>
              
              {!file ? (
                <Button
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  sx={{ 
                    mt: 1, 
                    py: { xs: 1, sm: 1.5 },
                    width: '100%',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    textTransform: 'none',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}
                >
                  Upload Receipt or Invoice
                  <VisuallyHiddenInput 
                    type="file" 
                    accept=".pdf,image/*" 
                    onChange={handleFileChange}
                  />
                </Button>
              ) : (
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: { xs: 1.5, sm: 2 }, 
                    borderStyle: 'dashed',
                    borderRadius: 2
                  }}
                >
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    alignItems="center" 
                  >
                    {getFileIcon()}
                    <Typography variant="body2" sx={{ 
                      flexGrow: 1, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}>
                      {file.name}
                    </Typography>
                    <IconButton size="small" onClick={handleRemoveFile} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Paper>
              )}
              
              {fileError && (
                <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1 }}>
                  {fileError}
                </Typography>
              )}
              
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Supported formats: JPEG, PNG, GIF, PDF. Max size: 5MB
              </Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ 
            mt: 3, 
            display: 'flex', 
            justifyContent: { xs: 'center', sm: 'flex-end' },
            width: '100%'
          }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              size="large"
              disabled={!isFormValid}
              sx={{ 
                px: { xs: 3, sm: 4 }, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                width: { xs: '100%', sm: 'auto' },
                bgcolor: '#26A6B5',
                '&:hover': {
                  bgcolor: '#1e8a96'
                }
              }}
            >
              Submit Expense
            </Button>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  );
};

export default AddExpense;
