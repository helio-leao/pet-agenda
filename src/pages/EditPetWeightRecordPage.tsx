import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { DateTime } from "luxon";
import PetWeightRecord from "../types/PetWeightRecord";
import LoadingIndicator from "../components/LoadingIndicator";

export default function EditPetWeightRecordPage() {
  const { petId, recordId } = useParams();
  const navigate = useNavigate();

  // issue: getting this just for the pet's name
  const [petWeightRecord, setPetWeightRecord] = useState<PetWeightRecord>();

  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data: record } = await api.get<PetWeightRecord>(
          `/pets/${petId}/weight-records/${recordId}`
        );
        setPetWeightRecord(record);
        setWeight(record.value.toString());
        setDate(DateTime.fromISO(record.date).toISODate() || "");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formattedDate = DateTime.fromISO(date, { zone: "local" }).toString();
    const value = parseFloat(weight);

    if (isNaN(value)) {
      alert("Weight value invalid");
      return;
    }
    if (formattedDate === "Invalid DateTime") {
      alert("Invalid date");
      return;
    }

    const updates = { date: formattedDate, value };

    try {
      setIsSaving(true);
      await api.patch(`/pets/${petId}/weight-records/${recordId}`, updates);
      navigate(-1);
    } catch (error) {
      console.error(error);
      alert("It was not possible to save");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">{`${
        petWeightRecord!.pet.name
      }'s Edit Weight Record`}</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSave}>
        <div className="flex flex-col gap-4">
          <label htmlFor="weight">Weight*</label>
          <input
            type="number"
            className="border p-4 rounded-lg"
            id="weight"
            placeholder="your pet weight (e.g., 3.5)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="date">Date*</label>
          <input
            type="date"
            className="border p-4 rounded-lg"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
