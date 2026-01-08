// src/routes/PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  // If not logged in, redirect to /signin and save current location
  if (!currentUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // Otherwise render the child route(s)
  return <Outlet />;
}
