import { Box, Skeleton } from '@mui/material';
import React from 'react';

const LoadingPostCard = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" sx={{ height: 300 }} />
    </Box>
  );
};

export default LoadingPostCard;
