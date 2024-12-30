import { useEffect, useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: pet } = await api.get(`/pets/${id}`);
        setName(pet.name);
        setType(pet.type);
        setBreed(pet.breed);
        setBirthdate(pet.birthdate);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const editedPet = {
      name,
      type,
      breed,
      birthdate,
    };

    try {
      await api.patch(`/pets/${id}`, editedPet);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        try {
          await api.post(`/pets/${id}/picture`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
      alert("Successfully saved!");
      navigate("/", { replace: true }); // todo: send to pets page
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className={style.pageTitle}>Edit Pet</h1>

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
    </>
  );
}
