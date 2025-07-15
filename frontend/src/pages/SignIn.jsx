import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/signin/signinSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.signin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("all fields are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure());
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="p-5 flex flex-col gap-5 sm:flex-row mx-auto max-w-3xl sm:items-center sm:justify-center">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className=" text-4xl l font-semibold ">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-puple-500 to-pink-500 rounded-lg text-white">
              U
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Sign in with your email and password or with google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="text-black">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
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
                "Sign In"
              )}
            </Button>
          </form>
          <div>
            <span>Have an account? </span>
            <Link to="/signup" className="text-blue-500 ">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
