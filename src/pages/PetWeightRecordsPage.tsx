import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetWeightRecordCard from "../components/PetWeightRecordCard";

export default function PetWeightRecordsPage() {
  const { id } = useParams();
  const [petWeightRecords, setPetWeightRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/pets/${id}/petWeightRecords`);
        setPetWeightRecords(data);
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
      <div className="flex flex-col gap-4">
        {petWeightRecords.map((petWeightRecord) => (
          <PetWeightRecordCard petWeightRecord={petWeightRecord} />
        ))}
      </div>
    </main>
  );
}
