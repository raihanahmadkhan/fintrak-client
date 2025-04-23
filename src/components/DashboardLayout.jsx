import React from 'react';
import { Box, Typography, Grid, Divider, Breadcrumbs, useTheme, alpha, Paper, Container, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext';

/**
 * A reusable layout component for dashboard pages
 */
const DashboardLayout = ({ 
  title, 
  subtitle = null, 
  breadcrumbs = [], 
  actionButtons = null,
  children,
  fullWidth = false
}) => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container 
      maxWidth={fullWidth ? false : "xl"} 
      sx={{ 
        py: { xs: 2, sm: 3 },
        px: { xs: 1.5, sm: 3 }
      }}
    >
      {/* Header section */}
      <Box sx={{ mb: { xs: 2, sm: 3 } }}>
        {breadcrumbs.length > 0 && (
          <Breadcrumbs 
            separator="›" 
            aria-label="breadcrumb"
            sx={{ 
              mb: 2, 
              color: 'text.secondary', 
              '& a': { textDecoration: 'none' },
              display: { xs: 'none', sm: 'flex' } // Hide on mobile to save space
            }}
          >
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return isLast ? (
                <Typography key={index} color="text.primary" fontWeight={500}>
                  {crumb.label}
                </Typography>
              ) : (
                <RouterLink 
                  key={index} 
                  to={crumb.path} 
                  style={{ 
                    color: mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                    fontWeight: 500
                  }}
                >
                  {crumb.label}
                </RouterLink>
              );
            })}
          </Breadcrumbs>
        )}

        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            flexWrap: 'wrap',
            gap: { xs: 1, sm: 0 }
          }}
        >
          <Box>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              component="h1" 
              fontWeight={600} 
              color="text.primary"
            >
              {title}
            </Typography>
            {subtitle && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ mt: 0.5 }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
          
          {actionButtons && (
            <Box sx={{ 
              mt: { xs: 1, sm: 0 }, 
              display: 'flex', 
              gap: 1,
              width: { xs: '100%', sm: 'auto' }
            }}>
              {actionButtons}
            </Box>
          )}
        </Box>
      </Box>
      
      <Divider sx={{ mb: { xs: 2, sm: 3 } }} />
      
      {/* Main content */}
      <Box>
        {children}
      </Box>
    </Container>
  );
};

export default DashboardLayout; 