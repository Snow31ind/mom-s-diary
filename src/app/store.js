import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import sectionsReducer from '../features/sections/sectionsSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    sections: sectionsReducer,
    user: userReducer,
  },
});

export default store;
