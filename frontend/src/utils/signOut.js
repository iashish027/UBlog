import axios from "axios";
import { signOutSuccess } from "../redux/user/userSlice";

const signOut = () => async (dispatch) => {
  try {
    await axios.post("/api/auth/signOut");
    dispatch(signOutSuccess());
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

export default signOut;
