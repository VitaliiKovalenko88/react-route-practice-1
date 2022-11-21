import ErrorPage from 'error-page';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

import Root, {loader as rootLoader} from 'routes/root';
import Contact from 'routes/contact';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, 
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
      },
    ],
    
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

