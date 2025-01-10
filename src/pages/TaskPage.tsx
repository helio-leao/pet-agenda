import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";
import { FaRegEdit } from "react-icons/fa";
import { calculateDaysTo, formatDaysString } from "../utils/timeCalculations";

export default function TaskPage() {
  const { id } = useParams();

  const [task, setTask] = useState<Task>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">Task</h1>

      <div>
        <div className="flex gap-4">
          <h3>{task!.title}</h3>
          <div className="flex gap-4">
            <Link to={`/tasks/${task!._id}/edit`}>
              <FaRegEdit />
            </Link>
          </div>
        </div>
        <p>{task!.description}</p>
        <p>
          {Intl.DateTimeFormat("pt-BR").format(new Date(task!.date))} (
          {formatDaysString(calculateDaysTo(task!.date))})
        </p>
        <p>{`Once every ${
          task!.interval.value
        } ${task!.interval.unit.toLowerCase()}`}</p>

        <div className="mt-4">
          <Link
            to={`/tasks/${task!._id}/complete`}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            add done date
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        {task!.history.length === 0 ? (
          <p>No records of this task yet</p>
        ) : (
          <>
            <p>Done before on</p>
            <div className="flex flex-col gap-4">
              {task!.history.map((doneDate, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 border rounded-md justify-between"
                >
                  <p>
                    {Intl.DateTimeFormat("pt-BR").format(new Date(doneDate))}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
