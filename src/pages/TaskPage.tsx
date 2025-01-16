import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";
import { FaRegEdit, FaRegTrashAlt, FaPlus } from "react-icons/fa";
import { calculateDaysTo, formatDaysString } from "../utils/timeCalculations";
import TaskDoneRecord from "../types/TaskDoneRecord";
import { DateTime } from "luxon";

export default function TaskPage() {
  const { taskId } = useParams();

  const [task, setTask] = useState<Task>();
  const [doneRecords, setDoneRecords] = useState<TaskDoneRecord[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: task }, { data: doneRecords }] = await Promise.all([
          api.get<Task>(`/tasks/${taskId}`),
          api.get<TaskDoneRecord[]>(`/tasks/${taskId}/done-records`),
        ]);
        setTask(task);
        setDoneRecords(doneRecords);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function loadTaskDoneRecords() {
    try {
      setIsLoading(true);
      const { data: doneRecords } = await api.get<TaskDoneRecord[]>(
        `/tasks/${taskId}/done-records`
      );
      setDoneRecords(doneRecords);
    } catch (error) {
      console.error(error);
      alert("Error while fetching task done records");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(taskDoneId: string) {
    try {
      await api.delete(`/tasks/${taskId}/done-records/${taskDoneId}`);
      await loadTaskDoneRecords();
    } catch (error) {
      console.error(error);
      alert("Error while deleting weight record");
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
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
          {`${DateTime.fromISO(task!.dueDate).toLocaleString(
            DateTime.DATE_SHORT
          )} (${formatDaysString(calculateDaysTo(task!.dueDate))})`}
        </p>
        <p>{`Once every ${
          task!.interval.value
        } ${task!.interval.unit.toLowerCase()}`}</p>
      </div>

      <div className="flex flex-col mt-6">
        <div className="flex justify-between items-center mb-4">
          <p>Done before on</p>
          <Link to={`/tasks/${task!._id}/done-records/new`}>
            <FaPlus />
          </Link>
        </div>

        {doneRecords.length === 0 ? (
          <p>No records of this task yet</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {doneRecords.map((record) => (
                <div
                  key={record._id}
                  className="flex gap-4 p-4 border rounded-md justify-between"
                >
                  <p>
                    {DateTime.fromISO(record.date).toLocaleString(
                      DateTime.DATE_SHORT
                    )}
                  </p>
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/tasks/${taskId}/done-records/${record._id}/edit`}
                    >
                      <FaRegEdit />
                    </Link>
                    <button onClick={() => handleDelete(record._id)}>
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
