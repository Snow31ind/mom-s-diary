import { Box, Container } from '@mui/material';
import React from 'react';
import DrawerHeader from '../DrawerHeader/DrawerHeader';
import Navbar from '../Navbar/Navbar';

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <DrawerHeader />

      <Container maxWidth="xl">{children}</Container>
    </Box>
  );
};

export default Layout;
