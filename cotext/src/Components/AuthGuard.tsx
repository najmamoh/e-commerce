import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

// AppRouter.js

const AppRouter: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <RouterProvider router={router} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AppRouter;
