import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#40231b',
      contrastText: '#fff',
    },
    secondary: {
      main: '#768938',
      contrastText: '#FFF',
    },
    custom: {
      backgroundLight: '#f7f5f3',
      card: '#ffffff',
      border: '#e0e0e0',
    }
  },
});

export default theme;