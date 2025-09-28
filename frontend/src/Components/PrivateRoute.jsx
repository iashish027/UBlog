// src/routes/PrivateRoute.jsx
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { setCurrentUser } from "../redux/user/userSlice";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  // useEffect(async ()=>{
  //    const fetchProfile = async () => {
  //      try {
  //        const res = await fetch("/api/auth/Profile");

  //        if (res.ok) {
  //          const data = await res.json(); // Don't forget to parse!
  //          dispatch(setCurrentUser(data));
  //        } else {
  //          dispatch(setCurrentUser(null));
  //        }
  //      } catch (err) {
  //        console.error("Profile fetch failed:", err);
  //        dispatch(setCurrentUser(null));
  //      }
  //    };

  //    fetchProfile();
  // },[])
  const currentUser = useSelector((state) => state.user.currentUser);
  const location = useLocation();

  // If not logged in, redirect to /signin and save current location
  if (!currentUser) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // Otherwise render the child route(s)
  return <Outlet />;
}
