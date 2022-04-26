import { createAsyncThunk } from '@reduxjs/toolkit';
// import { setUser } from '../features/user/userSlice';
import * as api from '../firebase/services';

export const signIn = createAsyncThunk(
  'user/signin',
  async (params, thunkAPI) => {
    const { user } = params;
    // const { dispatch } = thunkAPI;

    console.log(user);
    try {
      const info = await api.signIn(user);
      // dispatch(setUser(info));

      console.log(info);
      return info;
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signup',
  async (params, thunkAPI) => {
    const { user } = params;
    console.log(user);

    try {
      const newUser = await api.signUp(user);

      return newUser;
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'user/signout',
  async (params, thunkAPI) => {
    try {
      await api.signOut();
    } catch (error) {
      console.log(error);
    }
  }
);
