import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import TaskCard from "../components/TaskCard";
import { FaRegEdit } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";

export default function Pet() {
  const { id } = useParams();
  const [pet, setPet] = useState<any>({});
  const [tasks, setTasks] = useState<any>([]);
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
    <>
      <div className="flex gap-4 mb-4">
        <img
          src={pet.picture || picturePlaceholder}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div>
          <div className="flex gap-4">
            <h2>{pet.name}</h2>
            <Link to={`/edit-pet/${pet._id}`}>
              <FaRegEdit />
            </Link>
          </div>
          <p>{`Since ${new Date(pet.createdAt).getFullYear()}`}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {tasks.map((task: any) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
}
