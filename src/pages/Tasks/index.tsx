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
              flexDirection: "column",
              padding: 10,
              borderWidth: 1,
              borderStyle: "solid",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <h3>{task.title}</h3>
              <Link to={`/edit-task/${task._id}`}>Edit</Link>
            </div>

            <p>{task.description}</p>
            <p>{Intl.DateTimeFormat("pt-BR").format(new Date(task.date))}</p>
            <p>{task.status}</p>
            <Link to={`/pet/${task.pet._id}`}>{task.pet.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
