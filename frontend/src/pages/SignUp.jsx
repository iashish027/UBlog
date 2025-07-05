import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (e) {
      console.log(e);
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
            Sign up with your email and password or with google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="text-black">
            <Label htmlFor="username" className="text-black">
              Username
            </Label>
            <TextInput type="text" id="username" onChange={handleChange} />
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
              Sign Up
            </Button>
          </form>
          <div>
            <span>Have an account? </span>
            <Link to="/signin" className="text-blue-500 ">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
