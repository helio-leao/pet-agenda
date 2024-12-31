import { useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newUser = {
      name,
      username,
      password,
      email,
    };

    try {
      let { data: user } = await api.post("/users", newUser);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        const response = await api.post(
          `/users/${user._id}/picture`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        user = response.data;
      }
      alert("Successfully saved!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    }
  }

  return (
    <>
      <h1 className={style.pageTitle}>New User</h1>

      <form className={style.formContainer} onSubmit={handleSave}>
        <div className={style.fieldContainer}>
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            className={style.inputElement}
            id="name"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            className={style.inputElement}
            id="username"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            className={style.inputElement}
            id="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            className={style.inputElement}
            id="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <button
            style={{ alignSelf: "flex-start" }}
            className={style.inputElement}
          >
            Save
          </button>
          <Link to="/">Cancel</Link>
        </div>
      </form>

      {/* NOTE: temporary visualization */}
      <img
        src={picture ? URL.createObjectURL(picture) : ""}
        style={{
          objectFit: "cover",
          marginTop: 20,
          minHeight: 80,
          minWidth: 80,
          height: 80,
          width: 80,
        }}
      />
    </>
  );
}
