import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetWeightRecordCard from "../components/PetWeightRecordCard";
import PetWeightRecord from "../types/PetWeightRecord";
import Pet from "../types/Pet";
import { FaPlus } from "react-icons/fa";
import LoadingIndicator from "../components/LoadingIndicator";

export default function PetWeightRecordsPage() {
  const { id: petId } = useParams();
  const [pet, setPet] = useState<Pet>();
  const [petWeightRecords, setPetWeightRecords] = useState<PetWeightRecord[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: pet }, { data: petWeightRecords }] = await Promise.all([
          api.get(`/pets/${petId}`),
          api.get(`/pets/${petId}/petWeightRecords`),
        ]);
        setPet(pet);
        setPetWeightRecords(petWeightRecords);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  async function loadWeightRecords() {
    try {
      setIsLoading(true);
      const { data: petWeightRecords } = await api.get(
        `/pets/${petId}/petWeightRecords`
      );
      setPetWeightRecords(petWeightRecords);
    } catch (error) {
      console.error(error);
      alert("Error while fetching pet weight records");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(weightRecordId: string) {
    try {
      await api.delete(`/petWeightRecords/${weightRecordId}`);
      await loadWeightRecords();
    } catch (error) {
      console.error(error);
      alert("Error while deleting weight record");
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">{`${pet!.name}'s Weight Records`}</h1>

      <div className="flex justify-end gap-4 mb-4">
        <Link to={`/new-pet-weight-record/${petId}`}>
          <FaPlus />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {petWeightRecords.map((petWeightRecord) => (
          <PetWeightRecordCard
            key={petWeightRecord._id}
            petWeightRecord={petWeightRecord}
            onDeleteClick={() => handleDelete(petWeightRecord._id)}
          />
        ))}
      </div>
    </main>
  );
}
