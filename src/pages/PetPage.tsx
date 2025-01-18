import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import { FaPlus, FaRegEdit, FaWeightHanging } from "react-icons/fa";
import picturePlaceholder from "../assets/picture-placeholder.svg";
import Pet from "../types/Pet";
import Task from "../types/Task";
import PetWeightRecord from "../types/PetWeightRecord";
import LoadingIndicator from "../components/LoadingIndicator";
import { ageString } from "../utils/timeCalculations";
import { DateTime } from "luxon";
import getErrorMessage from "../utils/getErrorMessage";

export default function PetPage() {
  const { petId } = useParams();
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
            api.get<Pet>(`/pets/${petId}`),
            api.get<Task[]>(`/pets/${petId}/tasks`),
            api.get<PetWeightRecord>(`/pets/${petId}/weight-records/latest`),
          ]);
        setPet(pet);
        setTasks(tasks);
        setLatestWeightRecord(petWeightRecord);
        setIsLoading(false);
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        alert(errorMessage);
      }
    })();
  }, []);

  async function handleDelete(taskId: string) {
    try {
      await api.delete(`/tasks/${taskId}`);
      await fetchTasks();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      alert(errorMessage);
    }
  }

  async function fetchTasks() {
    try {
      const { data } = await api.get<Task[]>(`/pets/${petId}/tasks`);
      setTasks(data);
    } catch (error) {
      throw error;
    }
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <main className="p-4 w-full max-w-screen-sm">
      <div className="flex gap-4 mb-4">
        <img
          src={pet!.pictureUrl || picturePlaceholder}
          className="object-cover rounded-lg min-h-32 min-w-32 h-32 w-32"
        />
        <div>
          <div className="flex gap-4">
            <h2>{pet!.name}</h2>
            <Link to={`/pets/${pet!._id}/edit`}>
              <FaRegEdit />
            </Link>
          </div>

          <div className="flex gap-4">
            {latestWeightRecord && (
              <p>
                {`${latestWeightRecord.value} kg (${DateTime.fromISO(
                  latestWeightRecord.date
                ).toLocaleString(DateTime.DATE_SHORT)})`}
              </p>
            )}
            <Link to={`/pets/${pet!._id}/weight-records`}>
              <FaWeightHanging />
            </Link>
          </div>

          <p>{ageString(pet!.birthdate)}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2>Tasks</h2>
          <Link to="/tasks/new" state={{ petId }}>
            <FaPlus />
          </Link>
        </div>

        {tasks.length === 0 ? (
          <p>No tasks for this pet yet</p>
        ) : (
          <div className="flex flex-col gap-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDeleteClick={() => handleDelete(task._id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
