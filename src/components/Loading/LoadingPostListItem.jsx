import { Box, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';

const LoadingPostListItem = () => {
  return (
    <Stack
      mb={2}
      direction="row"
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        sx={{ height: 200, width: 200 }}
      />
      <Stack flex={1} ml={1} direction="column" display="flex">
        <Typography variant="h5">
          <Skeleton variant="text" animation="wave" />
        </Typography>

        <Typography variant="body1">
          <Skeleton variant="text" animation="wave" />
        </Typography>

        <Typography variant="body2">
          <Skeleton variant="text" animation="wave" />
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LoadingPostListItem;
