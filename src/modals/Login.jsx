import { Box, Typography } from '@mui/material';
import React from 'react';
import LoginForm from '../components/LoginForm/LoginForm';

const Login = () => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default Login;
