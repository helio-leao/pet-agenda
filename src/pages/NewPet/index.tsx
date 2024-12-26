import { useState } from "react";
import style from "./style.module.css";

export default function Home() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [race, setRace] = useState("");
  const [birthday, setBirthday] = useState("");
  const [picture, setPicture] = useState("");

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPet = {
      name,
      species,
      race,
      birthday,
      picture,
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
            className={style.inputElements}
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
            className={style.inputElements}
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
            className={style.inputElements}
            id="race"
            placeholder="Your pet race"
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="birthday">Birthday</label>
          <input
            type="date"
            className={style.inputElements}
            id="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
        <div className={style.fieldContainer}>
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </div>

        <button
          style={{ alignSelf: "flex-start" }}
          className={style.inputElements}
        >
          Save
        </button>
      </form>
    </main>
  );
}
