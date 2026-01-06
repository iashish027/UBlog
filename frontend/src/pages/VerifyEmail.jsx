import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Spinner, Button } from "flowbite-react";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const username = searchParams.get("username");
  const [status, setStatus] = useState("pending"); // pending, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token || !username) {
      setStatus("error");
      setMessage("Verification token or username is missing.");
      return;
    }
    const verify = async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            token,
            username
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setStatus("success");
          setMessage(data.message || "Email verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        }
      } catch {
        setStatus("error");
        setMessage("Server error. Please try again later.");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {status === "pending" && (
        <Spinner size="xl" aria-label="Verifying email..." />
      )}
      {status === "success" && (
        <Alert color="success">
          <span>{message}</span>
          <Button href="/signin" color="success" className="mt-4">
            Go to Sign In
          </Button>
        </Alert>
      )}
      {status === "error" && (
        <Alert color="failure">
          <span>{message}</span>
        </Alert>
      )}
    </div>
  );
}
