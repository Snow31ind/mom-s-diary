import { createSlice } from '@reduxjs/toolkit';
import { fetchPostsByType } from '../../thunks/posts';

const initialState = {
  posts: [],
  loading: false,
  error: '',
  status: 'idle',
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetch: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: {
    [fetchPostsByType.pending]: (state) => {
      state.loading = true;
    },
    [fetchPostsByType.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
      state.status = 'success';
    },
    [fetchPostsByType.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      error = action.payload;
    },
  },
});

export const { fetch } = postsSlice.actions;

export default postsSlice.reducer;
