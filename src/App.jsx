import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect, createContext } from 'react';

import './App.css';

// components
import AlertBox from './components/AlertBox.jsx';
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import { ThemeProvider, CssBaseline, Snackbar, IconButton } from '@mui/material';
import theme from './assets/theme';

function AppLayout() {
  const { message, setMessage } = useAuth();

  return (

    <div className="App">
      <AlertBox message={message} setMessage={setMessage} severity={"success"} />
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
