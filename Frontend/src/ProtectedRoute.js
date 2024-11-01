// src/ProtectedRoute.js
import { Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const ProtectedRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // Store the current path in local storage to redirect after login
  if (!isAuthenticated) {
    localStorage.setItem("redirectPath", location.pathname);
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/" replace />}
    />
  );
};

export default ProtectedRoute;
