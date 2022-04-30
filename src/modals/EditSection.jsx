import { Modal } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import SectionForm from '../components/SectionForm/SectionForm';

const EditSection = ({ open, closeHandler }) => {
  return (
    <Modal open={open} onClose={closeHandler}>
      <Box
        sx={{
          position: 'abosulute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <SectionForm mode="update" closeHandler={closeHandler} />s
      </Box>
    </Modal>
  );
};

export default EditSection;
