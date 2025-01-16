import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { DateTime } from "luxon";
import LoadingIndicator from "../components/LoadingIndicator";

export default function EditTaskDoneRecordPage() {
  const { taskId, recordId } = useParams();
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState("");
  const [date, setDate] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(
          `/tasks/${taskId}/done-records/${recordId}`
        );
        setDate(DateTime.fromISO(data.date).toISODate() || "");
        setTaskTitle(data.task.title);
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
      await api.patch(`/tasks/${taskId}/done-records/${recordId}`, data);
      navigate(-1);
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
    <main className="p-4 w-full max-w-screen-sm">
      <h1 className="mb-4">{`${taskTitle}'s Edit Task Done Record`}</h1>

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
