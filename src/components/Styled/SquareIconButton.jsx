import { IconButton, styled } from '@mui/material';
import React from 'react';

const SquareIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: 90,
  backgroundColor: theme.palette.grey[300],
}));

export default SquareIconButton;
