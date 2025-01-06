import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetWeightRecordCard from "../components/PetWeightRecordCard";
import PetWeightRecord from "../types/PetWeightRecord";
import Pet from "../types/Pet";
import { FaPlus } from "react-icons/fa";

export default function PetWeightRecordsPage() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet>();
  const [petWeightRecords, setPetWeightRecords] = useState<PetWeightRecord[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: pet }, { data: petWeightRecords }] = await Promise.all([
          api.get(`/pets/${id}`),
          api.get(`/pets/${id}/petWeightRecords`),
        ]);
        setPet(pet);
        setPetWeightRecords(petWeightRecords);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4">{`${pet!.name}'s Weight Records`}</h1>

      <div className="flex justify-end mb-4">
        <Link to={`/new-pet-weight-record/${id}`}>
          <FaPlus />
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {petWeightRecords.map((petWeightRecord) => (
          <PetWeightRecordCard
            key={petWeightRecord._id}
            petWeightRecord={petWeightRecord}
          />
        ))}
      </div>
    </main>
  );
}
