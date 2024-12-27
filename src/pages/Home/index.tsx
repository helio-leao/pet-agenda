import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Home</h1>
      <div className={styles.linksContainer}>
        <Link to="/new-pet">Add Pet</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </main>
  );
}
