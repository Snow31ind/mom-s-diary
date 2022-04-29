import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
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
import { selectInfo, selectIsAdmin } from '../../features/user/selector';
import { Dashboard, Logout } from '@mui/icons-material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const info = useSelector(selectInfo());
  const isAdmin = useSelector(selectIsAdmin());

  const [loginModal, setLoginModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpened = Boolean(anchorEl);

  const openMenuHandler = (e) => setAnchorEl(e.currentTarget);
  const closeMenuHandler = () => setAnchorEl(null);

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
              LOGIN
            </Button>
          ) : isAdmin ? (
            <>
              <IconButton onClick={openMenuHandler}>
                <Avatar>A</Avatar>
              </IconButton>

              <Menu
                open={isMenuOpened}
                anchorEl={anchorEl}
                onClose={closeMenuHandler}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin
              >
                <MenuItem onClick={() => navigate('/admin')}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <Typography>Dashboard</Typography>
                </MenuItem>

                <MenuItem onClick={signOutHandler}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <Typography>Logout</Typography>
                </MenuItem>
              </Menu>
            </>
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
          }}
        >
          <LoginForm closeLoginModalHandler={closeLoginModalHandler} />
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
