import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Home() {
  const { session, signOut } = useSession();
  const [pets, setPets] = useState<any>([]);

  if (!session) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/users/${session._id}/pets`);
        setPets(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

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

      <div style={{ marginTop: 20 }}>
        {pets.map((pet: any) => (
          <div key={pet._id}>
            <p>{pet.name}</p>
            <p>{pet.type}</p>
            <p>{pet.breed}</p>
            <p>{pet.birthdate}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
