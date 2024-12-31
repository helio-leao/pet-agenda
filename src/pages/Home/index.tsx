import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";
import PetCard from "../../components/PetCard";

export default function Home() {
  const { session, signOut } = useSession();
  const [user, setUser] = useState<any>({});
  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: user }, { data: pets }] = await Promise.all([
          api.get(`/users/${session.user._id}`),
          api.get(`/users/${session.user._id}/pets`),
        ]);

        setUser(user);
        setPets(pets);
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
          src={user.picture}
          style={{
            objectFit: "cover",
            borderRadius: 4,
            minHeight: 120,
            minWidth: 120,
            height: 120,
            width: 120,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{user.name}</h2>
          <p>{`Since ${new Date(user.createdAt).getFullYear()}`}</p>
          <Link to={`/edit-user/${user._id}`}>Edit</Link>
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
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </>
  );
}
