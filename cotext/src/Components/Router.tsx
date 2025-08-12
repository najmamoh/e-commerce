import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import Products from './products';
import AllProducts from './Allproducts';
import FeaturesSection from './FeaturesSection';
import LastSection from './lastsection';
import OneProduct from './OneProduct';
import Nav from './Nav';
import Checkout from './checkout';
import Confirm from './confirm';
import Dashbourd from './DashRotes';
import Producs from './dashboard/Tables/ListProducts';
import ProductForm from './dashboard/Forms/ProductForm';
import Singup from './Singup';
import Login from './Login';
import Kow from './kow';
import Cart from './Cartpage'
import Order from './Order'

// Function to check authentication
const isAuthenticated = () => !!localStorage.getItem('token');

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

// Protected Layout Component
const ProtectedLayout = () => {
  return isAuthenticated() ? (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Home Component
const Home = () => (
  <div>
    <Nav />
    <Products />
    <AllProducts />
    <FeaturesSection />
    <LastSection />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedLayout />, // Layout oo la xiray
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'product/:id',
        element: <OneProduct />,
      },
      {
        path: 'allproducts',
        element: <AllProducts />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'confirm/:id',
        element: <Confirm />,
      },
      {
        path: 'Cart',
        element: <Cart />,
      },
      {
        path:"Order",
        element:<Order/>
      }
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Dashbourd />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Kow />,
      },
      {
        path: 'products',
        element: <Producs />,
      },
      {
        path: 'productform',
        element: <ProductForm />,
      },
      {
        path: 'productform/:id',
        element: <ProductForm />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Singup />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
