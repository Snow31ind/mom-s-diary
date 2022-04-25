import {
  AppBar,
  Box,
  Button,
  Link,
  Modal,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import Login from '../../modals/Login';
import GrowthBox from '../GrowthBox/GrowthBox';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../thunks/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from '../../features/user/userSlice';

const Navbar = () => {
  const { info } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginModal, setLoginModal] = useState(false);

  const signInHandler = () => {
    setLoginModal(true);
  };

  const signOutHandler = () => {
    dispatch(signOut());

    navigate('/');
  };

  const closeLoginModalHandler = () => {
    setLoginModal(false);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <Link href="/">
            <Typography color="white">{"Mom's diary"}</Typography>
          </Link>
          <GrowthBox />
          {!info ? (
            <Button variant="outlined" onClick={signInHandler} color="inherit">
              Admin
            </Button>
          ) : (
            <Button variant="outlined" onClick={signOutHandler} color="inherit">
              SIGN OUT
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Modal open={loginModal} onClose={closeLoginModalHandler}>
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
          }}
        >
          <LoginForm closeLoginModalHandler={closeLoginModalHandler} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
