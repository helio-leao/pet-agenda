import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { FaPlus } from "react-icons/fa";
import Task from "../types/Task";
import LoadingIndicator from "../components/LoadingIndicator";
import getErrorMessage from "../utils/getErrorMessage";

export default function TasksPage() {
  const { session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Task[]>(
          `/users/${session!.user._id}/tasks`
        );
        setTasks(data);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <div className="flex justify-between items-center mb-4">
        <h1>Tasks</h1>
        <Link to="/tasks/new">
          <FaPlus />
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p>You have no tasks yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
}
