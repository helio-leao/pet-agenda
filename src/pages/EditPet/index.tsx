import { useEffect, useState } from "react";
import api from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";

export default function EditPet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: pet } = await api.get(`/pets/${id}`);
        setName(pet.name);
        setType(pet.type);
        setBreed(pet.breed);
        setBirthdate(new Date(pet.birthdate).toISOString().split("T")[0]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
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
      await api.patch(`/pets/${id}`, editedPet);

      if (picture) {
        const formData = new FormData();
        formData.append("picture", picture);

        try {
          await api.post(`/pets/${id}/picture`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
      alert("Successfully saved!");
      navigate("/pets", { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="mb-6">Edit Pet</h1>

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

        <button className="border p-4 rounded-lg">Save</button>
      </form>
    </>
  );
}
