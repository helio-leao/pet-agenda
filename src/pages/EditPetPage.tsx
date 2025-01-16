import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import LoadingIndicator from "../components/LoadingIndicator";
import Pet from "../types/Pet";
import getErrorMessage from "../utils/showErrorMessage";

export default function EditPetPage() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: pet } = await api.get<Pet>(`/pets/${petId}`);
        setName(pet.name);
        setType(pet.type);
        setBreed(pet.breed);
        setBirthdate(DateTime.fromISO(pet.birthdate).toISODate() || "");
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const editedPet = {
      name,
      type,
      breed,
      birthdate: DateTime.fromISO(birthdate, { zone: "local" }).toString(),
    };

    try {
      setIsSaving(true);
      await api.patch(`/pets/${petId}`, editedPet);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        try {
          await api.post(`/pets/${petId}/picture`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          alert(errorMessage);
        }
      }
      navigate(-1);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <h1 className="mb-4">Edit Pet</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col gap-4">
          <label htmlFor="birthdate">Birthdate*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-4">
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
    </main>
  );
}
