import React from 'react'
import ReactDOM from 'react-dom/client'

import './main.css'

import Home from './Pages/Home/Index.jsx';
import SignIn from './Pages/SignIn/Index.jsx';
import SignUp from './Pages/SignUp/Index.jsx';
import Dashboard from './Pages/Dashboard/Index.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ForgotPass from './Pages/ForgotPass/Index.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/signin',
    element: <SignIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/forgot-pass',
    element: <ForgotPass />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
