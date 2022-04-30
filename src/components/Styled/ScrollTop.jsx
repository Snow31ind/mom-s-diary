import { Box, useScrollTrigger, Zoom } from '@mui/material';
import React from 'react';

const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <Zoom in={true}>
      <Box
        role="presentation"
        sx={{ position: 'absolute', right: 16, bottom: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

export default ScrollTop;
