import { SettingsCellSharp } from '@mui/icons-material';
import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { signIn, signUp } from '../../thunks/user';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ closeLoginModalHandler }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(true);

  const submitHandler = ({ email, password, confirmPassword }) => {
    const user = { email, password };

    if (isSignIn) {
      // console.log(user);
      dispatch(signIn({ user }));

      closeLoginModalHandler();

      navigate('/');
    } else {
      if (password === confirmPassword) {
        dispatch(signUp({ user }));
        setIsSignIn(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <List>
        <ListItem>
          <Typography textAlign="center">
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Typography>
        </ListItem>

        {/* Email */}
        <ListItem>
          <Controller
            name="email"
            control={control}
            defaultValue={''}
            rules={{
              minLength: 1,
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                fullWidth
                label="Email"
                error={Boolean(errors.email)}
                inputProps={{ type: 'email' }}
                helperText={
                  errors.email
                    ? errors.email.type === 'minLength'
                      ? 'Invalid email'
                      : 'Email is required'
                    : ''
                }
                {...field}
              />
            )}
          />
        </ListItem>

        {/* Password */}
        <ListItem>
          <Controller
            name="password"
            control={control}
            defaultValue={''}
            rules={{
              minLength: 1,
            }}
            render={({ field }) => (
              <TextField
                autoFocus
                fullWidth
                label="Password"
                error={Boolean(errors.password)}
                inputProps={{ type: 'password' }}
                helperText={
                  errors.password
                    ? errors.password.type === 'minLength'
                      ? 'Invalid password'
                      : 'Password is required'
                    : ''
                }
                {...field}
              />
            )}
          />
        </ListItem>

        {/* Confirm password */}
        {!isSignIn && (
          <ListItem>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue={''}
              rules={{
                minLength: 1,
              }}
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  label="Confirm password"
                  error={Boolean(errors.confirmPassword)}
                  inputProps={{ type: 'password' }}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type === 'minLength'
                        ? 'Invalid confirm password'
                        : 'Confirm password is required'
                      : ''
                  }
                  {...field}
                />
              )}
            />
          </ListItem>
        )}

        {/* Button */}
        <ListItem>
          <Button type="submit" variant="contained">
            {isSignIn ? 'SIGN IN' : 'SING UP'}
          </Button>
        </ListItem>

        {/* Switch mode */}
        <ListItem>
          {isSignIn ? (
            <Link onClick={() => setIsSignIn(false)}>
              <Typography>{"Don't have an account? Sign up"}</Typography>
            </Link>
          ) : (
            <Link onClick={() => setIsSignIn(true)}>
              <Typography>{'Already have an account? Sign in'}</Typography>
            </Link>
          )}
        </ListItem>
      </List>
    </form>
  );
};

export default LoginForm;
