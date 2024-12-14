import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './Footer';
import Products from './products';
import AllProducts from './Allproducts';
import FeaturesSection from './FeaturesSection';
import LastSection from './lastsection';
import OneProduct from './OneProduct';
import Nav from './Nav'
import Checkout from './checkout';
import Confirm from './confirm'
import Dashbourd from './DashRotes'
import Producs from './AddProducts';
import Kow from './kow'
// Layout Component
const Layout: React.FC = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet /> {/* Placeholder for nested routes */}
      </div>
      <Footer />
    </div>
  );
};

// Home Component
const Home: React.FC = () => {
  return (
    <div>
      <Nav/>
      <Products />
      <AllProducts />
      <FeaturesSection />
      <LastSection />
    </div>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Default route for "/"
        element: <Home />,
      },
      {
        path: 'product/:id', // Route for "/product"
        element:
         <OneProduct />
      },
      {
        path: 'AllProducts', // Route for "/product"
        element: <AllProducts />,
      },
      {
        path: 'Checkout/:id', // Route for "/product"
        element: <Checkout />,
      },

      {
        path: 'Confirm/:id', // Route for "/product"
        element: <Confirm />,
      },
     
    ],
  },


{ 
  path: '/admin',
    element: <Dashbourd />,
    children: [
      {
        path: 'products',
        element: <Producs />,
      },

      {
        path: 'Kow',
        element: <Kow />,
      },
]
}
]);

// Export the RouterProvider for use in your app
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
