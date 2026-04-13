import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './assets/theme';

function AppLayout() {
  return (
    
    <div className="App">
      <Header />
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
