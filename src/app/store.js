import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import postsReducer from '../features/posts/postsSlice';
import sectionsReducer from '../features/sections/sectionsSlice';
import userReducer from '../features/user/userSlice';
import dialogReducer from '../features/dialog/dialogSlice';

const rootReducer = combineReducers({
  sections: sectionsReducer,
  user: userReducer,
  dialog: dialogReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
