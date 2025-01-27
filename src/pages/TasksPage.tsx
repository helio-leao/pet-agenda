import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import Task from "../types/Task";
import LoadingIndicator from "../components/LoadingIndicator";
import getErrorMessage from "../utils/getErrorMessage";

export default function TasksPage() {
  const { session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleDelete(taskId: string) {
    if (!confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      await api.delete(`/tasks/${taskId}`);
      await fetchTasks();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    }
  }

  async function fetchTasks() {
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
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <div className="flex justify-end gap-2 mb-4">
        <Link
          to="/tasks/new"
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Add Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p>You have no tasks yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDeleteClick={() => handleDelete(task._id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
