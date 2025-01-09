import { Link } from "react-router-dom";
import { FaRegEdit, FaArrowRight } from "react-icons/fa";
import Task from "../types/Task";
import { calculateDaysTo } from "../utils/timeCalculations";

type TaskCardProps = {
  task: Task;
};

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="flex flex-col p-4 border rounded-md">
      <div className="flex justify-between gap-4">
        <h3>{task.title}</h3>
        <div className="flex gap-4">
          <Link to={`/tasks/${task._id}/edit`}>
            <FaRegEdit />
          </Link>
          <Link to={`/tasks/${task._id}`}>
            <FaArrowRight />
          </Link>
        </div>
      </div>

      <p>{task.description}</p>
      <p>
        {Intl.DateTimeFormat("pt-BR").format(new Date(task.date))} (
        {calculateDaysTo(task.date)} days)
      </p>
      {task.interval && (
        <p>{`Once every ${
          task.interval
        } ${task.intervalUnit.toLowerCase()}`}</p>
      )}

      {task.pet.name && (
        <div className="mt-4">
          <Link
            to={`/pets/${task.pet._id}`}
            className="bg-sky-600 rounded-lg px-4 py-2 self-start text-white"
          >
            {task.pet.name}
          </Link>
        </div>
      )}
    </div>
  );
}
