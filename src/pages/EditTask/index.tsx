import { useEffect, useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { DateTime } from "luxon";

export default function EditTask() {
  const { id } = useParams();
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
        const [{ data: task }, { data: pets }] = await Promise.all([
          api.get(`/tasks/${id}`),
          api.get(`/users/${session.user._id}/pets`),
        ]);
        setPets(pets);
        setTitle(task.title);
        setDescription(task.description);
        setDate(new Date(task.date).toISOString().split("T")[0]);
        setStatus(task.status);
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
      status,
      pet,
    };

    try {
      await api.patch(`/tasks/${id}`, editedTask);
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
      <h1 className={style.pageTitle}>Edit Task</h1>

      <form className={style.formContainer} onSubmit={handleSave}>
        <div className={style.fieldContainer}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className={style.inputElement}
            id="title"
            placeholder="Your task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className={style.inputElement}
            id="description"
            placeholder="Your task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            className={style.inputElement}
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            className={style.inputElement}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="pet">Pet</label>
          <select
            name="pet"
            id="pet"
            className={style.inputElement}
            value={pet}
            onChange={(e) => setPet(e.target.value)}
          >
            {pets.map((pet: any) => (
              <option key={pet._id} value={pet._id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <button
          style={{ alignSelf: "flex-start" }}
          className={style.inputElement}
        >
          Save
        </button>
      </form>
    </>
  );
}
