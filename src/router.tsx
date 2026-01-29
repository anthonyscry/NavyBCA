import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import BCACalculator from './pages/BCACalculator'
import PDFGenerator from './pages/PDFGenerator'
import WorkoutGenerator from './pages/WorkoutGenerator'
import ExerciseLibrary from './pages/ExerciseLibrary'
import Placeholder from './pages/Placeholder'
import ComponentDemo from './pages/ComponentDemo'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <BCACalculator /> },

      /* ── Tool Routes ── */
      { path: 'pdf', element: <PDFGenerator /> },
      { path: 'workout', element: <WorkoutGenerator /> },
      { path: 'exercises', element: <ExerciseLibrary /> },
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
