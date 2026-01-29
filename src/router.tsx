import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import BCACalculator from './pages/BCACalculator'
import Placeholder from './pages/Placeholder'
import ComponentDemo from './pages/ComponentDemo'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <BCACalculator /> },

      /* ── Tool Routes (placeholder until implemented) ── */
      { path: 'pdf', element: <Placeholder /> },
      { path: 'workout', element: <Placeholder /> },
      { path: 'exercises', element: <Placeholder /> },
      { path: 'watchbill', element: <Placeholder /> },
      { path: 'prt-prep', element: <Placeholder /> },

      /* ── Dev / Demo ── */
      { path: 'demo', element: <ComponentDemo /> },

      /* ── Static Pages (placeholder until implemented) ── */
      { path: 'about', element: <Placeholder /> },
      { path: 'privacy', element: <Placeholder /> },
      { path: 'terms', element: <Placeholder /> },
      { path: 'references', element: <Placeholder /> },
    ],
  },
]

const createRouter = import.meta.env.VITE_BUILD_MODE === 'offline'
  ? createHashRouter
  : createBrowserRouter

export const router = createRouter(routes)
