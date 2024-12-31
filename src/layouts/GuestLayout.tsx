import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/session";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <main style={{ padding: 20 }}>
      <Outlet />;
    </main>
  );
}
