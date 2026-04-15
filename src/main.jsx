import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLoaderData } from 'react-router';

import { getProperty } from './models/RentalModel.jsx';

import './index.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Rentals from './pages/Rentals.jsx';
import About from './pages/About.jsx';
import Property from './pages/Property.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      { path: "menu", Component: Menu },
      { path: "rentals", Component: Rentals },
      {
        path: "rentals/:id",
        loader: async ({ params }) => {
          let property = await getProperty(params.id);
          return property;
        },
        Component: Property,
      },
      { path: "about", Component: About },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
