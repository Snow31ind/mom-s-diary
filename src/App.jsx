import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from './thunks/sections';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import { selectStatus } from './features/sections/selector';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus());

  useEffect(() => {
    if (status === 'idle') {
      console.log('Fetching sections at app');
      dispatch(fetchSections());
    }
  }, [dispatch, status]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
