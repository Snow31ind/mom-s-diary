import { Box, Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import LoadingPostCard from './LoadingPostCard';

const LoadingSection = () => {
  return (
    <Box>
      <Typography component="div" variant="h4">
        <Skeleton animation="wave" variant="text" width={300} />
      </Typography>

      <Typography component="div" variant="body2">
        <Skeleton animation="wave" variant="text" width={300} />
      </Typography>
      <Skeleton animation="wave" variant="text" height={10} />

      <Grid container spacing={2}>
        {Array(1, 2, 3, 4).map((e) => (
          <Grid item key={e} xl={3}>
            <LoadingPostCard key={e} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoadingSection;
