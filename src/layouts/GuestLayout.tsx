import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
