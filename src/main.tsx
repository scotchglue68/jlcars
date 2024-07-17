import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Customer, Vehicle, MenuAppBar } from './pages'

import { createHashRouter, RouterProvider } from 'react-router-dom';

import { Container } from '@mui/material'
import { ThemeProvider } from "@mui/material";
import { appTheme } from "./themes/theme";

const router = createHashRouter([
  {
    path: "/",
    element: <MenuAppBar/>,
    children: [
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "vehicle/:vin",
        element: <Vehicle />,
      },
    ]
  },
]);





ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={appTheme}>
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
  </ThemeProvider>
)
