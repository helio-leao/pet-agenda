import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { Navigate } from "react-router-dom";

export default function Home() {
  const { session, signOut } = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  function handleLogout() {
    signOut();
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.pageTitle}>Home</h1>
      <div className={styles.userDataContainer}>
        <img src={session.picture} height="200px" />
        <h3>{session.name}</h3>
        <p>{`Since ${new Date(session.createdAt).getFullYear()}`}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className={styles.linksContainer}>
        <Link to="/new-pet">Add Pet</Link>
      </div>
    </main>
  );
}
