import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Book from './pages/Book.jsx';
import About from './pages/About.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "book", Component: Book },
      { path: "about", Component: About },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
