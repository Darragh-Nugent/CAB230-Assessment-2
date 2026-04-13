import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import './App.css';

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Book from "./pages/Book";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "book", Component: Book },
      { path: "about", Component: About },
    ],
  },
]);

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
  return <RouterProvider router={router} />;
}
  

export default App;
