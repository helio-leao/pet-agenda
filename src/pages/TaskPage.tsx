import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { calculateDaysTo, formatDaysString } from "../utils/timeCalculations";
import TaskDoneRecord from "../types/TaskDoneRecord";

export default function TaskPage() {
  const { taskId } = useParams();

  const [task, setTask] = useState<Task>();
  const [doneRecords, setDoneRecords] = useState<TaskDoneRecord[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: task }, { data: doneRecords }] = await Promise.all([
          api.get(`/tasks/${taskId}`),
          api.get(`/tasks/${taskId}/done-records`),
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
      const { data: doneRecords } = await api.get(
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
        {doneRecords.length === 0 ? (
          <p>No records of this task yet</p>
        ) : (
          <>
            <p>Done before on</p>
            <div className="flex flex-col gap-4">
              {doneRecords.map((record) => (
                <div
                  key={record._id}
                  className="flex gap-4 p-4 border rounded-md justify-between"
                >
                  <p>
                    {Intl.DateTimeFormat("pt-BR").format(new Date(record.date))}
                  </p>
                  <div className="flex justify-end gap-4 mb-4">
                    <Link
                      to={`/`}
                      // to={`/pets/${petWeightRecord.pet}/weight-records/${petWeightRecord._id}/edit`}
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
