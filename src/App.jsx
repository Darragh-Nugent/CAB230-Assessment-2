import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from 'react';

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './assets/theme';

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(token);
  }, []);

  return (

    <div className="App">
      <Header authenticated={isAuthenticated} />
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
