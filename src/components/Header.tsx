import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import api from "../services/api";
import { FaSignOutAlt, FaPaw } from "react-icons/fa";

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
    <header className="flex justify-between items-center gap-4 p-4 bg-sky-600 w-full">
      <div className="flex items-center gap-6">
        <FaPaw className="size-6 text-white" />
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
      </div>

      <button onClick={handleLogout} className="text-white">
        <FaSignOutAlt />
      </button>
    </header>
  );
}
