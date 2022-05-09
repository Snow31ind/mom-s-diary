import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

const LoadingPostDetail = () => {
  return (
    <Stack
      display="flex"
      flexDirection="column"
      // justifyContent="flex-start"
      // alignItems="flex-start"
    >
      <Typography variant="h6">
        <Skeleton animation="wave" variant="text" sx={{ width: 300 }} />
      </Typography>
      <Skeleton animation="wave" variant="rectangular" sx={{ height: 400 }} />
      <Typography variant="h3">
        <Skeleton animation="wave" variant="text" sx={{ flex: 1 }} />
      </Typography>
      <Typography variant="body1">
        <Skeleton animation="wave" variant="text" sx={{ flex: 1 }} />
      </Typography>
      <Typography variant="h6">
        <Skeleton animation="wave" variant="text" sx={{ flex: 1 }} />
      </Typography>
    </Stack>
  );
};

export default LoadingPostDetail;
