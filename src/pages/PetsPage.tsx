import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";
import Pet from "../types/Pet";
import LoadingIndicator from "../components/LoadingIndicator";
import getErrorMessage from "../utils/getErrorMessage";

export default function PetsPage() {
  const { session } = useSession();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: pets } = await api.get<Pet[]>(
          `/users/${session!.user._id}/pets`
        );
        setPets(pets);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <div className="flex justify-end gap-2 mb-4">
        <Link
          to="/pets/new"
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Add Pet
        </Link>
      </div>

      {pets.length === 0 ? (
        <p>No pets to call your own</p>
      ) : (
        <div className="flex flex-col gap-4">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      )}
    </main>
  );
}
