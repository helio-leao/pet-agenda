import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetWeightRecordCard from "../components/PetWeightRecordCard";
import PetWeightRecord from "../types/PetWeightRecord";
import Pet from "../types/Pet";
import LoadingIndicator from "../components/LoadingIndicator";
import getErrorMessage from "../utils/getErrorMessage";

export default function PetWeightRecordsPage() {
  const { petId } = useParams();
  const [pet, setPet] = useState<Pet>();
  const [petWeightRecords, setPetWeightRecords] = useState<PetWeightRecord[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: pet }, { data: petWeightRecords }] = await Promise.all([
          api.get<Pet>(`/pets/${petId}`),
          api.get<PetWeightRecord[]>(`/pets/${petId}/weight-records`),
        ]);
        setPet(pet);
        setPetWeightRecords(petWeightRecords);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  async function loadWeightRecords() {
    try {
      setIsLoading(true);
      const { data: petWeightRecords } = await api.get<PetWeightRecord[]>(
        `/pets/${petId}/weight-records`
      );
      setPetWeightRecords(petWeightRecords);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(recordId: string) {
    if (!confirm("Are you sure you want to delete?")) {
      return;
    }

    try {
      await api.delete(`/pets/${petId}/weight-records/${recordId}`);
      await loadWeightRecords();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <h2 className="mb-4">{`${pet!.name}'s Weight History`}</h2>

      <div className="flex justify-end gap-2 mb-4">
        <Link
          to={`/pets/${petId}/weight-records/new`}
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Add Weight Record
        </Link>
      </div>

      {petWeightRecords.length === 0 ? (
        <p>No weight records yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {petWeightRecords.map((petWeightRecord) => (
            <PetWeightRecordCard
              key={petWeightRecord._id}
              petWeightRecord={petWeightRecord}
              onDeleteClick={() => handleDelete(petWeightRecord._id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
