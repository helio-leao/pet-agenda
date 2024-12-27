import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import api from "../../api/api";
import { useSession } from "../../contexts/session";
import { useNavigate } from "react-router-dom";

export default function NewPet() {
  const navigate = useNavigate();
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      const { data: user } = await api.post("/users/login", loginData);
      signIn(user);
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while logging in");
    }
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
        <Link to="/signup">Signup</Link>
      </form>
    </main>
  );
}
