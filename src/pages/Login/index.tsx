import { useState } from "react";
import style from "./style.module.css";

export default function NewPet() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPet = {
      username,
      password,
    };
    console.log(newPet);
  }

  return (
    <main className={style.container}>
      <h1 className={style.pageTitle}>Login</h1>

      <form className={style.formContainer} onSubmit={handleLogin}>
        <div className={style.fieldContainer}>
          <label htmlFor="username">username</label>
          <input
            type="text"
            className={style.inputElement}
            id="username"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className={style.inputElement}
            id="password"
            placeholder="Your pet password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{ alignSelf: "flex-start" }}
          className={style.inputElement}
        >
          Login
        </button>
      </form>
    </main>
  );
}
