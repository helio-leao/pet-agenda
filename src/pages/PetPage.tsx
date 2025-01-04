import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { FaRegEdit } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";
import Pet from "../types/Pet";
import Task from "../types/Task";

export default function PetPage() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [petResponse, tasksResponse] = await Promise.all([
          api.get(`/pets/${id}`),
          api.get(`/pets/${id}/tasks`),
        ]);

        setPet(petResponse.data);
        setTasks(tasksResponse.data);
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
      <div className="flex gap-4 mb-4">
        <img
          src={pet?.picture || picturePlaceholder}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div>
          <div className="flex gap-4">
            <h2>{pet?.name}</h2>
            <Link to={`/edit-pet/${pet?._id}`}>
              <FaRegEdit />
            </Link>
          </div>
          {pet?.createdAt && (
            <p>{`Since ${new Date(pet.createdAt).getFullYear()}`}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </main>
  );
}
