import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Customer, Service, Vehicle } from './pages'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Container } from '@mui/material'

const router = createBrowserRouter([
  {
    path: "jlcars",
    element: <div>Hello world!</div>,
  },
  {
    path: "jlcars/customer",
    element: <Customer />,
  },
  {
    path: "jlcars/service/:serviceId",
    element: <Service />,
  },
  {
    path: "jlcars/vehicle/:vin",
    element: <Vehicle />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Container>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>,
)
