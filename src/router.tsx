import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]

const createRouter = import.meta.env.VITE_BUILD_MODE === 'offline'
  ? createHashRouter
  : createBrowserRouter

export const router = createRouter(routes)
