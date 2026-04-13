import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

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
  return <AppLayout />;
}
  

export default App;
