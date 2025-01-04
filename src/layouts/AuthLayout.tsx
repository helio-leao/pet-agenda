import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import Header from "../components/Header";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
