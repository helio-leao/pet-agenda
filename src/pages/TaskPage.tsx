import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";
import { FaPaw, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  calculateDaysTo,
  calculateHoursTo,
  formatTimeToString,
} from "../utils/timeCalculations";
import TaskDoneRecord from "../types/TaskDoneRecord";
import { DateTime } from "luxon";
import getErrorMessage from "../utils/getErrorMessage";

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
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
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
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(taskDoneId: string) {
    try {
      await api.delete(`/tasks/${taskId}/done-records/${taskDoneId}`);
      await loadTaskDoneRecords();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // note: format datetimes for visualization
  let hourlyTask = task!.interval.unit === "HOURS";
  let remainingTimeString = "";
  let formattedDueDate = "";
  let dateTimeFormat = DateTime.DATETIME_SHORT;

  if (hourlyTask) {
    const remainingTime = calculateHoursTo(task!.dueDate);
    remainingTimeString = formatTimeToString(remainingTime, "hour");
    formattedDueDate = DateTime.fromISO(task!.dueDate).toLocaleString(
      DateTime.DATETIME_SHORT
    );
  } else {
    const remainingTime = calculateDaysTo(task!.dueDate);
    remainingTimeString = formatTimeToString(remainingTime, "day");
    formattedDueDate = DateTime.fromISO(task!.dueDate).toLocaleString(
      DateTime.DATE_SHORT
    );
    dateTimeFormat = DateTime.DATE_SHORT;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <h1 className="mb-4">Task</h1>

      <div className="mb-4">
        <div className="flex gap-4">
          <h3>{task!.title}</h3>
          <div className="flex gap-4">
            <Link to={`/tasks/${task!._id}/edit`}>
              <FaRegEdit />
            </Link>
          </div>
        </div>
        <p>{task!.description}</p>
        <p>{`${formattedDueDate} (${remainingTimeString})`}</p>
        <p>{`Once every ${
          task!.interval.value
        } ${task!.interval.unit.toLowerCase()}`}</p>
        <Link
          to={`/pets/${task!.pet._id}`}
          className="flex items-center gap-4 self-start"
        >
          <FaPaw />
          {task!.pet.name}
        </Link>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-end gap-2 mb-4">
          <Link
            to={`/tasks/${task!._id}/done-records/new`}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Add Done Record
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
                      dateTimeFormat
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
