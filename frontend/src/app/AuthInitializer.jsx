import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCurrentUser } from "../features/auth/userSlice";
import { getUserProfile } from "../services/api";
import signOut from "../features/auth/signOut";

export default function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    // Only fetch if currentUser is not already set (e.g., from persist)
    if (!currentUser) {
      const fetchProfile = async () => {
        try {
          const user = await getUserProfile();
          dispatch(setCurrentUser(user));
        } catch (err) {
          console.error("Profile fetch failed:", err);
          dispatch(signOut());
          dispatch(setCurrentUser(null));
        }
      };

      fetchProfile();
    }
  }, [currentUser, dispatch]);

  return children;
}