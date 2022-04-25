import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from './thunks/sections';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import { setUser } from './features/user/userSlice';
const App = () => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setUser());
  }, [dispatch]);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const { uid, email, photoURL, displayName, phoneNumber } = user;
  //       console.log('onAuthStateChanged, user', uid, ' found!');

  //       const info = {
  //         uid,
  //         email,
  //         photoURL,
  //         phoneNumber,
  //       };

  //       console.log(info);

  //       dispatch(setUser(info));
  //     } else {
  //     }
  //   });

  //   return unsub;
  // }, [dispatch, isActive, onAuthStateChanged]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
