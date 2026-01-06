// src/routes/PrivateRoute.jsx
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setCurrentUser } from "../redux/user/userSlice";
import { getUserProfile } from "../../services/api";
import signOut from "../utils/signOut";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getUserProfile();
        dispatch(setCurrentUser(user));
      } catch (err) {
        console.error("Profile fetch failed:", err);
        signOut();
        dispatch(setCurrentUser(null));
      }
    };

    fetchProfile();
  }, []);
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  // If not logged in, redirect to /signin and save current location
  if (!currentUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // Otherwise render the child route(s)
  return <Outlet />;
}
