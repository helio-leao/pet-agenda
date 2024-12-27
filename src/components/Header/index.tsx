import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
