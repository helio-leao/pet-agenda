import { Link } from "react-router-dom";
import { useSession } from "../../contexts/session";

export default function Header() {
  const { signOut } = useSession();

  function handleLogout() {
    signOut();
  }

  return (
    <header className="flex justify-between p-4">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>

      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
