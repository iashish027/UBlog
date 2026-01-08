import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Spinner, Button } from "flowbite-react";
import { verifyEmail } from "../../services/api";

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
        const data = await verifyEmail({ token, username });
        setStatus("success");
        setMessage(data.message || "Email verified successfully!");
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Verification failed.");
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
