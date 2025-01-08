import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

export default function EditTaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [pet, setPet] = useState("");

  const [intervalUnit, setIntervalUnit] = useState("");
  const [intervalValue, setIntervalValue] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: task } = await api.get(`/tasks/${id}`);
        setTitle(task.title);
        setDescription(task.description);
        setDate(new Date(task.date).toISOString().split("T")[0]);
        setIntervalValue(task.interval.toString());
        setIntervalUnit(task.intervalUnit);
        setPet(task.pet);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const editedTask = {
      title,
      description,
      date: DateTime.fromISO(date, { zone: "local" }).toString(),
      interval: parseInt(intervalValue, 10),
      pet,
    };

    try {
      setIsSaving(true);
      await api.patch(`/tasks/${id}`, editedTask);
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
      <h1 className="mb-4">Edit Task</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
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

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
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
