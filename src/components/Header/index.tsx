import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <nav>
        <ul style={{ display: "flex", gap: 10 }}>
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
    </header>
  );
}
