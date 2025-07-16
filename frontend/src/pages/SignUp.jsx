import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signupStart,
  signupSuccess,
  signupFailure,
  signupReset,
} from "../redux/signup/signupSlice";
import Logo from "../Components/Logo";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.signup
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return dispatch(signupFailure("Please fill out all fields."));
    }
    try {
      dispatch(signupStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signupFailure(data.message));
      }
      dispatch(signupSuccess(data.message));
      // Optionally redirect after success
      // navigate("/signin");
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="p-5 flex flex-col gap-5 sm:flex-row mx-auto max-w-3xl sm:items-center sm:justify-center">
        {/* left */}
        <div className="flex-1">
          <Logo size="4xl" />
          <p className="text-sm mt-5">
            Sign up with your email and password or with google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="text-black">
            <Label htmlFor="username">Username</Label>
            <TextInput type="text" id="username" onChange={handleChange} />
            <Label htmlFor="email">Email</Label>
            <TextInput type="email" id="email" onChange={handleChange} />
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <TextInput type="password" id="password" onChange={handleChange} />
            <Button
              className="bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 mt-2"
              type="submit"
              onClick={handleSubmit}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div>
            <span>Have an account? </span>
            <Link to="/signin" className="text-blue-500 ">
              Sign In
            </Link>
          </div>
          {(error || successMessage) && (
            <Alert className="mt-5" color={error ? "failure" : "success"}>
              {error || successMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
