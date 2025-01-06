import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetWeightRecordCard from "../components/PetWeightRecordCard";
import { DateTime } from "luxon";
import PetWeightRecord from "../types/PetWeightRecord";

export default function PetWeightRecordsPage() {
  const { id } = useParams();
  const [petWeightRecords, setPetWeightRecords] = useState<PetWeightRecord[]>(
    []
  );

  const [newRecordWeight, setNewRecordWeight] = useState("");
  const [newRecordDate, setNewRecordDate] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadPetWeightRecords();
  }, []);

  async function loadPetWeightRecords() {
    try {
      const { data } = await api.get(`/pets/${id}/petWeightRecords`);
      setPetWeightRecords(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const date = DateTime.fromISO(newRecordDate, { zone: "local" }).toString();
    const value = parseFloat(newRecordWeight);

    if (isNaN(value)) {
      alert("Weight value invalid");
      return;
    }
    if (date === "Invalid DateTime") {
      alert("Invalid date");
      return;
    }

    const newWeightRecord = { date, value, pet: id };

    try {
      setIsSaving(true);
      await api.post(`/pets/${id}/petWeightRecords`, newWeightRecord);
      await loadPetWeightRecords();
      setNewRecordWeight("");
      setNewRecordDate("");
    } catch (error) {
      console.error(error);
      alert("It was not possible to save");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">New Weight Record</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-2">
          <label htmlFor="weight">Weight*</label>
          <input
            type="number"
            className="border p-4 rounded-lg"
            id="weight"
            placeholder="your pet weight (e.g., 3.5)"
            value={newRecordWeight}
            onChange={(e) => setNewRecordWeight(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={newRecordDate}
            onChange={(e) => setNewRecordDate(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mt-4">
          <button
            disabled={isSaving}
            className="bg-sky-600 rounded-lg px-4 py-1 self-start text-white"
          >
            Save
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h1 className="mb-4">Weight Records</h1>

        <div className="flex flex-col gap-4">
          {petWeightRecords.map((petWeightRecord) => (
            <PetWeightRecordCard
              key={petWeightRecord._id}
              petWeightRecord={petWeightRecord}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
