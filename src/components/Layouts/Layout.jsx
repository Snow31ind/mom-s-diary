import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import DrawerHeader from '../DrawerHeader/DrawerHeader';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children, fullWidth }) => {
  return (
    <Box sx={{ bgcolor: 'grey.200' }}>
      <Navbar />
      <DrawerHeader />

      {fullWidth ? (
        <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh', pt: 5 }}>
          {children}
        </Box>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'grey.100',
            minHeight: '100vh',
            pt: 5,
          }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
};

export default Layout;
