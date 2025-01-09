import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";
import Task from "../types/Task";

export default function TaskDonePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task>();

  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/tasks/${id}`);
        setTask(data);
        setDate(new Date(data.date).toISOString().split("T")[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      date: DateTime.fromISO(date, { zone: "local" }).toString(),
    };

    try {
      setIsSaving(true);
      await api.post(`/tasks/${id}/pushDoneDate`, data);
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">{task!.title}</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">Done Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            disabled={isSaving}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Save
          </button>
          <Link
            to="/"
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}