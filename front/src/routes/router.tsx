import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'
import { Home } from '../pages/Home'
import ListTransactions from '../pages/ListTransactions'
import { Login } from '../pages/Login'
import { ProtectedRoute } from './ProtectedRouter'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Home/></ProtectedRoute>

  },
  {
    path: '/home',
    element: <ProtectedRoute><Home/></ProtectedRoute>
  },
  {
    path: '/transactions',
    element: <ProtectedRoute><ListTransactions/></ProtectedRoute>
  },
  {
    path: '/login',
    element: <ProtectedRoute><Login/></ProtectedRoute>
  }
])

export const Router = (): React.ReactElement => <RouterProvider router={router} />
