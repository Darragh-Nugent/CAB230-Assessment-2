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
      backgroundDark: '#fafafa',
      card: '#ffffff',
      border: '#e0e0e0',
    },
    text: {
      primary: "#000",
      secondary: "#727272",
    }
  },
});

export default theme;