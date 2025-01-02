import { Link } from "react-router-dom";
import { useSession } from "../contexts/session";

export default function Header() {
  const { signOut } = useSession();

  function handleLogout() {
    signOut();
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
