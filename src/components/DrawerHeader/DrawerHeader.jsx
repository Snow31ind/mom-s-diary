import { styled } from '@mui/material';
import React from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

export default DrawerHeader;
