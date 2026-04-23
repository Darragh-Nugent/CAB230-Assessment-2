import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { getProperty } from './api/rentalApi.js';

import './index.css';

import App from './App.jsx';
import Home from './pages/home/Home.jsx';
import Rentals from './pages/rental-search/Rentals.jsx';
import About from './pages/about/About.jsx';
import Property from './pages/property/Property.jsx';
import Auth from './pages/auth/Auth.jsx';
import Ratings from './pages/ratings/Ratings.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "rentals", Component: Rentals },
      {
        path: "rentals/:id",
        loader: async ({ params }) => {
          let property = await getProperty(params.id);
          let id = params.id;
          return {property, id};
        },
        Component: Property,
      },
      { path: "login", Component: Auth },
      { path: "register", Component: Auth },
      { path: "ratings", Component: Ratings},
      { path: "about", Component: About },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
