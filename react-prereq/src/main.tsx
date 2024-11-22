import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Dashboard from './components/Dashboard.tsx'
import HeroesList from './components/HeroesList.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element: <Navigate replace to='/dashboard' />},
      {path: '/dashboard', element: <Dashboard />},
      {path: '/heroes', element: <HeroesList />},
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
