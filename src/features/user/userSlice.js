import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, signUp } from '../../thunks/user';

const initialState = {
  isAdmin: localStorage.getItem('info')
    ? JSON.parse(localStorage.getItem('info')).uid ===
      import.meta.env.VITE_ADMIN_UID
    : false,
  isActive: false,
  loading: false,
  error: '',
  info: localStorage.getItem('info')
    ? JSON.parse(localStorage.getItem('info'))
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state) => {
      if (localStorage.getItem('info')) {
        state = {
          ...state,
          isActive: true,
          info: JSON.parse(localStorage.getItem('info')),
        };
      }
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      const info = action.payload;
      console.log('userSlice - info:', info);

      localStorage.setItem('info', JSON.stringify(info));

      state.isAdmin = import.meta.env.VITE_ADMIN_UID === info.uid;
      state.isActive = true;
      state.loading = false;
      state.error = '';
      state.info = info;
    },
    [signIn.rejected]: (state, action) => {
      state.isActive = false;
      state.loading = false;
      state.error = action.payload;
    },

    [signUp.pending]: (state) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      const info = action.payload;

      localStorage.setItem('info', JSON.stringify(info));

      state.isActive = true;
      state.info = info;
      state.loading = false;
      state.error = '';
    },
    [signUp.rejected]: (state, action) => {
      state.isActive = false;
      state.loading = false;
      state.error = action.payload;
    },

    [signOut.pending]: (state) => {
      state.loading = true;
    },
    [signOut.fulfilled]: (state) => {
      const info = null;
      localStorage.removeItem('info');

      state.isAdmin = false;
      state.loading = false;
      state.isActive = false;
      state.info = info;
    },
    [signOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isActive = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
