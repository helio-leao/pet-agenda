import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";

export default function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await api.get(`/users/${userId}`);
        setName(user.name);
        setUsername(user.username);
        setEmail(user.email);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const editedUser = {
      // username,
      // email,
      name,
      password: password || undefined,
    };

    try {
      setIsSaving(true);

      await api.patch(`/users/${userId}`, editedUser);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        await api.post(`/users/${userId}/picture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">Edit User</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="name"
            placeholder="your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            disabled
            type="text"
            className="border p-4 rounded-lg"
            id="username"
            placeholder="your username"
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
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            disabled
            type="email"
            className="border p-4 rounded-lg"
            id="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
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

        <div className="flex gap-2 mt-4">
          <button
            disabled={isSaving}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Save
          </button>
          <Link
            to="/"
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* NOTE: temporary visualization */}
      {picture && (
        <img
          src={URL.createObjectURL(picture)}
          className="rounded-md object-cover min-h-20 min-w-20 h-20 w-20 mt-4"
        />
      )}
    </main>
  );
}
