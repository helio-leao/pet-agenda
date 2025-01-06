import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export default function NewPetPage() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newPet = {
      name,
      type,
      breed,
      birthdate: DateTime.fromISO(birthdate, { zone: "local" }).toString(),
      user: session!.user._id,
    };

    try {
      setIsSaving(true);

      const { data: pet } = await api.post("/pets", newPet);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        try {
          await api.post(`/pets/${pet._id}/picture`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
      navigate("/pets", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Error while saving");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">New Pet</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="name"
            placeholder="your pet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type">Type*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="type"
            placeholder="cat, dog, bird..."
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="breed">Breed*</label>
          <input
            type="text"
            className="border p-4 rounded-lg"
            id="breed"
            placeholder="bulldog, persian cat..."
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="birthdate">Birthdate*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
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
            className="bg-sky-600 rounded-lg px-4 py-1 self-start text-white"
          >
            Save
          </button>
          <Link
            to="/"
            className="bg-sky-600 rounded-lg px-4 py-1 self-start text-white"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
