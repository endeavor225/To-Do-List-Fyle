import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth, setAuth } = useContext(AuthContext);

  return auth?.token ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;
