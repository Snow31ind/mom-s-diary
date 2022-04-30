import { Box, Modal, Typography } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import SectionForm from '../components/SectionForm/SectionForm';

const CreateSection = ({ open, closeHandler }) => {
  return (
    <Modal open={open} onClose={closeHandler}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <SectionForm closeHandler={closeHandler} mode="create" />
      </Box>
    </Modal>
  );
};

export default CreateSection;
