import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: user } = await api.get(`/users/${id}`);
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
      let { data: user } = await api.patch(`/users/${id}`, editedUser);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        const response = await api.post(`/users/${id}/picture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        user = response.data;
      }
      alert("Successfully saved!");
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="mb-6">Edit User</h1>

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

        <button className="border p-4 rounded-lg">Save</button>
      </form>

      {/* NOTE: temporary visualization */}
      <img
        src={picture ? URL.createObjectURL(picture) : ""}
        className="rounded-md object-cover min-h-20 min-w-20 h-20 w-20 mt-4"
      />
    </>
  );
}
