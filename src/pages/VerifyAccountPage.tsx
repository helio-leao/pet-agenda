import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import User from "../types/User";
import LoadingIndicator from "../components/LoadingIndicator";

export default function VerifyAccountPage() {
  const { token } = useParams();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.post<User>("/auth/verify-account", {
          token,
        });
        setUser(data);
      } catch (error) {
        console.error(error);
        alert("Error while verifying account");
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  async function handleNewVerificationEmail() {
    try {
      await api.post("/auth/send-verification-email", { id: user?._id });
    } catch (error) {
      console.error(error);
      alert("Error while sending verification email");
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (user && user.verified) {
    return (
      <>
        <p>Account verified successfully</p>
        <Link
          to="/login"
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Login
        </Link>
      </>
    );
  } else if (user && !user.verified) {
    return (
      <>
        <p>Fail to verify account</p>
        <button onClick={handleNewVerificationEmail}>
          Issue new verification email
        </button>
      </>
    );
  }

  return <p>Failed to verify account</p>;
}
