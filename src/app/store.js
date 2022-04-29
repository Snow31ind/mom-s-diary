import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import postsReducer from '../features/posts/postsSlice';
import sectionsReducer from '../features/sections/sectionsSlice';
import userReducer from '../features/user/userSlice';

const rootReducer = combineReducers({
  sections: sectionsReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
