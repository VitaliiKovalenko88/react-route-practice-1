import ErrorPage from 'error-page';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
} from "react-router-dom";

import Root, { loader as rootLoader, action as rootAction,} from 'routes/root';
import Contact, {loader as contactLoader} from 'routes/contact';
import './index.css';
import EditContact, {action as editAction} from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader, 
    action: rootAction,
    children:
    [
      {
        path: "contacts/:contactId",
          element: <Contact />,
          loader: contactLoader, 
      },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action:editAction,
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

