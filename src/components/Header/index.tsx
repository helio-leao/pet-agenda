import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Header() {
  return (
    <nav className={styles.container}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}
