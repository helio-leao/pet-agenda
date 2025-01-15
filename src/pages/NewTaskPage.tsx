import { useEffect, useState } from "react";
import api from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { DateTime } from "luxon";
import Pet from "../types/Pet";
import LoadingIndicator from "../components/LoadingIndicator";

export default function NewTaskPage() {
  const { session } = useSession();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pet, setPet] = useState("");

  const [intervalUnit, setIntervalUnit] = useState("");
  const [intervalValue, setIntervalValue] = useState("");

  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPet(location.state?.petId || "");

    (async () => {
      try {
        const { data: pets } = await api.get(
          `/users/${session!.user._id}/pets`
        );
        setPets(pets);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate: DateTime.fromISO(dueDate, { zone: "local" }).toString(),
      interval: {
        value: parseInt(intervalValue, 10),
        unit: intervalUnit,
      },
      user: session!.user._id,
      pet,
    };

    try {
      setIsSaving(true);
      await api.post("/tasks", newTask);
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
    <main className="p-4">
      <h1 className="mb-4">New Task</h1>

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
          <label htmlFor="date">Due Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
              {/* <option value="HOURS">Hours</option> */}
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
          <label htmlFor="pet">Pet*</label>
          <select
            name="pet"
            id="pet"
            className="border p-4 rounded-lg"
            value={pet}
            onChange={(e) => setPet(e.target.value)}
          >
            <option value="" disabled>
              select a pet
            </option>
            {pets.map((pet) => (
              <option key={pet._id} value={pet._id}>
                {pet.name}
              </option>
            ))}
          </select>
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
