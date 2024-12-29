import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";

export default function Tasks() {
  const { session } = useSession();
  const [tasks, setTasks] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/users/${session.user._id}/tasks`);
        setTasks(data);
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
      <div className={styles.linksContainer}>
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
        {tasks.map((task: any) => (
          <div
            key={task._id}
            style={{
              display: "flex",
              gap: 10,
              padding: 10,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.date}</p>
              <p>{task.status}</p>
              <p>{task.pet.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
