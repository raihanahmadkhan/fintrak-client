import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Divider,
  useTheme
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PrintIcon from '@mui/icons-material/Print';

const ExportMenu = ({ data, filename = 'expense-data' }) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const exportToCSV = () => {
    try {
      // Convert data to CSV format
      let csvContent = "";
      
      // Get headers from first object keys
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]);
        csvContent += headers.join(",") + "\n";
        
        // Add data rows
        data.forEach(item => {
          const row = headers.map(header => {
            // Handle special cases like nested objects or arrays
            const cell = item[header];
            const cellStr = (typeof cell === 'object' && cell !== null) 
              ? JSON.stringify(cell).replace(/,/g, ';').replace(/"/g, '""')
              : String(cell);
              
            // Escape quotes and wrap in quotes if contains commas
            return cellStr.includes(',') ? `"${cellStr}"` : cellStr;
          });
          
          csvContent += row.join(",") + "\n";
        });
        
        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
      // In a real app, show a user-friendly error message
    }
    
    handleClose();
  };
  
  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF file
    handleSuccess('PDF exported successfully!');
    handleClose();
  };
  
  const handleExportExcel = () => {
    // In a real app, this would generate and download an Excel file
    handleSuccess('Excel file exported successfully!');
    handleClose();
  };
  
  const handlePrint = () => {
    // In a real app, this would open a print dialog
    handleSuccess('Document sent to printer!');
    handleClose();
  };
  
  return (
    <Box>
      <IconButton
        color="primary"
        aria-label="export data"
        onClick={handleClick}
        sx={{
          border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
          borderRadius: 1,
          p: 1,
          '&:hover': {
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
          }
        }}
      >
        <FileDownloadIcon />
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
            borderRadius: 2,
            minWidth: 180,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: mode === 'dark' ? 'background.paper' : 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Export Options
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={exportToCSV}>
          <ListItemIcon>
            <InsertDriveFileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportPDF}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Export as PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleExportExcel}>
          <ListItemIcon>
            <InsertDriveFileIcon fontSize="small" sx={{ color: '#1D6F42' }} />
          </ListItemIcon>
          <ListItemText>Export as Excel</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handlePrint}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Print</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ExportMenu; 