import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSections } from './thunks/sections';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import { selectStatus } from './features/sections/selector';
import Home from './pages/Home/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomDialog from './components/CustomDialog/CustomDialog';

const App = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus());

  useEffect(() => {
    console.log('Hello');
    dispatch(fetchSections());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <ToastContainer
          position="bottom-left"
          draggable
          pauseOnHover={true}
          autoClose={3000}
        />
        <CustomDialog />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
