import { Box, Container } from '@mui/material';
import React from 'react';
import DrawerHeader from '../DrawerHeader/DrawerHeader';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children, fullWidth }) => {
  return (
    <Box sx={{ bgcolor: 'grey.200', width: '100%' }}>
      <Navbar />
      <DrawerHeader />

      {fullWidth ? (
        <Box sx={{ bgcolor: 'grey.100', minHeight: '100vh' }}>{children}</Box>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'grey.100',
            minHeight: '100vh',
          }}
        >
          {children}
        </Container>
      )}
    </Box>
  );
};

export default Layout;
