import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ThemeProvider, CssBaseline, Snackbar, IconButton } from '@mui/material';
import theme from './assets/theme';

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginSnackBarOpen, setLoginSnackbarOpen] = useState(false);
  const [logoutSnackBarOpen, setLogoutSnackbarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setLoginSnackbarOpen(true);
    } else {
      setIsAuthenticated(false);
      setLogoutSnackbarOpen(true);
    }

  }, [isAuthenticated]);

  return (

    <div className="App">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={loginSnackBarOpen}
        autoHideDuration={1500}
        onClose={() => setLoginSnackbarOpen(false)}
        message="Login successful!"
        sx={{ backgroundColor: 'success.main', color: 'white' }}

      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={logoutSnackBarOpen}
        autoHideDuration={1500}
        onClose={() => setLogoutSnackbarOpen(false)}
        message="Logout successful!"
        sx={{ backgroundColor: 'success.main', color: 'white' }}

      />

      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      <Outlet />

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout />
    </ThemeProvider>
  );
}

export default App;
