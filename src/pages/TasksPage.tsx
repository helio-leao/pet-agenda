import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { FaPlus } from "react-icons/fa";
import Task from "../types/Task";

export default function TasksPage() {
  const { session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/users/${session!.user._id}/tasks`);
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
    <main className="p-4">
      <h1 className="mb-4">Tasks</h1>

      <div className="flex justify-end mb-4">
        <Link to="/new-task">
          <FaPlus />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </main>
  );
}
