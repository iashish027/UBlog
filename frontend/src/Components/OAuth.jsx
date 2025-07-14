import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import app from "../Firebase";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/signin/signinSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.signin);
  const handleGoogleClick = async () => {
    console.log("clicked");
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotUrl: resultsFromGoogle.user.photoURL,
        }),
      });

      const data = res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      className="mt-5 "
      color="blue"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="mr-2 text-xl" />
      Sign with google
    </Button>
  );
}
