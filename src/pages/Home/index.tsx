import { Link } from "react-router-dom";
import styles from "./style.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Home</h1>
      <Link to="/new-pet">Add Pet</Link>
    </main>
  );
}
