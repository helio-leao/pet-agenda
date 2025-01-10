import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { FaRegEdit } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";
import Pet from "../types/Pet";
import Task from "../types/Task";
import PetWeightRecord from "../types/PetWeightRecord";
import LoadingIndicator from "../components/LoadingIndicator";
import { ageString } from "../utils/timeCalculations";

export default function PetPage() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [latestWeightRecord, setLatestWeightRecord] =
    useState<PetWeightRecord>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [{ data: pet }, { data: tasks }, { data: petWeightRecord }] =
          await Promise.all([
            api.get(`/pets/${id}`),
            api.get(`/pets/${id}/tasks`),
            api.get(`/pets/${id}/weight-records/latest`),
          ]);
        setPet(pet);
        setTasks(tasks);
        setLatestWeightRecord(petWeightRecord);
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
          src={pet!.picture || picturePlaceholder}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div>
          <div className="flex gap-4">
            <h2>{pet!.name}</h2>
            <Link to={`/pets/${pet!._id}/edit`}>
              <FaRegEdit />
            </Link>
          </div>
          {latestWeightRecord && (
            <p>{`${latestWeightRecord.value} kg (${Intl.DateTimeFormat(
              "pt-BR"
            ).format(new Date(latestWeightRecord.date))})`}</p>
          )}
          <p>{ageString(pet!.birthdate)}</p>
          <div className="mt-4">
            <Link
              to={`/pets/${pet!._id}/weight-records`}
              className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
            >
              weight records
            </Link>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks for this pet yet</p>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
}
