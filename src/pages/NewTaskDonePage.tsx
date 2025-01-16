import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";
import getErrorMessage from "../utils/getErrorMessage";

export default function TaskDonePage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task>();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Task>(`/tasks/${taskId}`);

        const datetime = DateTime.fromISO(data.dueDate);

        setDate(datetime.toISODate() || "");
        setTime(datetime.toFormat("HH:mm") || "");
        setTask(data);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      date: DateTime.fromISO(`${date}T${time}`, { zone: "local" }).toISO(),
      task: taskId,
    };

    try {
      setIsSaving(true);
      await api.post(`/tasks/${taskId}/done-records`, data);
      navigate(-1);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <h1 className="mb-4">{task!.title}</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
          <label htmlFor="date">Done Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {task!.interval.unit === "HOURS" && (
            <input
              type="time"
              className="border p-4 rounded-lg"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <button
            disabled={isSaving}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
