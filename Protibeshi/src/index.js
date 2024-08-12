import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthProvider from './Providers/AuthProviders';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Additem from './Pages/Add Item/Additem';
import PrivateRoute from './Routes/PrivateRoute';
import ItemDetails from './Pages/Item Details/ItemDetails';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyBorrowings from './Pages/Dashboard/MyBorrowings/MyBorrowings';
import MyStuff from './Pages/Dashboard/MyStuff/MyStuff';
import MyLendings from './Pages/Dashboard/MyLendings/MyLendings';
import Profile from './Pages/Profile/Profile';
import AllUsers from './Pages/Dashboard/Admin/AllUsers';
import PendingPosts from './Pages/Dashboard/Admin/PendingPosts';
import GiftCards from './Pages/Dashboard/Admin/GiftCards';
import Shop from './Pages/Shop/Shop';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/additem',
        element: <PrivateRoute><Additem></Additem></PrivateRoute>
      },
      
      {
        path: '/details/:id',
        element: <PrivateRoute><ItemDetails></ItemDetails></PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/item/${params.id}`)
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
      {
        path: '/shop',
        element: <PrivateRoute><Shop></Shop></PrivateRoute>,
        
      },
    ]
  },
  {
    path: '/signup',
    element: <Signup></Signup>
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard',
        element: <MyStuff></MyStuff>
      },
      {
        path: '/dashboard/user/mystuff',
        element: <MyStuff></MyStuff>
      },
      {
        path: '/dashboard/user/myborrowings',
        element: <MyBorrowings></MyBorrowings>
      },
      {
        path: '/dashboard/user/mylendings',
        element: <MyLendings></MyLendings>
      },
      {
        path: '/dashboard/admin/allusers',
        element: <AllUsers></AllUsers>
      },
      {
        path: '/dashboard/admin/pendingposts',
        element: <PendingPosts></PendingPosts>
      },
      {
        path: '/dashboard/admin/giftcards',
        element: <GiftCards></GiftCards>
      },
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
