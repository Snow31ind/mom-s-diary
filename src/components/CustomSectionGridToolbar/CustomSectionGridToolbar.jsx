import { Add, GifTwoTone } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from '@mui/x-data-grid';
import React from 'react';

const CustomSectionGridToolbar = (createSectionHandler) => () => {
  const clickHandler = () => {
    console.log('Clicked');
    createSectionHandler();
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton variant="outlined" color="secondary" />
      <GridToolbarFilterButton
        size="small"
        variant="outlined"
        sx={{
          ml: 1,
          color: 'secondary.main',
          border: '1px solid rgba(156, 39, 176, 0.5)',
        }}
      />
      <GridToolbarDensitySelector
        variant="outlined"
        color="secondary"
        sx={{ ml: 1 }}
      />
      <GridToolbarExport variant="outlined" color="secondary" sx={{ ml: 1 }} />
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={clickHandler}
        startIcon={<Add />}
        sx={{ ml: 1 }}
      >
        Danh mục mới
      </Button>
    </GridToolbarContainer>
  );
};

export default CustomSectionGridToolbar;
