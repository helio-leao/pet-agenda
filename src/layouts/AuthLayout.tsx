import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import Header from "../components/Header";
import LoadingIndicator from "../components/LoadingIndicator";

export default function AuthLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingIndicator />;
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
