import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../firebase/services';

export const fetchPostsByType = createAsyncThunk(
  'handbook/posts',
  async (params, thunkAPI) => {
    // console.log(`params: ${params}`);
    // console.log(`thunkAPI: ${thunkAPI}`);

    const { type } = params;

    // console.log(`type: ${type}`);

    const {
      dispatch,
      extra,
      fulfillWithValue,
      getState,
      rejectWithValue,
      requestId,
      signal,
    } = thunkAPI;

    const posts = await api.fetchPostsByType(type);
    return posts;
  }
);
