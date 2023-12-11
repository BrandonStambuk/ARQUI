import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, authenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        authenticated === true ? (
          <Component />
        ) : (
          <Navigate to="/loginUser" replace state={{ from: rest.location.pathname }} />
        )
      }
    />
  );
};

export default PrivateRoute;
