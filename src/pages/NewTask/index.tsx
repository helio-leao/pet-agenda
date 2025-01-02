import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export default function NewTask() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Scheduled");
  const [pet, setPet] = useState("");

  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: pets } = await api.get(`/users/${session.user._id}/pets`);
        setPets(pets);

        if (pets.length > 0) {
          setPet(pets[0]._id);
        }
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
      date: DateTime.fromISO(date, { zone: "local" }).toString(),
      status,
      user: session.user._id,
      pet,
    };

    try {
      await api.post("/tasks", newTask);
      alert("Successfully saved!");
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="mb-6">New Task</h1>

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
          <input
            type="text"
            className="border p-4 rounded-lg"
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
          <label htmlFor="status">Status*</label>
          <select
            name="status"
            id="status"
            className="border p-4 rounded-lg"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="pet">Pet*</label>
          <select
            name="pet"
            id="pet"
            className="border p-4 rounded-lg"
            onChange={(e) => setPet(e.target.value)}
          >
            {pets.map((pet: any) => (
              <option key={pet._id} value={pet._id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button className="bg-sky-200 rounded-xl px-4 py-2">Save</button>
          <Link to="/" className="bg-sky-200 rounded-xl px-4 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
}
