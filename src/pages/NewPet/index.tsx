import { useState } from "react";
import style from "./style.module.css";

export default function NewPet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [race, setRace] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPet = {
      name,
      species,
      race,
      birthdate,
    };
    console.log(newPet);
  }

  return (
    <main className={style.container}>
      <h1 className={style.pageTitle}>New Pet</h1>

      <form className={style.formContainer} onSubmit={handleCreate}>
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
          <label htmlFor="species">Species</label>
          <input
            type="text"
            className={style.inputElement}
            id="species"
            placeholder="Your pet species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="race">Race</label>
          <input
            type="text"
            className={style.inputElement}
            id="race"
            placeholder="Your pet race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
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

      {/* NOTE: temporary visualization */}
      <img
        src={picture ? URL.createObjectURL(picture) : ""}
        style={{ width: "200px", marginTop: "20px" }}
      />
    </main>
  );
}
