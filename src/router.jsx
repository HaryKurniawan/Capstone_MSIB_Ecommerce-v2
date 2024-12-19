import { createBrowserRouter, redirect } from 'react-router-dom'
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/shop';

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
        path: 'shop',
        element: <Shop />
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