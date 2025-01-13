import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import LoadingIndicator from "../components/LoadingIndicator";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex justify-center items-center min-h-dvh">
      <Outlet />
    </div>
  );
}
