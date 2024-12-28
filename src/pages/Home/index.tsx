import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Home() {
  const { session, signOut } = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  const [pets, setPets] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/users/${session.user._id}/pets`);
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
      <div className={styles.userDataContainer}>
        <img src={session.user.picture} height="160px" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{session.user.name}</h2>
          <p>{`Since ${new Date(session.user.createdAt).getFullYear()}`}</p>
          <Link to="/">Edit</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className={styles.linksContainer}>
        <Link to="/new-pet">Add Pet</Link>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          gap: 10,
        }}
      >
        {pets.map((pet: any) => (
          <div
            key={pet._id}
            style={{
              display: "flex",
              gap: 10,
              padding: 10,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <img
              src={pet.picture}
              style={{ objectFit: "cover" }}
              height="80px"
              width="80px"
            />
            <div>
              <p>{pet.name}</p>
              <p>{pet.type}</p>
              <p>{pet.breed}</p>
              <p>{pet.birthdate}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
