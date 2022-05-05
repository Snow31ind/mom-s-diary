import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import GrowthBox from '../GrowthBox/GrowthBox';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../thunks/user';
import { useNavigate } from 'react-router-dom';
import { selectInfo, selectIsAdmin } from '../../features/user/selector';
import { DarkMode, Dashboard, Logout } from '@mui/icons-material';
import StyledBadge from '../Styled/StyledBadge';
import { orange } from '@mui/material/colors';

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
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Link href="/">
            <Typography color="white" fontSize={20} fontFamily="Helvetica">
              {"Mom's diary"}
            </Typography>
          </Link>
          <GrowthBox />
          {!info ? (
            <Button variant="text" onClick={signInHandler} color="inherit">
              LOGIN
            </Button>
          ) : isAdmin ? (
            <>
              <IconButton onClick={openMenuHandler}>
                <StyledBadge
                  variant="dot"
                  overlap="circular"
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                  }}
                >
                  <Avatar sx={{ bgcolor: orange[400], width: 40, height: 40 }}>
                    A
                  </Avatar>
                </StyledBadge>
              </IconButton>

              <Menu
                open={isMenuOpened}
                anchorEl={anchorEl}
                onClose={closeMenuHandler}
              >
                <MenuItem onClick={() => navigate('/admin')}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <Typography>Dashboard</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={signOutHandler}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <Typography>Đăng xuất</Typography>
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

      {/* Login modal */}
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
    </React.Fragment>
  );
};

export default Navbar;
