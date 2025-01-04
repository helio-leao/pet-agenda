import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };

    try {
      setIsLoading(true);

      const { data } = await api.post("/auth/login", loginData);
      const sessionUser = { _id: data.user._id };

      signIn({ ...data, user: sessionUser });
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while logging in");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">Login</h1>

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

        <div className="flex gap-2 mt-4">
          <button
            disabled={isLoading}
            className="bg-sky-200 rounded-lg px-4 py-1 self-start"
          >
            Login
          </button>
          <Link
            to="/signup"
            className="bg-sky-200 rounded-lg px-4 py-1 self-start"
          >
            Signup
          </Link>
        </div>
      </form>
    </main>
  );
}
