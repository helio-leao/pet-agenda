import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import api from "../services/api";

export default function Header() {
  const { session, signOut } = useSession();

  async function handleLogout() {
    if (!session) {
      return;
    }
    try {
      await api.delete(`/auth/logout`, {
        data: { refreshToken: session.refreshToken },
      });
      signOut();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <header className="flex justify-between p-4 bg-sky-600">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="flex py-2 text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pets" className="flex py-2 text-white">
              Pets
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex py-2 text-white">
              Tasks
            </Link>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogout} className="text-white">
        Logout
      </button>
    </header>
  );
}
