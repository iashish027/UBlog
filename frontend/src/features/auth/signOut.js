import { signOutUser } from "../../services/api";
import { signOutSuccess } from "./userSlice";

const signOut = () => async (dispatch) => {
  try {
    await signOutUser();
    dispatch(signOutSuccess());
  } catch (error) {
    console.error("Sign out failed:", error);
  }
};

export default signOut;
