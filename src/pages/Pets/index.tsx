import { Link } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";
import PetCard from "../../components/PetCard";

export default function Pets() {
  const { session } = useSession();
  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data: pets } = await api.get(`/users/${session.user._id}/pets`);
        setPets(pets);
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
    <>
      <h1 className="mb-6">Pets</h1>

      <div className="flex justify-end mb-4">
        <Link to="/new-pet">Add Pet</Link>
      </div>

      <div className="flex flex-col gap-4">
        {pets.map((pet: any) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </>
  );
}
