import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Home() {
  const { session, signOut } = useSession();
  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("AQUI CACETE", session);
    (async () => {
      try {
        const { data } = await api.get(`/users/${session.user._id}/pets`);
        setPets(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  function handleLogout() {
    signOut();
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.userDataContainer}>
        <img
          src={session.user.picture}
          style={{ objectFit: "cover" }}
          height="120px"
          width="120px"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{session.user.name}</h2>
          <p>{`Since ${new Date(session.user.createdAt).getFullYear()}`}</p>
          <Link to={`/edit-user/${session.user._id}`}>Edit</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className={styles.linksContainer}>
        <Link to="/new-pet">Add Pet</Link>
        <Link to="/new-task">Add Task</Link>
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
          <Link
            to={`/pet/${pet._id}`}
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
          </Link>
        ))}
      </div>
    </>
  );
}
