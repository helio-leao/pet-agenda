import { useEffect, useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/session";

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
      date,
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
      <h1 className={style.pageTitle}>New Task</h1>

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
