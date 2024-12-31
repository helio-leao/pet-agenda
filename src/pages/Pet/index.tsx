import { useParams, Link } from "react-router-dom";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import api from "../../api/api";
import TaskCard from "../../components/TaskCard";

export default function Pet() {
  const { id } = useParams();
  const [pet, setPet] = useState<any>({});
  const [tasks, setTasks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [petResponse, tasksResponse] = await Promise.all([
          api.get(`/pets/${id}`),
          api.get(`/pets/${id}/tasks`),
        ]);

        setPet(petResponse.data);
        setTasks(tasksResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className={styles.userDataContainer}>
        <img
          src={pet.picture}
          style={{ objectFit: "cover", borderRadius: 4 }}
          height="120px"
          width="120px"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{pet.name}</h2>
          <p>{`Since ${new Date(pet.createdAt).getFullYear()}`}</p>
          <Link to={`/edit-pet/${pet._id}`}>Edit</Link>
        </div>
      </div>

      {/* <div className={styles.linksContainer}>
        <Link to="/new-task">Add Task</Link>
      </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 20,
          gap: 10,
        }}
      >
        {tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
}
