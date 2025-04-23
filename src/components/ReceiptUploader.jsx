import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  IconButton, 
  Grid,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  useTheme,
  styled
} from '@mui/material';
import { useThemeContext } from '../ThemeContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ReceiptIcon from '@mui/icons-material/Receipt';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

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

const ReceiptUploader = ({ 
  receipts = [], 
  onUpload, 
  onDelete,
  maxFiles = 5,
  acceptedFormats = '.jpg,.jpeg,.png,.pdf'
}) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const [previewImage, setPreviewImage] = useState(null);
  const [openPreview, setOpenPreview] = useState(false);
  
  // Convert file size to readable format
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Handle file upload
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;
    
    // Check if max files would be exceeded
    if (receipts.length + files.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    // Process files
    const newReceipts = files.map(file => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      // In a real app, this would be handled differently with a server upload
      url: URL.createObjectURL(file),
      file // Store the actual file object
    }));
    
    if (onUpload) {
      onUpload(newReceipts);
    }
    
    // Reset input
    e.target.value = '';
  };
  
  // Handle delete receipt
  const handleDelete = (id) => {
    if (onDelete) {
      onDelete(id);
    }
  };
  
  // Handle preview receipt
  const handlePreview = (receipt) => {
    setPreviewImage(receipt);
    setOpenPreview(true);
  };
  
  // Close preview dialog
  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  
  // Get icon based on file type
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) {
      return <ImageIcon fontSize="large" sx={{ color: '#4CAF50' }} />;
    } else if (type === 'application/pdf') {
      return <PictureAsPdfIcon fontSize="large" sx={{ color: '#F44336' }} />;
    } else {
      return <DescriptionIcon fontSize="large" sx={{ color: '#2196F3' }} />;
    }
  };
  
  return (
    <Box>
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
          <ReceiptIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            Receipt Management
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Box 
          sx={{ 
            border: `2px dashed ${mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            mb: 3,
            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
          }}
        >
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography variant="h6" sx={{ mb: 1 }}>
            Drag & Drop Receipts Here
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Or click to browse files
          </Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            sx={{ fontWeight: 600 }}
          >
            Upload Receipts
            <VisuallyHiddenInput 
              type="file" 
              onChange={handleFileChange}
              multiple
              accept={acceptedFormats}
            />
          </Button>
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Accepted formats: JPG, PNG, PDF | Max size: 5MB each | Max files: {maxFiles}
          </Typography>
        </Box>
        
        {receipts.length > 0 && (
          <>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Uploaded Receipts ({receipts.length}/{maxFiles})
            </Typography>
            
            <Grid container spacing={2}>
              {receipts.map((receipt) => (
                <Grid item xs={12} sm={6} md={4} key={receipt.id}>
                  <Paper
                    elevation={0}
                    sx={{ 
                      p: 2,
                      borderRadius: 1,
                      border: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      p: 2,
                      bgcolor: mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.04)',
                      borderRadius: 1,
                      mb: 2,
                      position: 'relative'
                    }}>
                      {getFileIcon(receipt.type)}
                      
                      <IconButton 
                        size="small"
                        onClick={() => handlePreview(receipt)}
                        sx={{ 
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'background.paper',
                          '&:hover': {
                            bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
                          },
                          boxShadow: 1
                        }}
                      >
                        <ZoomInIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Typography 
                      variant="subtitle2" 
                      noWrap 
                      title={receipt.name}
                      sx={{ mb: 0.5 }}
                    >
                      {receipt.name}
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(receipt.size)}
                    </Typography>
                    
                    <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(receipt.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Paper>
      
      {/* Preview Dialog */}
      <Dialog
        open={openPreview}
        onClose={handleClosePreview}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {previewImage?.name}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {previewImage && (
            previewImage.type.startsWith('image/') ? (
              <Box 
                component="img" 
                src={previewImage.url} 
                alt={previewImage.name}
                sx={{ 
                  width: '100%', 
                  height: 'auto', 
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  borderRadius: 1
                }} 
              />
            ) : previewImage.type === 'application/pdf' ? (
              <Box 
                component="iframe" 
                src={previewImage.url} 
                sx={{ 
                  width: '100%', 
                  height: '70vh',
                  border: 'none',
                  borderRadius: 1
                }} 
              />
            ) : (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <DescriptionIcon sx={{ fontSize: 72, color: 'primary.main', mb: 2 }} />
                <Typography>
                  Preview not available for this file type.
                </Typography>
                <Button
                  variant="contained"
                  href={previewImage.url}
                  target="_blank"
                  sx={{ mt: 2 }}
                >
                  Download to View
                </Button>
              </Box>
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Close</Button>
          {previewImage && (
            <Button
              variant="contained"
              href={previewImage.url}
              download={previewImage.name}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReceiptUploader; 