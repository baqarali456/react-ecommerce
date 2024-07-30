import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Wishlist from './components/Wishlist.jsx'
import Cart from './components/Cart.jsx'
import Products from './components/Products.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Dashboard from './components/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Products/>
      },
      {
        path:"cart",
        element:<Cart/>
      },
      {
        path:"wishlist",
        element:<Wishlist/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Signup/>
      },
      {
        path:"dashboard",
        element:<Dashboard/>
      }
    ]
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)

