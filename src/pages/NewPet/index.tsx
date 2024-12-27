import { useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../contexts/session";

export default function NewPet() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPet = {
      name,
      type,
      breed,
      birthdate,
      user: session._id,
    };

    try {
      let { data: pet } = await api.post("/pets", newPet);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        const response = await api.post(`/pets/${pet._id}/picture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        pet = response.data;
      }

      console.log(pet);
      alert("Successfully saved!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    }
  }

  return (
    <main className={style.container}>
      <h1 className={style.pageTitle}>New Pet</h1>

      <form className={style.formContainer} onSubmit={handleSave}>
        <div className={style.fieldContainer}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className={style.inputElement}
            id="name"
            placeholder="Your pet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="type">Type</label>
          <input
            type="text"
            className={style.inputElement}
            id="type"
            placeholder="Your pet type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="breed">Breed</label>
          <input
            type="text"
            className={style.inputElement}
            id="breed"
            placeholder="Your pet breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            className={style.inputElement}
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              setPicture(file);
            }}
          />
        </div>

        <button
          style={{ alignSelf: "flex-start" }}
          className={style.inputElement}
        >
          Save
        </button>
      </form>
    </main>
  );
}
