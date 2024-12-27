import { useState } from "react";
import style from "./style.module.css";

export default function NewPet() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };
    console.log(loginData);
  }

  return (
    <main className={style.container}>
      <h1 className={style.pageTitle}>Login</h1>

      <form className={style.formContainer} onSubmit={handleLogin}>
        <div className={style.fieldContainer}>
          <label htmlFor="username">Username</label>
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
            type="password"
            className={style.inputElement}
            id="password"
            placeholder="Your password"
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
