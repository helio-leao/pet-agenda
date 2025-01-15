import { Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";
import { FaRegEdit } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";
import User from "../types/User";
import Pet from "../types/Pet";
import LoadingIndicator from "../components/LoadingIndicator";

export default function HomePage() {
  const { session } = useSession();
  const [user, setUser] = useState<User>();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: user }, { data: pets }] = await Promise.all([
          api.get(`/users/${session!.user._id}`),
          api.get(`/users/${session!.user._id}/pets`),
        ]);
        setUser(user);
        setPets(pets);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4">
      <div className="flex gap-4 mb-4">
        <img
          src={user!.pictureUrl || picturePlaceholder}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div className="flex flex-col">
          <div className="flex gap-4">
            <h2>{user!.name}</h2>
            <Link to={`/users/${user!._id}/edit`}>
              <FaRegEdit />
            </Link>
          </div>
          <p>{`Since ${new Date(user!.createdAt).getFullYear()}`}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2 mb-4">
        <Link
          to="/pets/new"
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Add Pet
        </Link>
        <Link
          to="/tasks/new"
          className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
        >
          Add Task
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
