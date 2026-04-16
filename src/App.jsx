import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import { ThemeProvider, CssBaseline, Snackbar, IconButton } from '@mui/material';
import theme from './assets/theme';

function AppLayout() {
  const { loginSnackBarOpen, logoutSnackBarOpen, setLoginSnackbarOpen, setLogoutSnackbarOpen } = useAuth();

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
      <Header />
      <Outlet />
      <Footer />

    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <AppLayout />
      </AuthProvider>

    </ThemeProvider>

  );
}

export default App;
