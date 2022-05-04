import { createTheme, responsiveFontSizes, Typography } from '@mui/material';
import { blue, orange, pink } from '@mui/material/colors';

const muiTheme = createTheme();

const theme = createTheme(muiTheme, {
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: muiTheme.palette.text.disabled,
          '&:hover': {
            backgroundColor: pink[100],
          },
          '&.Mui-selected': {
            color: muiTheme.palette.text.primary,
            backgroundColor: blue[100],
          },
        },
      },
    },
  },
});

export default theme;
