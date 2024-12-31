import { useEffect, useState } from "react";
import style from "./style.module.css";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSession } from "../../contexts/session";

export default function EditUser() {
  const { id } = useParams();
  const { session, signIn } = useSession();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setName(session.user.name);
    setUsername(session.user.username);
    setEmail(session.user.email);
    setIsLoading(false);
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const { data: user } = await api.get(`/users/${id}`);
  //       setName(user.name);
  //       setUsername(user.username);
  //       setEmail(user.email);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   })();
  // }, []);

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
      signIn({ user });
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
      <h1 className={style.pageTitle}>Edit User</h1>

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
          <label htmlFor="username">Username</label>
          <input
            disabled
            type="text"
            className={style.inputElement}
            id="username"
            placeholder="your username"
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
            placeholder="your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={style.fieldContainer}>
          <label htmlFor="email">Email</label>
          <input
            disabled
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

        <button
          style={{ alignSelf: "flex-start" }}
          className={style.inputElement}
        >
          Save
        </button>
      </form>

      {/* NOTE: temporary visualization */}
      <img
        src={picture ? URL.createObjectURL(picture) : session.user.picture}
        style={{ objectFit: "cover", marginTop: 20 }}
        height="80px"
        width="80px"
      />
    </>
  );
}