import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import User from "../types/User";
import getErrorMessage from "../utils/getErrorMessage";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [picture, setPicture] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords don't match");
    }

    const newUser = {
      name,
      username,
      password,
      email,
    };

    try {
      setIsSaving(true);
      let { data: user } = await api.post<User>("/auth/signup", newUser);

      // if (picture) {
      //   const formData = new FormData();
      //   formData.append("picture", picture);

      //   const response = await api.post<User>(
      //     `/users/${user._id}/picture`,
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     }
      //   );
      //   user = response.data;
      // }

      await api.post("/auth/send-verification-email", { id: user._id });
      alert(
        "User created successfully. Check your email to verify your account"
      );
      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="flex flex-col flex-grow max-w-sm p-4">
      <h1 className="mb-4">Signup</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
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

        <div className="flex flex-col gap-4">
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="username"
            placeholder="your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            className="border p-4 rounded-lg"
            id="password"
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="confirm-password">Confirm Password*</label>
          <input
            type="password"
            className="border p-4 rounded-lg"
            id="confirm-password"
            placeholder="confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            className="border p-4 rounded-lg"
            id="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* <div className="flex flex-col gap-4">
          <label htmlFor="picture">Picture</label>
          <input
            type="file"
            id="picture"
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              setPicture(file);
            }}
          />
        </div> */}

        <div className="flex gap-2 mt-4">
          <button
            disabled={isSaving}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Save
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* NOTE: temporary visualization */}
      {/* {picture && (
        <img
          src={URL.createObjectURL(picture)}
          className="mt-4 object-cover min-h-10 min-w-10 h-10 w-10"
        />
      )} */}
    </main>
  );
}
