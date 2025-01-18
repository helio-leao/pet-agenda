import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import LoadingIndicator from "../components/LoadingIndicator";
import getErrorMessage from "../utils/getErrorMessage";

export default function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [pet, setPet] = useState("");

  const [intervalUnit, setIntervalUnit] = useState("");
  const [intervalValue, setIntervalValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: task } = await api.get(`/tasks/${taskId}`);

        const dateTime = DateTime.fromISO(task.dueDate);

        setTitle(task.title);
        setDescription(task.description);
        setDueDate(dateTime.toISODate() || "");
        setDueTime(dateTime.toFormat("HH:mm") || "");
        setIntervalValue(task.interval.value.toString());
        setIntervalUnit(task.interval.unit);
        setPet(task.pet);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  useEffect(() => {
    if (intervalUnit !== "HORAS") {
      setDueTime("");
    }
  }, [intervalUnit]);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const editedTask = {
      title,
      description,
      dueDate: DateTime.fromISO(`${dueDate}T${dueTime || "00:00"}`, {
        zone: "local",
      }).toISO(),
      interval: {
        value: parseInt(intervalValue, 10),
        unit: intervalUnit,
      },
      pet,
    };

    try {
      setIsSaving(true);
      await api.patch(`/tasks/${taskId}`, editedTask);
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
      <h1 className="mb-4">Edit Task</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="title"
            placeholder="your task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="border p-4 rounded-lg resize-none"
            rows={3}
            id="description"
            placeholder="your task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <label htmlFor="interval">Interval*</label>
            <select
              name="interval"
              id="interval"
              className="border p-4 rounded-lg flex-1"
              value={intervalUnit}
              onChange={(e) => setIntervalUnit(e.target.value)}
            >
              <option value="" disabled>
                select an interval
              </option>
              <option value="HOURS">Hours</option>
              <option value="DAYS">Days</option>
              <option value="WEEKS">Weeks</option>
              <option value="MONTHS">Months</option>
              <option value="YEARS">Years</option>
            </select>
          </div>
          <input
            type="number"
            className="border p-4 rounded-lg flex-1"
            disabled={intervalUnit === ""}
            min={1}
            id="interval-value"
            placeholder="enter interval time (e.g., 10)"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="date">Due Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <input
            disabled={intervalUnit !== "HOURS"}
            type="time"
            className="border p-4 rounded-lg"
            id="time"
            value={dueTime}
            onChange={(e) => setDueTime(e.target.value)}
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
