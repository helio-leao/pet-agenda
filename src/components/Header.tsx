import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";
import { removeLocalStorageSession } from "../utils/localStorageSession";
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
      removeLocalStorageSession();
      signOut();
    } catch (error) {
      console.error(error);
    }
    await signOut();
  }

  return (
    <header className="flex justify-between p-4 bg-sky-200">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="flex py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pets" className="flex py-2">
              Pets
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="flex py-2">
              Tasks
            </Link>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
