import { Link } from "react-router-dom";
import { useSession } from "../../contexts/session";
import { useEffect, useState } from "react";
import api from "../../api/api";
import PetCard from "../../components/PetCard";
import { FaRegEdit } from "react-icons/fa";

export default function Home() {
  const { session } = useSession();
  const [user, setUser] = useState<any>({});
  const [pets, setPets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: user }, { data: pets }] = await Promise.all([
          api.get(`/users/${session.user._id}`),
          api.get(`/users/${session.user._id}/pets`),
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex gap-4 mb-4">
        <img
          src={user.picture}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div className="flex flex-col">
          <h2>{user.name}</h2>
          <p>{`Since ${new Date(user.createdAt).getFullYear()}`}</p>
          <Link to={`/edit-user/${user._id}`}>
            <FaRegEdit />
          </Link>
        </div>
      </div>

      <div className="flex gap-4 justify-self-end mb-4">
        <Link to="/new-pet">Add Pet</Link>
        <Link to="/new-task">Add Task</Link>
      </div>

      <div className="flex flex-col gap-4">
        {pets.map((pet: any) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
    </>
  );
}
