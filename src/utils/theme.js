import { createTheme, responsiveFontSizes, Typography } from '@mui/material';
import { orange, pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#123456',
    },
    secondary: {
      main: pink[400],
    },
    contrastThreshold: 3,
    status: {
      danger: orange[500],
    },
  },
});

export default theme;
