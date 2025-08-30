import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Components/Logo";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
      } else {
        setSuccessMessage(data.message);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="p-5 flex flex-col gap-5 sm:flex-row mx-auto max-w-3xl sm:items-center sm:justify-center">
        {/* left */}
        <div className="flex-1">
          <Logo size="4xl" />
          <p className="text-sm mt-5">
            Sign up with your email and password or with Google.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="text-black" onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <TextInput
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Label htmlFor="email">Email</Label>
            <TextInput
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Label htmlFor="password">Password</Label>
            <TextInput
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />

            <Button
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-2"
              type="submit"
              disabled={loading}
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

          <div className="mt-3">
            <span>Have an account? </span>
            <Link to="/signin" className="text-blue-500">
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


