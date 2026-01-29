import { createBrowserRouter, createHashRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import BCACalculator from './pages/BCACalculator'
import PDFGenerator from './pages/PDFGenerator'
import WorkoutGenerator from './pages/WorkoutGenerator'
import ExerciseLibrary from './pages/ExerciseLibrary'
import WatchbillGenerator from './pages/WatchbillGenerator'
import PRTPrep from './pages/PRTPrep'
import About from './pages/About'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import References from './pages/References'
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
      { path: 'watchbill', element: <WatchbillGenerator /> },
      { path: 'prt-prep', element: <PRTPrep /> },

      /* ── Dev / Demo ── */
      { path: 'demo', element: <ComponentDemo /> },

      /* ── Static Pages ── */
      { path: 'about', element: <About /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'references', element: <References /> },
    ],
  },
]

const createRouter = import.meta.env.VITE_BUILD_MODE === 'offline'
  ? createHashRouter
  : createBrowserRouter

export const router = createRouter(routes)
