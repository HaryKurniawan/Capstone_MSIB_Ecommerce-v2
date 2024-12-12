import { createBrowserRouter, redirect } from 'react-router-dom'

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import ProductList from "../components/ProductList";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'dashboard',
        element: <Home />,
        loader: () => {
          if (!localStorage.access_token) {
            return redirect('/')
          }
          return null
        }
      },
    ]
  }
])

export default router