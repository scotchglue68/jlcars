import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Customer, Service, Vehicle } from './pages'
import {
  createHashRouter,
  RouterProvider
} from 'react-router-dom';

import { Container } from '@mui/material'

const router = createHashRouter([
  {
    path: "jlcars",
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
