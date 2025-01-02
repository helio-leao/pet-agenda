import { Link } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";
import TaskCard from "../../components/TaskCard";
import { FaPlus } from "react-icons/fa";

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
      <h1 className="mb-6">Tasks</h1>

      <div className="flex justify-end mb-4">
        <Link to="/new-task">
          <FaPlus />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
}
