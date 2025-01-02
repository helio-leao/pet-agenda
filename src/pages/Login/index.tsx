import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { useSession } from "../../contexts/session";
import { useNavigate } from "react-router-dom";

export default function Login() {
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
      const { data } = await api.post("/users/login", loginData);
      signIn({ user: { _id: data._id } });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while logging in");
    }
  }

  return (
    <>
      <h1 className="mb-6">Login</h1>

      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="username"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border p-4 rounded-lg"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button className="border p-4 rounded-lg">Login</button>
          <Link to="/signup" className="border p-4 rounded-lg">
            Signup
          </Link>
        </div>
      </form>
    </>
  );
}
